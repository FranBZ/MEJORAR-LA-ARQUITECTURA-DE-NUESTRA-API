const fs = require('fs')
const { v4 : newID } = require('uuid')
const { dbsConfig } = require('../config/dbsConnect.js')

/*+++++++++++++++++++++++++++++++++++++++++++
+ FILE SYSTEM CONTEINER - CONECCION A LA DB +
++++++++++++++++++++++++++++++++++++++++++++*/

class FsConteiner {

    static instanceChat

    static instanceProduct

    constructor(path) {
        this.pathFile = path 
    }

    static getInstanceChat() {
        if (FsConteiner.instanceChat) {
            return FsConteiner.instanceChat;
        }
        FsConteiner.instanceChat = new FsConteiner(dbsConfig.fileSystem.pathChat);
        return FsConteiner.instanceChat;
    }

    static getInstanceProduct() {
        if (FsConteiner.instanceProduct) {
            return FsConteiner.instanceProduct;
        }
        FsConteiner.instanceProduct = new FsConteiner(dbsConfig.fileSystem.pathProducts);
        return FsConteiner.instanceProduct;
    }

    async getAll() { 
        console.log(this.pathFile)
        try {
            const data = await fs.promises.readFile(this.pathFile, 'utf-8', (err, data) => {
                if (err) throw err
                return data
            })
            return JSON.parse(data)
        } catch (err) {
            throw new Error('Error al leer db fs: ', err)
        }
    }

    async save(obj) {
        try {
            const db = await this.getAll()
            obj.id = newID()
            db.push(obj)
            await fs.promises.writeFile(this.pathFile, JSON.stringify(db, null, 2), err => {
                if (err) throw err
            })
        } catch (error) {
            throw new Error('Error al guardar en fs: ', error)
        }
    }
}

module.exports = FsConteiner