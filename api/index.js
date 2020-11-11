let express = require('express')
let mongoose = require('mongoose')
let bodyParser = require('body-parser')
let db = require('./config/keys')
let users = require('./routes/users')
let app = express()
//body-parser 中间件
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());

//支持跨域
let allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS,DELETE')
    next()
}
app.use(allowCrossDomain)


// 挂载路由
app.use('/test', users)
app.use("/api/users", users)


let port = process.env.PORT || 5000
// 链接mongoDB 成功
mongoose.connect(db.mongoURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log('数据库链接成功');
}).catch(error => {
    console.log("数据库连接失败" + error);
})

app.listen(port, () => {
    console.log(`启动端口号${port}`);
})