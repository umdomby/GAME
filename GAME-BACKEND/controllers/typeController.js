const {Type} = require('../models/models')
const ApiError = require('../error/ApiError');

class TypeController {
    async create(req, res, next) {
        const {name} = req.body
        console.log('name ' + name)
        const candidate = await Type.findOne({where: {name : name}})
        if (candidate !== null || name === null || name === '') {
            console.log('candidate ' + candidate)
        return next(ApiError.internal('No GAME created ' + name))
        }
        await Type.create({name})
        const types = await Type.findAll()
        return res.json(types)
    }

    async getAll(req, res) {
        const types = await Type.findAll()
        return res.json(types)
    }

}

module.exports = new TypeController()
