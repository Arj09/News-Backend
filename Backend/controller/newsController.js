const asyncHandler = require("express-async-handler");
const News = require("../model/newsMode;")
const User = require("../model/userModel")


// It is private which can access by Journalist only
const createPost = asyncHandler( async (req, res)=>{

    const { title, description} = req.body
    console.log(req.body)

    if(!title || !description ){
        res.status(400)
        throw new Error("all filed all mandatory")
    }

    const checkAccess = await User.findOne({_id: req.user.id});

    //check if  user is admin if user is amdin then add otherwise not
    if(checkAccess.role == "Journalist"){
        const news = await News.create({
            title,
            description,
            user_id: req.user.id,
    
        })
        res.status(202).json(news)

    }
    else{
        res.status(404).json({Message:"You don't have permission for add news"})

    }

   
})

// It is public whuch can access any one
const getPosts = asyncHandler( async  (req, res)=>{
    const news = await News.find()
    const news1 = news.reverse()
    
    res.status(200).json(news1)
    
})

// It is public whuch can access any one
const getPost = asyncHandler( async (req, res)=>{

    const news = await News.findById(req.params.id);

    if(!news){
        res.status(404);
        throw new Error('blog not found');
    }

    
    res.status(200).json(news);
})

// It is private which can access by admin
const updatePost = asyncHandler(async (req, res)=>{

    const news = await News.findById(req.params.id);

    if(!news){
        res.status(404);
        throw new Error('blog not found');
    }

    

    const checkAccess = await User.findOne({_id: req.user.id});
     //check if  user is admin if user is amdin then add otherwise not

    if(checkAccess.role == "Admin"){
        const updateBlog = await News.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        )
    }

    else{
        res.status(404).json({Message:"You don't have permission for update news"})
    }
      
      
      
    
    res.status(200).json(updateBlog);
    
})

// It is private which can access by admin
const deletePost = asyncHandler ( async  (req, res)=>{

    const news = await News.findById(req.params.id);

    if(!news){
        res.status(404);
        throw new Error('blog not found');
    }

    
    
    const checkAccess = await User.findOne({_id: req.user.id});


    //check if  user is admin if user is amdin then add otherwise not
    if(checkAccess.role == "Admin"){
        await News.findByIdAndRemove(
            req.params.id
        )
        res.status(200).json(news);
    }
    else{
        res.status(404).json({Message:"You don't have permission for delete news"})

    }
    
   
} )



module.exports ={getPost, getPosts, deletePost, updatePost, createPost}
