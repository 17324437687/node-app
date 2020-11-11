//  登陆注册内容·
let bcrypt = require('bcrypt')
let express = require('express')
let gravatar = require("gravatar")
let jwt = require('jsonwebtoken')
let passport = require('passport')
let router = express.Router()
let User = require("../models/Users")
let keys = require('../config/keys')

//  GET api/users/test 公开的接口
router.get('/test', (req, res) => {
    res.json({
        msg: '123456789'
    })
})

// POST api/users/register 注册
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
                let avatar = gravatar.url(req.body.email, {
                    s: '200',
                    r: 'pg',
                    d: 'mm'
                });
                let newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    identity: req.body.identity, //角色登录
                    avatar, //头像
                })
                //对密码进行加密
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) {
                            console.log(err);
                        }
                        newUser.password = hash
                        newUser.save().then(user => {
                            res.json({
                                user,
                                toke
                            })
                        }).catch(err => console.log(err))

                    });
                });

            }
        })
})

// POST api/users/login 登录
router.post('/login', (req, res) => {
    let email = req.body.email
    let password = req.body.password
    //查看数据库是否拥有Email信息
    User.findOne({
            email: req.body.email
        })
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    msg: "用户不存在"
                })
            }
            //  密码匹配 
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        let rule = {
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar,
                            identity: user.identity
                        }
                        jwt.sign(rule, keys.secretOrKe, {
                            expiresIn: 80000000
                        }, (err, token) => {
                            if (err) throw err
                            res.json({
                                success: true,
                                token: "Bearer " + token
                            })
                        })
                    } else {
                        return res.status(400).json({
                            password: '密码错误'
                        })
                    }
                })

        })
})


//GET api/users/current 需要返回totken才能访问
router.get('/current', passport.authenticate("jwt", {
    session: false
}), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar,
        identity: req.user.identity
    })
})
module.exports = router