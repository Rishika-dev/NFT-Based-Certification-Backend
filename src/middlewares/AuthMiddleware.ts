import { Unauthorized } from "@tsed/exceptions";
import {Middleware, MiddlewareMethods} from "@tsed/platform-middlewares";
import {Context, HeaderParams} from "@tsed/platform-params";
import jwt from "jsonwebtoken";
@Middleware()
export class AuthMiddleware implements MiddlewareMethods {
  use(@Context() ctx: Context,@HeaderParams("authorization") authorization: string) {
console.log(authorization)
if(!authorization) {
  throw new Unauthorized("No authorization token provided")

  }
  try {
    const decoded = jwt.verify(authorization, process.env.JWT_SECRET ||'');
    ctx.user = decoded;
    ctx.isAutorized = true;
  }
  catch (e) {
    console.log(e)
    throw new Unauthorized("Invalid authorization token provided")
  }
}
}