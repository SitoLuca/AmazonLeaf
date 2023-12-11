$(document).ready(function () {

    const url = "http://127.0.0.1:10000";

    const xhttpr = new XMLHttpRequest();
    xhttpr.open('POST', url + '/manage_veichles', true);
    xhttpr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttpr.send(JSON.stringify({'idc': JSON.parse(readCookie("user")).company}))

    xhttpr.onload = () => {
        if (xhttpr.status === 200) {

            const plates = JSON.parse(xhttpr.response)
            const list = $("#vcontent")[0];
            console.log(plates);

            if (plates.length > 0) {
                plates.forEach((p) => {

                    const img = "<img width='400' src='../IMG/walking_camion.gif'>"

                    let newelem = '<div class="pagecontent" id="vcontent"><div class = "d-flex flex-column" style="width: 400px"><h1 class="loading">' + p + ' Is Traveling</h1>' + img + ' <input type="button" class="btn btn-success" value="Return" onclick="return_v(\'' + p + '\')">';

                    list.innerHTML += newelem;

                });
            } else {
                list.innerHTML = "<h2>All Vehicle available!</h2>";
            }

        }
    }

});

function return_v(plate) {

    const url = "http://127.0.0.1:10000";

    const xhttpr = new XMLHttpRequest();
    xhttpr.open('POST', url + '/return_veichle', true);
    xhttpr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttpr.send(JSON.stringify({'plate': plate}))

    xhttpr.onload = () => {
        if (xhttpr.status === 200) {
            console.log("ok")
            alert("The veichle is returned")
            window.location.href = window.location.href
        } else {
            console.log("not ok")
        }
    }


}