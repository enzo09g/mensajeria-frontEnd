const URL_CHECK = "https://backend-seven-livid.vercel.app/home"
recuperarToken();

async function recuperarToken() {
    const { token } = JSON.parse(localStorage.getItem('datos'));
    if (token) {
        const response = await fetch(URL_CHECK, {
            method: "GET",
            headers: {
                "access-token": (token)
            }
        })
        if (!response.ok) {
            window.location.href = "/index.html"
        }
    } else {
        window.location.href = "/index.html"
    }
}