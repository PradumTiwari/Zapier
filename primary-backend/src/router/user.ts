import { Router, Request, Response } from 'express';
import { authMiddleware } from '../middleware';
import { signInSchema, signUpSchema } from '../types';
import { prismaClient } from '../db'; // Ensure this path is correct

const router = Router();

router.post("/signup", async (req: Request, res: Response) => { 
   
        // Parse request body correctly
        const parsedData = signUpSchema.safeParse(req.body);

        if (!parsedData.success) {
            res.status(400).json({
                message: "Incorrect Inputs",
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

router.post("/signup", async (req: Request, res: Response) => { 
   
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


});

export const userRouter = router;
