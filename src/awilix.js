const { createContainer, Lifetime, asValue } = require('awilix')
const SocketIO = require('socket.io')

module.exports = () => {
    const container = createContainer()

    container.loadModules([
        './lib/*.js',
        './services/*.js',
        './entities/*/*.service.js'
    ], {
        resolverOptions: {
            lifetime: Lifetime.SINGLETON
        },
        cwd: __dirname,
        formatName: 'camelCase',
    })

    container.register({
        socketio: asValue(SocketIO)
    })

    return container
}