const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const userShema=mongoose.Schema({
    email: {
        type: String,
        required:true,
    },
    password: {
        type: String,
        required:true,
    }
    
});
userShema.methods.hashPassword=function (password)
{
    const salt=5;
    const passwordToString=password.toString();
    return bcrypt.hashSync(passwordToString,salt)
}

userShema.methods.comparePassword=function (password)
{
    return bcrypt.compareSync(password,this.password)
}

module.exports=mongoose.model('User', userShema);