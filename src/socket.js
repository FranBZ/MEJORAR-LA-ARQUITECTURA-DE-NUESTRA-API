const { mensajesDTO } = require("./dtos/mensaje.dto.js")
const { productosDTO } = require("./dtos/producto.dtos.js")
const { dbChat, dbProduct } = require("./dao.js")

/*++++++++++++++++++++++++++++++++++++++
+ COMUNICACION DEL SOCKET DEL SERVIDOR +
+++++++++++++++++++++++++++++++++++++++*/


const socket = async (io) => {
    io.on('connection', async socket => {

        let chat = await dbChat.getAll()
        let chatINFO = mensajesDTO(chat)
        let products = await dbProduct.getAll()
        let productsINFO = productosDTO(products)

        socket.emit('servidor_todos_los_mensajes', chatINFO)

        socket.on('cliente_nuevo_mensaje_chat', async data => {
            await dbChat.save(data)
            let chat = await dbChat.getAll()
            let mensajes = mensajesDTO(chat)
            io.sockets.emit('servidor_todos_los_mensajes', mensajes)
        })


        socket.emit('servidor_todos_los_productos', productsINFO)

        socket.on('cliente_nuevo_producto', async data => {
            await dbProduct.save(data)
            let dbProducts = await dbProduct.getAll()
            let productos = productosDTO(dbProducts)
            io.sockets.emit('servidor_todos_los_productos', productos)
        })
    })
}

module.exports = { socket }