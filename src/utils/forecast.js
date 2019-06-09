const request=require('request')


const forecast=(longitude, latitude, callback)=>{

    const url='https://api.darksky.net/forecast/f5d13813bad2de452b0905b122775bfc/'+longitude+','+latitude

    request({url:url , json:true}, (error, response)=>{

        if(error){
            callback('unable to connect to the weather service', undefined)
        }
        else if(response.body.error){
            callback('Unable to find location', undefined)
        }
        else{

           callback(undefined, response.body.daily.data[0].summary); 
        }
    })
}

module.exports=forecast