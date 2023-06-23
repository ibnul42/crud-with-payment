const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, gender, birthDate } = req.body

    // check if all fields are inputed
    if (!name || !email || !password || !gender || !birthDate) {
        res.status(404)
        throw new Error('Please enter all fields')
    }

    const userExists = await User.findOne({ email })

    // check if the user exists
    if (userExists) {
        res.status(404)
        throw new Error('User already Exist')
    }

    // hash the password
    const solt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, solt)

    // create a new user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        gender,
        birthDate,
        subscription: false
    })

    if (user) {
        res.status(201)
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            gender: user.gender,
            birthDate: user.birthDate,
            subscription: user.subscription,
            token: generateToken(user._id)
        })
    } else {
        res.status(404)
        throw new Error('Invalid user data')
    }
})

const LoginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        res.status(404)
        throw new Error('Invalid credentials')
    }

    const user = await User.findOne({ email })
    if (!user) {
        res.status(404)
        throw new Error('Invalid credentials')
    }

    if (email && (await bcrypt.compare(password, user.password))) {
        res.status(200)
        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            birthDate: user.birthDate,
            gender: user.gender,
            subscription: user.subscription,
            token: generateToken(user._id)
        })
    } else {
        res.status(404)
        throw new Error('Invalid credentials')
    }
})

const getMe = asyncHandler(async (req, res) => {
    res.json({
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        birthDate: req.user.birthDate,
        gender: req.user.gender,
        subscription: req.user.subscription
    })
})

const updateProfile = asyncHandler(async (req, res) => {
    const { id, name, email, password, newPassword, gender, birthDate } = req.body

    // check if id is available
    if (!id) {
        res.status(404)
        throw new Error('Invalid User')
    }

    // check if all fields are inputed
    // if (!name || !email || !password || !gender || !birthDate) {
    //     res.status(404)
    //     throw new Error('Please enter all fields')
    // }

    const userExists = await User.findOne({ email })

    // check if the user exists
    if (!userExists) {
        res.status(404)
        throw new Error('Invalid User')
    }

    // check if password is correct
    // const checkPassword = await bcrypt.compare(password, userExists.password)
    // if (!checkPassword) {
    //     res.status(404)
    //     throw new Error('Wrong password!')
    // }

    // hash the password
    // const solt = await bcrypt.genSalt(10)
    // const hashedPassword = await bcrypt.hash(newPassword ? newPassword : password, solt)

    // update the profile
    const updatedProfile = await User.findByIdAndUpdate(id, {
        name,
        // email,
        // password: hashedPassword,
        gender,
        birthDate
    })

    if (updatedProfile) {
        const user = await User.findOne({ email })
        res.status(200)
        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            gender: user.gender,
            birthDate: user.birthDate,
            subscription: user.subscription,
            token: generateToken(user._id)
        })
    }
})



// generate token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    })
}

module.exports = {
    registerUser,
    LoginUser,
    getMe,
    updateProfile
}