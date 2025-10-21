import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

async function main(){
    console.log({message:'starting database seeding'})
    //create users
    const users = await prisma.user.createMany(
        {
            data: [
                {   
                    id: 'user-001',
                    first_name: 'John', 
                    second_name: 'Doe', 
                    email: 'john@gmail.com', 
                    phoneNumber: '0775664764', 
                    role:'developer'
                },{ 
                    id: 'user-001',
                    first_name: 'Jane', 
                    second_name: 'Doe', 
                    email: 'jane@gmail.com', 
                    phoneNumber: '0775657764', 
                    role:'analyst'
                },{ 
                    id: 'user-003',
                    first_name: 'Dickson', 
                    second_name: 'Kasolo', 
                    email: 'dickson@gmail.com', 
                    phoneNumber: '07734264764', 
                    role:'manager'
                }
            ],
            skipDuplicates: true
        }
    )
    console.log({message: 'Users created successfully'})
    
    //issues linked to users
    const issues = await prisma.issue.createMany({
        data: [
                {
                    id: 'issue-001',
                    title: 'pending memo',
                    description: 'please clarify on the outstanding memo',
                    userId: 'user-001'
                },{
                    id: 'issue-002',
                    title: 'login issue',
                    description: 'users are not able to log into their pages properly',
                    userId: 'user-002'
                },{
                    id: 'issue-003',
                    title: 'system lagging',
                    description: 'user dashboard takes long to load',
                    userId: 'user-003'
                }        
        ],
        skipDuplicates: true
    })
        console.log('issues created successfully')

    //comments linked to users
    const comments = await prisma.comment.createMany({
        data: [
                {
                    id: 'comment-001',
                    text: 'issue logged for review',
                    sourceId: 'user-001'
                },{
                    id: 'comment-002',
                    text: 'we are investigating possible server-side delays',
                    sourceId: 'user-001'
                },{
                    id: 'comment-003',
                    text: 'please provide screenshot of error message',
                    sourceId: 'user-001'
                }
        ],
        skipDuplicates: true
    })
    console.log('comments added successfully')

    //status contents
    const progress = await prisma.status.createMany({
        data:[
            {
                id: 'status-001',
                text: 'pending'
            },{
                id: 'status-002',
                text: 'in-line'

            },{
                id: 'status-003',
                text: 'in-queue'
            }
        ],
        skipDuplicates: true
    })
    console.log('status content generated successfully' )
    console.log('Database seeding done successfully')
}
    main()
        .catch((err) => {
            console.error('seeding failed!', err)
            process.exit()
        })
        .finally( async() => {
            await prisma.$disconnect()
        })