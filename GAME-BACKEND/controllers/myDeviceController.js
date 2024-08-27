const uuid = require('uuid')
const path = require('path');
const {Device, DeviceInfo, Brand} = require('../models/models')
const ApiError = require('../error/ApiError');

class MyDeviceController {
    async getMyAll(req, res) {
        let {name} = req.query
        console.log('name name ' + name)
        const devices = await Device.findAll({
            where: {
                username: name
            },
        })
        //console.log(devices)
        return res.json(devices)
    }
}

module.exports = new MyDeviceController()
