let selecione = document.querySelector("#selecione");
let materiais = document.getElementsByTagName("materias")[0].value;
let roupas = document.getElementsByTagName("roupas")[1].value;
let restaurante = document.getElementsByTagName("restaurante")[2].value;
let informatica = document.getElementsByTagName("informatica")[3].value;

const OnClick = 0;

function OnClick(event){
   selecione.getElementById("comercios");
   if(selecione == materais){
       href = "./construção/construção.html";
   }
}