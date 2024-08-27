const uuid = require('uuid')
const path = require('path');
const {Device, DeviceInfo, Brand, User} = require('../models/models')
const ApiError = require('../error/ApiError');
const fs = require('fs');
const sharp = require("sharp");

class DeviceController {
    async create(req, res, next) {
        try {
            let {name, username, description, timestate, linkvideo} = req.body
            const {img} = req.files

            if ((img.size / (1024 * 1024)) > 1) {
                return next(ApiError.badRequest('Download file < 1 mb'))
            }

            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static/image/full', fileName)).then(async (e) =>
                await sharp(path.join(__dirname, '..', 'static/image/full/', fileName))
                    .resize(100)
                    .toFile( path.join(__dirname, '..', 'static/image/small/', fileName))
            )
            const device = await Device.create({name, username, description, timestate, linkvideo, img: fileName});
            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async updateFile(req, res, next) {
        try {
            let {id, imgdel} = req.body
            console.log(imgdel)
            const {file} = req.files
            if ((file.size / (1024 * 1024)) > 1) {
                return next(ApiError.badRequest('Download file < 1 mb'))
            }
            if (fs.existsSync(path.join(__dirname, "../static/image/full/" + imgdel))) {
                fs.unlinkSync(path.join(__dirname, "../static/image/full/" + imgdel));
            }
            if (fs.existsSync(path.join(__dirname, "../static/image/small/" + imgdel))) {
                fs.unlinkSync(path.join(__dirname, "../static/image/small/" + imgdel));
            }
            let fileName = uuid.v4() + ".jpg"
            file.mv(path.resolve(__dirname, '..', 'static/image/full', fileName)).then(async (e) =>
                await sharp(path.join(__dirname, '..', 'static/image/full/', fileName))
                    .resize(100)
                    .toFile( path.join(__dirname, '..', 'static/image/small/', fileName))
            )
            Device.findOne({where: {id: id}}).then(record => {
                if (!record) {throw new Error('No record found')} console.log(`retrieved record ${JSON.stringify(record,null,2)}`)
                let values = {img : fileName}
                record.update(values).then(updatedRecord => {console.log(`updated record ${JSON.stringify(updatedRecord,null,2)}`)})})
                .catch((error) => {
                    throw new Error(error)
                })
            return res.json('devices Update File')
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async updateTimestate(req, res, next) {
        try {
            let {id, timestate} = req.body
            Device.findOne({where: {id: id}}).then(record => {
                if (!record) {throw new Error('No record found')} console.log(`retrieved record ${JSON.stringify(record,null,2)}`)
                let values = {timestate : timestate}
                record.update(values).then(updatedRecord => {console.log(`updated record ${JSON.stringify(updatedRecord,null,2)}`)})})
            .catch((error) => {
                    throw new Error(error)
            })
            return res.json('devices Update Timestate')
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async  getDevicesUsername(req, res) {
        const {username} = req.query
        //console.log('username ' + username)
        const devicesUsername = await Device.findAll({
            where: {
                username : username
            }})
        return res.json(devicesUsername)
    }

    async getAll(req, res) {
        let {typeName, brandName, limit, page} = req.query
        let offset = page * limit - limit
        let devices;
        if (!typeName && !brandName) {
            devices = await Device.findAndCountAll({limit, offset, order: [['timestate']]})
            //
        }
        if (typeName && !brandName) {
            devices = await Device.findAndCountAll({where:{name : typeName}, limit, offset, order: [['timestate']]})
            console.log('devices ' + devices)
        }
        if (!typeName && brandName) {
            devices = await Device.findAndCountAll({where:{description : brandName}, limit, offset, order: [['timestate']]})
        }
        if (typeName && brandName) {
            devices = await Device.findAndCountAll({where:{name : typeName, description : brandName}, limit, offset, order: [['timestate']]})
        }
        return res.json(devices)
    }
    async getOne(req, res) {
        const {id} = req.params
        const device = await Device.findOne(
            {
                where: {id},
                include: [{model: DeviceInfo, as: 'info'}]
            },
        )
        return res.json(device)
    }
}

module.exports = new DeviceController()
