function calculateKPI() {
    const energia_elettrica = parseFloat($('#energia_elettrica').val())
    const fotovoltaico = parseFloat($('#fotovoltaico').val())
    const metano = parseFloat($('#metano').val())
    const gpl = parseFloat($('#gpl').val())
    const gasolio = parseFloat($('#gasolio').val())
    const km_benzina = parseFloat($('#km_benzina').val())
    const km_diesel = parseFloat($('#km_diesel').val())
    const km_gpl = parseFloat($('#km_gpl').val())
    const km_metano = parseFloat($('#km_metano').val())
    const km_eletric = parseFloat($('#km_eletric').val())
    const km_plug = parseFloat($('#km_plug').val())
    const km_mid = parseFloat($('#km_mid').val())
    const voli_brevi = parseFloat($('#voli_brevi').val())
    const voli_medi = parseFloat($('#voli_medi').val())
    const voli_lunghi = parseFloat($('#voli_lunghi').val())
    const voli_xl = parseFloat($('#voli_xl').val())
    const num_dipendenti = parseFloat($('#num_dipendenti').val())
    const id_azienda = parseFloat($('#id_azienda').val())
    const url = "http://127.0.0.1:10000";


    const kpi_sost = ((energia_elettrica * 0.36) + (fotovoltaico * 0.053) + (metano * 1.8) + (gpl * 1.61) + (gasolio * 3.14) - (km_benzina * 0.189) + (km_diesel * 0.196) + (km_gpl*0.134) + (km_metano * 0.114) + (km_eletric*0.02) + (km_plug*0.085) + (km_mid*0.125) + (voli_brevi*0.066*1600) + (voli_medi*0.066*3200) + (voli_lunghi*0.066*4800) + (voli_xl*0.066*6400))/num_dipendenti;
    console.log(kpi_sost)
    const xhttpr = new XMLHttpRequest();
    xhttpr.open('POST', url+'/updateKPI', true);

    xhttpr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttpr.send(JSON.stringify(
        { "kpi_sost": kpi_sost,
            "energia_elettrica": energia_elettrica,
            "fotovoltaico": fotovoltaico,
            "metano": metano,
            "gpl": gpl,
            "gasolio": gasolio,
            "km_benzina": km_benzina,
            "km_diesel": km_diesel,
            "km_gpl": km_gpl,
            "km_eletric": km_eletric,
            "km_plug": km_plug,
            "km_mid": km_mid,
            "voli_brevi": voli_brevi,
            "voli_medi": voli_medi,
            "voli_lunghi": voli_lunghi,
            "voli_xl": voli_xl,
            "num_dipendenti": num_dipendenti,
            "id_azienda": id_azienda
        }));

    xhttpr.onload = () => {
        if (xhttpr.status === 200) {
            const response = xhttpr.response
            if (response === "Done") {
                window.location.href = "courier_opHome.html";
            } else {
                alert("Error")
            }
        } else {
            // Handle error
        }
    };
}