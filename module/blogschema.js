const mongoose=require('mongoose');
const schema= mongoose.Schema;

const blogschema= new schema({
  
title:{
    type : String,
   required: true
},
snippete:{
    type: String,
    required: true
},
body:{
type: String,
required: true
},
cloudinary_url:{
    type: String,
    required: true

},
comments:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"comment"
    
}]


},{timestamps:true});

const library= mongoose.model('libraries',blogschema);
module.exports =library;