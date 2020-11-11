let express = require('express')
let passport = require('passport')
let router = express.Router()
let Profile = require('../models/Profile')

// POST api/profiles/add 创建信息接口 
router.post('/add', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    let profileFields = {}
    if (req.body.type) profileFields.type = req.body.type
    if (req.body.desscribe) profileFields.desscribe = req.body.desscribe
    if (req.body.incode) profileFields.incode = req.body.incode
    if (req.body.exepend) profileFields.exepend = req.body.exepend
    if (req.body.cash) profileFields.cash = req.body.cash
    if (req.body.remark) profileFields.remark = req.body.remark

    new Profile(profileFields).save().then(profile => {
        res.json(profile)
    })


})

// get api/profiles 查询所有
router.get('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Profile.find().then(profile => {
        if (!profile) {
            return res.status(404).json("没有任何内容")
        } else {
            res.json({
                data: profile
            })
        }

    }).catch(error => res.status(404).json(errpr))
})


//GET api/profiles/:id 根据id 获取单个信息
router.get('/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Profile.findOne({
        _id: req.params.id
    }).then(profile => {
        if (!profile) {
            return res.status(404).json('没有内容')
        }
        res.status(200).json({
            data: profile
        })
    }).catch(error => res.status(404).json(error))
})

// POST api/profiles/edit/:id 修改
router.post('/edit/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    let profileFields = {}
    if (req.body.type) profileFields.type = req.body.type
    if (req.body.desscribe) profileFields.desscribe = req.body.desscribe
    if (req.body.incode) profileFields.incode = req.body.incode
    if (req.body.exepend) profileFields.exepend = req.body.exepend
    if (req.body.cash) profileFields.cash = req.body.cash
    if (req.body.remark) profileFields.remark = req.body.remark

    Profile.findOneAndUpdate({
        _id: req.params.id
    }, {
        $set: profileFields
    }, {
        new: true
    }).then(profile => res.json({
        data: profile
    }))
})

// DELETE api/profiles/delete/:id 删除
router.delete('/delete/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Profile.findOneAndRemove({
        _id: req.params.id
    }).then(profile => {
        propfind.save().then(propfind => {
            res.status(200).json({
                data: "删除成功"
            })
        })
    }).catch(err => res.status(404).json(err))
})


module.exports = router