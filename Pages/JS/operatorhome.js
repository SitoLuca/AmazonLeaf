$(document).ready(function () {

    const xhttpr = new XMLHttpRequest();
    const url = "http://127.0.0.1:10000";
    xhttpr.open('POST', url+'/operatorHome', true);
    xhttpr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttpr.send()
    xhttpr.onload = () => {
        if (xhttpr.status === 200) {
            const response = xhttpr.response
            if (response !== "0") {

                const p = JSON.parse(response)

                let newline = "";

                if (p.length > 0) {

                    for (let i = 0; i < p.length; ++i) {
                        newline = "<tr>";
                        newline += "<td>" + p[i][0] + "</td>";
                        newline += "<td>" + p[i][1] + "</td>";
                        newline += "<td>" + p[i][2] + "</td>";
                        newline += "<td>" + p[i][3] + "</td>";

                        if (p[i][4] !== null) {
                            newline += "<td style = 'color: green; font-weight: bold'>Delivered</td>";
                        } else {
                            newline += "<td style = 'color: gray; font-weight: bold'>Waiting...</td>";
                        }

                        newline += "<tr>";

                        $("#tablebody")[0].innerHTML += newline;
                    }

                } else {
                    newline = "<tr><td>No Data Found</td></tr>";
                    $("#tablebody")[0].innerHTML += newline;
                }

            }
        } else {
            console.log("Error detrected")
        }
    };


})

function savepackage() {

    let code = $("#newcode");
    let dest = $("#newdest");
    let v = $("#newv");
    let w = $("#newv");
    const url = "http://127.0.0.1:10000";

    if (code.val() === '' || dest.val() === '' || v.val() === '' || w.val() === '') {
        alert("Not Enugh Data, fill all fields");
    } else {

        const xhttpr = new XMLHttpRequest();

        xhttpr.open('POST', url+'/addpkg', true);
        xhttpr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttpr.send(JSON.stringify({"code": code.val(), "dest": dest.val(), "vol": v.val(), "wei": w.val()}))

        if (xhttpr.status === 200) {

            const response = xhttpr.response
            alert(response)
            location.reload()

        }

    }

}

