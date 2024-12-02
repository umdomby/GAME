//const db = require('../dbPool')
const jwt = require('jsonwebtoken')
const {Device, User} = require('../models/models')

class emailMiddleware{

    async emailDatabaseEditDevices(req, res, next){
        const {id} = req.body
        //return res.status(401).json({message: id})
        //const email = await db.query('SELECT email FROM users WHERE id = $1',[id])

        const candidate1 = await Device.findOne({where: {id:id}})
        //return res.status(401).json({message: candidate1.username})
        //const candidate2 = await User.findOne({where: {email:candidate1.username}})

        if (req.method === "OPTIONS") {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(401).json({message: "Не авторизован"})
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            // if (decoded.role === 'ADMIN') {
            //     return res.status(403).json({message: 'ADMIN'})
            // }
            if (decoded.email !== candidate1.username) {
                return res.status(403).json({message: "Нет доступа"})
            }
            req.user = decoded;
            next()
        } catch (e) {
            res.status(401).json({message: "Не авторизован"})
        }
    }

    async emailMiddlewareCreateEvent(req, res, next){

    }



}

module.exports = new emailMiddleware()



