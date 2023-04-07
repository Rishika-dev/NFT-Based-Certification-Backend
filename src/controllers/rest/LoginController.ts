import { Controller, Inject } from "@tsed/di";
import { Post } from "@tsed/schema";
import { LoginService } from "../../services/LoginService";
import { BodyParams } from "@tsed/platform-params";

@Controller("/login")
export class LoginController {
  @Inject() loginService: LoginService;
  @Post("/")
  async login(@BodyParams("username") username: string, @BodyParams("password") password: string){
    return await this.loginService.login(username, password);
    
  }
}
