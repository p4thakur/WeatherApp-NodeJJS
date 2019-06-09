const express= require('express')
const path=require('path')
const hbs=require('hbs')
const forecast=require('./utils/forecast')
const geocode=require('./utils/geocode')
const app= express()

//let define path for express config locattion
const publicDir= path.join(__dirname,'../public')
const pathToView= path.join(__dirname,'../modular/views')
const pathToPartial=path.join(__dirname,'../modular/partials')

app.use(express.static(publicDir))

//set handlebar engine and view loactions
app.set('view engine', 'hbs')
app.set('views', pathToView)
hbs.registerPartials(pathToPartial)

//now this ' ' will not be my default page. By default page is changed to the public
//directory. so lets remove it..
/** 
app.get('', (req, res)=>{
     res.send('server is up')

})
**/
//this will detect index.hbs file if i removed index.html(because index file are default file)
app.get('', (req,res)=>{

    res.render('index',{
        welcome: 'welcome',
        title:'Portfolio',
        name:'Prateek'

    })
})
app.get('/help', (req,res)=>{

    res.render('help',{
        helpText:'Please check my wiki page',
        name:'Prateek',
        title:'Help'
    })
})

app.get('/about',(req, res)=>{
  
     res.render('about',{
         name:'Prateek',
         contact:'abc@gmail.com',
         title:'About'
           
     })
})


app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            errors: 'You must provide an address'
        })
        //return
    }
    
    geocode(req.query.address , (error, {latitude, longitude, location})=>{

        if(error){
            res.send({error}) //utilizing destructuring
        }
        else{
          
            forecast(longitude, latitude, (error, forecastdata)=>{
                if(error){
                    return res.send({error})
                }

                res.send({
                    forecast: forecastdata,
                    location,
                    address: req.query.address
                })

            })

        }
    })
    // //alse send the forecast ,loaction and address
    // res.send({
    //     forecast:'Its raining',
    //     location: 'Bengluru',
    //     Address: req.query.address
    // })
})

app.get('/help/*',(req,res)=>{
   
      res.render('404',{

        title: '404',
        name:'Prateek',
        errorMessage:'Help page not found'
      })
})
//utilizing qyery string
app.get('/Products',(req,res)=>{
   if(!req.query.search){
       //than send the response saying that u didnot specied nay search option
       return res.send('No search filter is provied')
   }

   res.send('Prodcut available is '+ req.query.search)
})

app.get('*',(req,res)=>{
    //res.send('404 page found');
    res.render('404',{
        title: '404',
        name:'Prateek',
        errorMessage: 'page not found'
    })
})

app.listen(3000, ()=>{

    console.log('server is runninng on port 3000')
})

/** section 7 43 44 45
const express= require('express')

const app= express()



app.get('', (req, res)=>{
     res.send('server is up')

})

app.get('/help', (req,res)=>{

    res.send('<h1>Help</h1>')
})

app.get('/about',(req, res)=>{
  
   res.send('<b>About</b>')
})


app.get('/weather', (req, res)=>{
    res.send({
        forecast:'rainy',
        location:'Pune'
    })
})
app.listen(3000, ()=>{

    console.log('server is runninng on port 3000')
})
**/