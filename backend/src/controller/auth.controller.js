import bcrypt from 'bcryptjs'
import User from './../models/user.model.js';
import { generateToken } from '../lib/utils.js';
import cloudinary from '../lib/cloudinary.js';
export const SignUp = async (req, res) => {
  const {fullName,email,password} = req.body;
  if(!password || !email || !fullName){
    return res.status(401).json({success:false,message : "Enter All the Fields Properly."});
  }
  try {
    if(password.length < 6){
      res.status(400).json({message : "Enter the Password with more than 6 caracters.."});
    }
    const user = await User.findOne({email});

    if(user){
      return res.status(400).json({success:false,message : "Email already exist.."});
    }
    
    const salts  = await bcrypt.genSalt(10);

    const hashed  = await bcrypt.hash(password,salts);

    const newUser  = new User({
      fullName,
      email,
      password : hashed,
    });

    if(newUser){
      generateToken(newUser._id,res);

      await newUser.save();

      res.status(201).json({
        success : true,
        message : "User is sucessfully signedUp..",
        id : newUser._id,
        fullName:newUser.fullName,
        email : newUser.email,
        password:newUser.password,
        profilePic : newUser.profilePic
      });
    }
  } catch (error) {
    console.log('user is not created.',error.message)
   res.status(501).json({ success: false, message: "internal server error" });
  }
}

export const LogIn = async (req, res) => {
  const {email,password} = req.body;

  if(!email || !password){
    return res.status(400).json({success :false,message : "All the Fields Are Required.."});
  }
  try {
  const user = await User.findOne({ email });

  if (!user) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid credentials.." });
  }
  const isCorrect = await bcrypt.compare(password, user.password);

  if (!isCorrect) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid credentials.." });
  }

  generateToken(user._id, res);

  res.status(201).json({
    success: true,
    message: "User is Succesfully Logged In",
    id: user._id,
    fullName : user.fullName,
    email: user.email,
    password: user.password,
    profilePic : user.ProfilePic
  });

} catch (error) {
  console.log('Error ocurred : ',error.message)
  res.status(500).json({message : "Internal Server Error.."});
}
};

export const Logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });

    res.status(201).json({ message: "succesfully logged out" });
  } catch (error) {
    console.log("Error in loging Out : ",error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  const { profilePic } = req.body;
  const user = req.user._id;

  if (!profilePic) {
    return res.status(400).json({ message: "The ProfilePic is not provided." });
  }

  try {
    const uploadedResponse = await cloudinary.uploader.upload(profilePic);
    console.log(uploadedResponse.secure_url);
    const updatedData = await User.findByIdAndUpdate(
      user,
      { profilePic: uploadedResponse.secure_url },
      { new: true }
    );
    console.log(updatedData)
    res.status(200).json(updatedData);

  } catch (error) {
    console.log("Error in updating pic:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const getUser = (req,res) =>{
  try {
    res.status(201).json(req.user);
  } catch (error) {
    console.log("Error is : ",error);
    res.status(501).json({message : "Internal Server Error .."});
  }
}

