import type { Env } from "./auth";
const OWNER="sharker-uk", REPO="finandgamesv2";
const API=`https://api.github.com/repos/${OWNER}/${REPO}`;
const branch=(env:Env)=>env.CONTENT_BRANCH?.trim() || "dev";
export type PostType="blog"|"studio"|"news"|"devlog";
export type DraftInput={type:PostType;title:string;slug:string;date:string;description:string;author:string;tags:string[];game?:string;body:string;coverImage?:string;coverAlt?:string;draft?:boolean};
function headers(env:Env,json=false):HeadersInit {
 if(!env.GITHUB_TOKEN) throw new Error("GITHUB_TOKEN is not configured.");
 return {Authorization:`Bearer ${env.GITHUB_TOKEN}`,Accept:"application/vnd.github+json","X-GitHub-Api-Version":"2022-11-28","User-Agent":"finandgames-editorial",...(json?{"Content-Type":"application/json"}:{})};
}
async function request(url:string,env:Env,init?:RequestInit):Promise<Response>{
 const response=await fetch(url,{...init,headers:{...headers(env,!!init?.body),...(init?.headers||{})}});
 if(!response.ok){const detail=(await response.text()).slice(0,250);throw new Error(`GitHub API ${response.status}: ${detail||response.statusText}`);}
 return response;
}
const enc=(s:string)=>btoa(Array.from(new TextEncoder().encode(s),b=>String.fromCharCode(b)).join(""));
function quote(s:string){return JSON.stringify(s);}
function safeSlug(s:string){return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s);}
export function validateDraft(value:unknown):DraftInput {
 if(!value||typeof value!=="object") throw new Error("Send a valid draft object.");
 const d=value as Record<string,unknown>;
 if(!["blog","studio","news","devlog"].includes(String(d.type))) throw new Error("Choose a supported post type.");
 for(const key of ["title","slug","date","description","author","body"]) if(typeof d[key]!=="string") throw new Error(`Missing or invalid ${key}.`);
 const out=d as unknown as DraftInput;
 if(!out.title.trim()||out.title.length>160) throw new Error("Title is required and must be 160 characters or fewer.");
 if(!safeSlug(out.slug)) throw new Error("Slug must use lowercase letters, numbers and single hyphens.");
 if(!/^\d{4}-\d{2}-\d{2}$/.test(out.date)||Number.isNaN(Date.parse(out.date+"T12:00:00Z"))) throw new Error("Date must use YYYY-MM-DD.");
 if(!out.description.trim()||out.description.length>320) throw new Error("Description is required and must be 320 characters or fewer.");
 if(out.body.length>100000) throw new Error("Article body is too large (100 KB maximum).");
 if(out.type==="devlog"&&(!out.game||!safeSlug(out.game))) throw new Error("Devlogs need a game slug such as caravan-park-tycoon.");
 if(!Array.isArray(d.tags)||d.tags.length>20||d.tags.some(t=>typeof t!=="string"||t.length>40)) throw new Error("Tags must be a list of up to 20 short strings.");
 return out;
}
function destination(d:DraftInput){
 if(d.type==="blog") return `src/content/blog/${d.slug}.md`;
 if(d.type==="studio") return `src/content/news/${d.slug}.md`;
 if(d.type==="news") return `src/content/news/${d.slug}.md`;
 return `src/content/games/${d.game}/devlogs/${d.slug}.md`;
}
function frontmatter(d:DraftInput){
 const fields=[`title: ${quote(d.title.trim())}`,`pubDate: ${d.date}`,`description: ${quote(d.description.trim())}`,`author: ${quote(d.author.trim()||"Fin & Games Team")}`,`tags: [${d.tags.map(t=>quote(t.trim())).join(", ")}]`,`draft: ${d.draft!==false?"true":"false"}`,`editorialType: ${d.type}`];
 if(d.coverImage) fields.push(`coverImage: ${quote(d.coverImage)}`);
 if(d.coverAlt) fields.push(`coverAlt: ${quote(d.coverAlt)}`);
 if(d.type==="devlog") fields.push(`game: ${quote(d.game!)}`);
 return `---\n${fields.join("\n")}\n---\n\n${d.body.trim()}\n`;
}
async function getSha(path:string,env:Env):Promise<string|undefined>{
 const r=await fetch(`${API}/contents/${path.split("/").map(encodeURIComponent).join("/")}?ref=${encodeURIComponent(branch(env))}`,{headers:headers(env)});
 if(r.status===404)return undefined;
 if(!r.ok) throw new Error(`GitHub could not check existing content (${r.status}).`);
 return ((await r.json()) as {sha:string}).sha;
}
export async function listDrafts(env:Env){
 const response=await request(`${API}/git/trees/${encodeURIComponent(branch(env))}?recursive=1`,env);
 const tree=await response.json() as {tree?:{path:string;type:string}[];truncated?:boolean};
 if(tree.truncated) throw new Error("Repository listing was truncated; refusing an incomplete draft list.");
 const paths=(tree.tree||[]).filter(x=>x.type==="blob"&&/^src\/content\/(blog|news|games\/.+\/devlogs)\/.+\.md$/.test(x.path));
 const results=await Promise.all(paths.map(async item=>{
   const r=await request(`${API}/contents/${item.path.split("/").map(encodeURIComponent).join("/")}?ref=${encodeURIComponent(branch(env))}`,env);
   const f=await r.json() as {content:string;encoding:string;sha:string};
   const raw=new TextDecoder().decode(Uint8Array.from(atob(f.content.replace(/\s/g,"")) ,c=>c.charCodeAt(0)));
   const fm=raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
   const meta=fm?.[1]||"";
   const val=(key:string)=>meta.match(new RegExp("^"+key+":\\s*(.*)$","m"))?.[1]?.replace(/^["']|["']$/g,"")||"";
   const isDraft=val("draft")!=="false";
   return {path:item.path,sha:f.sha,title:val("title")||item.path.split("/").pop()!,date:val("pubDate"),description:val("description"),author:val("author")||"Fin & Games Team",tags:val("tags").replace(/^\\[|\\]$/g,"").split(",").map(s=>s.trim().replace(/^["\']|["\']$/g,"")).filter(Boolean),game:val("game"),coverImage:val("coverImage"),coverAlt:val("coverAlt"),draft:isDraft,body:fm?.[2]||"",type:val("editorialType")||(item.path.includes("/devlogs/")?"devlog":item.path.startsWith("src/content/news/")?"studio":"blog")};
 }));
 return results.filter(x=>x.draft).sort((a,b)=>b.date.localeCompare(a.date));
}
export async function saveDraft(env:Env,input:DraftInput){
 const path=destination(input);
 if(!path.startsWith("src/content/")||path.includes("..")) throw new Error("Invalid content path.");
 const existing=await getSha(path,env);
 if(existing) throw new Error("A post with that slug already exists. Choose a different slug to avoid overwriting content.");
 await request(`${API}/contents/${path.split("/").map(encodeURIComponent).join("/")}`,env,{method:"PUT",body:JSON.stringify({message:`Add editorial draft: ${input.title.trim()}`,content:enc(frontmatter(input)),branch:branch(env)})});
 return {path,branch:branch(env),draft:true};
}
export async function uploadAsset(env:Env,slug:string,fileName:string,mimeType:string,base64:string){
 if(!safeSlug(slug)) throw new Error("Invalid asset folder slug.");
 const ext=fileName.toLowerCase().split(".").pop()||"";
 const allowed:Record<string,string>={jpg:"image/jpeg",jpeg:"image/jpeg",png:"image/png",webp:"image/webp",gif:"image/gif",avif:"image/avif"};
 if(!allowed[ext]||allowed[ext]!==mimeType) throw new Error("Only JPEG, PNG, WebP, GIF and AVIF images are supported.");
 if(!/^[a-zA-Z0-9][a-zA-Z0-9._ -]{0,99}$/.test(fileName)||fileName.includes("..")) throw new Error("Use a simple image filename.");
 if(!/^[A-Za-z0-9+/]+={0,2}$/.test(base64)||base64.length>7_000_000) throw new Error("Image is invalid or too large (5 MB maximum).");
 const bytes=Uint8Array.from(atob(base64),c=>c.charCodeAt(0));
 const ascii=(start:number,end:number)=>String.fromCharCode(...bytes.slice(start,end));
 const valid=ext==="jpg"||ext==="jpeg"?bytes[0]===0xff&&bytes[1]===0xd8&&bytes[2]===0xff:
  ext==="png"?ascii(0,8)===String.fromCharCode(137,80,78,71,13,10,26,10):
  ext==="webp"?ascii(0,4)==="RIFF"&&ascii(8,12)==="WEBP":
  ext==="gif"?["GIF87a","GIF89a"].includes(ascii(0,6)):
  ext==="avif"?ascii(4,12).startsWith("ftypavif")||ascii(4,12).startsWith("ftypavis"):false;
 if(!valid) throw new Error("The file contents do not match the selected image format.");
 const path=`public/uploads/${slug}/${fileName.replace(/\s+/g,"-")}`;
 if(await getSha(path,env)) throw new Error("That image filename already exists; rename the image and try again.");
 await request(`${API}/contents/${path.split("/").map(encodeURIComponent).join("/")}`,env,{method:"PUT",body:JSON.stringify({message:`Add editorial image for ${slug}`,content:base64,branch:branch(env)})});
 return {path,url:"/uploads/"+slug+"/"+fileName.replace(/\s+/g,"-")};
}

export async function updateDraft(env:Env,path:string,sha:string,input:DraftInput){
 const expected=destination(input);
 if(path!==expected||!path.startsWith("src/content/")||path.includes("..")) throw new Error("Draft path does not match its type and slug.");
 const current=await request(`${API}/contents/${path.split("/").map(encodeURIComponent).join("/")}?ref=${encodeURIComponent(branch(env))}`,env);
 const file=await current.json() as {sha:string};
 if(file.sha!==sha) throw new Error("This draft changed on GitHub since it was loaded. Reload the drafts and apply your edits again.");
 await request(`${API}/contents/${path.split("/").map(encodeURIComponent).join("/")}`,env,{method:"PUT",body:JSON.stringify({message:`Update editorial draft: ${input.title.trim()}`,content:enc(frontmatter(input)),sha:file.sha,branch:branch(env)})});
 return {path,branch:branch(env),draft:true};
}
