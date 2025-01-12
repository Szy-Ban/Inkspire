const rateLimit = require('express-rate-limit').default;

const loginLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 5,
    message: "Too many login attempts. Please try again later!",
})

module.exports = loginLimiter