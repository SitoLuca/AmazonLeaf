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
                    `<td id = 'code'>${pack[0]}</td><td>${pack[1]}</td><td id = 'W'>${pack[2]}</td><td id = 'V'>${pack[3]}</td>` +
                    `</tr>`;
            });

            parsedResponse.Vehicles.forEach(function (veichle) {
                $('#veicle_tab')[0].innerHTML += `<tr class = 'vehiclerow'>` +
                    `<td>${veichle[0]}</td><td>${veichle[2]}</td><td>${veichle[3]}</td><td>${veichle[1]}</td>` +
                    `</tr>`;
            });
        }
        $(".vehiclerow").on("click", function () { //Le richieste sono asicrone quindi va messo qua
            putvehicle($(this));
        });

        $(".packagerow").on("click", function () {
            putpack($(this));
        });

    }

});

var is_selected = 0;
var counter = 0;
var actualw = 0;
var actualv = 0;

function putvehicle(elem) {

    if (!is_selected) {

        is_selected = 1;

        let plate = elem.find("td")[0].innerHTML;
        let mw = elem.find("td")[1].innerHTML
        let mv = elem.find("td")[2].innerHTML

        $(".grid").css("display", "grid");
        $("#hidden_plate").val(plate);
        $("#hidden_totv").val(mv);
        $("#hidden_totw").val(mw);

        $("#spacevalue")[0].innerText += mv;
        $("#weightvalue")[0].innerText += mw;

        elem.remove();
        $("#title")[0].remove();

    }

}

function putpack(elem) {

    if (is_selected) {

        const code = elem.find("#code")[0].innerHTML;
        const vol = parseFloat(elem.find("#V")[0].innerHTML);
        const wei = parseFloat(elem.find("#W")[0].innerHTML);

        let newSpaceAvailable = parseFloat($("#spacevalue")[0].innerHTML);
        let newWeightAvailable = parseFloat($("#weightvalue")[0].innerHTML);


        newWeightAvailable -= wei;
        newSpaceAvailable -= vol;

        if (newWeightAvailable < 0) {
            alert("Too Heavy!");
            return;
        }

        if (newSpaceAvailable < 0) {
            alert("Not Enough Space")
            return;
        }

        let maxw = $("#hidden_totw")[0].value;
        let maxv = $("#hidden_totv")[0].value;

        actualw += wei;
        actualv += vol;

        let percw =  (actualw / maxw) * 100;
        let percv = (actualv / maxv) * 100;

        let camV = $("#camionV");
        let camW = $("#camionW");

        if (percv > 25){ //not that elegant :\
            camV.attr("src","../IMG/camion_loading_bar_25.png");
        }
        if (percv > 50){
            camV.attr("src","../IMG/camion_loading_bar_50.png");
        }
        if (percv > 75){
            camV.attr("src","../IMG/camion_loading_bar_75.png");
        }
        if (percv > 98){
            camV.attr("src","../IMG/camion_loading_bar_full.png");
        }

        if (percw > 25){
            camW.attr("src","../IMG/camion_loading_bar_25.png");
        }
        if (percw > 50){
            camW.attr("src","../IMG/camion_loading_bar_50.png");
        }
        if (percw > 75){
            camW.attr("src","../IMG/camion_loading_bar_75.png");
        }
        if (percw > 98){
            camW.attr("src","../IMG/camion_loading_bar_full.png");
        }


        $("#weightvalue")[0].innerHTML = parseFloat(newWeightAvailable).toFixed(3);
        $("#spacevalue")[0].innerHTML = parseFloat(newSpaceAvailable).toFixed(3);

        let tab = $("#arrangement_packs")[0];

        counter++;

        let newline = "<tr>";
        newline += "<td id = 'pack_' " + counter + ">" + code + "</td><td>" + wei + "</td><td>" + vol + "</td>";
        newline += "</tr>";

        tab.innerHTML += newline;

        elem.remove();


    }

}

function assigtoveicle() {
    if(is_selected && counter > 0){
        console.log("napoli");
    }
}