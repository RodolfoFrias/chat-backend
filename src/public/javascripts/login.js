window.addEventListener('load', () => {
    const socket = io()
    console.log(socket)
    // socket = io.connect('http://localhost:3000',{'forceNew' : true});

    // console.log(socket)

    // socket.on('message', (message) => {
    //     console.log(`Message: ${message}`)
    // });
})