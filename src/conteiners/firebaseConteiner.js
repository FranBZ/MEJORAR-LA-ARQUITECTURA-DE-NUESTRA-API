const admin = require('firebase-admin')
const { dbsConfig } = require('../config/dbsConnect.js')

/*++++++++++++++++++++++++++++++++++++++++
+ FIREBASE CONTEINER - CONECCION A LA DB +
+++++++++++++++++++++++++++++++++++++++++*/

admin.initializeApp({
    credential: admin.credential.cert(dbsConfig.firebase)
})

const db = admin.firestore();

class FirebaseConteiner {

    static instanceChat

    static instanceProduct

    constructor(model) {
        this.collection = db.collection(model)
    }

    static getInstanceChat() {
        if (FirebaseConteiner.instanceChat) {
            return FirebaseConteiner.instanceChat;
        }
        FirebaseConteiner.instanceChat = new FirebaseConteiner('chat');
        return FirebaseConteiner.instanceChat;
    }

    static getInstanceProduct() {
        if (FirebaseConteiner.instanceProduct) {
            return FirebaseConteiner.instanceProduct;
        }
        FirebaseConteiner.instanceProduct = new FirebaseConteiner('products');
        return FirebaseConteiner.instanceProduct;
    }

    async getAll() {
        try {
            const result = []
            const snapshot = await this.collection.get();
            snapshot.forEach(doc => {
                result.push({ id: doc.id, ...doc.data() })
            })
            return result
        } catch (error) {
            throw new Error(`Error al listar todo: ${error}`)
        }
    }

    async save(obj) {
        try {
            const saved = await this.collection.add(obj);
            return { ...obj, id: saved.id }
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }
}

module.exports = FirebaseConteiner