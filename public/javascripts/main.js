
 var intervailId=setInterval(() =>
{
         let userEmail=getCookie('myprofile');
         if (userEmail==undefined)
         {
                 document.querySelector(".profile").remove()
         }
        else if (userEmail!=undefined&&userEmail!="")
                {
                document.querySelector(".profile").innerHTML=userEmail;
                document.querySelector(".get_start").remove();
                clearInterval(intervailId);
                }

 }, 1000)

function getCookie(name)
{
        var cookieArr=document.cookie.split(";")
        for (i=0;i<cookieArr.length;i++)
        {
                var cookiePair=cookieArr[i].split("=");
                if (name==cookiePair[0].trim())
                {
                        const mycookiePair=cookiePair[1].slice(cookiePair[1].indexOf("."),cookiePair[1].indexOf("%40"))
                        return mycookiePair
                }
        }
}
let header_useremail=document.querySelector(".profile");
console.log(header_useremail.value)

 


/*
 setInterval(function one()
{
        if (header_useremail.value='')
        {

                let userEmail=getCookie('myprofile');
                if (userEmail.value !=undefined && userEmail.value!="")
                {
                        document.querySelector(".profile").innerHTML=userEmail;
                        document.querySelector(".get_start").remove();
                }
        }        

},1000)

*/