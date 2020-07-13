
/*
        SECCION DE USUARIO
******************************
INGRESE LAS LETRAS CON LAS QUE DESEA TRABAJAR
Luego ingrese simplemente un destino más
Este está formado por una ruta
*********************************
*/
//A = 0, B=1, C=2 ......
const letra = ['A','B','C','D','E','F'];
const destinos = [{ini:0,des:1,dis:2},//De A hacia B con una distancia de 2
    {ini:0,des:4,dis:4},//De A hacia E con una distancia de 4
    {ini:1,des:2,dis:3},
    {ini:2,des:3,dis:5},
    {ini:2,des:4,dis:1},
    {ini:3,des:0,dis:8},
    {ini:4,des:3,dis:7},
    {ini:5,des:0,dis:4}];



/*

******************************
*********************************
*/



//CODIGO


const headTable = document.getElementById('headTable');
const bodyTable = document.getElementById('bodyTable');
const informacion = document.getElementById('informacion');
class Punto{
    constructor(letra){
        this.letra = letra;
        this.relaciones = new Array();
    }
    agregarDestinos(nodoDestino,distancia){
        this.relaciones.push({nodoDestino,distancia});
    }
}
let Tabla = null;
var Puntos = new Array();





function agregarPunto(indice){
    Puntos[indice] = new Punto(letra[indice]);
}
function agregarDestino(inicio,destino,distancia){
    Puntos[inicio].agregarDestinos(Puntos[destino],distancia);
}

//Agrego todo los puntos
for(let i=0;i<letra.length;i++){
    agregarPunto(i);
}

for(let i=0;i<destinos.length;i++){
    agregarDestino(destinos[i].ini,destinos[i].des,destinos[i].dis);
}
//FILA


//LLENAR LA COLUMNA
function construir(){
    Tabla = new Array(Puntos.length+1);
    for(let i=0;i<=Puntos.length;i++){
    Tabla[i] = new Array(Puntos.length+1);
    }
    Tabla[0][0] = '$';
    for(let i=1;i<Tabla.length;i++){
        Tabla[0][i] = Puntos[i-1].letra;
    }
    for(let i=1;i<Tabla.length;i++){
        Tabla[i][0] = Puntos[i-1].letra;
    }
    for(let i=0;i<Puntos.length;i++){
        for(let j=0;j<Puntos.length;j++){
            for(let k=0;k<Puntos[j].relaciones.length;k++){
                if(Puntos[i].letra == Puntos[j].relaciones[k].nodoDestino.letra){
                    console.log(Puntos[i].letra," es destino de ",Puntos[j].letra);
                    let posicionFila;
                    let posicionColumna;
                    for(let l=1;l<Tabla.length;l++){
                        if(Puntos[i].letra == Tabla[0][l]){
                            posicionColumna = l;
                        }
                        if(Puntos[j].letra == Tabla[l][0]){
                            posicionFila = l;
                        }
                    }    
                    informacion.innerHTML += `${Puntos[i].letra} es destino de ${Puntos[j].letra} con distancia ${Puntos[j].relaciones[k].distancia}<br>`; 
                          
                    console.log(" valor ",Puntos[j].relaciones[k].distancia," En [",posicionFila,"][",posicionColumna,"]");
                    Tabla[posicionFila][posicionColumna] = Puntos[j].relaciones[k].distancia;
                }
            }
        }
    }
}


function mostrarTabla(){
    for(let i=0;i<Tabla.length;i++){
        headTable.innerHTML += `
            <th scope="col">${Tabla[0][i]}</th>
        `;
    }
    function texto(fila){
        let texto = "";
        for(let i=1;i<Tabla.length;i++){
            if(Tabla[fila][i] != undefined){
                texto += `<td class="bg-warning mr-0">${Tabla[fila][i]}</td>`;
                
            }
            else{
                texto += `<td class="bg-secondary mr-0">*</td>`;
            }
            
        }
      
        return texto;
    
    }
    for(let i=1;i<Tabla.length;i++){
        bodyTable.innerHTML += `
            <tr>
                <th scope="row">${Tabla[i][0]}</th>
                ${texto(i)}
            </tr>
        `;
    }
}
construir();
mostrarTabla();



