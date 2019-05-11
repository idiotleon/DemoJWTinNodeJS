import app from '../app'
import debugLib from 'debug'
import http from 'http'

const debug = debugLib('DemoJWTinNodeJS:server')

var port = normalizePort(process.env.PORT || '3737')
app.set('port', port)

var server = http.createServer(app)

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

function normalizePort(val) {
    var port = parseInt(val, 10)

    if (isNaN(port)) {
        return val
    }

    if (port >= 0) {
        return port
    }

    return false
}

function onError(error) {
    if (error.syscall != 'listen') {
        throw error
    }

    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port' + port


    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges')
            process.exit(1)
            break
        case 'EADDRINUSE':
            console.error(bind + ' is already in use')
            process.exit(1)
            break;
        default:
            throw error
    }
}

function onListening() {
    var address = server.address()
    var bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + address.port
    console.log(`Listening on ${bind}`)
    debug('Listening on ' + bind)
}