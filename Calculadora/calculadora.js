class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
    
  }

  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined;
    console.clear();
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1); //pega do inicio ate penultimo numero,fica so o ultimo
  }
  appendNumber(number) {            
    if (number === '.' && this.currentOperand.includes('.')){  //se campo do nuemro ja existir o . (ponto),retorna funcao
      console.log("number=",number,"  currenOperand =",this.currentOperand);
           return
    }       
    this.currentOperand = this.currentOperand.toString() + number.toString();
    console.log("AppendNumber=> currentOperand=",this.currentOperand);
  }

  escolha_operacao(operation) {//escolha Operacao
   
    if (this.currentOperand === ''){
   
      return;
    }     
    if (this.previousOperand !== '') {
      this.compute();   //operador anterior diferente de vazio, COmputa
    }
    this.operation = operation; 
    this.previousOperand = this.currentOperand;  //oper anterior = oper atual
    this.currentOperand = '';     //operacao atual é vazia

     //implementado para pegar funcoes da calc cientifica,pra quando clicar em um numero e depois funcao especial,mostra resultado
     //criado aqui porque alguns botoes nao tem texto interno para pegar a operação como raiz quadrada e Pi
     //OBS: mudar para switch case depois
     if(this.operation == 'raiz2'){  //se for raiz quadrada
       this.compute();
    }else if(this.operation == 'x²'){  //se for x ao quadrado
               this.compute();
           }else if(this.operation == 'x³'){  //se for x ao cubo
                    this.compute();
                  }

    //fim
  }

  compute() {
    let resultado;
    var anterior = parseFloat(this.previousOperand);
    var atual = parseFloat(this.currentOperand);
    console.log('Compute():anterior=',anterior,"  atual =",atual);
    //  if (isNaN(anterior) || isNaN(atual)){ 
    // // if (isNaN(anterior)){
    //   console.log("Entrou Funcao Compute(). If (IsNaN(anterior))=",anterior);
    //  return
    // } 
    switch (this.operation) {
      case '+':
        resultado = anterior + atual;
        break;
      case '-':
        resultado = anterior - atual;
        break;
      case '*':
        resultado = anterior * atual;
        break;
      case '÷':
        resultado = anterior / atual;
        break;
      case'raiz2':
        //faz a raiz mas somente se digitar outro numero depois 4 raiz2 6
        resultado = Math.sqrt(anterior);
        break;
      case "x²": 
        resultado = Math.pow(anterior,2); //eleva ao quadrado
         break;
      case 'x³':
         resultado = Math.pow(anterior,3); //eleva ao cubo
         break;  
      default:
          console.log("entrou CASE: Default");  
        return
    }
    this.currentOperand = resultado;  //operacao atual recebe escolha
    this.operation = undefined;
    this.previousOperand = '';
   
  }

  getDisplayNumber(number) {
    var stringNumber = number.toString();  //pega o valor que esta no botao html, no caso de pi = "pi"
    if(stringNumber== 'pi'){ //se == pi  ,tem que transformar em numero
        stringNumber = String(Math.PI);
        console.log("stringNumber no IF=",stringNumber," tipo=", typeof(stringNumber));
       // return stringNumber;
    }
    const integerDigits = parseFloat(stringNumber.split('.')[0]); //pega parte inteira do split,posição [0],elem da esquerda
    const decimalDigits = stringNumber.split('.')[1];  //pega outra parte decimal do split
    let integerDisplay;
    console.log("IntegerDigits= ", integerDigits,"  decimalDigitis= ",decimalDigits);
    
    if (isNaN(integerDigits)) {  //adicionado essa
         integerDisplay = '';
    } else {
             integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
           }
   
    if (decimalDigits != null) { //se parte decimal nao for nulo,retorna  inteiro.decimal
         return `${integerDisplay}.${decimalDigits}`; //retorna inteiro + decimal
    } else {
              return integerDisplay; //se nao retorna so inteiro
           }
  }

  atualiza_display(){
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
    // console.log(" CurrentOperand=", thi.currentOperand);
    if (this.operation != null) {
      //aqui mostra o numero e "operacao", ex : " 4 + " no display pequeno
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
      // console.log("Atualiza display: this.previousOperandTextElement.innerText =",this.previousOperandTextElement.innerText," this.operation =",this.operation );
    } else {
      this.previousOperandTextElement.innerText = '';
      // console.log("previousOperandTextElement.innerText = vazio");
    }
  }
}

//usando operador html de data-* para facilitar pegar os dados
const numberButtons = document.querySelectorAll('[data-number]');//seleciona todos botoes com data-number 
const operationButtons = document.querySelectorAll('[data-operation]'); //escolhe qual operacao,somar,diminuir,multiplicar..
const equalsButton = document.querySelector('[data-equals]'); //unico operador igual
const deleteButton = document.querySelector('[data-delete]'); //delete
const allClearButton = document.querySelector('[data-all-clear]'); //all Clear 
const previousOperandTextElement = document.querySelector('[data-operador_anterior]');
const currentOperandTextElement = document.querySelector('[data-operador_atual]');
//input button
const botao_simples = document.querySelector('#botao_simples'); //input botao calc simples
const botao_cientifica = document.querySelector('#botao_cientif'); //input botao calc cientifica


