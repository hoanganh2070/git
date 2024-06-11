import { DB } from "../../prisma/DB";
import { sha256 } from 'js-sha256';


class UserService {

   

    // kiểm tra user có tồn tại không
    public async logIn(user: any) {
        const isFound = await DB.user.findFirst({
            where : {
                username : user.username,
            }
        });
        if (isFound) {
            if(isFound.password === sha256(user.password)) {
                await DB.user.update({
                    where : {
                        id : isFound.id
                    },
                    data : {
                        loggedAt : new Date(),
                        loggedIn : true
                    }
                })
                return isFound;
            }
        }
        return null;
    }


}

export default new UserService();