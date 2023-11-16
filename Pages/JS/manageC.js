$(document).ready(function () {

    const xhttpr = new XMLHttpRequest();
    xhttpr.open('POST', 'http://80.211.148.196:10000/manage_couriers', true);
    xhttpr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttpr.send()

    xhttpr.onload = () => {
        if (xhttpr.status === 200) {
            const response = xhttpr.response
            const parsedResponse = JSON.parse(response)
            console.log(parsedResponse)
            parsedResponse.Packages.forEach(function(pack) {
                $('#package_tab')[0].innerHTML += `<tr>` +
                    `<td>${pack[0]}</td><td>${pack[1]}</td><td>${pack[2]}</td><td>${pack[3]}</td>` +
                    `</tr>`;
            });

            parsedResponse.Couriers.forEach(function(courier) {
                $('#courier_tab')[0].innerHTML += `<tr>` +
                    `<td><img alt="logo-courier" width="25px" style="margin-right: 2px" height="auto" src="IMG/courier/${courier[2]}">${courier[1]}</td><td>${courier[4]}</td><td>${courier[3]}</td>` +
                    `</tr>`;
            });
        }
    }
});