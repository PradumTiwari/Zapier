import express from 'express';
import { PrismaClient } from '@prisma/client';
const client=new PrismaClient();
const app=express();
app.use(express.json());
app.post("/hooks/catch/:userId/:zapId",async(req,res)=>{
  const userId=req.params.userId;
    const zapId=req.params.zapId;
    const body=req.body;
    console.log("userId",userId);
    console.log("zapId",zapId);
    await client.$transaction(async tx=>{
      console.log("1st");
      
      const run=await tx.zapRun.create({
        data:{
          zapId:zapId,
          metadata:body
        }
      });
      console.log("2nd");
      

      await tx.zapRunOutbox.create({
        data:{
          zapRunId:run.id,
        }
      })
    })
    console.log("3rd");
    
    res.json({status:"ok"});
})

app.listen(3000);