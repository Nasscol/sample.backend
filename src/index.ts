import { services } from "./services";
import express, { Request, Response } from "express";
import { PrismaClient } from './generated/prisma'
const app = express();
const prisma = new PrismaClient()
const PORT = process.env.MyBennyPort;
app.use(express.json())
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript + Express!");
});

// Create user attributes
app.post('/users', async (req: Request, res: Response) => {
  try {
    const { first_name, second_name, email, phoneNumber, isActive } = req.body
    const user = await prisma.user.create({
      data: { first_name, second_name, email, phoneNumber, isActive },
    })
    res.json(user)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Something went wrong' })
  }
})
app.post('/issues',async (req: Request, res: Response) =>{
  try {
    const {title,description,userId} = req.body
    const data = await services.issues.createIssue(title,description,userId)
    res.json(data)
    
    
  }catch (err){
      console.error(err)
      res.status(500).json({error: 'something went wrong'})
    }
  })
  app.post('/comment',async (req: Request, res: Response) =>{
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

// Get all users
app.get('/users', async (req: Request, res: Response) => {
  const users = await prisma.user.findMany()
  res.json(users)
})
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});



