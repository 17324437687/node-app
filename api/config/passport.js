let JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

let mongoose = require('mongoose')
let user = mongoose.model("Users")
let keys = require('../config/keys');
const Users = require('../models/Users');

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKe;


module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id).then(user => {
            if (user) {
                return done(null, user)
            }
            return done(null, false)
        }).catch(err => console.log(err))

    }))

}