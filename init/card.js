const mongoose=require('mongoose');
mongoose.connect('mongodb://0.0.0.0:27017',{UseNewUrlParser:true}).then(() =>
{
  console.log("connection successfully ")
});
const card=require('../models/cardshema');
const cards=[new card({
    imagepath: '/images/three.jpg',
    
}),
new card({
    imagepath: '/images/six.jpg',
    
}),
new card({
    imagepath: '/images/tow.jpg',
    
}),
new card({
    imagepath: '/images/four.jpg',
    
}),
new card({
    imagepath: '/images/five.jpg',
    
}),

];

var done=0;
for (var i=0;i<cards.length;i++)
{
    
    
    cards[i].save().then((doc,error) =>
    {
        if (error)
        {
            console.log('errooorr')
            console.log(error);
        
        } else
        {
            console.log('saved');
            console.log(doc);
            
            done++;
        };
        
        if (done===cards.length)
        {
            
            mongoose.disconnect()
        }
    })
};
