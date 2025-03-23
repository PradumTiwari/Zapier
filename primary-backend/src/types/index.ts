import {z} from 'zod';


export const signUpSchema=z.object({
    username:z.string().min(5),
    password:z.string().min(6),
    name:z.string().min(3),
})

export const signInSchema=z.object({
    username:z.string(),
    password:z.string(),
})

