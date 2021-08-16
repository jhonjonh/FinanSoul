window.onload = function () {
  var elementBody = document.querySelector('body');
  var elementBtnIncreaseFont = document.getElementById('increase-font');
  var elementBtnDecreaseFont = document.getElementById('decrease-font');
  // Padrão de tamanho, equivale a 100% do valor definido no Body
  var fontSize = 100;
  // Valor de incremento ou decremento, equivale a 10% do valor do Body
  var increaseDecrease = 10;
  // Evento de click para aumentar a fonte
  elementBtnIncreaseFont.addEventListener('click', function (event) {
    fontSize = fontSize + increaseDecrease;
    elementBody.style.fontSize = fontSize + '%';
  });

  // Evento de click para diminuir a fonte
  elementBtnDecreaseFont.addEventListener('click', function (event) {
    fontSize = fontSize - increaseDecrease;
    elementBody.style.fontSize = fontSize + '%';
  });
};


var darkModeButton = document.getElementById("darkModeButton");
var body = document.getElementsByTagName("body")[0];
var conteiner1 = document.getElementById("conteiner1");
var conteiner2 = document.getElementById("conteiner2");
var textoConteudoMain = document.getElementById("TextoConteudoMain");
var Conteudo = document.getElementById("Conteudo");
var Titulo = document.getElementById("Titulo");
var footer = document.getElementsByTagName("footer")[0];
var creditos = document.getElementsByTagName("div")[5];
var imgFooter = document.getElementsByClassName("imgFooter");
var counter = 1;

function dark() {
  counter++
  if (counter % 2 == 0) {
    body.style.backgroundColor = "black";
    conteiner1.style.backgroundColor = "black";
    conteiner2.style.backgroundColor = "#3e2f18";
    Conteudo.style.backgroundColor = "black";
    textoConteudoMain.style.backgroundColor = "#3e2f18";
    textoConteudoMain.style.color = "#fff5d1";
    Titulo.style.backgroundColor = "#3e2f18";
    Titulo.style.color = "#fff5d1";
    darkModeButton.innerHTML = "Escuro";
    footer.style.backgroundColor = "#3e2f18";
    creditos.style.color = "#fff5d1";
    for (i in imgFooter) {
      imgFooter[i].style.filter = "invert(1)";
    }

  } else {
    body.style.backgroundColor = "white";
    conteiner1.style.backgroundColor = "#FFF5D1";
    conteiner2.style.backgroundColor = "#FBC779";
    Conteudo.style.backgroundColor = "white";
    textoConteudoMain.style.backgroundColor = "#E8A33B";
    textoConteudoMain.style.color = "black";
    Titulo.style.backgroundColor = "#E8A33B";
    Titulo.style.color = "white";
    darkModeButton.innerHTML = "Claro";
    footer.style.backgroundColor = "#FFF5D1";
    creditos.style.color = "black";
    for (j in imgFooter) {
      imgFooter[j].style.filter = "invert(0)";
    }
  }
}

function noNegative() {
  var valor = document.getElementById("valor").value;
  if ((valor < 0) || (valor == "e")) {
    alert("Digite um número positivo");
    document.getElementById("valor").value = "";
  }

}

function converter(valor, origem, destino) {
  var cotacao = new Array;
  cotacao = {
    "dolarAreal": 5.59,
    "dolarCreal": 4.51, 
    "euroreal": 6.64, 
    "librareal": 7.81, 
    "pesoreal": 0.06, 
    "realdolarA": 0.17, 
    "dolarCdolarA": 0.8, 
    "eurodolarA": 1.18, 
    "libradolarA": 1.38, 
    "pesodolarA": 0.01, 
    "realdolarC": 0.22, 
    "dolarAdolarC": 1.24, 
    "eurodolarC": 1.48, 
    "libradolarC": 1.72, 
    "pesodolarC": 0.013, 
    "realeuro": 0.14, 
    "dolarAeuro": 0.85, 
    "dolarCeuro": 0.67, 
    "libraeuro": 1.16, 
    "pesoeuro": 0.009, 
    "reallibra": 0.12, 
    "dolarAlibra": 0.72, 
    "dolarClibra": 0.57, 
    "eurolibra": 0.85, 
    "pesolibra": 0.01, 
    "realpeso": 16.24, 
    "dolarApeso": 96.57, 
    "dolarCpeso": 0.01, 
    "librapeso": 126.58, 
    "europeso": 108.44};
  var valor = document.getElementById("valor").value;
  var origem = document.getElementById("origem").value;
  var destino = document.getElementById("destino").value;
  var resposta = document.getElementById("resposta");

  //cotacao.realdolar é a mesma coisa que cotacao["realdolar"]
  if (origem == destino) {
    return resposta.value = valor;
  }
  return resposta.value = cotacao[origem + destino] * valor;

  // ;

}




