require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')
const {Device, Brand, User} = require("./models/models");

const PORT = 5001

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)
// Обработка ошибок, последний Middleware
app.use(errorHandler)

const updata = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()

        const TRACKresult = await Brand.findAll({where: {name: 'NFS Most Wanted 2005'}, attributes: ['description']})
        const NFSMWresult = await Device.findAll({where: {name: 'NFS Most Wanted 2005'}})
        const USERS = await User.findAll({attributes: ['email']})

        let arrayNFSMWnoSortTRACK = []
        let sortedThreeArrayNFSMWnoSortTRACK = []
        let medalGold = []
        let medalSilver = []
        let medalBronze = []
        let medalPlatinum = []

        for(let i = 0; i < TRACKresult.length  ; i++){
            arrayNFSMWnoSortTRACK = []
            for(let b = 0; b < NFSMWresult.length ; b++) {
                if(TRACKresult[i].description === NFSMWresult[b].description) {
                    arrayNFSMWnoSortTRACK.push({username: NFSMWresult[b].username, timestate: NFSMWresult[b].timestate, description: NFSMWresult[b].description})
                }
            }
            sortedThreeArrayNFSMWnoSortTRACK = arrayNFSMWnoSortTRACK.sort((a, b) => Number(a.timestate.replace(/[\:.]/g, '')) - Number(b.timestate.replace(/[\:.]/g, '')));
            sortedThreeArrayNFSMWnoSortTRACK.splice(3)

            for(let i = 0; i < USERS.length  ; i++){
                //console.log(USERS[i].email)
                let equals = 0
                for(let k = 0; k < sortedThreeArrayNFSMWnoSortTRACK.length  ; k++){
                    if (sortedThreeArrayNFSMWnoSortTRACK[k].username === USERS[i].email) {
                        equals = equals + 1
                        //console.log(equals + ' ' + sortedThreeArrayNFSMWnoSortTRACK[k].description)
                        if(equals === 3) {
                            //console.log("Platinum " + USERS[i].email)
                            medalPlatinum.push({username: USERS[i].email})
                        }
                    }
                }
            }
            if(sortedThreeArrayNFSMWnoSortTRACK[0] !== undefined)   medalGold.push(sortedThreeArrayNFSMWnoSortTRACK[0])
            if(sortedThreeArrayNFSMWnoSortTRACK[1] !== undefined)   medalSilver.push(sortedThreeArrayNFSMWnoSortTRACK[1])
            if(sortedThreeArrayNFSMWnoSortTRACK[2] !== undefined)   medalBronze.push(sortedThreeArrayNFSMWnoSortTRACK[2])
        }

        let countGold = []
        let countSilver = []
        let countBronze = []
        let countPlatinum = []

        for(let i = 0; i < USERS.length  ; i++) {
            countGold.push({username: USERS[i].email, medal: medalGold.filter(item => item.username === USERS[i].email).length})}
        for(let i = 0; i < USERS.length  ; i++) {
            countSilver.push({username: USERS[i].email, medal: medalSilver.filter(item => item.username === USERS[i].email).length})}
        for(let i = 0; i < USERS.length  ; i++) {
            countBronze.push({username: USERS[i].email, medal: medalBronze.filter(item => item.username === USERS[i].email).length})}
        for(let i = 0; i < USERS.length  ; i++) {
            countPlatinum.push({username: USERS[i].email, medal: medalPlatinum.filter(item => item.username === USERS[i].email).length})}

        console.log(countGold)
        console.log(countSilver)
        console.log(countBronze)
        console.log(countPlatinum)

    } catch (e) {
        console.log(e)
    }
}


updata()