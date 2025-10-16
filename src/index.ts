import { services } from "./services";
import express, { Request, Response } from "express";
import { PrismaClient } from './generated/prisma'
import { error } from "console";
//import { error } from "console";
const app = express();
const prisma = new PrismaClient()
const PORT = process.env.MyBennyPort;
app.use(express.json())
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript + Express!");
});

// Create user attributes
app.post('/api/v1/users', async (req: Request, res: Response) => {
  try {
    const { first_name, second_name, email, phoneNumber, role = null, isActive } = req.body
    const user = await prisma.user.create({
      data: { first_name, second_name, email, phoneNumber,role, isActive },
    })
    res.json(user)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Something went wrong' })
  }
})
//Generate issues
app.post('/api/v1/issues',async (req: Request, res: Response) =>{
  try {
    const {title,description,userId} = req.body
    const data = await services.issues.createIssue(title,description,userId)
    res.json(data)
    
    
  }catch (err){
      console.error(err)
      res.status(500).json({error: 'something went wrong'})
    }
  })
  //status table (generation)
  app.post('/api/v1/status' ,async(req: Request, res: Response) =>{
    try {
      const {text} = req.body
      const data = await services.status.createStatus(text)
      res.json(data)
    }catch (err){
      console.error(err)
      res.status(500).json({error: 'something went wrong'})
    }
  })
  //adding comments to issues
  app.post('/api/v1/comment',async (req: Request, res: Response) =>{
    try {
      const {text}=req.body
      const comment = await prisma.comment.create({
        data: {text}, 
      })
      res.json(comment)
    }catch (err){
      console.error(err)
      res.status(500).json({error: 'something went wrong'})
    }
  })

  app.get('/api/v1/users', async (req: Request, res: Response) => {
  const {querry} = req.query
    const myId = String(querry)

  const users = await prisma.user.findFirst({where: {id: myId}})
  res.json(users)
})

// Get all users
app.get('/api/v1/users', async (req: Request, res: Response) => {
  const users = await prisma.user.findMany()
  res.json(users)
})



// Get all comments.
    app.get('/api/v1/comment', async(req: Request, res: Response) =>{
      const comment =await prisma.comment.findMany()
      res.json(comment)
    });
 //Get all issues.
  app.get('/api/v1/issue', async(req: Request, res: Response) => {
    const issue = await prisma.issue.findMany()
    res.json(issue)
  });
//fetching status......seems irrelevant tho
 app.get('/api/v1/status' , async(req: Request, res: Response) => {
  const status = await prisma.status.findMany()
  res.json(status)
 })
//delete specific users
app.delete('/api/v1/users/:id', async(req: Request, res: Response) =>{
  const {id} = req.params
  try{
    const existingUser = await prisma.user.findUnique({where: {id}})
    if (!existingUser){
      return res.status(404).json({error: 'user not found'})
    }
    await prisma.user.delete({where: {id}})
    res.json({message: `User: ${existingUser.first_name} ${existingUser.second_name} deleted successfully`})
  } catch(error){
    console.error(error)
    res.status(500).json({error: 'Error finding the user'})
  }
})
//delete all users at once
  app.delete('/api/v1/users', async(req: Request, res: Response) => {
    try{
      const deleted = await prisma.user.deleteMany()
      res.json({ message: `${deleted.count} users deleted successfully`})
    } catch(error){
      console.error(error)
      res.status(500).json({message: 'Failed to delete all users'})
    }
  })
//delete specific issues
app.delete('/api/v1/issues/:id', async(req: Request, res: Response) => {
  const {id}= req.params
  try{
    const existingIssue = await prisma.issue.findUnique({where: {id} })
    if (!existingIssue){
      return res.status(404).json({message: 'issue not found'})
    }
    await prisma.issue.delete({where: {id} })
    res.json({message: `issue: '${existingIssue.title}' has been deleted successfully`})
  } catch(error){
    console.error(error)
    res.status(500).json({error: 'error finding issue!'})
  }
})
//delete all issues at once
app.delete('/api/v1/issue', async(req: Request, res: Response)=> {
  try{
    const deleted = await prisma.issue.deleteMany()
    res.json({message:`${deleted.count} issues deleted successfully` })
  } catch(error){
    console.error(error)
    res.status(500).json({message: 'error erasing issues'})
  }
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
  
 


    
    





