const express=require('express');
const blogcontroller= require('../controller/blogcontroller')
const router= express.Router();
const upload= require('../multer');


    router.get('/',blogcontroller.blog_index);   
    //router.post('/',    upload.single('image'),blogcontroller.blog_create_post);
    router.get('/:id',blogcontroller.blog_details)    
    router.delete('/:id',blogcontroller.blog_delete)
    
    module.exports= router;
    
    
    