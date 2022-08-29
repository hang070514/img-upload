const Koa = require('koa')
const Router = require('koa-router')
const koaBody = require('koa-body')
const cors = require('koa2-cors')
const serve = require('koa-static')
const path = require('path')
const multer = require('@koa/multer')
const fs = require('fs')

const router = new Router()
const app = new Koa()

let imgUrl = ''
const imgUrlList = []

const storage = multer.diskStorage({
    // destination 用来确定上传的文件应该存储在哪个文件夹中
    destination: function (req, file, cb) {
        cb(null, './upload')
    },
    // 用于确定文件夹中的文件名的确定
    filename: function (req, file, cb) {
        const fileFormat = (file.originalname).split('.')
        // const url = Date.now() + '.' + fileFormat[fileFormat.length - 1]
        const url = file.originalname
        if (file.fieldname === 'avatar') {
             imgUrlList.push(`http://localhost:3001/${url}`)
        } else {
             imgUrl = url
        }
        console.log('imgUrl====', imgUrl)
        cb(null, url)
    }
})
const upload = multer({ storage })
router.get('/',async (ctx) => {
    ctx.type = 'html'
    ctx.body = '<h2>hello  world</h2>'
})
router.post(
    '/upload-multiple-files',
    upload.fields([
        {
            name: 'avatar',
            maxCount: 3
        },
        {
            name: 'boop',
            maxCount: 2
        }
    ]),
    (req,res)=> {
         // console.log('res', res.body)
         // console.log('req', req)
        req.body = {
            status: 200,
            url: imgUrlList,
            message: '成功'
        }
    }
)

router.post('/upload', upload.single('img'), async (ctx) => {
    // console.log('ctx.file', ctx.file)
    // console.log('ctx', ctx)
    ctx.body = {
        status: 200,
        url: `http://localhost:3001/${imgUrl}`,
        message: '成功'
    }
})

router.post('/login', function(ctx){
    console.log('ctx====', ctx.params, ctx.query)
    console.log('ctx.request.body', ctx.request.body)
    let params = ctx.request.body
    if (params.username === 'admin' && params.password === 123456) {
        ctx.body = {
            code: 200,
            data: {},
            msg: '登录成功'
        }
    } else {
        ctx.body = {
            code: 400,
            data: {},
            msg: '用户名或者密码不正确'
        }
    }
})

function readFile(filePath) {
    fs.readdir(filePath, (err, files) => {
        files.forEach((filename) => {
            console.log('filename====', filename, path.join(filePath, filename))
            fs.unlinkSync(path.join(filePath, filename))
        })
    })
}
readFile(path.resolve('./upload'))
app.use(koaBody())
    .use(router.routes())
    .use(router.allowedMethods())
    .use(serve(path.join(__dirname,'./upload')))


app.on('error', (err, ctx) => {
    console.log(new Date(), ':',err)
})
app.listen(3001, () => {
    console.log('应用已经启动  http://localhost:3001')
})
