$(document).ready(function () {
    const url = "http://127.0.0.1:10000";
    const xhttpr = new XMLHttpRequest();
    xhttpr.open('POST', url + '/manage_couriers', true);
    xhttpr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttpr.send();
    xhttpr.onload = () => {
        if (xhttpr.status === 200) {
            const response = xhttpr.response
            const parsedResponse = JSON.parse(response)
            console.log(parsedResponse)
            parsedResponse.Packages.forEach(function (pack) {
                $('#package_tab')[0].innerHTML += `<tr class = 'packagerow'>` +
                    `<td id = 'code'>${pack[0]}</td><td>${pack[1]}</td><td >${pack[2]}</td><td id = 'V'>${pack[3]}</td>` +
                    `</tr>`;
            });

            parsedResponse.Couriers.forEach(function (courier) {
                $('#courier_tab')[0].innerHTML += `<tr class = 'currow'>` +
                    `<td id = '${courier[0]}'><img alt="logo-courier" width="25px" style="margin-right: 2px" height="auto" src="IMG/courier/${courier[2]}">${courier[1]}</td><td>${courier[4]}</td><td>${courier[3]}</td>` +
                    `</tr>`;
            });
        }

        $(".packagerow").on("click", function () { //Le richieste sono asicrone quindi va messo qua
            putpack($(this));
        });

        $(".currow").on("click", function () {
            putcur($(this));
        });

    }

});

function putpack(elem) {

    if (is_selected) {
        const code = elem.find("#code")[0].innerHTML;
        const vol = elem.find("#V")[0].innerHTML;
        console.log(vol);
        let volfloat = parseFloat(vol).toFixed(3);
        console.log(volfloat);

        let newavalable = $("#spaceavailable")[0].innerHTML;
        newavalable = parseFloat(newavalable);
        newavalable = newavalable.toFixed(3);
        newavalable -= volfloat;

        if (newavalable < 0) {
            alert("not enugh space");
            return
        }

        $("#spaceavailable")[0].innerHTML = newavalable;

        let newline = "<tr><td>" + code + "</td><td class = 'Vo'>" + vol + "</td></tr>";

        $("#arrangement_tab")[0].innerHTML += newline;

        elem.remove();
    }
}

var is_selected = 0;

function putcur(elem) {

    if (!is_selected) {
        is_selected = 1;

        let name = elem.find("td")[0].innerHTML;
        let space = elem.find("td")[1].innerHTML

        let newline = "<tr><td><td></td><td>" + name + "</td><td id = 'spaceavailable'>" + space + "</td>";

        $("#arrangement_tab")[0].innerHTML += newline;

        elem.remove();

    }
}



