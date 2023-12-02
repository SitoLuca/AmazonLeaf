$(document).ready(function () {

    const url = "http://127.0.0.1:10000";

    const xhttpr = new XMLHttpRequest();
    xhttpr.open('POST', url + '/manage_veichles', true);
    xhttpr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttpr.send(JSON.stringify({'idc': JSON.parse(readCookie("user")).company}))

    xhttpr.onload = () => {
        if (xhttpr.status === 200) {

            const plates = JSON.parse(xhttpr.response)

            plates.forEach((p) =>  {
                const list = $("#vlist");
                const img = "<img width='400' src='../IMG/walking_camion.gif'>"


            })

        }
    }

});