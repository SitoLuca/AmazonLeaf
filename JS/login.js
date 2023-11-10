function ValidateLogin() {
    $.getJSON('/Json/users.json', function (json) {
        console.log(json);

        if (json.operatorCred.email === $("#email").val()
            &&
            json.operatorCred.pass === $("#psw").val()) {

            window.location.href = "/Pages/operatorHome.html"

        }

        if (json.courierCred.email === $("#email").val()
            &&
            json.courierCred.pass === $("#psw").val()) {

            window.location.href = "/Pages/courierHome.html"

        }

    });
}