const express=require("express")
const path=require("path")
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forcast')
const forcast = require("./utils/forcast")

const app=express()

//Define path
const publicDirectoryPath=path.join(__dirname,'../public')
const partialsPath=path.join(__dirname,"../templates/partials")
const viewPath= path.join(__dirname, '../templates/views')


app.set('views',viewPath);
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))


// app.get('',(req,res)=>{
//     res.send('hello express')
// })

// app.get('/help',(req,res)=>{
//     res.send('help page')
// })

// app.get('/about',(req,res)=>{
//     res.send('About page')
// })
app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather",
        name:"Arshil"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About",
        name:"Arshil"
    })
})

app.get('/help',(req,res)=>{
    res.render('about',{
        title:"Help",
        name:"Arshil"
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'you must provide an address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location})=>{
        if(error){
            return res.send({error})
        }
        forcast(latitude,longitude,(error,forecasteData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecasteData,
                location,
                address:req.query.address
            })
        })
    })
    // res.send({
    //     forecast:'It is snowing',
    //     location:'Barwaha',
    //     address:req.query.address
    // })
})
app.get('/product',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"ypu must provide a search tearm"
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:"Error Page 404",
        name:"Arshil",
        errormessage:"Page Not Found"

    })
})


app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})