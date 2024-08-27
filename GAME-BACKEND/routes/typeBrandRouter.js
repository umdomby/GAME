const Router = require('express')
const router = new Router()
const typeBrandController = require('../controllers/typeBrandController')
const checkRole = require('../middleware/checkRoleMiddleware')

// router.post('/', checkRole('ADMIN'), typeBrandController.create)
//router.post('/', typeBrandController.findAll)


router.get('/', typeBrandController.findAll)

module.exports = router
