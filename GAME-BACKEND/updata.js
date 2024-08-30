require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')
const {Device, Brand} = require("./models/models");

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

        // Brand.findAll({
        //     where: {
        //         name: 'NFS Most Wanted 2005'
        //     },
        // }).then(result => {
        //    // console.log('hello', result);
        //    result.forEach(item => console.log(item.description))
        // });

        // const result = await Brand.findAll({
        //     where: {
        //         name: 'NFS Most Wanted 2005'
        //     },
        // })
        // console.log(result)


        const TRACKresult = await Brand.findAll({
            where: {name: 'NFS Most Wanted 2005'},
            attributes: ['description']
        })

        const NFSMWresult = await Device.findAll({
            where: {name: 'NFS Most Wanted 2005'},
            // attributes: ['timestate']
        })

        const arrayNFSMWsortTRACK = []
        for(let i =0; i < TRACKresult.length  ; i++){

            for(let b = 0; b < NFSMWresult.length ; b++) {

                if(NFSMWresult[b].description === TRACKresult[i].description) {

                    //console.log(TRACKresult[i].description + ' ' + NFSMWresult[b].username + ' ' + NFSMWresult[b].timestate)
                    arrayNFSMWsortTRACK.push(NFSMWresult[i])
                }
            }
        }
        console.log()

        for(let i =0; i < arrayNFSMWsortTRACK.length  ; i++) {
            console.log(i+1 + ' ' + arrayNFSMWsortTRACK[i].description + ' ' + arrayNFSMWsortTRACK[i].username + ' ' + arrayNFSMWsortTRACK[i].timestate )
        }


        // for(let i =0; i < result2.length ; i++){
        //     console.log(result2[i].timestate + ' ' + result2[i].username)
        // }




        // await Brand.update(
        //     { name: 'NFS Most Wanted 2005' },
        //     {
        //         where: {
        //             name: 'NFS Most Wanted',
        //         },
        //     },
        // );

        // await Device.update(
        //     { name: 'NFS Most Wanted 2005' },
        //     {
        //         where: {
        //             name: 'NFS Most Wanted',
        //         },
        //     },
        // );
    } catch (e) {
        console.log(e)
    }
}


updata()