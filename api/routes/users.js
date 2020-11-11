//  登陆注册内容·
let bcrypt = require('bcrypt')
let express = require('express')
let router = express.Router()
let User = require("../models/Users")
//  GET api/users/test 公开的接口
router.get('/test', (req, res) => {
    res.json({
        msg: '123456789'
    })
})

// POST api/users/register 
router.post('/register', (req, res) => {
    // console.log(req.body.email);
    //查看数据库是否拥有Email信息
    User.findOne({
            email: req.body.email
        })
        .then(user => {
            if (user) {
                return res.status(400).json({
                    msg: "邮箱已注册"
                })
            } else {
                let newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    // avatar,
                })
                //对密码进行加密
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err
                        newUser.password = hash
                        newUser.save().then(user => {
                            res.json(user)
                        }).catch(err => console.log(err))

                    });
                });
            }
        })
})

module.exports = router