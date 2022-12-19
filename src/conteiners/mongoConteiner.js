const mongoose = require('mongoose')
const { dbsConfig } = require('../config/dbsConnect.js')
const { Chat } = require('../models/Chat.js')
const { Product } = require('../models/Products.js')

/*+++++++++++++++++++++++++++++++++++++
+ MONGO CONTEINER - CONECCION A LA DB +
++++++++++++++++++++++++++++++++++++++*/

mongoose.connect(dbsConfig.mongodbAtlas.uri, dbsConfig.mongodbAtlas.options)

class MongoConteiner {

    static instanceChat
    static instanceProduct
    
    constructor(model) {
        this.collection = model
    }

    static getInstanceChat() {
        if (MongoConteiner.instanceChat) {
            return MongoConteiner.instanceChat;
        }
        MongoConteiner.instanceChat = new MongoConteiner(Chat);
        return MongoConteiner.instanceChat;
    }

    static getInstanceProduct() {
        if (MongoConteiner.instanceProduct) {
            return MongoConteiner.instanceProduct;
        }
        MongoConteiner.instanceProduct = new MongoConteiner(Product);
        return MongoConteiner.instanceProduct;
    }

    async getAll() {
        try {
            let data = await this.collection.find({}).lean()
            data.forEach(obj => {
                obj.id = obj['_id'].toString()
                delete (obj['_id'])
            })
            return data
        } catch (error) {
            throw new Error(`Error al listar todo: ${error}`)
        }
    }

    async save(obj) {
        try {
            const info = await this.collection.create(obj)
            return info
        } catch (error) {
            console.log(`Error: ${error}`)
        }
    }
}

module.exports = MongoConteiner