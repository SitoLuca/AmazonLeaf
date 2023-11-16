$(document).ready(function () {

    const xhttpr = new XMLHttpRequest();
    xhttpr.open('POST', 'http://127.0.0.1:8000/manage_courriers', true);
    xhttpr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttpr.send()

    xhttpr.onload = () => {
        if (xhttpr.status === 200) {
            const response = xhttpr.response
            console.log(JSON.parse(response))
        }
    }

});