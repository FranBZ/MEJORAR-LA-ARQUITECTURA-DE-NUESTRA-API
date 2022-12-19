const { fork } = require('child_process')
const path = require('path')

const ramdomController = (req, res) => {
    const cant = req.query.cant || 100000000
    const objRandom = fork(path.join(__dirname, '../utils/objRandom.js'))
    objRandom.send(cant)
    objRandom.on('message', obj => {
        res.send(obj)
    })
}

module.exports = { ramdomController }