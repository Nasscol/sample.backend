import prisma from "../database/model";
class userService{
    async createuser(first_name:string, second_name:string, email:string, phoneNumber: string ){
        try{
            await prisma.user.create({data: {first_name,second_name,email, phoneNumber}})
        }catch(err){
            throw new Error("failed to create user: "+ (err as Error).message)
        }
    }
    }
    export {userService}