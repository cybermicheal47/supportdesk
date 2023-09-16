const express = require('express')
const router = express.Router()
const {registereduser,loginuser, getme} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')
router.post('/', registereduser)

router.post('/login', loginuser)
router.get('/me',protect, getme)

module.exports = router;