const URL_CHECK = "http://localhost:3000/home"
recuperarToken();

async function recuperarToken() {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
        const response = await fetch(URL_CHECK, {
            method: "GET",
            headers: {
                "access-token": (token.token)
            }
        })
        if (!response.ok) {
            window.location.href = "/index.html"
        }
    } else {
        window.location.href = "/index.html"
    }
}