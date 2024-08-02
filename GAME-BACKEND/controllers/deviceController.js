const uuid = require('uuid')
const path = require('path');
const {Device, DeviceInfo, Brand, User} = require('../models/models')
const ApiError = require('../error/ApiError');

const fs = require('fs');
// const dns = require('dns');
// const os = require('os');

class DeviceController {
    async create(req, res, next) {
        try {
            let {name, username, description, timestate, linkvideo} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const device = await Device.create({name, username, description, timestate, linkvideo, img: fileName});
            return res.json(device)
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

    async updateFile(req, res, next) {
        try {
            let {id, imgdel} = req.body
            console.log(imgdel)
            const {file} = req.files
            if (fs.existsSync(path.join(__dirname, "../static/" + imgdel))) {
                console.log('yes======================================')
                fs.unlinkSync(path.join(__dirname, "../static/" + imgdel));
            }
            let fileName = uuid.v4() + ".jpg"
            file.mv(path.resolve(__dirname, '..', 'static', fileName))

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

    // async update(req, res, next) {
    //     try {
    //         let arr = []
    //         arr = req.body
    //         for(let i = 0; i < arr.length; i++){
    //             Device.findOne({where: {id: arr[i].id}}).then(record => {
    //                 if (!record) {
    //                     throw new Error('No record found')
    //                 }
    //                 console.log(`retrieved record ${JSON.stringify(record,null,2)}`)
    //                 let values = {
    //                     timestate : arr[i].timestate
    //                 }
    //                 record.update(values).then( updatedRecord => {
    //                     console.log(`updated record ${JSON.stringify(updatedRecord,null,2)}`)
    //                 })
    //             }).catch((error) => {
    //                 throw new Error(error)
    //             })
    //         }
    //         return res.json('devices Updates')
    //     } catch (e) {
    //         next(ApiError.badRequest(e.message))
    //     }
    // }


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

        // const ipreg =  req.socket.remoteAddress
        // const ipreg2  = req.headers['x-forwarded-for']
        // const ipreg3  =  req.headers["x-real-ip"]
        // const ipreg4  = req.connection.remoteAddress
        //
        // console.log('ipreg '  + ipreg)
        // console.log('ipreg2 '  + ipreg2)
        // console.log('ipreg3 '  + ipreg3)
        // console.log('ipreg4 '  + ipreg4)
        //
        //
        // const localIP = Object.values(os.networkInterfaces())
        //     .flat()
        //     .find(iface => iface.family === 'IPv4' && !iface.internal)
        //     ?.address;
        // console.log('Локальный IP-адрес:', localIP)

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
        //let sort = []
        //let sort = [...devices.rows].sort((a, b) => Number(a.timestate.replace(/[\:.]/g, '')) - Number(b.timestate.replace(/[\:.]/g, '')))
        //console.log(sort)
        //let count = devices.count

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
