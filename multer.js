const multer= require('multer');


const uploadfile= multer.diskStorage({});
const push= multer({storage:uploadfile})

module.exports= push;