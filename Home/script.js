
window.onload = function () {
  var elementBody = document.querySelector('body');
  var elementBtnIncreaseFont = document.getElementById('increase-font');
  var elementBtnDecreaseFont = document.getElementById('decrease-font');
  // Padrão de tamanho, equivale a 100% do valor definido no Body
  var fontSize = 100;
  // Valor de incremento ou decremento, equivale a 10% do valor do Body
  var increaseDecrease = 10;
  console.log("teste")
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
var conteiner1 = document.getElementById("conteiner1");
var conteiner2 = document.getElementById("conteiner2");
var main = document.getElementsByTagName("main")[0];
var textoConteudoMain = document.getElementById("TextoConteudoMain");
var footer = document.getElementsByTagName("footer")[0];
var creditos = document.getElementsByClassName("copyright")[0];
var imgFooter = document.getElementsByClassName("ImgFooter");
var counter = 1;

function dark(){
  counter++
  if (counter%2==0){
      conteiner1.style.backgroundColor="black";
      conteiner2.style.backgroundColor="#3e2f18";
      main.style.backgroundColor="black";
      textoConteudoMain.style.backgroundColor="#3e2f18";
      textoConteudoMain.style.color="#fff5d1";
      darkModeButton.innerHTML="Escuro";
      footer.style.backgroundColor="#3e2f18";
      creditos.style.color="#fff5d1";
      for(img of imgFooter){
        img.style.filter="invert(1)";
      }
      
      
  } else {
    conteiner1.style.backgroundColor="#FFF5D1";
    conteiner2.style.backgroundColor="#FBC779";
    main.style.backgroundColor="white";
    textoConteudoMain.style.backgroundColor="#FFF5D1";
    textoConteudoMain.style.color="black";
    darkModeButton.innerHTML="Claro";
    footer.style.backgroundColor="#FFF5D1";
    creditos.style.color="black";
    for(img of imgFooter){
      img.style.filter="invert(0)";
    }
  }
}