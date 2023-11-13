
function validateLogin() {
    const email = $('#email').val()
    const password = $('#psw').val()

    const xhttpr = new XMLHttpRequest();
    xhttpr.open('POST', 'http://127.0.0.1:8000/login', true);

    xhttpr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttpr.send(JSON.stringify({"email":email, "password":password}));

    xhttpr.onload = () => {
        if (xhttpr.status === 200) {
            const response = xhttpr.response
            if(response !== "0"){
                const parsed = JSON.parse(response)
                //console.log(parsed)
                const obj = {"id":parsed[0],"surname":parsed[1], "name":parsed[2], "email":parsed[3]}
                writeCookie("user", JSON.stringify(obj), 28)
                window.location.href = "operatorHome.html";
            } else {
                console.log("Utente non trovato")
            }
        } else {
            // Handle error
        }
    };
}