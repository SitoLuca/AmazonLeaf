function ValidateLogin() {

    $.ajax({

        url: "http://localhost:8080/login",
        dataType: "json",
        method: "post",

        data: {

            email: $("#email")[0].value,
            psw: $("#psw")[0].value

        },

        success: function (res) {

            console.log(res);

        },
        error: function (err) {
            console.log(err)
        }


    })


}