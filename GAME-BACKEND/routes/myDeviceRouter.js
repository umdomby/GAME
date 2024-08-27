const Router = require('express')
const router = new Router()
const myDeviceController = require('../controllers/myDeviceController')


router.get('/', myDeviceController.getMyAll)

module.exports = router
