const URL_CHATS = 'https://mensajeria-backend.onrender.com/get_chats'
const URL_SEND = 'https://mensajeria-backend.onrender.com/send'
const URL_MESSAGES_UNREAD = 'https://mensajeria-backend.onrender.com/unread_messages_count'


document.addEventListener('DOMContentLoaded', async () => {
    actualizrNombre();
    await agregarContactos();
    agregarEventos();
    const mensajesNoLeidos = await getUnreadMessages();
    updateMessageIcon(mensajesNoLeidos.mensajesNoLeidos)
    console.log(mensajesNoLeidos)
})

function updateMessageIcon(nroMensajes) {
    const iconMessage = document.querySelector('#iconMessage');

    if (nroMensajes != 0) {
        iconMessage.classList.add(`mensajes${nroMensajes}`)
        iconMessage.classList.add(`scale`)
        setTimeout(() => {
            iconMessage.classList.remove(`scale`)
        }, 2400);
    }
}

function actualizrNombre() {
    const { nombre, apellido } = JSON.parse(localStorage.getItem('datos'))

    const spanNombre = document.querySelectorAll('.nombreUI');
    const nombrePlaceHolder = document.querySelector('.nombreUIInput');

    for (i of spanNombre) {
        i.innerHTML = nombre + " " + apellido
    }

    nombrePlaceHolder.placeholder = "What's on your mind, " + nombre;
}

async function agregarContactos() {
    const contactos = await getChats();
    const template = document.querySelector('#template-chat')
    const containerChats = document.querySelector('.containerChats');

    contactos.forEach(contacto => {
        const nuevoChat = template.content.cloneNode(true);
        nuevoChat.querySelector('.nombreChat span').textContent = contacto.nombre + " " + contacto.apellido
        nuevoChat.querySelector('.chat').setAttribute('data-email', contacto.email)
        containerChats.appendChild(nuevoChat)
    })
    return contactos.length;
}

async function getChats() {
    const { email } = JSON.parse(localStorage.getItem('datos'))
    const emailText = email

    const response = await fetch(URL_CHATS, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "email": emailText })
    })

    if (!response.ok) {
        const errorDato = await response.json()
        console.log({ "error": errorDato })
    } else {
        return datos = await response.json();
    }
}

function agregarEventos() {
    const modalCloseButton = document.querySelector('.closeButton')
    const modalSendButton = document.querySelector('.sendButton')
    const chats = document.querySelectorAll('.chat');
    chats.forEach(element => {
        element.addEventListener('click', (event) => {
            const chat = event.target.closest('.chat')
            toggleOverlay()
            updateOverlay(chat)
        })
    })

    modalCloseButton.addEventListener('click', () => {
        toggleOverlay()
    })

    modalSendButton.addEventListener('click', async () => {
        await sendButton();
        toggleOverlay();
        document.querySelector('#mensaje-overlay').value = "";

    })
}


function toggleOverlay() {
    const overlay = document.querySelector('.overlay');
    const body = document.querySelector('body')
    overlay.classList.toggle('active');
    body.classList.toggle('overflow-disabled')
}

function updateOverlay(chat) {
    const emailOverlay = document.querySelector('#email-overlay')
    const email = chat.getAttribute('data-email');
    emailOverlay.value = email
}

async function getUnreadMessages() {
    const sendData = JSON.parse(localStorage.getItem('datos'));
    const response = await fetch(URL_MESSAGES_UNREAD, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(sendData)
    })
    if (!response.ok) {
        const errorData = await response.json()
        console.log("Error:" + errorData)
    } else {
        return response.json();
    }
}

async function sendButton() {
    const mensaje = {
        emisor: JSON.parse(localStorage.getItem('datos')).email,
        receptor: document.querySelector('#email-overlay').value,
        contenido: document.querySelector('#mensaje-overlay').value
    }

    const response = await fetch(URL_SEND, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(mensaje)
    })
    if (!response.ok) {
        const dataError = response.json()
        console.log(dataError)
    } else {
        const data = await response.json()
        console.log(data)
    }

}