//criando a Classe passando operador anterior e atual
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)
console.log("previousoperandtextelement=",this.previousOperandTextElement);

//para cada botaode numero,add escuta do evento click,e adiciona o texto interno de cada botao
//para pi nao funciona se tirarmos o valor de dentro do botao
numberButtons.forEach(button => {   
  button.addEventListener('click', () => {
    //se for botao do pi, append o valor do pi na calculadora
    if( button.id =="botao_pi"){ //se botao PI
         calculator.appendNumber(Math.PI); 
           calculator.atualiza_display();      
    }else { //senao append com os outros botoes que tem texto dentro
          calculator.appendNumber(button.innerText);
          calculator.atualiza_display();
          }
  });
});

operationButtons.forEach(button => {   //para cada botao de operacao ,+ - */..etc retornado do document.querySelectorAll('[data-operation]')
  button.addEventListener('click', () => {
    
      if(button.id == 'botao_raiz2'){  //se for o botao de raiz quadrada...
        calculator.escolha_operacao("raiz2"); //escoolhe tipo de operacao,atravez do texto interno do botao,raiz 2 nao tem ttexto interno
        calculator.atualiza_display();
      }else {
              calculator.escolha_operacao(button.innerText);
               calculator.atualiza_display();
           }
         
  });
});

equalsButton.addEventListener('click', button => { //botao igual,add escuta evento,e chama funcao computar
  calculator.compute();
  calculator.atualiza_display();
});

allClearButton.addEventListener('click', button => {
  calculator.clear();
  calculator.atualiza_display();
});

deleteButton.addEventListener('click', button => {
  calculator.delete();
  calculator.atualiza_display();
});

// ### add escuta do evento no botao calculadora simples,e apaga os elementos
botao_simples.addEventListener('click',button =>{  //botao pra calculadora simples
var botoes_para_deletar =  document.getElementsByClassName('botao_deleta'); //style.display= "none";
 for(var i=0;i<botoes_para_deletar.length;i++){
      botoes_para_deletar[i].style.display="none"; // apaga do display botoes com a class botao_deleta ,da calc cienfica e mostra so a simples
 }
 //depois que apagar muda background do simples
 document.getElementById('botao_simples').style.boxShadow="0 0 10px blue"; //mostra box quando clic no botao
 document.getElementById('botao_cientif').style.boxShadow="none"; //apaga shadwbox quando clic no botao
}); 
// add escuta pro botao da cientifica
botao_cientifica.addEventListener('click',button =>{  //botao pra calculadora simples
  var botoes_para_mostrar =  document.getElementsByClassName('botao_deleta'); //style.display= "none";
   for(var i=0;i<botoes_para_mostrar.length;i++){
        botoes_para_mostrar[i].style.display="block"; //ex apaga do display botoes da cienfica e mostra so a simples
   }
   document.getElementById('botao_cientif').style.boxShadow="0 0 10px blue"; //mostra box quando clic no botao
   document.getElementById('botao_simples').style.boxShadow="none"; //tira o boxshadow do botao simples
}); 


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

//criando variáveis para os itens que serão alterados pelo dark mode:
var darkModeButton = document.getElementById("darkModeButton");
var body = document.getElementsByTagName("body")[0];
var conteiner1 = document.getElementById("conteiner1");
var conteiner2 = document.getElementById("conteiner2");
var footer = document.getElementsByTagName("footer")[0];
var creditos = document.getElementsByTagName("div")[10];
var imgFooter = document.getElementsByClassName("imgFooter");
var counter = 1;

//função dark mode, que possui um contador de cliques para alternar o botão, bem como mudar e desfazer a mudança na aparencia dos itens.
function dark() {
  counter++
  if (counter % 2 == 0) {
    body.style.backgroundColor = "black";
    conteiner1.style.backgroundColor = "black";
    conteiner2.style.backgroundColor = "#3e2f18";
    darkModeButton.innerHTML = "Escuro";
    footer.style.backgroundColor = "#3e2f18";
    creditos.style.color = "#fff5d1";
    for (let i=0; i<imgFooter.length; i++) {
      imgFooter[i].style.filter = "invert(1)";
    }
    //revertendo o estilo original:
  } else {
    body.style.backgroundColor = "white";
    conteiner1.style.backgroundColor = "#FFF5D1";
    conteiner2.style.backgroundColor = "#FBC779";
    darkModeButton.innerHTML = "Claro";
    footer.style.backgroundColor = "#FFF5D1";
    creditos.style.color = "black";
    for (let j=0; j<imgFooter.length; j++) {
      imgFooter[j].style.filter = "invert(0)";
    }
  }
}







