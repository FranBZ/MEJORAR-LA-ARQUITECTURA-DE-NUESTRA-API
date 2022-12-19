const socket = io.connect()

const buttonChat = document.getElementById("enviarMensaje")
const buttonProduct = document.getElementById("guardarProducto")

/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+ COMPROBACION DE DATOS DE FORMULARIOS PARA ENVIAR AL SERVIDOR +
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

buttonChat?.addEventListener("click", () => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (regex.test(document.getElementById("email").value) || document.getElementById("mensaje").value != '' || document.getElementById("nombre").value != '' || document.getElementById("apellido").value != '' || document.getElementById("alias").value != '' || document.getElementById("urlAvatar").value != '' || !document.getElementById("edad").value) {
        const data = {
            author: {
                id: document.getElementById("email").value,
                nombre: document.getElementById("nombre").value,
                apellido: document.getElementById("apellido").value,
                edad: document.getElementById("edad").value,
                alias: document.getElementById("alias").value,
                avatar: document.getElementById("urlAvatar").value
            },
            text: document.getElementById("mensaje").value
        }
        document.getElementById('mensaje').value = ''
        socket.emit('cliente_nuevo_mensaje_chat', data)

    } else {
        document.getElementById('email').value = 'ingrese todos los datos de manera correcta'
    }
})

buttonProduct?.addEventListener("click", () => {

    const data = {
        code: document.getElementById('code').value,
        name: document.getElementById('name').value,
        price:document.getElementById('price').value,
        stock:document.getElementById('stock').value,
        description:document.getElementById('description').value,
        urlImage:document.getElementById('urlImage').value,
    }
    document.getElementById('code').value = ''
    document.getElementById('name').value = ''
    document.getElementById('price').value = ''
    document.getElementById('stock').value = ''
    document.getElementById('description').value = ''
    document.getElementById('urlImage').value = ''
    socket.emit('cliente_nuevo_producto', data)
})

/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+ ENVIAMOS LOS DATOS RECIBIDOS POR EL SERVIDOR PARA INSERTAR EN EL HTML +
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

socket.on('servidor_todos_los_mensajes', chat => {
    document.getElementById('chat').innerHTML = ''
    chat.forEach(mensaje => {
        document.getElementById('chat').innerHTML += `
            <div style="width:100vw">
                <img src="${mensaje.avatar}" height="30px"/>
                <span style="color: brown;">&nbsp[${mensaje.alias}]</span>
                <span class="fst-italic" style="color: green;">&nbsp: ${mensaje.texto}</span>
            </div>
        `
    })
})

socket.on('servidor_todos_los_productos', products => {
    document.getElementById('products').innerHTML = ''
    products.forEach(product => {
        document.getElementById('products').innerHTML += `
            <tr>
                <td>${product.name}</td>
                <td> AR$ ${product.price}</td>
                <td> <img src="${product.urlImage}" height="30px"> </td>
            </tr>
        `
    })
})