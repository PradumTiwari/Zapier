import { Request,Response ,NextFunction} from "express"
import jwt from "jsonwebtoken"
import { JWTPASSWORD } from "./config";

export function authMiddleware(req:Request,res:Response,next:NextFunction){

    const authHeader = req.headers["authorization"];

    // Check if it starts with "Bearer "
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
         res.status(401).json({ message: "Unauthorized" });
         return;
    }

    // Extract the JWT (remove "Bearer " prefix)
    const token = authHeader.split(" ")[1];
    
     const payload=jwt.verify(token,JWTPASSWORD);
    
    try {
        const payload=jwt.verify(token,JWTPASSWORD);
        //@ts-ignore
        req.id=payload.id;
        next();
    } catch (error) {
        res.status(403).json({
            message:"Invalid Token"
        });
    }
     
}