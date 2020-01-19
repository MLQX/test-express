//定义 /main 下路由

const express = require('express')
const router = express.Router()


router.get('/main',function (req,res) {
    res.send(' /main  下路由')
})

module.exports = router
