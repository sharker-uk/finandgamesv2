import type { Env, PagesFunction } from "../../_lib/auth";
import { errorResponse, jsonResponse, requireAdmin } from "../../_lib/auth";
import { listDrafts, saveDraft, updateDraft, validateDraft } from "../../_lib/editorial";
export const onRequestGet:PagesFunction<Env>=async({request,env})=>{
 const denied=await requireAdmin(request,env);if(denied)return denied;
 if(!env.GITHUB_TOKEN)return errorResponse("GitHub access is not configured.",503);
 try{return jsonResponse({branch:env.CONTENT_BRANCH?.trim()||"dev",drafts:await listDrafts(env)});}
 catch(e){return errorResponse(e instanceof Error?e.message:"Could not load drafts.",502);}
};
export const onRequestPost:PagesFunction<Env>=async({request,env})=>{
 const denied=await requireAdmin(request,env);if(denied)return denied;
 if(!env.GITHUB_TOKEN)return errorResponse("GitHub access is not configured.",503);
 let payload:Record<string,unknown>;try{payload=await request.json() as Record<string,unknown>;}catch{return errorResponse("Send a valid JSON draft.",400);}
 try{
   const draft=validateDraft(payload);
   if(typeof payload.path==="string"&&typeof payload.sha==="string") return jsonResponse(await updateDraft(env,payload.path,payload.sha,draft));
   return jsonResponse(await saveDraft(env,draft),201);
 }catch(e){return errorResponse(e instanceof Error?e.message:"Could not save draft.",400);}
};
