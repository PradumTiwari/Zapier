import express,{Router} from 'express';
import { prismaClient } from '../db';


const router=Router();

router.get("/available",async(req,res)=>{
    try {
        const availableAction=   await prismaClient.availableAction.findMany({});
        console.log("a",availableAction);
        return res.json({availableAction})
    } catch (error) {
        console.log("Error");
        return error;
        res.status(500).json({error:"Internal Server error"});
    }
})
 

export const actionRouter=router;