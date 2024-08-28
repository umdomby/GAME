require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const PORT = process.env.PORT || 5000

const fs = require('fs');
//const http = require('http');
const https = require('https');

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

// Обработка ошибок, последний Middleware
app.use(errorHandler)

const privateKey = fs.readFileSync(path.resolve('/etc/letsencrypt/live/gamerecords.site/privkey.pem'));
const certificate = fs.readFileSync(path.resolve('/etc/letsencrypt/live/gamerecords.site/cert.pem'));
const ca = fs.readFileSync(path.resolve('/etc/letsencrypt/live/gamerecords.site/chain.pem'));

const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
};
const httpsServer = https.createServer(credentials, app);

//const httpServer = http.createServer(app);

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        //app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

        httpsServer.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    } catch (e) {
        console.log(e)
    }
}

start()