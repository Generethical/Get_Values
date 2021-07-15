const path = require('path')
const express = require('express');
const hbs = require('hbs');
const app = express();
const port = process.env.PORT || 4000;
const getResultSingle = require('./utils/metals/metalsSingle');
const getResultDouble = require('./utils/metals/metalsDouble');
const getResultCBRdouble = require('./utils/cbr/courseCbrDouble');
const getResultNbrbSingle = require('./utils/nbrb/courseNbrbSingle');
const getResultNbrbDouble = require('./utils/nbrb/courseNbrbDouble');
const getResult = require('./utils/currentValues/course_current');

//Define paths for Express config
const directory = path.join(__dirname,"../public/");
const viewsPath = path.join(__dirname,"../templates/views")
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(directory))

app.get('/indexSingle',(req,res)=>{
    res.render('indexSingle',{
        name:'Артём Стурченко'
    })
})

app.get('/indexDouble',(req,res)=>{
    res.render('indexDouble',{
        name:'Артём Стурченко'
    })
})

app.get('/indexCbrDouble',(req,res)=>{
    res.render('indexCbrDouble',{
        name:'Артём Стурченко'
    })
})

app.get('/indexNbrbSingle',(req,res)=>{
    res.render('indexNbrbSingle',{
        name:'Артём Стурченко'
    })
})

app.get('/indexNbrbDouble',(req,res)=>{
    res.render('indexNbrbDouble',{
        name:'Артём Стурченко'
    })
})

app.get('/currentValues',(req,res)=>{
    res.render('currentValues',{
        name:'Артём Стурченко'
    })
})

app.get('/findSingle',(req,res)=>{
    if(!req.query.metal || !req.query.date){
        res.send({
            error:"You must enter a value"
        })
    }
    getResultSingle(req.query.metal,req.query.date,(obj)=>{
        res.send({
            date:obj.date,  
            LME_Cash_Settlement:obj.LME_Cash_Settlement,
            LME_3_month:obj.LME_3_month
        })
    })
})

app.get('/findDouble',(req,res)=>{
    if(!req.query.metal || !req.query.dateSingle || !req.query.dateDouble){
        res.send({
            error:"You must enter a value"
        })
    }
    getResultDouble(req.query.metal,req.query.dateSingle,req.query.dateDouble,(obj)=>{
        res.send({
            date:obj.date,  
            LME_Cash_Settlement:obj.LME_Cash_Settlement,
            LME_3_month:obj.LME_3_month
        })
    })
})

app.get('/findSingle',(req,res)=>{
    if(!req.query.metal || !req.query.dateSingle || !req.query.dateDouble){
        res.send({
            error:"You must enter a value"
        })
    }
    getResultDouble(req.query.metal,req.query.dateSingle,req.query.dateDouble,(obj)=>{
        res.send({
            date:obj.date,  
            LME_Cash_Settlement:obj.LME_Cash_Settlement,
            LME_3_month:obj.LME_3_month
        })
    })
})

app.get('/findRUB',(req,res)=>{
    if(!req.query.currency || !req.query.dateSingle || !req.query.dateDouble){
        res.send({
            error:"You must enter a value"
        })
    }
    getResultCBRdouble(req.query.currency,req.query.dateSingle,req.query.dateDouble,(obj)=>{
        res.send({
            text:obj.text,  
            currency_Name:obj.currency_Name,
            value:obj.value,
            arrayOfValues:obj.arrayOfValues
        })
    })
})

app.get('/findBynSingle',(req,res)=>{
    if(!req.query.currency || !req.query.dateSingle){
        res.send({
            error:"You must enter a value"
        })
    }
    getResultNbrbSingle(req.query.currency,req.query.dateSingle,(obj)=>{
        res.send({
            date:obj.date,  
            name:obj.name,
            value:obj.value,
        })
    })
})

app.get('/findBynDouble',(req,res)=>{
    if(!req.query.currency || !req.query.dateSingle || !req.query.dateDouble){
        res.send({
            error:"You must enter a value"
        })
    }
    getResultNbrbDouble(req.query.currency,req.query.dateSingle,req.query.dateDouble,(obj)=>{
        res.send({
            date:obj.date,  
            name:obj.name,
            value:obj.value,
            values:obj.values
        })
    })
})

app.get('/findCurrent',(req,res)=>{
    if(!req.query.value){
        res.send({
            error:"You must enter a value"
        })
    }
    getResult(req.query.value,(obj)=>{
        alert('Hello')
        res.send({
            values:obj,
        })
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'Используйте следующие ссылки для получения необходимой информации:',
        name:'Артём Стурченко',
    })
})


app.listen(port,()=>{
    console.log('Server is up on port '+port);
});