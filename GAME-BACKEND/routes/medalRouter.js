const Router = require('express')
const router = new Router()
const deviceMedalController = require('../controllers/deviceMedalController')
const checkEmail = require('../middleware/emailMiddleware')

router.post('/', deviceMedalController.medal)

module.exports = router