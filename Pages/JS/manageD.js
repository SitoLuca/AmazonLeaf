$(document).ready(function () {
    const url = "http://127.0.0.1:10000";
    const xhttpr = new XMLHttpRequest();
    xhttpr.open('POST', url + '/manage_deliveries', true);
    xhttpr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    const userdata = JSON.parse(readCookie("user"))
    xhttpr.send(JSON.stringify({"ID": userdata.company}));
    xhttpr.onload = () => {
        if (xhttpr.status === 200) {
            const response = xhttpr.response
            const parsedResponse = JSON.parse(response)
            parsedResponse.Packages.forEach(function (pack) {
                $('#package_tab')[0].innerHTML += `<tr class = 'packagerow'>` +
                    `<td id = 'code'>${pack[0]}</td><td>${pack[1]}</td><td >${pack[2]}</td><td id = 'V'>${pack[3]}</td>` +
                    `</tr>`;
            });

            parsedResponse.Vehicles.forEach(function (veichle) {
                $('#veicle_tab')[0].innerHTML += `<tr>` +
                    `<td>${veichle[0]}</td><td>${veichle[2]}</td><td>${veichle[3]}</td><td>${veichle[1]}</td>` +
                    `</tr>`;
            });
        }


    }

});