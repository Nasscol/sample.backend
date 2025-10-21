import prisma from "../database/model";
//function to fetch user by their id
      class userRetrieval {
        static async getUserById(userId: string){
            try{
                const user = await prisma.user.findUnique({
                    where: {id: userId}
                })
                if(!user){
                    throw new Error('User not found')
                }
                return user
            }catch(err){
                throw new Error(`process terminated: `+(err as Error).message ) 
            }
        }
    }
            export { userRetrieval}