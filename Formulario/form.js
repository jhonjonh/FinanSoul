// VALIDAÇÃO DE FORMULÁRIO

class Validator {

  validations = [];

  currentDay = 0;
  currentMonth = 0;
  currentName = "";
  currentCPF = 0;
  currentEmail = "";
  currentSelecione = "";
  currentIdade = 0;

  constructor() {
    this.validations = [
      'data-max-length',
      'data-uppercase',
      'data-email',
      'data-validate-day',
      'data-validate-month',
      'data-validate-year',
      'data-genero'
    ]
  }

  // iniciar a validação de todos os campos
  validate(form) {
    //  pegar os inputs e os selects
    let inputs = form.getElementsByTagName('input');
    let selects = form.getElementsByTagName('select');

    // tranforma uma HTMLCollection -> array
    let inputsArray = [...inputs, ...selects];

    // uma array com os resultados (true ou false) de cada validação
    let resultados = [];

    // loop nos inputs e validação dos dados
    inputsArray.forEach(function (input) {

      // loop com todas as validações
      for (let i = 0; this.validations.length > i; i++) {

        // verifica se a validação atual existe no input
        if (input.getAttribute(this.validations[i]) != null) {

          // limpando a string para se tornar num método
          let method = this.validations[i].replace('data-', '').replace('-', '');

          // valor do input
          let value = input.getAttribute(this.validations[i]);

          // invocar o método - retorna um resultado (true ou false)
          let resultado = this[method](input, value);

          // array resultados está recebendo todas as respostas das validações
          resultados.push(resultado);
        }
      }
    }, this);
    return resultados.every(function (elemento) {
      return elemento === true;
    });
  }

  // verifica se as letras do nome estão maiúsculas
  uppercase(input) {
    if (!input.value) {
      alert(`Digite seu nome`);
      return false;
    }

    this.currentName = input.value.toUpperCase();
    return true;
  }

  // verifica se o CPF tem um número certo de caracteres
  maxlength(input, maxValue) {
    let inputLength = input.value.length;

    let errorMessage = `O campo CPF deve ter ${maxValue} caracteres.`

    if (inputLength < maxValue) {
      alert(errorMessage);
      return false;
    }

    this.currentCPF = input.value;
    return true;
  }

  // validar o dia de nascimento
  validateday(input) {
    if (input.value < 0 || input.value > 31) {
      alert(`Dia inválido!`);
      return false;
    }

    this.currentDay = input.value;
    return true;
  }

  // validar o mês de nascimento
  validatemonth(input) {
    if (input.value < 1 || input.value > 12) {
      alert(`Mês inválido!`);
      return false;
    }

    this.currentMonth = input.value;
    return true;
  }

  // validar a idade da pessoa
  validateyear(input) {
    if (!input.value) {
      alert(`Ano inválido`);
      return false;
    }

    let dataAtual = new Date(2021, 2, 16);

    let dataUser = new Date(input.value, this.currentMonth - 1, this.currentDay);

    let idade = Math.round((dataAtual - dataUser) / 1000 / 60 / 60 / 24 / 365);

    this.currentIdade = idade;
    return true;
  }

  // validar email
  email(input) {
    let regex = /\S+@\S+\.\S+/;

    let email = input.value;

    if (!regex.test(email)) {
      alert(`Insira um e-mail válido`);
      return false;
    }

    this.currentEmail = email;
    return true;
  }

  // validar gênero
  genero(input) {
    if(!input.value) {
      alert("Selecione uma opção");
      return false;
    }
    this.currentSelecione = input.value;
    return true;
  }

}

let form = document.getElementById("registro");
let submit = document.getElementById("btnSubmit");
let validator = new Validator();

// evento que dispara as validações
submit.addEventListener('click', function (e) {

  e.preventDefault();

  let confirmacao = document.getElementById("dadosConfirmados");

  if (validator.validate(form)) {
    let confirmacaoText = document.createTextNode(`
    Olá ${validator.currentName}, seu login é ${validator.currentEmail}, 
    você tem ${validator.currentIdade} se define como uma pessoa do sexo
    ${validator.currentSelecione} e pode usar ${validator.currentCPF} como senha.
  `);
    confirmacao.appendChild(confirmacaoText);
  }
})


// ACESSIBILIDADE

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

//variáveis para capturar os elementos da página que serão alterados pela função dark()
var darkModeButton = document.getElementById("darkModeButton");
var body = document.getElementsByTagName("body")[0];
var conteiner1 = document.getElementById("conteiner1");
var conteiner2 = document.getElementById("conteiner2");
var main = document.getElementsByTagName("main")[0];
var mainCont = document.getElementById("mainContainer");
var boxTitle = document.getElementsByTagName("h1")[0];
var labelName = document.getElementsByTagName("label");
var footer = document.getElementsByTagName("footer")[0];
var creditos = document.getElementById("creditos");
var imgFooter = document.getElementsByClassName("imgFooter");
var counter = 1;

//função que usa os elementos listados acima.
function dark() {
  counter++
  if (counter % 2 == 0) {
    body.style.backgroundColor="black";
    conteiner1.style.backgroundColor = "#251c0f";
    conteiner2.style.backgroundColor = "#3e2f18";
    main.style.backgroundColor = "black";
    mainCont.style.backgroundColor = "rgb(62, 47, 24)";
    boxTitle.style.color = "white";
    darkModeButton.innerHTML = "Escuro";
    footer.style.backgroundColor = "#3e2f18";
    creditos.style.color = "#fff5d1";
    for(let i=0; i<imgFooter.length; i++){
      imgFooter[i].style.filter = "invert(1)";
    }
    for(let j=0; j<labelName.length; j++){
      labelName[j].style.color = "#fff5d1";
    }
      
  } else {
    body.style.backgroundColor="white";
    conteiner1.style.backgroundColor = "#FFF5D1";
    conteiner2.style.backgroundColor = "#FBC779";
    main.style.backgroundColor = "white";
    mainCont.style.backgroundColor = "#fff5d1";
    boxTitle.style.color = "black";
    darkModeButton.innerHTML = "Claro";
    footer.style.backgroundColor = "#FFF5D1";
    creditos.style.color = "black";
    for(let k=0; k<imgFooter.length; k++){
      imgFooter[k].style.filter = "invert(0)";
    }
    for(let l=0; l<labelName.length; l++){
      labelName[l].style.color= "black";
    }    
  }
}