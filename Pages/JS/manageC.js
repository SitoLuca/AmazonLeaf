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
            parsedResponse.Packages.forEach(function (pack) {
                $('#package_tab')[0].innerHTML += `<tr class = 'packagerow'>` +
                    `<td id = 'code'>${pack[0]}</td><td>${pack[1]}</td><td >${pack[2]}</td><td id = 'V'>${pack[3]}</td>` +
                    `</tr>`;
            });

            parsedResponse.Couriers.forEach(function (courier) {
                $('#courier_tab')[0].innerHTML += `<tr class = 'currow'>` +
                    `<td id = '${courier[0]}'><img alt="logo-courier" width="25px" style="margin-right: 2px" height="auto" src="IMG/courier/${courier[2]}">${courier[1]}</td><td>${courier[4]}</td><td style='color: #0FBC88; font-weight: bold'>${courier[3]}</td>` +
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

var counter = 0;
var is_selected = 0;

function putpack(elem) {

    if (is_selected) {
        const code = elem.find("#code")[0].innerHTML;
        const vol = elem.find("#V")[0].innerHTML;

        let volfloat = parseFloat(vol).toFixed(3);

        let newavailable = $("#spaceavailable")[0].innerHTML;
        newavailable = parseFloat(newavailable);
        newavailable = newavailable.toFixed(3);
        newavailable -= volfloat;

        if (newavailable < 0) {
            alert("not enough space");
            return
        }

        $("#spaceavailable")[0].innerHTML = newavailable;

        counter++;
        let newline = "<tr><td id = 'pack_" + counter + "'>" + code + "</td><td class = 'Vo'>" + vol + "</td></tr>";

        $("#arrangement_tab")[0].innerHTML += newline;

        elem.remove();
    }
}


function putcur(elem) {

    if (!is_selected) {
        is_selected = 1;

        let id = $(elem.find("td")[0]).attr("id");
        $("#hidden_id").val(id);

        let name = elem.find("td")[0].innerHTML;
        let space = elem.find("td")[1].innerHTML;

        let newline = "<tr><td><td></td><td>" + name + "</td><td id = 'spaceavailable'>" + space + "</td>";

        $("#arrangement_tab")[0].innerHTML += newline;

        elem.remove();

    }
}

function assignpackages() {

    let arr = [];

    let i = 1;
    let name = "#pack_" + i;

    while ($(name)[0] !== undefined) {

        arr.push($(name)[0].innerHTML);
        i++;
        name = "#pack_" + i;

    }

    var j = []
    j.push(arr);
    j.push($("#hidden_id").val())

    const parsed = JSON.parse(JSON.stringify(j));
    console.log(parsed);
    const url = "http://127.0.0.1:10000";
    const xhttpr = new XMLHttpRequest();
    xhttpr.open('POST', url + '/assign_C', true);

    xhttpr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttpr.send(JSON.stringify(parsed));

    xhttpr.onload = () => {
        if (xhttpr.status === 200) {

            alert("Packages Correctly Assigned")
            location.reload();

        }
    }


}



