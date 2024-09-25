document.addEventListener('DOMContentLoaded', () => {

    const changeBtnRegistrationLg = document.querySelector('.spanLogin.lg');
    const changeBtnRegistrationRg = document.querySelector('.spanLogin.rg');

    changeBtnRegistrationLg.addEventListener('click', toggleFormRg)
    changeBtnRegistrationRg.addEventListener('click', toggleFormLg)
})


function recargarScript() {
    const script = document.querySelector('#inputScript');
    const padreScript = script.parentNode
    padreScript.removeChild(script);

    const newScript = document.createElement('script');
    newScript.src = './input.js'
    newScript.id = "inputScript"

    padreScript.appendChild(newScript)
    console.log(padreScript)
    console.log(newScript)
}

function toggleFormRg() {
    const registrationForm = document.querySelector('.registrationForm');
    const loginForm = document.querySelector('.loginForm');
    const registrationContainerRg = document.querySelector('.registrationContainer.rg');
    const registrationContainerLg = document.querySelector('.registrationContainer.lg');
    const loginButton = document.querySelector('.loginButton.lg');
    const registrationButton = document.querySelector('.loginButton.rg');


    registrationForm.classList.remove('disable')
    loginForm.classList.add('disable')
    registrationContainerRg.classList.remove('disable')
    registrationContainerLg.classList.add('disable')
    loginButton.classList.add('disable')
    registrationButton.classList.remove('disable')


    posicionar()
}

function toggleFormLg() {
    const registrationForm = document.querySelector('.registrationForm');
    const loginForm = document.querySelector('.loginForm');
    const registrationContainerRg = document.querySelector('.registrationContainer.rg');
    const registrationContainerLg = document.querySelector('.registrationContainer.lg');
    const loginButton = document.querySelector('.loginButton.lg');
    const registrationButton = document.querySelector('.loginButton.rg');

    loginForm.classList.remove('disable')
    registrationForm.classList.add('disable')
    registrationContainerLg.classList.remove('disable')
    registrationContainerRg.classList.add('disable')
    loginButton.classList.remove('disable')
    registrationButton.classList.add('disable')

    posicionar()
}