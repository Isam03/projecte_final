const BaseUrl = "http://localhost:3000/api/actividades";
var llista = [];
var llistaresp = [];
var llistaTasques = [];



// $(function () {
//     $("#campoResponsable").selectize({plugins: ['remove_button']});
//   });

//   $(function () {
//     $("#editCampoResponsable").selectize({plugins: ['remove_button']});
//   });

/// AQUI COMENÇA LA PART DE RESPONSABLES

const llistat = document.getElementById("personas");
const llistatTasques = document.getElementById("cos");
const llistatTasquesDoing = document.getElementById("cos2");
const llistatTasquesDone = document.getElementById("cos3");
const campoNombre = document.getElementById("campoNombre");
const campoApellido = document.getElementById("campoApellido");
const campoUsuario = document.getElementById("campoUsuario");
var idActual = "";
var numeroPos = "";

llistarResponsables();

llistarTasques();

let botoEdit = document.getElementById("botonEditar");


botoEdit.addEventListener('click', () => { 
    modificarTasca(idActual, numeroPos) });

function llistarResponsables() {

    fetch(BaseUrl)
        .then((res) => {
            // Codi quan ha anat bé.
            // console.log("Correcte: ", res);
            if(res.ok) {
                res.json()
                .then((res2) => {
                    llista = res2;
                    pintarLlista(res2);
                })
            } else {
                console.log("Error!");
            }
        })
        .catch((err) => {
            console.log("Error: ", err);
        })
}

function llistarTasques() {

    fetch(BaseUrl2)
        .then((res) => {
            // Codi quan ha anat bé.
            // console.log("Correcte: ", res);
            if(res.ok) {
                res.json()
                .then((res2) => {
                    llista = res2;
                    pintarLlistaTasques(res2);
                })
            } else {
                console.log("Error!");
            }
        })
        .catch((err) => {
            console.log("Error: ", err);
        })
}



