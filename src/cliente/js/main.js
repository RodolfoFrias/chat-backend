window.addEventListener('load', function(){
    //let socket = io.connect('https://chat-sockets-app.herokuapp.com/',{'forceNew' : true});
    let socket = io.connect('http://192.168.15.3:9000',{'forceNew' : true});

    socket.on('mensaje', (mensaje) => {
        insertaMensaje(mensaje);
    });

    function insertaMensaje(mensaje){
         let html = mensaje.map((message, index) => {
            return `
                <strong>${message.nick}</strong>
                <p>${message.mensaje}</p>
            `;
        });
        let content = document.getElementById('mensajes');
        content.innerHTML = html;
        let contenido = document.querySelector('#contenido');
        contenido.scrollTop = contenido.scrollHeight;
    }

    function enviarMensaje(){

        let msj = document.getElementById('mensaje').value;
        let nick = document.getElementById('nick').value;


        if(msj == '' || nick == ''){
            alert('Algún campo vacío!!');
            return;
        }

        let mensaje = {
            ID : Math.random() * 1000,
            nick : nick,
            mensaje : msj
        }

        socket.emit('sendMensaje', mensaje);
        document.getElementById('nick').disabled = true;
        document.getElementById('mensaje').value = '';

        return false;

    }

    document.querySelector('#envia').addEventListener('click' , (e) => {
        e.preventDefault();
       enviarMensaje();
       return false;
    });
});

