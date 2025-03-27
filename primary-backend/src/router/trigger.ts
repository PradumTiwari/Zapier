import express,{Router} from 'express';
import { prismaClient } from '../db';


const router=Router();

router.get("/available",async(req,res)=>{
 try {
    const availableTriggers= await prismaClient.availableTrigger.findMany({});
    res.json({
        availableTriggers
    })
    console.log(availableTriggers); 
 } catch (error) {
    console.log("Error",error);
    res.status(500).json({error:"Internal Server Error"});
 }
    
})
 

export const triggerRouter=router;