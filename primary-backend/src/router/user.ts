import { Router, Request, Response } from 'express';
import { authMiddleware } from '../middleware';
import { signInSchema, signUpSchema } from '../types';
import { prismaClient } from '../db'; // Ensure this path is correct
import jwt from 'jsonwebtoken';
import { JWTPASSWORD } from '../config';
const router = Router();

router.post("/signup", async (req: Request, res: Response) => { 
   
        // Parse request body correctly
        const parsedData = signUpSchema.safeParse(req.body);
       console.log(parsedData);
       
        if (!parsedData.success) {
            res.status(400).json({
                message: "Incorrect Innputs",
                errors: parsedData.error.errors // Send validation errors for debugging
            });
           return;
        }

        const { username, password, name } = parsedData.data;

        // Check if the user already exists
        const userExists = await prismaClient.user.findFirst({
            where: { email: username }
        });

        if (userExists) {
            res.status(409).json({
                message: "User Already Exists"
            });
            return;
        }

        // Create new user
        await prismaClient.user.create({
            data: {
                email: username,
                password, // Hash this in production
                name
            }
        });

    res.status(201).json({
            message: "Please verify the account"
        });
    
});

router.post("/signin", async (req: Request, res: Response) => { 
    console.log("Signin P");
    
   
    // Parse request body correctly
    const parsedData = signInSchema.safeParse(req.body);

    if (!parsedData.success) {
        res.status(400).json({
            message: "Incorrect Inputs",
            errors: parsedData.error.errors // Send validation errors for debugging
        });
       return;
    }

    const { username, password } = parsedData.data;

    const user=await prismaClient.user.findFirst({
        where:{
            email:username,
            password:password,
        }
    });

    if(!user){
        res.status(403).json({
            message:"Invalid Credentials"
        })
        return;
    }
   

    //Sign the jwt
    const token=jwt.sign({
        id:user.id,
        
    },JWTPASSWORD);

    res.status(201).json({
        token:token
    })

});



router.get('/',authMiddleware,async(req,res)=>{

     console.log("Inside this");
     
    //To do fix the type
    //@ts-ignore
    const id=req.id;
    const user=await prismaClient.user.findFirst({
        where:{
            id
        },
        select:{
            name:true,
            email:true,
          
        }
    })

     res.status(201).json({
        user
    })
     
    

})

export const userRouter = router;
