const productosDTO = (dbProductos) => {
    const productos = []
    dbProductos.forEach(producto => productos.push({
        name: producto.name,
        price: producto.price,
        urlImage: producto.urlImage
    }))
    return productos
}

module.exports = { productosDTO }