/*++++++++++++++++++++++++++++++++++++++++
+ CONFIGURACION DE PERSISTENCIA del chat +
+++++++++++++++++++++++++++++++++++++++++*/

const DAO = process.argv[2] || 'mongodb'

let dbChat
let dbProduct
switch (DAO) {
    case 'fs':
        const FsConteiner = require('./conteiners/fsConteiner.js')
        dbChat = FsConteiner.getInstanceChat()
        dbProduct = FsConteiner.getInstanceProduct()
        break

    case 'firebase':
        const FirebaseConteiner = require('./conteiners/firebaseConteiner.js')
        dbChat = FirebaseConteiner.getInstanceChat()
        dbProduct = FirebaseConteiner.getInstanceProduct()
        break

    case 'mongodb':
        const MongoConteiner = require('./conteiners/mongoConteiner.js')
        dbChat = MongoConteiner.getInstanceChat()
        dbProduct = MongoConteiner.getInstanceProduct()

}


module.exports = { dbChat, dbProduct }