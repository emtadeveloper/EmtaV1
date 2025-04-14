// config/passport.js
const LocalStrategy = require('passport-local').Strategy;
const speakeasy = require('speakeasy');
const User = require('../models/user');
const redisClient = require('./db/db.redis');

module.exports = function (passport) {
    passport.use(new LocalStrategy(
        {
            usernameField: 'username',
            passReqToCallback: true
        },
        async (req, username, password, done) => {
            try {
                const user = await User.findOne({ username });
                if (!user) return done(null, false, "userNotFound");

                const isMatch = await user.comparePassword(password);
                if (!isMatch) return done(null, false, "password");

                const otpSecret = speakeasy.totp({
                    secret: speakeasy.generateSecret().base32,
                    encoding: 'base32',
                    digits: 6
                });

                await redisClient.set(`otp:${user._id}`, otpSecret, 'EX', 30000);

                return done(null, { otp: otpSecret, phone: user.phone, email: user.email });

            } catch (error) {
                return done(error);
            }
        }
    ));
};
