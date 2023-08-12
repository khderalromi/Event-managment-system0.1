const mongoose=require('mongoose');
const cardShema=mongoose.Schema({
    imagepath: {
        type: String,
        required:true,
    },
    
});

module.exports=mongoose.model('card', cardShema);