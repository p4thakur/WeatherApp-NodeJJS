console.log('client side js file is loaded')



//fetch form and input object from the index.html
const weatherForm= document.querySelector('form')
const search= document.querySelector('input')
//paragrph object to display our result
const messageOne= document.querySelector('#message-1')
const messageTwo= document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e)=>{
  //prevent default behavior of browser so that, it won't load repeatidly
   e.preventDefault()
   //fetch the value from nput text
   const location=search.value
   messageOne.textContent="Loading...."
   messageTwo.textContent='' 
   // I can use http://localhost:3000/weather?address= if port num is staic, but it
   //won't be the case when i deploy my app to  heroku. so I will use below format
   fetch('/weather?address='+location).then((response)=>{

    response.json().then((data)=>{

       if(data.error){
           //console.log(data.error)
           messageOne.textContent=data.error
       }
       else{
            messageOne.textContent=data.location
            messageTwo.textContent=data.forecast
        //    console.log(data.location);
        //    console.log(data.forecast);
       }
    })
})

})

/** Lecture 57 learning fetch API
//fetch is used at client side JS not at nodeside
fetch('http://localhost:3000/weather?address=pune').then((response)=>{

     response.json().then((data)=>{

        if(data.error){
            console.log(data.error)
        }
        else{

            console.log(data.location);
            console.log(data.forecast);
        }
     })
})
***/