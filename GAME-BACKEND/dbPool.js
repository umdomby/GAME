const Pool = require('pg').Pool

const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
                rejectUnauthorized: false,
        },

});

// const pool = new Pool(
//     {
//         user: "postgres",
//         password: 'admin',
//         host: "localhost",
//         port: 5432,
//         database: "online_store"
//     }
// )

module.exports = pool
