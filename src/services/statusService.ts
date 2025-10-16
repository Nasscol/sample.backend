import prisma from "../database/model";
class StatusService{
    async createStatus(text: string){
        try{
            await prisma.status.create({data: {text}});
        } catch(err){
            throw new Error ("failed to create status: "+ (err as Error).message);
        }
    }
}
    export{StatusService}