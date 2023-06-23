const express = require('express')
const router = express.Router()
const { registerUser, LoginUser, getMe, updateProfile } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', LoginUser)
router.get('/me', protect, getMe)
router.put('/me/update', protect, updateProfile)

module.exports = router