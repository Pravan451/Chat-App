import   jwt  from 'jsonwebtoken';
import User from './../models/user.model.js';

export const protectRoutes = async (req,res,next) => {
    try {
        const token = req.cookies.jwt;

        if(!token){
            return res.status(401).json({message : "Unautharized permission denied .."});
        }

        const isCorrect   =  jwt.verify(token,process.env.JWT_SECRET);

        if(!isCorrect){
            return res.status(400).json({message : "Token is Invalid"});
        }
        
        const user  = await User.findById(isCorrect.userId).select("-password");


        if(!user){
            return res.status(404).json({message : "The User is Not found in the DataBase.."});
        }

        req.user = user
        next();

    } catch (error) {
       console.log("Error in protectRoute Handling : ",error.message);
       res.status(501).json({message : "Internal Server Error."});
    }
}