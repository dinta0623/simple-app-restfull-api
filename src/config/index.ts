require('dotenv').config()
const username = process.env.MONGO_USERNAME
const pass = process.env.MONGO_PASS
const dbname = process.env.DB_NAME
export default {
    mongo: {
        username,
        pass,
        dbname,
        uri: `mongodb+srv://${username}:${pass}@test-db.b2amv.mongodb.net/${dbname}?retryWrites=true&w=majority`
    },
    server: {
        mode: process.env.NODE_ENV,
        port: process.env.PORT || 9000,
        proxy: process.env.PROXY
    }
}