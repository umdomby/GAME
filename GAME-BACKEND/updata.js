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

        console.log("##################################")
        for(let i = 0; i < TRACKresult.length  ; i++){
            arrayNFSMWnoSortTRACK = []
            for(let b = 0; b < NFSMWresult.length ; b++) {
                if(TRACKresult[i].description === NFSMWresult[b].description) {
                    arrayNFSMWnoSortTRACK.push({username: NFSMWresult[b].username, timestate: NFSMWresult[b].timestate, description: NFSMWresult[b].description})
                }
            }
            sortedThreeArrayNFSMWnoSortTRACK = arrayNFSMWnoSortTRACK.sort((a, b) => Number(a.timestate.replace(/[\:.]/g, '')) - Number(b.timestate.replace(/[\:.]/g, '')));
            sortedThreeArrayNFSMWnoSortTRACK.splice(3)

            if(sortedThreeArrayNFSMWnoSortTRACK[0] !== undefined)   medalGold.push(sortedThreeArrayNFSMWnoSortTRACK[0])
            if(sortedThreeArrayNFSMWnoSortTRACK[1] !== undefined)   medalSilver.push(sortedThreeArrayNFSMWnoSortTRACK[1])
            if(sortedThreeArrayNFSMWnoSortTRACK[2] !== undefined)   medalBronze.push(sortedThreeArrayNFSMWnoSortTRACK[2])
        }

        let countGold = []
        let countSilver = []
        let countBronze = []

        for(let i = 0; i < USERS.length  ; i++) countGold.push({username: USERS[i].email, medal: medalGold.filter(item => item.username === USERS[i].email).length})
        for(let i = 0; i < USERS.length  ; i++) countSilver.push({username: USERS[i].email, medal: medalSilver.filter(item => item.username === USERS[i].email).length})
        for(let i = 0; i < USERS.length  ; i++) countBronze.push({username: USERS[i].email, medal: medalBronze.filter(item => item.username === USERS[i].email).length})

        console.log(countGold)
        console.log(countSilver)
        console.log(countBronze)


        // for(let i = 0; i < USERS.length  ; i++){
        //
        // }

        // for(let k = 0; k < sortedMedalThree.length ; k++) {
        //     console.log(sortedMedalThree[k])
        //     console.log("================================================")
        // }

        //console.log(sortedMedalThree[1])

        // for(let k = 0; k < medal.length ; k++) {
        //     //medal[k].push(new fMedal (sorted[k].username, 1, 3, 5,1))
        //     console.log(sorted[k])
        // }

        // function fMedal(email, gold, silver, bronze, platinum) {
        //     this.email = email;
        //     this.gold = gold;
        //     this.silver = silver;
        //     this.bronze = bronze;
        //     this.platinum = platinum;
        // }
        // for(let k = 0; k < medal.length ; k++) {
        //     console.log(medal[k])
        // }

        // let pi = new fMedal("pi", 1, 3, 4,7);
        // let nikita = new fMedal("nikita", 1, 5, 7,11);
        // fMedal[0] = pi
        // fMedal[1] = nikita
        //console.log(fMedal[1].email)

        // console.log("================================================")
        // for(let i = 0; i < arrayNFSMWsortTRACK.length  ; i++) {
        //     console.log(arrayNFSMWsortTRACK[i] )
        // }


        // for(let i =0; i < result2.length ; i++){
        //     console.log(result2[i].timestate + ' ' + result2[i].username)
        // }

    } catch (e) {
        console.log(e)
    }
}


updata()