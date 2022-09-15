const express= require('express')
const morgan= require('morgan')
const mongoose=require('mongoose')
const blogroutes= require('./routers/blogrouters')
const cloudinary =require ('./cloudinary');
const upload= require('./multer');

const log= require('./module/loginschema')
const comment= require('./module/commentschema');
const { mean, identity } = require('lodash');
const imported= require('./controller/blogcontroller')


const app= express();
const dburl='mongodb+srv://princo:prince123@cluster0.i0nhr.mongodb.net/store?retryWrites=true&w=majority';
mongoose.connect(dburl)

.then((result)=>{console.log('databese connected');
const Blog= require('./module/blogschema')} )
.catch((err)=>console.log("AN ERROR OCCUREd ",err));

app.listen(3000,()=> console.log("Server connected!", 3000));

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(morgan("dev", {})); 
app.set('view engine','ejs');

//all blogs redirect
app.get('/',(req,res)=>{
    res.redirect('/blogs');   
})

// about page
app.get('/about',(req,res)=>{
    res.render('blogs/about',{title:'about'}); 
})

//blog routes
app.use('/blogs',blogroutes);

//sign up
app.get('/signup',(req,res)=>{
    res.render('blogs/account',{title:'login'});
});
app.post('/signup',(req,res)=>{
    const send= new log({
        username: req.body.username,
        password: req.body.password,
    });
    send.save()
    .then((result)=>{;
res.render('blogs/login')
})
    .catch((err)=>{console.log(err);})
})

//log in
app.get('/login',(req,res)=>{
    res.render('blogs/login',{title:'create'});
})
app.post('/login',(req,res)=>{
    log.find()
    .then(async(result)=>{

     console.log(result[1].username);
     for(i=0;i<result.length;i++){
        if (((result[i].password)==req.body.passway)&&((result[i].username)==req.body.person)) {
          res.render('blogs/create'); 
        }}    
})
})

//create Blog
app.get('/newblog' ,(req,res)=>{
    res.render('blogs/create',{title:'creates'});  
});
app.post('/newblog', upload.single('image'), async (req,res) => {
    try {
        const result= await cloudinary.uploader.upload(req.file.path);
        const url= result.url;
        const man=new Blog({
            title:req.body.title,
            snippete:req.body.snippete,
            body:req.body.body,
            cloudinary_url: url
        })
            man.save()
            .then((result)=>{
                res.redirect('/blogs') ;      
            })
            .catch((err)=>{
                console.log(err);
            })
    } catch (error) {
      console.log(error);  
    }  
})

//send comment
app.post('/comment/:id',(req,res)=>{
    const id= req.params.id;
    const man = new comment({
        blogid:id,
        name: req.body.personalname,
        comment: req.body.personalcomment
    })
    man.save()
    .then(() => Blog.findById(id))
    .then((post) => {
      post.comments.unshift(man);
       post.save();
       console.log('saved to blog')
    })
    .then((result)=>{console.log('comment saved');})
    .catch((err)=>{console.log(err);})

})

//404 page
app.use((req,res)=>{
    res.status(404).render('blogs/404',{title:'error'});   
})