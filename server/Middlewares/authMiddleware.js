const { promisify } = require('util')
const jwt = require('jsonwebtoken')
const User = require('../Models/userModel')
const AppError = require('../Utils/appError')
const catchAsync = require('../Utils/catchAsync')
const mongoose = require('mongoose')
const { isJWT } = require('validator')

const protect = catchAsync(async (req, res, next) => {
    let token
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1]
    }
    else if (req.headers.authorization) {
        token = req.headers.authorization.split(' ')[1]
    }

    if (!isJWT(token)) return next(new AppError('Token is not valid use valid token or sign in again', 401))

    if (!token) {
        return next(new AppError('You can not logged in. first log in and try again.', 403))
    }

    const decoded = (jwt.verify)(token, process.env.JWT_SECRET)

    const currentUser = await User.findById(mongoose.Types.ObjectId(decoded.id))

    if (!currentUser) {
        return next(new AppError('user belonging to this token does no longer exist.', 401))
    }

    req.user = currentUser
    req.body.userId = currentUser._id

    next()
})

const signupMiddleware = async (req, res, next) => {
    const missingValues = []
    if (!req.body.firstName) missingValues.push('Provide First Name')
    if (!req.body.lastName) missingValues.push('Provide Last Name')
    if (!req.body.userName) missingValues.push('Provide User Name')
    if (!req.body.email) missingValues.push('Provide Email')
    if (!req.body.phone) missingValues.push('Provide Phone Number')
    if (!req.body.password) missingValues.push('Provide Password')
    if (!req.body.passwordConfirm) missingValues.push('Provide Password Confirm')

    if (missingValues.length > 0) return next(new AppError(`requird missing values : ${missingValues}`, 400))

    if (req.body.password !== req.body.passwordConfirm) {
        return next(new AppError('Password and Password Confirm are not match', 400))
    }

    const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/
    if (!emailRegex.test(req.body.email)) {
        return next(new AppError('Enter valid Email Address', 400))
    }

    if ('number' !== typeof (req.body.phone)) {
        return next(new AppError('Phone Number is Must be a number', 400))
    }

    const phoneRegex = /^[9876]+[0-9]{9}$/
    if (!phoneRegex.test(req.body.phone)) {
        return next(new AppError('Enter valid Phone number. Mobile number always start with 6, 7, 8 and 9 and must be a 10 digit', 400))
    }

    next()
}

const signinMiddleware = async (req, res, next) => {
    const missingValue = []
    if (!req.body.userName) missingValue.push('Provide User Name')
    if (!req.body.password) missingValue.push('Provide password')

    if (missingValue.length > 0) return next(new AppError(`requird missing values: ${missingValue}`, 400))

    next()
}

module.exports = {
    protect,
    signupMiddleware,
    signinMiddleware
}