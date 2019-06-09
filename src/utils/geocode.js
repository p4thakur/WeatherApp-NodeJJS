const request=require('request')

//cpunereate a function for finding geocode from the given url
//retur the data as a callback function

const geocode=(address, callback)=>{
    //encoding require in some cases. read documentation  
    address=encodeURIComponent(address)
    const geoCodeURL='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoicDRwcmF0ZWVrIiwiYSI6ImNqdzRod3BkbTBteXg0YXMwZW83eGNwazYifQ.XJJy7GoG-4_kU39k-QAYPg'
    
    //make hhtp request to this ur and get the lang and lat in response
    request({url:geoCodeURL, json:true},(error, response)=>{
          if(error){
              callback('error while coonecting to server',undefined)
          }  
          //if could not find the location
          else if(response.body.features[0].length==0){
              callback(undefined, 'specified loaction is no available');  
          }
          //if everything went right send lan,lat ,and place name
          else{
            callback(undefined,{
                  location: response.body.features[0].place_name,
                  longitude:response.body.features[0].center[0],
                  latitude:response.body.features[0].center[1]
                }
                )

          }

    })

}


// geocode('Pune', (error, data)=>{

//   console.log("error "+ error)
//   console.log("data "+ data)
// })


module.exports=geocode