//定义 / 下路由

const express = require('express')
const router = express.Router()


router.get('/',function (req,res) {
    res.send(' /  下路由')
})
module.exports= router
