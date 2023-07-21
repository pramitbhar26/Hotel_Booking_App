import jwt from "jsonwebtoken";
import { CreateError } from "./error.js";
export const verifyToken = (req,res,next)=>{
    const token = req.cookies.access_token;

    if(!token || token==undefined) return next(CreateError(401,"You are not Authenticated"))

    jwt.verify(token,process.env.JWT,(err,user)=>{
        if(err || user==undefined) return next(CreateError(403,"Token is Invalid"));

        req.user=user;
         next();
    });
}


export const verifyUser = (req,res,next)=>{
    verifyToken(req,res,next,()=>{
        console.log(req.user);
        if(!req.user.isAdmin) console.log("hello");
        if(req.user.id==req.params.id || req.user.isAdmin){
            next();
        }
        else return next(CreateError(403,"You are not Authorized!"));
    })
}


export const verifyAdmin = (req,res,next)=>{
    verifyToken(req,res,()=>{
        // console.log(req.user);
        if(req.user==undefined) return next(CreateError(403,"Token is Invalid"));
        if(!req.user.isAdmin) console.log("hello");
        if(req.user.isAdmin){
            next();
        }
        else return next(CreateError(403,"You are not Authorized!"));
    })
}
