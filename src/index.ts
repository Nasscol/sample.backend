import { services } from "./services";
import express, { Request, Response } from "express";
import { successResponse, errorResponse, errorResponse2 } from "./utilities/responseHandler";
import { PrismaClient } from './generated/prisma'
import { userService } from "./services/userService";
import { userRetrieval } from "./services/userRetrieval";


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
    const { first_name, second_name, email, phoneNumber, role, isActive } = req.body
    const user = await prisma.user.create({
      data: { first_name, second_name, email, phoneNumber, role, isActive }
    })
    return successResponse(res, 'user has been added successfully', user, 201)
  } catch (err) {
    console.error(err)
    return errorResponse(res, 'failed to add user', err, 500 )
  }
})

//Generate issues
app.post('/api/v1/issues',async (req: Request, res: Response) =>{
  try {
    const {title,description,userId} = req.body
    const data = await services.issues.createIssue(title,description,userId)
    return successResponse(res, 'issue added successfully',data, 201 )
    }catch (err){
      console.error(err)
      return errorResponse(res, 'failed to add issue', err, 500 )
    }
  })

  //status table (generation)
  app.post('/api/v1/status' ,async(req: Request, res: Response) =>{
    try {
      const {text} = req.body
      const data = await services.status.createStatus(text)
      return successResponse(res, 'status updated', data, 201)
    }catch (err){
      console.error(err)
      return errorResponse(res, 'failed to update status', err, 500)
    }
  })
  //adding comments to issues
  app.post('/api/v1/comment',async (req: Request, res: Response) =>{
    try {
      const {text,sourceId}=req.body
      const comment = await prisma.comment.create({data: {text,sourceId}})
      return successResponse(res, 'successfully added comment', comment, 201)
    }catch (err){
      console.error(err)
      return errorResponse(res, 'failed to add comment', err,500  )
    }
  })
/*//fetching a specific user from the database
  app.get('/api/v1/users', async (req: Request, res: Response) => {
  try{
    const {querry} = req.query
    const myId = String(querry)
    const users = await prisma.user.findFirst({where: {id: myId}})
  return successResponse(res, 'user found', users, 201)
  }catch (err){
    console.error(err)
    return errorResponse(res, 'Failed to find user', err, 500)
  }
})*/
//alternative to fetch user by id
app.get('/api/v1/users/:id', async (req: Request, res: Response) => {
  try{
    const { id } = req.params
    const users = await userRetrieval.getUserById(id)
    return successResponse(res, 'User retrieved successfully', users, 201)
  }catch(err){
    console.error(err)
    return errorResponse2(res, 'error retrieving the user', err, 404)
  }
})

//delete specific users
app.delete('/api/v1/users/:id', async(req: Request, res: Response) =>{
  const {id} = req.params
  try{
    const existingUser = await prisma.user.findUnique({where: {id}})
    if (!existingUser){
      return errorResponse2(res, 'User does not exist in the database', Error, 404)
    }
    await prisma.user.delete({where: {id}})
    return successResponse(res, 'user deleted successfully',existingUser, 201)
  } catch(error){
    console.error(error)
    return errorResponse(res, 'error deleting the user', error, 500)
  }
})

//delete all users at once
  app.delete('/api/v1/users', async(req: Request, res: Response) => {
    try{
      const deleted = await prisma.user.deleteMany()
      return successResponse(res, 'Successfully deleted all users', deleted, 201)
    } catch(error){
      console.error(error)
      return errorResponse(res, 'Something went wrong', error, 500)
    }
  })
//delete specific issues by id
app.delete('/api/v1/issues/:id', async(req: Request, res: Response) => {
  const {id}= req.params
  try{
    const existingIssue = await prisma.issue.findUnique({where: {id} })
    if (!existingIssue){
      return errorResponse2(res, 'issue does not exist in the database', Error, 404)
    }
    await prisma.issue.delete({where: {id} })
    return successResponse(res, 'Issue successfully deleted',existingIssue, 201 )
  } catch(error){
    console.error(error)
    return errorResponse(res, 'Something went wrong', error, 500)
  }
})
//delete all issues at once
app.delete('/api/v1/issue', async(req: Request, res: Response)=> {
  try{
    const deleted = await prisma.issue.deleteMany()
    return successResponse(res, 'All issues gone', deleted.count, 201)
  } catch(error){
    console.error(error)
    return errorResponse(res, 'Error erasing all issues', error, 500)
  }
})
//delete all comments at once 
app.delete('/api/v1/comments', async(req: Request, res: Response) =>{
  try{
    const deleted = await prisma.comment.deleteMany()
    return successResponse(res, 'All comments have been deleted successfully', deleted.count, 201)
  } catch(error){
    console.error(error)
    return errorResponse(res, 'Something went wrong', error, 500)
  }
})

//to delete a single/specific comment.
app.delete('/api/v1/comments/:id', async(req: Request, res: Response) =>{
  const {id} = req.params
  try{
    const existingComment = await prisma.comment.findUnique({where: {id} })
    if(!existingComment){ 
      return errorResponse2(res, 'Sorry! comment not found', Error, 404)
    }
    await prisma.comment.delete({where: {id} })
    return successResponse(res, 'Comment successfully deleted', existingComment, 201)
  } catch(error){
    console.error(error)
    return errorResponse(res, 'Something went wrong', error, 500)
  }
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

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
  
 


    
    





