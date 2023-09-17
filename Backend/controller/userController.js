const User = require("../model/userModel")
const asyncHandler = require("express-async-handler");
const bcrypt = require('bcrypt');

const jwt = require("jsonwebtoken")

const loginUser = asyncHandler( async (req, res)=>{
    const { email, password } = req.body;
  
    if(!email || !password){
        res.status(400)
        throw new Error("all filed all mandatory")

    }
    const user = await User.findOne({email});
    
    if( user && (await bcrypt.compare(password, user.password))) {
        console.log("true")
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    role:user.role,
                    id: user.id,
                },
            },
            process.env.ACCESS_TOKEN,
            { expiresIn: "60m"}
        );
        
        res.json({accessToken})
    }else {
        res.status(400).json({message:"username or password is  not valid"})
    }
   
    
    
    
}
)


const registerUser = asyncHandler( async (req, res)=>{
    const {username , email, role,  password,} = req.body;

    if(!username || !email || !password){
        res.status(400)
        throw new Error("all filed all mandatory")
        
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable) {
        res.status(400)
        throw new Error("user already register")
        
    }
    //hasing password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        email,
        role,
        password:hashedPassword,
    })

    console.log(`user created ${user}`)
    if(user){
        res.status(201).json({_id: user.id, email: user.email})
    }else{
        res.status(400);
        throw new Error("user not created")
    } 


    res.status(204).json({message:"user has been create "})
})




const currentUser = asyncHandler(async(req, res)=>{
    res.json(req.user);

} );

module.exports = {registerUser, loginUser,currentUser}