//Afegeix un nou responsable
function afegirResponsable() {
	
	/*Obtenir dades del formulari*/
    const responsable = ObtenirDadesForm();
   
	fetch(BaseUrl, 
    {
        method: "POST",
        body: JSON.stringify(responsable),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((res) => {
            if(res.ok) {
                res.json()
                    .then((res2) => {
                        llista = res2;
                        pintarLlista(res2);
                    })
            } else {
                console.log("Error!")
            }
        })
        .catch((err) => {
            console.log("Error: ", err);
        })
}

function eliminarResponsable(idActual) {
   
	fetch(BaseUrl + "/" + idActual, 
    {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((res) => {
            if(res.ok) {
                res.json()
                    .then((res2) => {
                        llista = res2;
                        pintarLlista(llista);
                    })
            } else {
                console.log("Error!")
            }
        })
        .catch((err) => {
            console.log("Error: ", err);
        })
}


//Mostra el llistat de verdures en un llista html
function pintarLlista(responsables) {

    var items = responsables.map(function(x) { return { valor: x._id , text: x.nombre + " " + x.apellido  }; });
    $(function () {
        $("#campoResponsable").selectize({
            plugins: ["restore_on_backspace", "remove_button"],
            delimiter: " - ",
            persist: false,
            maxItems: null,
            valueField: "valor",
            labelField: "text",
            searchField: "text",
            options: items,
        });
        
        $("#editCampoResponsable").selectize({
            plugins: ["restore_on_backspace", "remove_button"],
            delimiter: " - ",
            persist: false,
            maxItems: null,
            valueField: "valor",
            labelField: "text",
            searchField: "text",
            options: items,
        });
    });

    llistat.innerHTML = "";
    const divCardElement = document.createElement("div");

    responsables.forEach((actual) => {
        console.log(actual._id);
        const h5Element = document.createElement("h5");
        
        divCardElement.classList.add("card");
        divCardElement.classList.add("mb-3");
        const divBodyElement = document.createElement("div");
        divBodyElement.classList.add("card-body");
        const divCenterElement = document.createElement("div");
        divCenterElement.classList.add("container-fluid");
        const divRowElement = document.createElement("div");
        divRowElement.classList.add("row");
        divRowElement.classList.add("row-cols-2");
        const divColElement1 = document.createElement("div");
        divColElement1.classList.add("col");
        const divColElement2 = document.createElement("div");
        divColElement2.classList.add("col");
        divColElement2.classList.add("d-grid");
        divColElement2.classList.add("gap-2");
        divColElement2.classList.add("d-md-flex");
        divColElement2.classList.add("justify-content-md-end");
        const h6Element = document.createElement("h6");
        h6Element.classList.add("card-subtitle");
        h6Element.classList.add("mb-2");
        h6Element.classList.add("text-muted");
        //boto
        const buttonElement = document.createElement("button");
        buttonElement.classList.add("btn");
        buttonElement.classList.add("btn-light");
            h5Element.classList.add("card-title");
            h5Element.innerText = `${actual.nombre} ${actual.apellido}`;
            h6Element.innerText = `${actual.nombreUsuario}`;
            buttonElement.setAttribute("type","button");
            buttonElement.setAttribute("Onclick","eliminarResponsable(\"" + actual._id + "\")");
            buttonElement.innerHTML = "<i class='fa-regular fa-trash-can' aria-label='delete'></i>"
            // pElement.addEventListener("click", () => {
            //      inputPreu.value = actual.nombre;
            //      inputNom.value = actual.apellido;
            //      idActual = actual._id;
            // })
        divColElement2.appendChild(buttonElement);
        divColElement1.appendChild(h5Element);
        divRowElement.appendChild(divColElement1);
        divRowElement.appendChild(divColElement2);
        divCenterElement.appendChild(divRowElement);
        divCenterElement.appendChild(h6Element);
        divBodyElement.appendChild(divCenterElement);
        divCardElement.appendChild(divBodyElement);
    });

    llistat.appendChild(divCardElement);
}

//Obte les dades del formulari per la gestio de verdures
function ObtenirDadesForm() {
    let myForm = document.getElementById("formResponsables");
    
    const responsable = {
        "nombre": myForm.nombre.value,
        "apellido": myForm.apellido.value,
        "nombreUsuario": myForm.nombreUsuario.value
    }

    return responsable;
}


/// AQUI COMENÇA LA PART DE TASQUES

function pintarLlistaTasques(tasques) {

    llistatTasques.innerHTML = "<br>";
    llistatTasquesDoing.innerHTML = "<br>";
    llistatTasquesDone.innerHTML = "<br>";
    const divCardElementall = document.createElement("div");
    var tarea = 1;
    tasques.forEach((actual) => {
        console.log(actual._id);

        tarea += 1;
        let pos = actual.posicion;
        // Caixa tasca
        const divCardElement = document.createElement("div");
        divCardElement.setAttribute("id", tarea );
        divCardElement.setAttribute("value", actual._id );
        divCardElement.setAttribute("posicion",pos);
        divCardElement.setAttribute("draggable","true");
        divCardElement.setAttribute("ondragstart","onDragStart(event)");
        divCardElement.classList.add("card");
        divCardElement.classList.add("text-bg-" + actual.color);
        divCardElement.classList.add("mb-3");
        divCardElement.classList.add("tarea");

        // card-body (conte titol, botons, y descripcio)

        let divCardBody = document.createElement("div");
        divCardBody.classList.add("card-body");

        // Container-fluid

        let divContainerFluid = document.createElement("div");
        divContainerFluid.classList.add("container-fluid");

        // fila y columnes
        let divRow = document.createElement("div");
        divRow.classList.add("row");
        divRow.classList.add("row-cols-2");
        // primera columna
        let firstCol = document.createElement("div");
        firstCol.classList.add("col");
        // segona columna
        let secondCol = document.createElement("div");
        secondCol.classList.add("col");
        secondCol.classList.add("d-md-flex");
        secondCol.classList.add("justify-content-md-end");
        // titol
        let titleH5 = document.createElement("h5");
        titleH5.setAttribute("id","tarea-titulo");
        titleH5.setAttribute("data-bs-toggle","tooltip");
        titleH5.setAttribute("data-bs-placement","top");
        titleH5.setAttribute("title",actual.titulo);
        titleH5.classList.add("card-title");
        titleH5.innerHTML= actual.titulo_corto;
        // botons
        /// boto eliminar
        let deleteBtn = document.createElement("button");
        deleteBtn.classList.add("btn");
        deleteBtn.classList.add("btn-outline-light");
        deleteBtn.setAttribute("type","button");
        deleteBtn.setAttribute("Onclick","eliminarTasca(\"" + actual._id + "\")");
        deleteBtn.innerHTML = "<i class='fa-regular fa-trash-can' aria-label='delete'></i>";
        /// boto editar
        let editBtn = document.createElement("button");
        editBtn.classList.add("btn");
        editBtn.classList.add("btn-outline-light");
        editBtn.classList.add("ms-2");
        editBtn.setAttribute("type","button");
        editBtn.setAttribute("data-bs-toggle","modal");
        editBtn.setAttribute("data-bs-target","#editModal");
        editBtn.addEventListener("click",() => {
                idActual = actual._id;
                numeroPos = actual.posicion;
                console.log("pos" + numeroPos);
            });
        editBtn.setAttribute("value",actual._id);
        editBtn.innerHTML = "<i class='fa-regular fa-pen-to-square' aria-label='edit'></i>";
        // zona descripcio
        let descriptionElement = document.createElement("p");
        descriptionElement.classList.add("card-text");
        descriptionElement.innerHTML = actual.descripcion;
        // pastilles de responsables

        

        
        
        
        let resp = actual.responsable;
        fetch('/api/responsables')
            .then(response => response.json())
            .then(data => {
                llistaresp = data;

                for (let x = 0; x < llistaresp.length; x++) {
                    for (let y = 0; y < resp.length; y++) {
                        // console.log("Comparando " + llistaresp[x]._id + " con " + resp[y]);
                        if (llistaresp[x]._id === resp[y]) {
                            // console.log("pastilla " + llistaresp[x].nombreUsuario);
                            let respPill = document.createElement("span");
                            respPill.classList.add("badge");
                            respPill.classList.add("me-2");
                            respPill.classList.add("rounded-pill");
                            respPill.classList.add("bg-light");
                            respPill.classList.add("text-dark");
                            respPill.innerHTML += llistaresp[x].nombre + " " + llistaresp[x].apellido;
                            divContainerFluid.appendChild(respPill);
                        }
                    }
                }
                
        });
        
        
        // card-footer
        let cardFooter = document.createElement("div");
        cardFooter.classList.add("card-footer");
        // fila y columnes footer
        let divRowFooter = document.createElement("div");
        divRowFooter.classList.add("row");
        divRowFooter.classList.add("row-cols-2");
        // primera columna footer
        let firstColFooter = document.createElement("div");
        firstColFooter.classList.add("col");
        firstColFooter.innerHTML = "<i class='fa-regular fa-calendar'></i>&nbsp;";
        firstColFooter.innerHTML += actual.fecha_creacion //("DD/MM/YYYY");
        // segona columna footer
        let secondColFooter = document.createElement("div");
        secondColFooter.classList.add("col");
        secondColFooter.classList.add("d-md-flex");
        secondColFooter.classList.add("justify-content-md-end");
        secondColFooter.classList.add("align-items-center");
        secondColFooter.innerHTML = "<i class='fa-regular fa-calendar-check'></i>&nbsp;";
        secondColFooter.innerHTML += actual.fecha_finalizacion //("DD/MM/YYYY");
        

        ///
        /// instruccions append

        // card-body a div principal
        divCardElement.appendChild(divCardBody);
        // container-fluid a card-body
        divCardBody.appendChild(divContainerFluid);
        // rows a container-fluid
        divContainerFluid.appendChild(divRow);
        // columnes a rows
        divRow.appendChild(firstCol);
        divRow.appendChild(secondCol);
        // titol a la primera columna
        firstCol.appendChild(titleH5);
        // botons d'eliminar i editar a la segona columna
        secondCol.appendChild(deleteBtn);
        secondCol.appendChild(editBtn);
        // descripcio a container-fluid
        divContainerFluid.appendChild(descriptionElement);
        // // pastilles de responsables a card-body
        // divContainerFluid.appendChild(respPill);
        // footer a div principal
        divCardElement.appendChild(cardFooter);
        // rows footer a card-footer
        cardFooter.appendChild(divRowFooter);
        // columnes a rows footer
        divRowFooter.appendChild(firstColFooter);
        divRowFooter.appendChild(secondColFooter);



        divCardElementall.append(divCardElement);/////esto no se lo que hace

        if (actual.posicion == "2")
        {
            llistatTasquesDoing.appendChild(divCardElement);
        }
    
        if (actual.posicion == "3")
        {
            llistatTasquesDone.appendChild(divCardElement);
        }
    
        if (actual.posicion == "1")
        {
            llistatTasques.appendChild(divCardElement);
        }


        

 
        

  




        
        // const divBodyElement = document.createElement("div");
        // divBodyElement.classList.add("card-body");
        // const divCenterElement = document.createElement("div");
        // divCenterElement.classList.add("container-fluid");
        // const divRowElement = document.createElement("div");
        // divRowElement.classList.add("row");
        // divRowElement.classList.add("row-cols-2");
        // const divColElement1 = document.createElement("div");
        // divColElement1.classList.add("col");
        // const divColElement2 = document.createElement("div");
        // divColElement2.classList.add("col");
        // divColElement2.classList.add("d-grid");
        // divColElement2.classList.add("gap-2");
        // divColElement2.classList.add("d-md-flex");
        // divColElement2.classList.add("justify-content-md-end");
        // const h6Element = document.createElement("h6");
        // h6Element.classList.add("card-subtitle");
        // h6Element.classList.add("mb-2");
        // h6Element.classList.add("text");
        // //boto
        // const buttonElement = document.createElement("button");
        // buttonElement.classList.add("btn");
        // buttonElement.classList.add("btn-light");
        //     h5Element.classList.add("card-title");
        //     h5Element.innerText = `${actual.titulo_corto}`;
        //     h6Element.innerText = `${actual.descripcion}`;
        //     buttonElement.setAttribute("type","button");
        //     buttonElement.setAttribute("Onclick","eliminarResponsable(\"" + actual._id + "\")");
        //     buttonElement.innerHTML = "<i class='fa-regular fa-trash-can' aria-label='delete'></i>"
        //     // pElement.addEventListener("click", () => {
        //     //      inputPreu.value = actual.nombre;
        //     //      inputNom.value = actual.apellido;
        //     //      idActual = actual._id;
        //     // })
        // divColElement2.appendChild(buttonElement);
        // divColElement1.appendChild(h5Element);
        // divRowElement.appendChild(divColElement1);
        // divRowElement.appendChild(divColElement2);
        // divCenterElement.appendChild(divRowElement);
        // divCenterElement.appendChild(h6Element);
        // divBodyElement.appendChild(divCenterElement);
        // divCardElement.appendChild(divBodyElement);
    });

    
}

//Afegeix una nova tasca
function afegirTasca() {
	
	/*Obtenir dades del formulari*/
    const tasca = ObtenirDadesFormTasca();
   
	fetch(BaseUrl2, 
    {
        method: "POST",
        body: JSON.stringify(tasca),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((res) => {
            if(res.ok) {
                res.json()
                    .then((res2) => {
                        llista = res2;
                        pintarLlistaTasques(res2);
                    })
            } else {
                console.log("Error!")
            }
        })
        .catch((err) => {
            console.log("Error: ", err);
        })
}

//Obte les dades del formulari per la tasca
function ObtenirDadesFormTasca() {
    let tascaForm = document.getElementById("formulario");
    let color = "";
    

    var resp = [];
    for(let opcion of document.getElementById('campoResponsable').options){

        if(opcion.selected){
            resp.push(opcion.value);
        }
    }

    if(tascaForm.color.value == "urgente"){
        color = "warning";
      }
      else if(tascaForm.color.value == "importante"){
        color = "danger";
      }
      else if(tascaForm.color.value == "alta"){
        color = "primary";
      }
      else if(tascaForm.color.value == "media"){
        color = "info";
      }
      else if(tascaForm.color.value == "baja"){
        color = "secondary";
      }

      let titulo_corto = tascaForm.titulo.value;

      if(tascaForm.titulo.value.length > 22){
            titulo_corto = tascaForm.titulo.value.substring(0,22) + "...";
      }
    
    const tasca = {
        "titulo": tascaForm.titulo.value,
        "titulo_corto": titulo_corto,
        "descripcion": tascaForm.descripcion.value,
        "color": color,
        "fecha_creacion": tascaForm.fecha_inicio.value,
        "fecha_finalizacion": tascaForm.fecha_final.value,
        "responsable": resp,
        "posicion": "1"
    }

    return tasca;
}

//Elimina tasca
function eliminarTasca(idActual) {
   
	fetch(BaseUrl2 + "/" + idActual, 
    {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((res) => {
            if(res.ok) {
                res.json()
                    .then((res2) => {
                        llistaTasques = res2;
                        pintarLlistaTasques(llistaTasques);
                    })
            } else {
                console.log("Error!")
            }
        })
        .catch((err) => {
            console.log("Error: ", err);
        })
}

//Obte les dades del formulari per editar la tasca
function ObtenirDadesFormTascaEdit(num) {
    let tascaForm = document.getElementById("formularioEdit");
    let color = "";
    let pos = num;

    var resp = [];
    for(let opcion of document.getElementById('editCampoResponsable').options){

        if(opcion.selected){
            resp.push(opcion.value);
        }
    }

    if(tascaForm.color.value == "urgente"){
        color = "warning";
      }
      else if(tascaForm.color.value == "importante"){
        color = "danger";
      }
      else if(tascaForm.color.value == "alta"){
        color = "primary";
      }
      else if(tascaForm.color.value == "media"){
        color = "info";
      }
      else if(tascaForm.color.value == "baja"){
        color = "secondary";
      }

      let titulo_corto = tascaForm.titulo.value;

      if(tascaForm.titulo.value.length > 22){
            titulo_corto = tascaForm.titulo.value.substring(0,22) + "...";
      }
    
    const tasca = {
        "titulo": tascaForm.titulo.value,
        "titulo_corto": titulo_corto,
        "descripcion": tascaForm.descripcion.value,
        "color": color,
        "fecha_creacion": tascaForm.fecha_inicio.value,
        "fecha_finalizacion": tascaForm.fecha_final.value,
        "responsable": resp,
        "posicion": pos
    }

    return tasca;
}

//Modificar tasca individual
function modificarTasca(idActual, num) {

	/*Obtenir dades del formulari*/
    const tasca = ObtenirDadesFormTascaEdit(num);
    
	fetch(BaseUrl2 + "/" + idActual, 
    {
        
        method: "PUT",
        body: JSON.stringify(tasca),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((res) => {
            console.log(res);
            if(res.ok) {
                res.json()
                    .then((res2) => {
                        llistaTasques = res2;
                        pintarLlistaTasques(llistaTasques);
                    })
            } else {
                console.log("Error!")
            }
        })
        .catch((err) => {
            console.log("Error: ", err);
        })
}

let idtarea = "";

function onDrop(event, num) {


    

    const id = event
    .dataTransfer
    .getData('text'); 

    idActual = event
    .dataTransfer
    .getData('data-value');

    let draggableElement = document.getElementById(id);
    document.getElementById(id).setAttribute("posicion" , num);

    const div = document.getElementById(id);

    const titulo = div.querySelector("#tarea-titulo").textContent.trim();
    const descripcion = div.querySelector(".card-text").textContent.trim();
    let color = "";
    if(div.classList.contains("text-bg-warning")){
        color = "warning";
    }
    if(div.classList.contains("text-bg-danger")){
        color = "danger";
    }
    if(div.classList.contains("text-bg-primary")){
        color = "primary";
    }
    if(div.classList.contains("text-bg-info")){
        color = "info";
    }
    if(div.classList.contains("text-bg-secondary")){
        color = "secondary";
    } 
    
    const fecha_creacion = div.querySelector(".fa-calendar").nextSibling.textContent.trim();
    const fecha_finalizacion = div.querySelector(".fa-calendar-check").nextSibling.textContent.trim();


    const tassca = {
        "titulo": titulo,
        "titulo_corto": titulo,
        "descripcion": descripcion,
        "color": color,
        "fecha_creacion": fecha_creacion,
        "fecha_finalizacion": fecha_finalizacion,
        "responsable": [],
        "posicion": num
    }
    

    const dropzone = event.target;
    dropzone.appendChild(draggableElement);

    

    fetch(BaseUrl2 + "/" + idActual, 
        {
            
            method: "PUT",
            body: JSON.stringify(tassca),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                console.log(res);
                if(res.ok) {
                    res.json()
                        .then((res2) => {
                            llistaTasques = res2;
                            pintarLlistaTasques(llistaTasques);
                        })
                } else {
                    console.log("Error!")
                }
            })
            .catch((err) => {
                console.log("Error: ", err);
            })

    event
        .dataTransfer
        .clearData();

        

}


function onDragStart(event) {
  event
    .dataTransfer
    .setData('text/plain', event.target.id);

    var value = event.target.getAttribute("value");
    event.dataTransfer.setData("data-value", value);

    
    //idtarea = document.getElementById(event.target.id).getAttribute("value");

}


function onDragOver(event) {
  event.preventDefault();
}




    


