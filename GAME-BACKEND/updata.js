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

        const USERS = await User.findAll({
            attributes: {exclude: ['id', 'ip', 'email', 'point', 'allmedal', 'password', 'role','createdAt', 'updatedAt']}})

        //Users count
        console.log(USERS.length)
        //Track count
        // for(let i = 0; i < Object.keys(Object.keys(USERS[0].dataValues)).length; i++) {
        //     console.log(Object.keys(USERS[0].dataValues)[i])
        // }
        // console.log('gold ')
        // console.log(JSON.parse(Object.values(USERS[0].dataValues)[0]).gold)
        // console.log('gold ')


        // count Track
        for(let k = 0; k < USERS.length  ; k++) {

            let gold = 0
            let silver = 0
            let bronze =0
            let platinum = 0

            for(let i = 0; i < Object.keys(Object.keys(USERS[0].dataValues)).length; i++) {
                // set User
                gold = gold + JSON.parse(Object.values(USERS[k].dataValues)[i]).gold
                silver = silver + JSON.parse(Object.values(USERS[k].dataValues)[i]).silver
                bronze = bronze + JSON.parse(Object.values(USERS[k].dataValues)[i]).bronze
                platinum = platinum + JSON.parse(Object.values(USERS[k].dataValues)[i]).platinum
                //console.log(JSON.parse(Object.values(USERS[0].dataValues)[k]).gold)
            }

            //username
            console.log(JSON.parse(Object.values(USERS[k].dataValues)[0]).username)
            let username = JSON.parse(Object.values(USERS[k].dataValues)[0]).username
            console.log('gold ' + gold)
            console.log('silver ' + silver)
            console.log('bronze ' + bronze)
            console.log('platinum ' + platinum)

            let dataMedal = {username, gold, silver, bronze, platinum}
            console.log(dataMedal)

            await User.findOne({where: {email: username}}).then(record => {
                record.update({allmedal: JSON.stringify(dataMedal)}).then(updatedRecord => {
                    console.log(`updated record ${JSON.stringify(updatedRecord, null, 2)}`)
                })})
        }

    } catch (e) {
        console.log(e)
    }
}


updata()