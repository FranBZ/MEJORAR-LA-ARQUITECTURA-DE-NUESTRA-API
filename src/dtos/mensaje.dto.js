const mensajesDTO = (dbMensajes) => {
    const mensajes = []
    dbMensajes.forEach(mensaje => mensajes.push({
        avatar : mensaje.author.avatar,
        alias : mensaje.author.alias,
        texto: mensaje.text
    }))
    return mensajes
}

module.exports = { mensajesDTO }