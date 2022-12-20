const { config } = require('dotenv')
const path = require('path')

/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+ CONFIGURACION DE CONECCION A LAS DIFERENTES BASE DE DATOS +
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

config()

const { MONGO_USER,
    MONGO_PASS,
    MONGO_ATLAS_ENDPOINT,
    GOOGLE_APLICATION_CREDENTIALS
} = process.env

const dbsConfig = {

    fileSystem: {
        pathChat: path.join(__dirname, '../FS_DB/chat.txt'),
        pathProducts: path.join(__dirname, '../FS_DB/products.txt')
    },
    mongodbAtlas: {
        uri: `mongodb+srv://${MONGO_USER}:${encodeURIComponent(MONGO_PASS)}${MONGO_ATLAS_ENDPOINT}`,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    },
    firebase: GOOGLE_APLICATION_CREDENTIALS
}

module.exports = { dbsConfig }