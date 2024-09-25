const URL_REGISTER = "http://localhost:3000/register";
const URL_LOGIN = "http://localhost:3000/login";

document.addEventListener('DOMContentLoaded', () => {
    const registrationButton = document.querySelector('#registrationButton')
    const loginButton = document.querySelector('#loginButton');

    loginButton.addEventListener('click', () => {
        const data = loginForm();
        login(data);
    })

    registrationButton.addEventListener('click', () => {
        const data = registerForm();
        sendData(data);
    })
})

async function sendData(objeto) {
    const response = await fetch(URL_REGISTER, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objeto)
    })
    if (!response.ok) {
        const errorData = await response.json();
        console.log("Error" + errorData);
    }
    const res = await response.json();
}

async function login(objeto) {
    const response = await fetch(URL_LOGIN, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objeto)
    })
    if (!response.ok) {
        const errorData = await response.json();
        console.log("Error: " + errorData.mensaje)
    } else {
        const token = await response.json();
        localStorage.setItem('token', JSON.stringify(token));
        window.location.href = "/home.html"
    }
}

function registerForm() {
    const persona = {};

    persona.nombre = document.querySelector('#nombreRg').value;
    persona.apellido = document.querySelector('#apellidoRg').value;
    persona.email = document.querySelector('#emailRg').value;
    persona.contraseña = document.querySelector('#contraseñaRg').value;

    return persona;
}

function loginForm(){
    const persona = {};
    persona.email = document.querySelector('#emailLg').value
    persona.contraseña = document.querySelector('#contraseñaLg').value
    return persona
}
