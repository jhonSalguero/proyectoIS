var readers = [new FileReader, new FileReader, new FileReader, new FileReader, new FileReader];
var documentos = [];
var arbol = [];
var directorios = [];


document.getElementById("botonArchivo").addEventListener("change", function (event) {

    let output = document.getElementById("panelArchivos");

    let arboles = document.getElementsByClassName("arbol");

    if (arboles.length == 1) {
        output.removeChild(arboles[0]);
    }

    let files = event.target.files;
    let direcciones = [];
    let rutas = [];
    let nivel = 0;
    let rutaTemp = files[0].webkitRelativePath;
    let raiz = rutaTemp.split("/");
    direcciones.push(raiz);
    let i = raiz.splice(1, 1);
    rutas.push(raiz[0]);
    for (let i = 0; i < files.length; i++) {

        directorios.push(files[i]);
        let rutaTemp = files[i].webkitRelativePath;
        for (let k = 0; k < readers.length; k++) {
            if (readers[k].readyState == 1 || k == (readers.length - 1)) {
                readers.push(new FileReader);
            } else {
                readers[k].readAsText(files[i]);
                readers[k].addEventListener("load", guardarTexto, false);
                break;
            }
        }
        rutas.push(rutaTemp);
        direcciones.push(rutaTemp.split("/"));
        if (direcciones[i].length >= nivel) {
            nivel = direcciones[i].length;
        }
    }
    let contTemp = nivel;
    for (let i = 0; i < direcciones.length; i++) {
        let nivelActual = nivel - contTemp;
        if (direcciones[i].length == (nivelActual)) {
            for (let j = 0; j < direcciones[i].length; j++) {
                if (!arbol.includes(direcciones[i][j])) {
                    arbol.push(direcciones[i][j]);
                    arbol.push(j + 1);
                }
            }
        }
        if (i == (direcciones.length - 1) && contTemp >= 0) {
            contTemp = contTemp - 1;
            i = -1;
        }
    }
    arbol[0] = arbol[0].replaceAll(' ', '_');
    let contDocu = 0;
    var arbolTemp = document.createElement("DIV");

    for (let i = 0; i < arbol.length; i = i + 2) {
        let item = document.createElement("DIV");
        item.innerHTML = arbol[i];
        item.classList.add("elementoLista");
        switch (arbol[i + 1]) {
            case 1:
                item.classList.add("nivel1");
                item.setAttribute("onclick", "alternar('" + arbol[0] + "')");
                break;
            case 2:
                item.classList.add("nivel2");
                if (/\.+[\w]{3,5}/.test(arbol[i])) {
                    item.setAttribute("onclick", "mostrarTexto( window.documentos[" + contDocu + "], '" + arbol[i] + "')");
                    contDocu = contDocu + 1;
                }
                item.classList.add(arbol[0]);

                break;
            case 3:
                item.classList.add("nivel3");
                if (/\.+[\w]{3,5}/.test(arbol[i])) {
                    item.setAttribute("onclick", "mostrarTexto( window.documentos[" + contDocu + "], '" + arbol[i] + "')");
                    contDocu = contDocu + 1;
                }
                item.classList.add(arbol[0]);
                break;
            case 4:
                item.classList.add("nivel4");
                if (/\.+[\w]{3,5}/.test(arbol[i])) {
                    console.log(contDocu);
                    item.setAttribute("onclick", "mostrarTexto( window.documentos[" + contDocu + "], '" + arbol[i] + "')");
                    contDocu = contDocu + 1;
                    console.log(contDocu);
                }
                item.classList.add(arbol[0]);

                break;
            case 5:
                item.classList.add("nivel5");
                if (/\.+[\w]{3,5}/.test(arbol[i])) {
                    item.setAttribute("onclick", "mostrarTexto( window.documentos[" + contDocu + "], '" + arbol[i] + "')");
                    contDocu = contDocu + 1;
                }
                item.classList.add(arbol[0]);
                break;
            case 6:
                item.classList.add("nivel6");
                if (/\.+[\w]{3,5}/.test(arbol[i])) {

                    item.setAttribute("onclick", "mostrarTexto( window.documentos[" + contDocu + "], '" + arbol[i] + "')");
                    contDocu = contDocu + 1;
                }
                item.classList.add(arbol[0]);
                break;
            case 7:
                item.classList.add("nivel7");
                if (/\.+[\w]{3,5}/.test(arbol[i])) {

                    item.setAttribute("onclick", "mostrarTexto( window.documentos[" + contDocu + "], '" + arbol[i] + "')");
                    contDocu = contDocu + 1;
                }
                item.classList.add(arbol[0]);
                break;
            case 8:
                item.classList.add("nive8");
                if (/\.+[\w]{3,5}/.test(arbol[i])) {

                    item.setAttribute("onclick", "mostrarTexto( window.documentos[" + contDocu + "], '" + arbol[i] + "')");
                    contDocu = contDocu + 1;
                }
                item.classList.add(arbol[0]);
                break;
            case 9:
                item.classList.add("nivel9");
                if (/\.+[\w]{3,5}/.test(arbol[i])) {

                    item.setAttribute("onclick", "mostrarTexto( window.documentos[" + contDocu + "], '" + arbol[i] + "')");
                    contDocu = contDocu + 1;
                }
                item.classList.add(arbol[0]);
                break;
        }
        arbolTemp.appendChild(item);
    }

    arbolTemp.classList.add("arbol");
    output.appendChild(arbolTemp);
}, false);
function guardarTexto(e) {
    let texto = e.target.result;
    var lineas = texto.split('\r');
    guardarArreglo(window.documentos, lineas);
}
function guardarArreglo(arreglo, lineas) {
    arreglo.push(lineas);
}
function alternar(texto) {
    let elementos = document.getElementsByClassName(texto);
    for (let i = 0; i < elementos.length; i++) {
        if (elementos[i].classList.contains("oculto")) {
            elementos[i].classList.remove("oculto")
        } else {
            elementos[i].classList.add("oculto")
        }
    }
}
function mostrarTexto(arreglo, nombre) {
    let panel = document.getElementById("textoCentral");
    let hijo = document.getElementsByClassName("hijo");
    let ContClases = 0, ContClasesabs = 0, ContInterfaces = 0, ContIf = 0, ContFor = 0, ContWhile = 0, ContDo = 0, ContForeach = 0, ContAtributos = 0, ContFunciones = 0, Complejidad =0;
   
    if (hijo.length == 1) {
        panel.removeChild(hijo[0]);
    }
    let divTemp = document.createElement("DIV");
    let info = document.createElement("DIV");
    let codigo = document.createElement("DIV");
    divTemp.classList.add("hijo");
    let lineaMayor = 0;
    console.log(nombre);
    let nomb = nombre.toString();
    for (let i = 0; i < arreglo.length; i++) {
        if (lineaMayor < arreglo[i].length) {
            lineaMayor = arreglo[i].length;
        }
       
        let item = document.createElement("DIV");
        var texto = document.createTextNode(arreglo[i] + "_______________" + arreglo[i].length + "  Caracteres");
        item.appendChild(texto);
        codigo.appendChild(item);

        //Expresion regular para validar la cantidad de clases
        if (/class/g.test(arreglo[i])) {
            ContClases++;
        }
        //Expresion regular para validar la cantidad de clases abstractas
        if (/abstract class/g.test(arreglo[i])) {
            ContClasesabs++;
        }
        //Expresion regular para validar la cantidad de interfaces
        if (/interface/g.test(arreglo[i])) {
            ContInterfaces++;
        }
        if (/if\s?\(\s*\w*(.)\w*\s?(==|&&|>|<|<=|<|!=|>=|\|{2}|)\s?\"?\w*\"?\)/g.test(arreglo[i])) {
            ContIf++;
        }
        if (/for\s?\(\w*\s?\w\s?\=\s?\d\;\s?\w*\s?(<|>|<=|>=)\s?\d*\;\s\w*(\+{2}|\-{2})\)/g.test(arreglo[i])) {
            ContFor++;
        }
        if (/while\s?\(\s?\w*\s?(<|>|<=|>=|==|!=)\s?\d*\s?\)/g.test(arreglo[i])) {
            ContWhile++;
        }
        if (/do\s?\{\s*/g.test(arreglo[i])) {
            ContDo++;
        }
        if (/for\s?\(\w*\s?\w*\s?\:\s?\w*\s?\)\s?\{/g.test(arreglo[i])) {
            ContForeach++;
        }
        if (/(public|private|static|final)?\s?(byte|short|int|long|float|double|boolean|char|String)\s?\w*\s?\=?\s?(\"|\')?(\d*|\w*)?(\"|\')?\;/g.test(arreglo[i])) {
            ContAtributos++;
        }
        if (/(public|private)?\s?(static|final)?\s?(void|byte|short|int|long|float|double|boolean|char|String)\s?\w*\(/g.test(arreglo[i])) {
            ContFunciones++;
        }
    }
    Complejidad = ComplejidadCiclomatica(arreglo);
    
    var cadena = arreglo.join(' ').toLowerCase();
    var re = /(\;|\{|\}|\/|\(|\)|\+|\=|\-|\"|\&|\d|\||\<|\>|\[|\]|\:|\!|\¡|\'|\?|\\n|\,)/g;
    var resultado = cadena.replace(re, ' ');
    let arrayPalabras;

    function dividirCadena(cadenaADividir, separador) {
        //Separa por espacios 
        var arrayDeCadenas = cadenaADividir.split(separador);
      
        //Elimina palabras repetidas
        arrayPalabras = arrayDeCadenas.filter((item,index)=>{
             return arrayDeCadenas.indexOf(item) === index;
        });
      
    }
    
    dividirCadena(resultado, " ");
    for(let k=0;k<arrayPalabras.length;k++){
        let cant = 0;
        //Elimina \n y espacios vacios
        if(arrayPalabras[k] === '' || arrayPalabras[k] === '\n'){
            arrayPalabras.splice(k,1);
        }
        var idx = (cadena.indexOf(arrayPalabras[k]));
        while (idx != -1) {
            cant++;
            idx = cadena.indexOf(arrayPalabras[k], idx + 1);
        }
        var tableRef = document.getElementById("tabla");
         //Creo una fila con dos columnas
        var newRow = tableRef.insertRow();
        var Cell = newRow.insertCell(0);
        var Cell2 = newRow.insertCell(1);
        //Variables con la palabra y cantidad
        var palabra = arrayPalabras[k];
        var cantidad = cant;
        //Asigno los valores a las celdas de la tabla
        var newText = document.createTextNode(palabra);
        Cell.appendChild(newText);
        var newText2 = document.createTextNode(cantidad);
        Cell2.appendChild(newText2);
    }

    Grafica(nomb, ContIf, ContFor, ContDo, ContForeach, ContWhile);
    Grafica2(nomb, ContClases, ContClasesabs, ContAtributos, ContFunciones, ContInterfaces);
    labels();

    let itemTemp = document.createElement("DIV");
    let textoTemp = document.createTextNode("****** Detalles del archivo ******");
    itemTemp.classList.add("tituloInfo");
    itemTemp.appendChild(textoTemp);
    info.appendChild(itemTemp);

    let archivo = document.createElement("DIV");
    let txtArchivo = document.createTextNode("Archivo: " + nombre);
    archivo.appendChild(txtArchivo);
    info.appendChild(archivo);

    let linea = document.createElement("DIV");
    let txtLinea = document.createTextNode("La linea mas larga tiene: " + lineaMayor + "caracteres");
    linea.appendChild(txtLinea);
    info.appendChild(linea);

    let cantLineas = document.createElement("DIV");
    let txtCantLineas = document.createTextNode("Cantidad de lineas: " + arreglo.length);
    cantLineas.appendChild(txtCantLineas);
    info.appendChild(cantLineas);

    let clases = document.createElement("DIV");
    let textoclases = document.createTextNode("Cantidad de clases: " + ContClases);
    clases.appendChild(textoclases);
    info.appendChild(clases);

    let clasesAbs = document.createElement("DIV");
    let textoclasesAbs = document.createTextNode("Cantidad de clases abstractas: " + ContClasesabs);
    clasesAbs.appendChild(textoclasesAbs);
    info.appendChild(clasesAbs);

    let interfaces = document.createElement("DIV");
    let txtinterfaces = document.createTextNode("Cantidad de interfaces: " + ContInterfaces);
    interfaces.appendChild(txtinterfaces);
    info.appendChild(interfaces);

    let cantidadIf = document.createElement("DIV");
    let txtIf = document.createTextNode("Cantidad de if: " + ContIf);
    cantidadIf.appendChild(txtIf);
    info.appendChild(cantidadIf);

    let cantidadFor = document.createElement("DIV");
    let txtFor = document.createTextNode("Cantidad de for: " + ContFor);
    cantidadFor.appendChild(txtFor);
    info.appendChild(cantidadFor);

    let cantidadWhile = document.createElement("DIV");
    let txtWhile = document.createTextNode("Cantidad de while: " + ContWhile);
    cantidadWhile.appendChild(txtWhile);
    info.appendChild(cantidadWhile);

    let cantidadDo = document.createElement("DIV");
    let txtDo = document.createTextNode("Cantidad de Do while: " + ContDo);
    cantidadDo.appendChild(txtDo);
    info.appendChild(cantidadDo);

    let cantidadFE = document.createElement("DIV");
    let txtFE = document.createTextNode("Cantidad de ForEach: " + ContForeach);
    cantidadFE.appendChild(txtFE);
    info.appendChild(cantidadFE);

    let atributos = document.createElement("DIV");
    let txtAtributos = document.createTextNode("Cantidad de atributos: " + ContAtributos);
    atributos.appendChild(txtAtributos);
    info.appendChild(atributos);

    let funciones = document.createElement("DIV");
    let txtFunciones = document.createTextNode("Cantidad de metodos o funciones: " + ContFunciones);
    funciones.appendChild(txtFunciones);
    info.appendChild(funciones);
    
    let complejidad = document.createElement("DIV");
    let txtComplejidad = document.createTextNode("Complejidad Ciclomatica: " + Complejidad);
    complejidad.appendChild(txtComplejidad);
    info.appendChild(complejidad);

    let espacio = document.createElement("DIV");
    let txtEspacio = document.createTextNode("---------------------------------------------------------------");
    espacio.appendChild(txtEspacio);
    info.appendChild(espacio);


    //tabla
    let tabla = document.createElement("DIV");
    var columna = document.createElement("DIV");
    var filaNombre = document.createElement("DIV");
    var filaTamaño = document.createElement("DIV");
    var nombre = document.createTextNode("ARCHIVO");
    var tamaño = document.createTextNode("TAMAÑO");
    filaNombre.classList.add("elementoTabla");
    filaTamaño.classList.add("elementoTabla");
    filaNombre.appendChild(nombre);
    filaTamaño.appendChild(tamaño);
    columna.appendChild(filaNombre);
    columna.appendChild(filaTamaño);
    columna.classList.add("columna");
    tabla.appendChild(columna);
    tabla.classList.add("tabla");
    for (var i = 0; i < directorios.length; i++) {
        columna = document.createElement("DIV");
        filaNombre = document.createElement("DIV");
        filaTamaño = document.createElement("DIV");
        nombre = document.createTextNode(window.directorios[i].name);
        tamaño = document.createTextNode(window.directorios[i].size + "Kb");

        filaNombre.appendChild(nombre);
        filaTamaño.appendChild(tamaño);
        filaNombre.classList.add("elementoTabla");
        filaTamaño.classList.add("elementoTabla");
        columna.appendChild(filaNombre);
        columna.appendChild(filaTamaño);
        columna.classList.add("columna");
        tabla.appendChild(columna);
        tabla.classList.add("tabla");
    }
    info.appendChild(tabla);


    info.classList.add("hijoInfo");
    codigo.classList.add("hijoCodigo");
    divTemp.appendChild(codigo);
    divTemp.appendChild(info);
    panel.appendChild(divTemp);

}

function Grafica(nomb, ContIf, ContFor, ContDo, ContForeach, ContWhile) {
    ///GRAFICO DE BARRAS
    var ctx = document.getElementById('myChart').getContext('2d');
    if (window.grafica) {
        window.grafica.clear();
        window.grafica.destroy();
    }
    window.grafica = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['IF', 'FOR', 'DO WHILE', 'FOREACH', 'WHILE'],
            datasets: [{
                    label: nomb,
                    data: [ContIf, ContFor, ContDo, ContForeach, ContWhile],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function Grafica2(nomb, ContClases, ContClasesabs, ContAtributos, ContFunciones, ContInterfaces) {
//Grafica de burbujas

    const data = {
        labels: ['Clases', 'Clases abstractas', 'Interfaces', 'Atributos', 'Funciones'],
        datasets: [{
                label: nomb,
                data: [
                    {x: 10, y: ContClases, r: 45},
                    {x: 20, y: ContClasesabs, r: 30},
                    {x: 30, y: ContInterfaces, r: 35},
                    {x: 40, y: ContAtributos, r: 50},
                    {x: 50, y: ContFunciones, r: 40}
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1,
                clip: false
            }]
    };

//config block
    const config = {
        type: 'bubble',
        data,
        options: {
            layout: {
                paddin: {
                    right: 20
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };

//init render block
    if (window.grafica1) {
        window.grafica1.clear();
        window.grafica1.destroy();
    }
    window.grafica1 = new Chart(
            document.getElementById('popChart'),
            config
            );
}

//botones graficas
function OBarras() {
    document.getElementById('GBarras').style.display = 'block';
    document.getElementById('GBurbujas').style.display = 'none';
    document.getElementById('textoCentral').style.display = 'none';
    document.getElementById('OcurrenciaP').style.display = 'none';
}
function OBurbujas() {
    document.getElementById('GBarras').style.display = 'none';
    document.getElementById('GBurbujas').style.display = 'block';
    document.getElementById('textoCentral').style.display = 'none';
    document.getElementById('OcurrenciaP').style.display = 'none';
}
function Ocurrencia() {
    document.getElementById('GBarras').style.display = 'none';
    document.getElementById('GBurbujas').style.display = 'none';
    document.getElementById('textoCentral').style.display = 'none';
    document.getElementById('OcurrenciaP').style.display = 'block';
}
function labels() {
    document.getElementById('header').style.display = 'block';
}

function Text() {
    document.getElementById('GBarras').style.display = 'none';
    document.getElementById('GBurbujas').style.display = 'none';
    document.getElementById('OcurrenciaP').style.display = 'none';

    var T = document.getElementById("textoCentral");
    if (T.style.display === "none") {
        T.style.display = "block";
    } else {
        T.style.display = "none";
    }
}


function ComplejidadCiclomatica(arreglo){
    var is_if = false ;
    var count_if = 0;
    var nodos = 2;
    var aristas = 1;
    var esperando_else = false
    
    for (let i = 0; i < arreglo.length; i++) {
        var line = arreglo[i].replace(/\n/gm, '')
        var line = arreglo[i]
        if(line != ""){
            var aux = line.replace(/\s/g, '')
            console.log(aux + '--------'+ is_if);
            if(esperando_else == true){
                esperando_else = false
                aristas += 1;
                if(aux.startsWith('else') || aux.startsWith('{else')){
                    if(count_if == 0){
                        is_if = false
                    }   
                }
            }
            else if (aux.startsWith('if') && aux.endsWith(';')){
                is_if = false;
                nodos += 1;
                aristas += 2;
            }else if (aux.startsWith('if')){
                is_if = true;
                nodos += 1;
                count_if += 1;
                aristas += 2;
                console.log("entro if");
                esperando_else = true;
            }else if ((aux.startsWith('elseif') || aux.startsWith('{elseif')) && is_if == true ){
                nodos += 1;
                aristas += 2;
                console.log("entro elseif");
            }else if ((aux.startsWith('else') || aux.startsWith('{else')) && is_if == true ){
                nodos += 2;
                aristas += 2;
                count_if -= 1;
                console.log("entro else");
            }else if ((aux.startsWith('}') || aux.endsWith('}')) && is_if == true  ){
                aristas += 2;
                count_if -= 1;
                nodos += 1;
                console.log("entro }");
                if(count_if == 0){
                        is_if = false
                    }   
                
            }
        }
    }
    
    nodos = nodos+1

    return aristas - nodos + 2
}


