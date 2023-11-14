$(document).ready(function () {
    const xhttpr = new XMLHttpRequest();

    const session = JSON.parse(readCookie("user"));
    let id = session["id"];

    xhttpr.open('POST', 'http://127.0.0.1:8000/courierHome', true);
    xhttpr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttpr.send(JSON.stringify({
        "id": id
    }));

    xhttpr.onload = () => {
        if (xhttpr.status === 200) {
            const response = xhttpr.response;

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
                        newline += "<td>" + p[i][4] + "</td>";

                        if (p[i][6] === 1) {
                            newline += "<td style = 'color: green; font-weight: bold'>Available</td>";
                        } else {
                            newline += "<td style = 'color: gray; font-weight: bold'>Traveling...</td>";
                        }

                        newline += "<tr>";

                        $("#tablebody")[0].innerHTML += newline;
                    }

                } else {
                    newline = "<tr><td>No Data Found</td></tr>";
                    $("#tablebody")[0].innerHTML += newline;
                }

            }
        }
        else {
            console.log("Error detrected")
        }
    };


});

$(document).ready(function () {
    $("#calkpi").on("click", function () {
        window.location.href = "/AmazonLeaf/Pages/calculateIS.html"
    })
});

function saveicle() {

    let plate = $("#plate").val();
    let fuel = $("#fuel").val();
    let brand = $("#brand").val();
    let maxw = $("#maxw").val();
    let maxv = $("#maxv").val();

    const session = JSON.parse(readCookie("user"));
    let id = session["id"];

    if (plate === "" || fuel === "" || brand === "" || maxw === "" || maxv === "") {
        alert("Not Enugh Data, fill all fields");
    } else {

        const xhttpr = new XMLHttpRequest();

        xhttpr.open('POST', 'http://127.0.0.1:8000/addveicle', true);
        xhttpr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttpr.send(JSON.stringify({
            "plate": plate,
            "fuel": fuel,
            "brand": brand,
            "maxW": maxw,
            "maxV": maxv,
            "id": id
        }));

        if (xhttpr.status === 200) {

            const response = xhttpr.response
            alert(response)
            location.reload()

        }

    }
}



