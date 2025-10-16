import prisma from "../database/model";
class IssueService{
    async createIssue(title:string, description:string, userId:string){
        try{
            await prisma.issue.create({data: {title,description,userId}});
        }catch(err){
            throw new Error("failed too create issue: "+ (err as Error).message);
        }
    }
        
    }
    export {IssueService};
     
    
    
        
    

