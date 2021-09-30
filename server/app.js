require('dotenv').config()
const express = require('express')
const app = express();
const port = process.env.PORT || 3000;
// const cors = require('cors')


app.use(express.urlencoded({extended:true}))
app.use(express.json());
// app.use(cors())

const routes = require('./routes');
app.use(routes)

app.listen(port,()=>{
    console.log('Connect in port: ',port)
})