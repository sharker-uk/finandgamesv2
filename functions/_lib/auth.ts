export type PagesFunction<E> = (context: { request: Request; env: E }) => Response | Promise<Response>;
export interface Env {
  GITHUB_TOKEN?: string;
  CF_ACCESS_TEAM_DOMAIN?: string;
  CF_ACCESS_AUD?: string;
  ADMIN_EMAIL?: string;
  CONTENT_BRANCH?: string;
  GEMINI_API_KEY?: string;
  GEMINI_MODEL?: string;
}
type Claims = { aud?: string | string[]; email?: string; exp?: number; iss?: string };
const json = (error: string, status: number) => Response.json({ error }, { status, headers: { "Cache-Control": "no-store" } });
function decode(value: string): Uint8Array {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(normalized + "=".repeat((4 - normalized.length % 4) % 4));
  return Uint8Array.from(binary, c => c.charCodeAt(0));
}
function part<T>(value: string): T { return JSON.parse(new TextDecoder().decode(decode(value))) as T; }
export async function requireAdmin(request: Request, env: Env): Promise<Response | null> {
  if (!env.CF_ACCESS_TEAM_DOMAIN || !env.CF_ACCESS_AUD || !env.ADMIN_EMAIL)
    return json("Editorial authentication is not configured. Contact the site administrator.", 503);
  const token = request.headers.get("Cf-Access-Jwt-Assertion");
  if (!token) return json("Sign in through the authorised Cloudflare Access account.", 401);
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return json("Invalid access token.", 401);
    const header = part<{alg?:string;kid?:string}>(parts[0]);
    const claims = part<Claims>(parts[1]);
    const team = env.CF_ACCESS_TEAM_DOMAIN.replace(/^https?:\/\//, "").replace(/\/$/, "");
    const issuer = "https://" + team;
    const aud = Array.isArray(claims.aud) ? claims.aud : [claims.aud];
    if (header.alg !== "RS256" || !header.kid || claims.iss !== issuer ||
        !aud.includes(env.CF_ACCESS_AUD) || !claims.exp || claims.exp <= Math.floor(Date.now()/1000) ||
        claims.email?.toLowerCase() !== env.ADMIN_EMAIL.toLowerCase()) return json("You are not authorised to use this page.", 403);
    const response = await fetch(issuer + "/cdn-cgi/access/certs", { headers: { Accept: "application/json" } });
    if (!response.ok) return json("Unable to verify access credentials.", 503);
    const set = await response.json() as {keys?: (JsonWebKey & {kid?:string})[]};
    const jwk = set.keys?.find(key => key.kid === header.kid);
    if (!jwk) return json("Access signing key not recognised.", 401);
    const key = await crypto.subtle.importKey("jwk", jwk, {name:"RSASSA-PKCS1-v1_5",hash:"SHA-256"}, false, ["verify"]);
    const valid = await crypto.subtle.verify("RSASSA-PKCS1-v1_5", key, decode(parts[2]), new TextEncoder().encode(parts[0]+"."+parts[1]));
    return valid ? null : json("Invalid access token signature.", 401);
  } catch { return json("Could not validate your access session.", 401); }
}
export function jsonResponse(data: unknown, status=200): Response {
  return Response.json(data,{status,headers:{"Cache-Control":"no-store, max-age=0","X-Content-Type-Options":"nosniff","Vary":"Cf-Access-Jwt-Assertion"}});
}
export function errorResponse(message:string,status:number):Response { return jsonResponse({error:message},status); }
