const mongoose= require('mongoose');
const schema= mongoose.Schema;
const commentschema= new schema({

    blogid:{
        type:String
    },
    name:{
        type:String,
    },
    comment:{
        type:String  
    }

})
const comment= mongoose.model('comment',commentschema);
module.exports= comment;