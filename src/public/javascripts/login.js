window.addEventListener('DOMContentLoaded', () => {
    let socket = io()
    socket = io.connect('http://192.168.0.10:3000',{'forceNew' : true});

    socket.on('message', (message) => {
        console.log(`Message: ${message}`)
    });
})