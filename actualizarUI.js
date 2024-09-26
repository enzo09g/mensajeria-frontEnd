const URL_CHATS = 'http://localhost:3000/get_chats'

document.addEventListener('DOMContentLoaded', async () => {
    actualizrNombre();
    await agregarContactos();
    agregarEventos();
})

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
    const chats = document.querySelectorAll('.chat');
    console.log(chats)
    chats.forEach(element => {
        element.addEventListener('click', () => {
            alert("hola")
        })
    })
}