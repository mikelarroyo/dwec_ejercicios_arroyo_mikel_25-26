/** Desarrolla un script que dado un array de números los ordene 
 * de forma ascendente o descendente (según indique el usuario) 
 * usando un método del objeto Array diseñado para ello.*/
console.log("T03 - Ejercicio 05");



const arr = [5,2,3,4,6,8,0,1,2,3];




let entrada;

do{
entrada = prompt("Como quieres ordenar los numeros de forma ascendente o descendente?");

if(entrada != "asc" && entrada != "desc"){
    alert("Introduce asc o desc");
}

}while(entrada != "asc" && entrada != "desc");

if(entrada == "asc"){
    arr.sort(function(a,b){
        return a - b
    })
    alert("Ascendente: " + arr);

} else {
    arr.sort(function(a,b){
        return b -a
    })
    alert("Descendente:" + arr);
}
