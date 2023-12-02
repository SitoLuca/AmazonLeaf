function validateLogin() {
    const email = $('#email').val()
    const password = $('#psw').val()
    const url = "http://127.0.0.1:10000";


    const xhttpr = new XMLHttpRequest();
    xhttpr.open('POST', url+'/login', true);

    xhttpr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttpr.send(JSON.stringify({"email": email, "password": password}));

    xhttpr.onload = () => {
        if (xhttpr.status === 200) {
            const response = xhttpr.response
            if (response !== "0") {
                const parsed = JSON.parse(response)
                //console.log(parsed)
                let obj = undefined;
                if(parsed.length == 8) obj = {"id": parsed[0], "surname": parsed[2], "name": parsed[1], "email": parsed[3], "type": parsed[7], "company":parsed[5], "KPI": parsed[6]}
                else obj = {"id": parsed[0], "surname": parsed[2], "name": parsed[1], "email": parsed[3], "type": parsed[5]}
                writeCookie("user", JSON.stringify(obj), 28)

                console.log(parsed)

                console.log(obj)
                console.log(obj.type+"Home.html");

                window.location.href = obj.type+"Home.html";
            } else {
                alert("Utente non trovato")
            }
        } else {
            // Handle error
        }
    };
}