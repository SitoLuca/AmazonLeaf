$(document).ready(function () {



    new DataTable('#table');

    $.getJSON('/Json/package.json', function (json) {

        let p = json.pakages;
        let newline = "";

        if (p.length > 0) {

            $(".dataTables_empty").remove();

            for (let i = 0; i < p.length; ++i) {
                newline = "<tr>";
                newline += "<td>" + p[i].Code + "</td>";
                newline += "<td>" + p[i].Destination + "</td>";
                newline += "<td>" + p[i].vol + "</td>";
                newline += "<td>" + p[i].wei + "</td>";
                newline += "<tr>";

                $("#tablebody")[0].innerHTML += newline;
            }
        }

    });

})

