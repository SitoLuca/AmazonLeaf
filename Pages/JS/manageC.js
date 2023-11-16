$(document).ready(function () {

    const xhttpr = new XMLHttpRequest();
    xhttpr.open('POST', 'http://80.211.148.196:10000/manage_couriers', true);
    xhttpr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttpr.send()

    xhttpr.onload = () => {
        if (xhttpr.status === 200) {
            const response = xhttpr.response
            console.log(JSON.parse(response))
        }
    }

});