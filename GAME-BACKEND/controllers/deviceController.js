const uuid = require('uuid')
const path = require('path');
const {Device, DeviceInfo, Brand, User} = require('../models/models')
const ApiError = require('../error/ApiError');
const fs = require('fs');
const sharp = require("sharp");
const sequelize = require("../db");

async function medal() {
    try {
        const TRACKresult = await Brand.findAll({where: {name: 'NFS Most Wanted 2005'}, attributes: ['description']})
        const NFSMWresult = await Device.findAll({where: {name: 'NFS Most Wanted 2005'}})
        const USERS = await User.findAll({attributes: ['email']})

        let arrayNFSMWnoSortTRACK = []
        let sortedThreeArrayNFSMWnoSortTRACK = []
        let medalGold = []
        let medalSilver = []
        let medalBronze = []
        let medalPlatinum = []

        for (let i = 0; i < TRACKresult.length; i++) {
            arrayNFSMWnoSortTRACK = []
            for (let b = 0; b < NFSMWresult.length; b++) {
                if (TRACKresult[i].description === NFSMWresult[b].description) {
                    arrayNFSMWnoSortTRACK.push({
                        username: NFSMWresult[b].username,
                        timestate: NFSMWresult[b].timestate,
                        description: NFSMWresult[b].description
                    })
                }
            }
            sortedThreeArrayNFSMWnoSortTRACK = arrayNFSMWnoSortTRACK.sort((a, b) => Number(a.timestate.replace(/[\:.]/g, '')) - Number(b.timestate.replace(/[\:.]/g, '')));
            sortedThreeArrayNFSMWnoSortTRACK.splice(3)

            for (let i = 0; i < USERS.length; i++) {
                //console.log(USERS[i].email)
                let equals = 0
                for (let k = 0; k < sortedThreeArrayNFSMWnoSortTRACK.length; k++) {
                    if (sortedThreeArrayNFSMWnoSortTRACK[k].username === USERS[i].email) {
                        equals = equals + 1
                        //console.log(equals + ' ' + sortedThreeArrayNFSMWnoSortTRACK[k].description)
                        if (equals === 3) {
                            //console.log("Platinum " + USERS[i].email)
                            medalPlatinum.push({username: USERS[i].email})
                        }
                    }
                }
            }
            if (sortedThreeArrayNFSMWnoSortTRACK[0] !== undefined) medalGold.push(sortedThreeArrayNFSMWnoSortTRACK[0])
            if (sortedThreeArrayNFSMWnoSortTRACK[1] !== undefined) medalSilver.push(sortedThreeArrayNFSMWnoSortTRACK[1])
            if (sortedThreeArrayNFSMWnoSortTRACK[2] !== undefined) medalBronze.push(sortedThreeArrayNFSMWnoSortTRACK[2])
        }

        let countGold = []
        let countSilver = []
        let countBronze = []
        let countPlatinum = []

        for (let i = 0; i < USERS.length; i++) {
            countGold.push({
                username: USERS[i].email,
                medal: medalGold.filter(item => item.username === USERS[i].email).length
            })
        }
        for (let i = 0; i < USERS.length; i++) {
            countSilver.push({
                username: USERS[i].email,
                medal: medalSilver.filter(item => item.username === USERS[i].email).length
            })
        }
        for (let i = 0; i < USERS.length; i++) {
            countBronze.push({
                username: USERS[i].email,
                medal: medalBronze.filter(item => item.username === USERS[i].email).length
            })
        }
        for (let i = 0; i < USERS.length; i++) {
            countPlatinum.push({
                username: USERS[i].email,
                medal: medalPlatinum.filter(item => item.username === USERS[i].email).length
            })
        }

        let medalUsersFull = []

        for (let i = 0; i < USERS.length; i++) {
            medalUsersFull.push({
                username: USERS[i].email,
                gold: countGold[i].medal,
                silver: countSilver[i].medal,
                bronze: countBronze[i].medal,
                platinum: countPlatinum[i].medal
            })
        }

        for (let i = 0; i < medalUsersFull.length; i++) {
            await User.findOne({where: {email: medalUsersFull[i].username}}).then(record => {
                record.update({medal: JSON.stringify(medalUsersFull[i])}).then(updatedRecord => {
                    console.log(`updated record ${JSON.stringify(updatedRecord, null, 2)}`)
                })
            })
        }

        // console.log(countGold)
        // console.log(countSilver)
        // console.log(countBronze)
        // console.log(countPlatinum)

        console.log(medalUsersFull)

    } catch (e) {
        console.log(e)
    }
}

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
            ).then(async () => await medal())
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
            let {id, description, timestate} = req.body
            Device.findOne({where: {id: id}}).then(record => {
                if (!record) {throw new Error('No record found')} console.log(`retrieved record ${JSON.stringify(record,null,2)}`)
                let values = {timestate : timestate}
                record.update(values).then(async () => await medal())

            })
            .catch((error) => {
                    throw new Error(error)
            })

            return res.json({timestate, description})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            let {id, imgdel} = req.body

            if (fs.existsSync(path.join(__dirname, "../static/image/full/" + imgdel))) {
                fs.unlinkSync(path.join(__dirname, "../static/image/full/" + imgdel));
            }
            if (fs.existsSync(path.join(__dirname, "../static/image/small/" + imgdel))) {
                fs.unlinkSync(path.join(__dirname, "../static/image/small/" + imgdel));
            }
            await Device.destroy({
                where: {
                    id: id,
                },
            }).then(async () => await medal());
            return res.json({})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async updateLinkVideo(req, res, next) {
        try {
            let {id, linkvideo} = req.body
            Device.findOne({where: {id: id}}).then(record => {
                if (!record) {throw new Error('No record found')} console.log(`retrieved record ${JSON.stringify(record,null,2)}`)
                let values = {linkvideo : linkvideo}
                record.update(values).then(updatedRecord => {console.log(`updated record ${JSON.stringify(updatedRecord,null,2)}`)})})
                .catch((error) => {
                    throw new Error(error)
                })
            return res.json('devices Update linkvideo')
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
