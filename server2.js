const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const multer = require('multer') //处理文件上传
const ejs = require('ejs')
const path = require('path')


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
createFolder(folder);  //创建文件夹
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
//设置渲染模板
app.set('views', './views')
app.set('view engine', 'ejs')
//为html扩展名注册ejs
app.engine('html', ejs.renderFile)

app.use(jsonParser)  //json解析器
app.use(urlencodedParser) //表单解析器

app.use('/static', express.static(path.join(__dirname, 'static')));  // 设置静态文件目录


//使用路由中间件，简化项目结构
const indexRouter = require('./routers/index')
const mainRouter = require('./routers/main')
app.use(indexRouter)
app.use(mainRouter)




























//
// app.get('/', function (req, res) {
//     res.send('this is home page')
//     console.log(__dirname)  //返回项目路径
// })
//
// app.get('/json', function (req, res) {
//     const v = {
//         method: 'post',
//         name: 'simple Tom'
//     }
//     res.send(v)
// })
//
// app.get('/json2', function (req, res) {
//     const v = [{
//         method: 'post',
//         name: 'simple Tom'
//     }, {
//         method: 'get',
//         name: 'fake Jack'
//     }
//     ]
//     res.send(v)
// })
// app.get('/ab?cd/:pa', function (req, res) {
//     console.dir(req.params)
//     res.send(req.params)
// })
// //post
// app.post('/ff', function (req, res) {
//     console.dir(req.body)
//     res.send('ok')
//
// })
//
// // multi callback
// app.get('/ff',
//     function (req, res, next) {
//         console.dir(req.body)
//         // res.send('ok')
//         next()
//     },
//     function (req, res) {
//         res.send('ojbk')
//         res.end()
//     }
// )
//
//
// //读取文件
// app.get('/form',
//     function (req, res, next) {
//         var fileName = './form.html'
//         fs.readFile(fileName, function (err, data) {
//             if (err) {
//                 console.log("对不起，你访问的路径出错")
//             } else {
//                 res.write(data)
//             }
//             res.end()
//
//         })
//     }
// )
//
//
// //上传文件处理，需求：如果上传的文件大于2M或者不是图片文件，则拒绝上传，否则将其放入./upload文件夹
//
// app.post('/form', upload.single('logo'), function (req, res) {
//     console.dir(req.file)
//
//     res.send({ret: 0})
//     // console.log(__dirname)
// })
//
// //模板引擎 ejs
// app.get('/que/:id', function (req, res) {
//     // console.dir(req.file)
//     const id = req.params.id;
//     try {
//         const cid = parseInt(id)
//         if (!checkNum(cid)) {
//             console.log('not number')
//         }
//     } catch (e) {
//         throw new Error("输入不是数字！");
//     }
//     const file = 'hello.html';
//     const obj = {
//         name: '张三',
//         age: 18,
//         favorite: ['eating', 'chicken', 'duck']
//     }
//     // res.sendFile(file)
//     res.render(file, {obj: obj, id: id})
//     // res.send({ret: 0})
//     // console.log(__dirname)
//     // res.send({ret:0})
// });
//
// app.get('/share-views', function (req, res) {
//     const hello2 = 'hello2.html'
//     res.render(hello2)
//
// })
//
//
// app.get('/share-o-views', function (req, res) {
//     const hello3 = 'hello3.html'
//     const o = {
//         id: 3,
//         name: '伊丽莎白'
//     }
//     res.render(hello3, {o: o})
//
// })
//
//
// //测试中间件     into v1 -> into v2 -> out v2 -> out v1
// app.get("/v1",function (req,res,next) {
//     console.log("into v1")
//     next()
//     console.log("out v1")
//
// })
// app.get("/v?1",function (req,res,next) {
//     console.log("into v2")
//     next()
//     console.log("out v2")
// })
//
//
//
//
//
//
//
//
//
// /**
//  * 检测输入是否是数字
//  * @param n
//  */
// function checkNum(n) {
//     return typeof n === 'number' && !isNaN(n);
// }


app.listen(3300);

