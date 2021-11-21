const request=require("request")
const forcast=(latitude,longitude,callback)=>{
    const url="http://api.weatherstack.com/current?access_key=af30c8dabbcc2646502c2551016a6514&query="+latitude+","+longitude

    request({url:url,json:true},(error,response)=>{
        if(error)
        {
            callback('Unable to connect weather app',undefined)
        }
        else if(response.body.error){
            callback("unable to find location",undefined)
        }
        else{
            callback(undefined,"It is currently "+response.body.current.temperature+",but feels like "+response.body.current.feelslike+" now.")
                }
    })

}

module.exports=forcast