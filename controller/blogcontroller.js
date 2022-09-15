
const Blog= require('../module/blogschema')
const comments= require('../module/commentschema');
const wow= require('../routers/blogrouters')
const cloudinary =require ('../cloudinary');
const path =require('path');
const { result } = require('lodash');




const blog_index=(req,res)=>{
    Blog.find()
    .then((result)=>{
        res.render('blogs/index',{title:'all blogs',blogs: result})
    
        
    })
       
}

const blog_details=(req,res)=>{
    const id=req.params.id;
     comments.find()
    .then((result)=>{
        console.log(result.blogid);
    })
    Blog.findById(id).lean().populate('comments')
    .then((result)=>{
        res.render('blogs/data',{title:'blog',data:result});

    })
    .catch((err)=>{

        console.log(err);
    })
}

const blog_delete=(req,res)=>{
    const id=req.params.id;
    Blog.findByIdAndDelete(id)
    .then((result)=>{
        res.json({redirect:'/blogs'})
    })
    .catch((err)=>{
        console.log(err);
    })

}

//const blog_create_post=async (req,res)=>{
   // console.log(req.file)
    //const result= await cloudinary.uploader.upload(req.file.path);

    //const url= result.url;
    //const man=new Blog({
        //t//itle:req.body.title,
        //snippete:req.body.snippete,
        //body:req.body.body,
        //cloudinary_url: url
   // })
       // man.save()
        //.then((result)=>{
          //  res.redirect('/blogs') ;      
        //})
        //.catch((err)=>{
        //    console.log(err);
        //})

       // const upload=(req,res)=>{

        //}
//}

module.exports=
{
    blog_index,
    blog_details,
    blog_delete,
   
}