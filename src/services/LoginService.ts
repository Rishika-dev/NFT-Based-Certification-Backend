import {Inject, Injectable} from "@tsed/di";
import {MongooseModel} from "@tsed/mongoose";
import {UserModel} from "../models/UserModel";
import { NotFound, Unauthorized } from "@tsed/exceptions";
import jwt  from "jsonwebtoken";

@Injectable()
export class LoginService {

    @Inject(UserModel)
    private UserModel: MongooseModel<UserModel>;

    async login(username: string, password: string){

        const user = await this.UserModel.findOne({username: username}).exec();
        if(!user) {
            throw new NotFound("User not found");
        }
        if(user.password !== password) {
            throw new Unauthorized("Password is incorrect");
        }
        
        const sign = jwt.sign({user:user.username,email:user.email}, process.env.JWT_SECRET ||'', {expiresIn: '1h'})
        return {token: sign, user: user.username, email: user.email}
    }

    
}
