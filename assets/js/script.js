

// const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

// meses.forEach(i => console.log(i));

// const valores = [true, 5, false, "hola", "adios", 2];

// valores.forEach((el, i) => {
//     console.log(el);
//     console.log(i);
// })

$("document").ready(function() {

    $.ajax({
        url: "https://us-central1-apis-varias-mias.cloudfunctions.net/regiones_comunas",
        type: "GET",
        success: function(data) {
            // console.log(data);
            const regionesFiltradas = data.map(obj => {
                return {
                    id: obj.id_region,
                    region: obj.region,
                }
            }).filter((item, i, regiones) => regiones.findIndex((el) => el.id === item.id) === i);

            for (const i of regionesFiltradas) {
                $("#region").append(`<option value="${i.region}">${i.region}</option>`)
            };
            console.log(regionesFiltradas);
        },
    });

    $("#region").on("click", (val) => {
        let regionOn = val.target.value;
        if(regionOn != "0") {
            console.log(regionOn);

            $.ajax({
                url: "https://us-central1-apis-varias-mias.cloudfunctions.net/regiones_comunas",
                type: "GET",
                success: function(data) {
                    const comunasFiltradas = data.map(obj => {
                        return {
                            id: obj.id_region,
                            comuna: obj.comuna,
                            region: obj.region
                        }
                    }).filter((el) => el.region === regionOn);
                    console.log(comunasFiltradas);

                    for (const i of comunasFiltradas) {
                        $("#comuna").append(`<option value="${i.comuna}">${i.comuna}</option>`)
                    }
                }
            });
        };
    });
});