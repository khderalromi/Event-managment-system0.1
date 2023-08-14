const mongoose=require("mongoose")
mongoose.connect('mongodb+srv://khder:khder0994454280@cluster0.ng1tbmc.mongodb.net/mydatabase').then(() =>
  {
    console.log('connectdb')
  }).catch(() =>{
    console.log('unable to connect')
  })
