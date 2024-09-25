


document.addEventListener('DOMContentLoaded', () => {
    window.ArrayHAD_TEXT = new Array(document.querySelectorAll('input').length).fill(false)
    asignarTexto()
    posicionar();

    agregarEventos()
})

function agregarEventos() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach((element, index) => {
        element.addEventListener('input', () => {
            updateHAD_TEXT(element, index)
            toggleClass(element.value, index);
        })
    })
}

function toggleClass(value, index) {
    const inputs = document.querySelectorAll('.container-input');

    if (value) {
        inputs[index].classList.remove('noText');
    } else {
        inputs[index].classList.add('noText');
    }
}

function updateHAD_TEXT(input, index) {
    const inputValue = input.value;
    inputValue ? window.ArrayHAD_TEXT[index] = true : window.ArrayHAD_TEXT[index] = false;
}

function asignarTexto() {
    const divs = document.querySelectorAll('.container-input');
    divs.forEach(element => {
        let clases = element.className.split(' ');
        element.style.setProperty('--texto', `"${clases[2]}"`)
    })
}

function posicionar() {
    const divs = document.querySelectorAll('.container-input');
    divs.forEach((element, index) => {
        const { left } = document.querySelectorAll('input')[index].getBoundingClientRect();
        const leftInput = divs[index].getBoundingClientRect().left;
        const correcta = (left - leftInput) + 10;
        element.style.setProperty('--left', `${correcta}px`)
    })

}