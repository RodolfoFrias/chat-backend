'use strict';

function Messenger(){
    
    this.socket = io.connect('http://192.168.0.4:9000',{'forceNew' : true});

    this.socket.on('mensaje', (mensaje) => {
        this.insertaMensaje(mensaje);
    });

    this.getFetch = function(param){
        fetch(`http://192.168.0.4:9000/${param}`)
        .then(response => response.json())
        .then(resp => {
            this.getTemplate(resp);
        }).catch(err => {
            console.log('Error: ', err);
        });
    }

    this.getTemplate = function(data){
        let newConversation = document.querySelector('#conversations');
        if(data.length == 0){
            newConversation.innerHTML = `<div class="text-center"><strong>No hay conversaciones</strong></div>`;
        } 
        let conversation = "";
        data.forEach((user, index) => {
          conversation += `
            
            <div class="row px-2 py-2 border-bottom" style="cursor: pointer;">
                <div class="col-4 text-center m-0 p-0">
                    <img src="${user.photoPath}" alt="" class="img-thumbnail rounded-circle user_photo">
                </div>
                <div class="col-6 m-0 p-0">
                    <div class="col-md-12">
                        <span class="text-dark">${user.Nombre}</span>
                    </div>
                    <div class="col-md-12">
                        <span class="text-secondary">${user.sender}: ${user.Message}</span>
                    </div>
                </div>
                <div class="col-2 m-0 p-0">
                    <span class="text-secondary" style="font-size: 9px;">11:37pm</span>
                </div>
            </div>
          
          `;
          newConversation.innerHTML = conversation;
        });
    }

    this.insertaMensaje = function(mensaje) {
        let html = mensaje.map((message, index) => {
            return `
                <strong>${message.nick}</strong>
                <span class="text-white bg-primary my-2 p-2 d-table" style="border-radius: 999px;">
                    ${message.mensaje}
                </span>
            `;
        });
       
        let content = document.getElementById('mensajes');
        content.innerHTML = html;
        let contenido = document.querySelector('#contenido');
        contenido.scrollTop = contenido.scrollHeight;
    }

    this.enviaMensaje = function() {
        let msj = document.getElementById('mensaje').value;
        let nick = document.getElementById('nick').value;
        let id = document.getElementById('ID').value;


        if(msj == '' || nick == ''){
            alert('No mensajes vacíos!');
            return;
        }

        let mensaje = {
            ID : id,
            nick : nick,
            mensaje : msj
        }

        this.socket.emit('sendMensaje', mensaje);
        document.getElementById('nick').disabled = true;
        document.getElementById('mensaje').value = '';

        return false;
    }

}

window.addEventListener('load', () => {
   let messenger = new Messenger();
   messenger.getFetch('users');

   let btnEnviar =  document.querySelector('#envia');
   btnEnviar.addEventListener('click' , (e) => {
        e.preventDefault();
        messenger.enviaMensaje()
        return false;
    });

    document.querySelector('#btnChatgral').addEventListener('click', () => {
        document.querySelector('#inbox').classList.add('d-none', 'd-md-block');
        document.querySelector('#chat').classList.remove('d-none', 'd-md-block');
    });

});

