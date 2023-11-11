$(document).ready(function () {

    new DataTable('#table');

    $.getJSON('/Json/package.json', function (json) {

        let p = json.pakages;
        let newline = "";

        if (p.length > 0) {

            for (let i = 0; i < p.length; ++i) {
                newline = "<tr>";
                newline += "<td>" + p[i].Code + "</td>";
                newline += "<td>" + p[i].Destination + "</td>";
                newline += "<td>" + p[i].vol + "</td>";
                newline += "<td>" + p[i].wei + "</td>";
                newline += "<tr>";

                $("#tablebody")[0].innerHTML += newline;
            }

        } else {
            newline = "<tr><td>No Data Found</td></tr>";
            $("#tablebody")[0].innerHTML += newline;
        }

    });

})

function savepackage() {

    let code = $("#newcode");
    let dest = $("#newdest");
    let v = $("#newv");
    let w = $("#newv");

    if (code.val() === '' || dest.val() === '' || v.val() === '' || w.val() === '') {
        alert("Not Enugh Data, fill all fields");
    } else {
        $.getJSON('/Json/package.json', function (json) {


            let newpack = {Destination: dest.val() , Code: code.val(), vol: v.val(), wei: w.val()};
            json.pakages.push(newpack)

            code.val('');
            dest.val('');
            v.val('');
            w.val('');

            alert("Package correctly pushed");

        })

    }

}

