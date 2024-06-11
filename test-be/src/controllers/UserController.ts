import { Request, Response } from "express";

import UserService from "../services/UserService";




class UserController {

    


     

    public async logIn(req: Request, res: Response) {

        console.log(req.body);
       
        const user = await UserService.logIn(req.body);
        if(user) {
            res.status(200).json({
                result : "success",
                userId : user.id,
            });
        } else {
            res.status(401).json({
                result : "failed",
            });
        }
    }


  
}

export default new UserController();
