const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

const category = require('./routes/routes.Airequest')


mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('MongoDB is connected successfully')
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err)
  })

app.use('/api', category)

app.listen(process.env.PORT, () => {
  console.log(`The server is running on port ${process.env.PORT}`)
})