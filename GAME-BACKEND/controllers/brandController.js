const {Brand} = require('../models/models')
const ApiError = require('../error/ApiError');

class BrandController {
    async create(req, res, next) {
        const {name, description} = req.body
        const candidate1 = await Brand.findOne({where: {name}})
        const candidate2 = await Brand.findOne({where: {description}})
        if (candidate1 && candidate2) {
            return next(ApiError.internal('its description created earlier ' + name + ' ' + description))
        }
        await Brand.create({name, description})
        const brands = await Brand.findAll()
        return res.json(brands)
    }

    async getAll(req, res) {
        const brands = await Brand.findAll()
        return res.json(brands)
    }

}

module.exports = new BrandController()
