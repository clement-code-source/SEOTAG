const express=require('express')
const router=express.Router()
const result=require('../controllers/controllers.Aivalidation')


router.put('/ai/category',result)

module.exports=router