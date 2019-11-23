require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const app = express()

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true , useUnifiedTopology: true })
const db = mongoose.connection
db.on('error',(error)=> console.log(error))
db.once('open',()=> console.log('Successful connected to database'))

app.use(express.json())

//Define views engine
app.set('views', './views');
app.set('view engine', 'pug');

const userRouter = require('./routes/user')
app.use('/user',userRouter)

const port = process.env.PORT
app.listen(port, () => console.log('Server Started on port:',port))
