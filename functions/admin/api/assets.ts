import type { Env, PagesFunction } from "../../_lib/auth";
import { errorResponse,jsonResponse,requireAdmin } from "../../_lib/auth";
import { uploadAsset } from "../../_lib/editorial";
export const onRequestPost:PagesFunction<Env>=async({request,env})=>{
 const denied=await requireAdmin(request,env);if(denied)return denied;
 if(!env.GITHUB_TOKEN)return errorResponse("GitHub access is not configured.",503);
 const length=Number(request.headers.get("content-length")||0);
 if(length>7_500_000)return errorResponse("Image upload exceeds the 5 MB limit.",413);
 let d:Record<string,unknown>;try{d=await request.json() as Record<string,unknown>;}catch{return errorResponse("Send a valid image upload.",400);}
 if(typeof d.slug!=="string"||typeof d.name!=="string"||typeof d.type!=="string"||typeof d.data!=="string")return errorResponse("Image details are incomplete.",400);
 try{return jsonResponse(await uploadAsset(env,d.slug,d.name,d.type,d.data),201);}
 catch(e){return errorResponse(e instanceof Error?e.message:"Could not upload image.",400);}
};
