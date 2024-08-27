const {Brand} = require('../models/models')
const ApiError = require('../error/ApiError');

class TypeBrandController {

    // async create(req, res) {
    //     const {name} = req.body
    //     const type = await Type.create({name})
    //     return res.json(type)
    // }

    // async getAll(req, res) {
    //     const brands = await Brand.findAll()
    //     return res.json(brands)
    // }


    async findAll(req, res) {
        let {name} = req.query
        console.log(name)
        const brands = await Brand.findAll({
            where: {
                name
            },
        })
        console.log('brands ' + brands)
        return res.json(brands)
    }

}

module.exports = new TypeBrandController()