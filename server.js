const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const multer = require('multer') //处理文件上传
// const upload = multer({dest:'./upload/'})

//更改文件存储地址
const createFolder = function (folder) {
    try {
        fs.accessSync(folder);
    } catch (e) {
        fs.mkdirSync(folder);
    }
}
const folder = './storage'
// createFolder(folder);  //创建文件夹
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, folder);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + '-' + Date.now())
    }
})
const upload = multer({storage: storage})  //使用磁盘存储

const app = express()
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({extended: false})
app.use(jsonParser)  //json解析器
app.use(urlencodedParser) //表单解析器
app.get('/', function (req, res) {
    res.send('this is home page')
    console.log(__dirname)  //返回项目路径
})

app.get('/json', function (req, res) {
    const v = {
        method: 'post',
        name: 'simple Tom'
    }
    res.send(v)
})

app.get('/json2', function (req, res) {
    const v = [{
        method: 'post',
        name: 'simple Tom'
    }, {
        method: 'get',
        name: 'fake Jack'
    }
    ]
    res.send(v)
})
app.get('/ab?cd/:pa', function (req, res) {
    console.dir(req.params)
    res.send(req.params)
})
//post
app.post('/ff', function (req, res) {
    console.dir(req.body)
    res.send('ok')

})

// multi callback
app.get('/ff',
    function (req, res, next) {
        console.dir(req.body)
        // res.send('ok')
        next()
    },
    function (req, res) {
        res.send('ojbk')
        res.end()
    }
)


//读取文件
app.get('/form',
    function (req, res, next) {
        var fileName = './form.html'
        fs.readFile(fileName, function (err, data) {
            if (err) {
                console.log("对不起，你访问的路径出错")
            } else {
                res.write(data)
            }
            res.end()

        })
    }
)


//上传文件处理，需求：如果上传的文件大于2M或者不是图片文件，则拒绝上传，否则将其放入./upload文件夹
app.post('/form', upload.single('logo'), function (req, res) {
    console.dir(req.file)

    res.send({ret: 0})
    // console.log(__dirname)
})
app.listen(3200);
