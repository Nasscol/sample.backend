import prisma from "../database/model";
class commentService{
    async createcomment(text:string, sourceId:string){
        try{
            await prisma.comment.create({data: {text, sourceId}})
        }catch(err){
            throw new Error("failed to create comment: "+ (err as Error).message)
        }
    }
}

       
    export {commentService}