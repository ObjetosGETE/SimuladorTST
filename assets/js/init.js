$('#msgIe').hide(0);
if (msieversion()) {
  $('.main, #loadScreen').addClass('hidden');
  alert('Atenção! Esta aplicação não é compatível com Internet Explorer e não poderá ser executada!');
  $('#msgIe').fadeIn(300);
}
//arrays com os elementos do html
var telas = Array.from(document.getElementsByClassName('screen'));
var btsEquipMenu = Array.from(document.getElementsByClassName('equipMenu'));
var equipBts = Array.from(document.getElementsByClassName('equip'));
var header = document.getElementById('mainHeader');

var btsBackMenu = Array.from(document.getElementsByClassName('btBackMenu'));
var btsPularPagina = Array.from(document.getElementsByClassName('btPular'));
var btsBackPage = Array.from(document.getElementsByClassName('btBackPage'));

var uiMessages = document.getElementById('uiMessages');
var popupMsgWindow = document.getElementById('popupMsgWindow');
var confirmacaoMsgWindow = document.getElementById('confirmacaoMsgWindow');

var btsUnityCallback = Array.from(document.getElementsByClassName('btUnityCallback'));

var simpleMsgDefaultTimer = 1700;
var simpleMsg = document.getElementById('simpleMsg');



window.addEventListener('load', function () {
  //hideLoadScreen();
  //displayUnityApp();
  //carousel nos moveis tem que fazer isso 
  $('#luxcontent').html($('#carouselLuximetro .carousel-inner').html());
  $('#DecibelimetroContent').html($('#carouselDecibelimetro .carousel-inner').html());
  $('#DosimetroContent').html($('#carouselDosimetro .carousel-inner').html());
  $('#IBUTGContent').html($('#carouselIBUTG .carousel-inner').html());
  $('#MultigasesContent').html($('#carouselMultigases .carousel-inner').html());


  $('#btMobMenu').hide(0);
  $('#msgFixa').hide(0);

  $('#simpleMsg').hide(0);

  //para cada carrocel em cada tela que tiver um tutorial tem que colocar o pause aqui, por enquanto soh o do ibutg está pausado 
  $('#carouselIBUTG').carousel('pause');
  $('#carouselLuximetro').carousel('pause');
  $('#carouselMultigases').carousel('pause');
  $('#carouselDecibelimetro').carousel('pause');
  $('#carouselDosimetro').carousel('pause');
  $('.carousel').carousel('pause');

  console.log('teste lock');

  telas.forEach(function (el) {
    el.classList.add('hidden');
  })


  telas[0].classList.remove('hidden');

  /*botoes */

  btsEquipMenu.forEach(function (el) {
    el.addEventListener('click', function () {
      showScreen(this.value);
    });
  })

  equipBts.forEach(function (el) {
    el.addEventListener('click', function () {
      if (this.value == "equipLuximetro") {
        appExec('SetNumberScene', parseInt(2));
      } else if (this.value == "equipDecibelimetro") {
        appExec('SetNumberScene', parseInt(3));
      } else if (this.value == "equipDosimetro") {
        appExec('SetNumberScene', parseInt(4));
      } else if (this.value == "equipIBUTG") {
        appExec('SetNumberScene', parseInt(0));
      } else {
        appExec('SetNumberScene', parseInt(1));
      };
      showScreen(this.value);
    });
  })

  btsBackMenu.forEach(function (el) {
    el.addEventListener('click', function () {
      showScreen(this.value);
      $('.carousel').carousel(0);
      $('.carousel').carousel('pause');
    })
  })

  btsPularPagina.forEach(function (el) {
    el.addEventListener('click', function () {
      showPage(this.value);
    })
  })
  btsBackPage.forEach(function (el) {
    el.addEventListener('click', function () {
      showPage(this.value);
    })
  })
  btsUnityCallback.forEach(function (el) {
    el.addEventListener('click', function () {
      //chamada para a unity aqui
      console.log('codigo de chamada = ', this.value);
      console.log('Janela anterior = ', el.parentElement.parentElement.id)
      showLoadScreen('Carregando a cena selecionada.');
      setTimeout(function () { displayUnityApp() }, 350);
      appExec('LoadSceneIndex', parseInt(this.value));
    })
  })
  document.getElementById('btStart').addEventListener('click', function () {
    showScreen('screen02');
    if (document.getElementsByTagName('body')[0].clientWidth < 1000)
      $('#btMobMenu').fadeIn(300)
  })

  document.getElementById('btBackScr01').addEventListener('click', function () {
    showScreen('screen01');
    $('#btMobMenu').fadeOut(100);
    header.classList.add('hidden');
  })

  document.getElementById('btCloseUnity').addEventListener('click', function () {
    hideUnityApp();
    //evocar metodo pra parar seja o que for na unity aqui   
  })
  document.getElementById('btEndActivity').addEventListener('click', function () {
    //endActivity();
    showConfirmation()
  })
  document.getElementById('btClosePopup').addEventListener('click', function () {
    hidePopUpMsgs()
  })
  document.getElementById('btHome').addEventListener('click', function () {
    endActivity();
  })
  document.getElementById('btCancel').addEventListener('click', function () {
    hidePopUpMsgs();
  })

  document.getElementById('btMobMenu').addEventListener('click', function () {
    document.getElementById('mobMenu').classList.toggle('hidden');
  })
  document.getElementById('closeMobMenu').addEventListener('click', function () {
    document.getElementById('mobMenu').classList.toggle('hidden');
  })
  document.getElementById('btMenuInicial').addEventListener('click', function () {
    showConfirmation();
  })
  document.getElementById('btFontMinus').addEventListener('click', function () {
    decreaseFontSize()
  })
  document.getElementById('btFontPlus').addEventListener('click', function () {
    increaseFontSize()
  })
})
//trava a tela sempre em landscape em dispositivos moveis, só funciona no chrome a principio
function lockscreen() {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  } else if (document.documentElement.mozRequestFullScreen) {
    document.documentElement.mozRequestFullScreen();
  } else if (document.documentElement.webkitRequestFullscreen) {
    document.documentElement.webkitRequestFullscreen();
  } else if (document.documentElement.msRequestFullscreen) {
    document.documentElement.msRequestFullscreen();
  }
  document.getElementById('msg').innerHTML += " - Teste do lock executado."
  screen.orientation.lock('landscape');
}

var unityContainer = document.getElementById('unityContainer');
//mostra a div com a aplicação na unity
function displayUnityApp() {
  $(msgFixa).hide(0);
  unityContainer.classList.remove('hidden');
}
//oculta a div que exibe a aplicaçao da unity
function hideUnityApp() {
  unityInstance.SendMessage('SoundManager', 'Mute');
  appExec('LoadSceneIndex', 0);
  unityContainer.classList.add('hidden');
}
//mostra elementos do tipo tela.
function showScreen(screenId) {
  $('.screen').addClass('hidden');
  header.classList.remove('hidden');
  document.getElementById(screenId).classList.remove('hidden');
  try {
    document.getElementById(screenId).getElementsByClassName('pages')[0].classList.remove('hidden');
  } catch (error) {
    console.warn('a tela nao possui paginas.');
  }
}
//mostra pages, usado na navegaçao das telas, usa o id da pagina por parametro
// a principio feito dessa forma por ter poucas paginas em cada janela de equipamento
function showPage(pageId) {
  console.log(pageId)
  $('.pages').addClass('hidden');
  document.getElementById(pageId).classList.remove('hidden');
}

//a forma mais simples de encerrar algo em html eh chamar um refresh da pagina
function endActivity() {
  //definir o que acontece nesse encerrar, por enquanto vai ser um refresh de tudo 
  window.location.reload();
}
//mostra mensagens popup, os parametros são o titulo para o dialogo, e a mensagem propriamente dita 
function showPopUpMsg(title, message, callback) {
  if (callback) {
    document.getElementById('btClosePopup').addEventListener('click', function evento() {
      hidePopUpMsgs(callback);
      document.getElementById('btClosePopup').removeEventListener('click', evento);
    })
  }
  uiMessages.classList.remove('hidden');

  document.getElementById('popupTitle').innerHTML = title;
  document.getElementById('popupMsg').innerHTML = message;
  popupMsgWindow.classList.remove('hidden');

  // LP -> Checagem pra feedback  do simulador de luximetro
  // trocar if pra identificar qual mensagem foi mostrada
  // let string = document.getElementById('msgFixa').innerText;
  let string = $('#popupMsg')[0].innerText;
  if (string.includes('iluminância')) {
    uiMessages.classList.add('uiMessage-iluminancia');
    const iluminanciaFeedback = $('<div></div>');
    iluminanciaFeedback.addClass('iluminancia-feedback');
    console.log(string.length);
    const iluminanciaFdbkTitle = $('<h3>Análise</h3>');
    let msg1, msg2;
    // string = $('#popupMsg')[0].innerText;
    if (string.length == 104) {
      msg1 = $('<h4>Iluminância da tarefa</h4><p>A NHO 11 estabelece para a iluminância dessa atividade um valor de 750 lux, admitindo um valor até 10% menor (675 lux). Compare esses valores com a iluminância dos pontos 5, 7 e 10.</p>')
      msg2 = $('<h4>Iluminância média</h4><p>A iluminância em qualquer ponto medido não deve ser inferior a 70% da iluminância média. Compare o valor de 70% da média com os pontos 1, 2, 3 e 4. A razão entre a iluminância média e a iluminância de cada ponto não deve ser superior a cinco.</p>')

      $('.uiMessage-iluminancia').append(iluminanciaFeedback);
      iluminanciaFeedback.append(iluminanciaFdbkTitle);
      iluminanciaFeedback.append(msg1);
      iluminanciaFeedback.append(msg2);
      $('#btClosePopup').show();
      $('.js-btn').length ? $('.js-btn').hide() : console.log('sem botão de retry');
    } else
      if (string.length == 164 || string.length == 153 || string.length == 100) {
        // Você selecionou os pontos corretos para a avaliação da iluminância da tarefa, no entanto os pontos escolhidos para o cálculo da iluminância média estão inadequadas.
        msg1 = $('<p>A análise não pode ser realizada, pois os pontos escolhidos não estão de acordo com a exigência da NHO 11.</p>')
        msg2 = $('<p>Escolha novos pontos!</p>')

        $('.uiMessage-iluminancia').append(iluminanciaFeedback);
        iluminanciaFeedback.append(iluminanciaFdbkTitle);
        iluminanciaFeedback.append(msg1);
        iluminanciaFeedback.append(msg2);
        let btnRetry = $('<button value="5" class="btUi btUnityCallback">Reiniciar</button>');
        $(btnRetry).click(function () {
          showLoadScreen('Carregando a cena selecionada.');
          setTimeout(function () { displayUnityApp() }, 350);
          appExec('LoadSceneIndex', parseInt(this.value));

          iluminanciaFeedback.remove();
          $(uiMessages).addClass('hidden');
        })
        btnRetry.addClass('js-btn');
        $('.uiMessage-iluminancia').append(btnRetry);
        $('#btClosePopup').hide();
      } else {
        console.log('erro ao carregar feedback. o numero de caracteres na mensagem é ' + string.length);
      }
  }

}
//oculta tnto a janela de confirmaçao quanto a janela popup
function hidePopUpMsgs(callback) {
  if (callback) {
    try {
      eval(callback);
    } catch (error) {
      console.warn('objeto nao encontrado na unity, error=', error.message)
    }
  }
  uiMessages.classList.add('hidden');
  popupMsgWindow.classList.add('hidden');
  confirmacaoMsgWindow.classList.add('hidden');
}
//mostra a janela de confirmação
function showConfirmation() {
  uiMessages.classList.remove('hidden');
  confirmacaoMsgWindow.classList.remove('hidden');
}

//mosta uma barra com uma mensagem fixa na janela da unity
msgFixa = document.getElementById('msgFixa')
function showMsgFixa(msg) {
  msgFixa.innerHTML = msg;
  $(msgFixa).fadeIn(250);

}
function hideMsgFixa() {
  $(msgFixa).fadeOut(100);
}


//função pra esconder botoes
function showButton(id) {
  document.getElementById(id).classList.remove('hidden');
}
function hideButton(id) {
  document.getElementById(id).classList.add('hidden');
}

var fontDefault = 16;
var fontMin = 12;
var fontMax = 20;
var fontCurrentSize = fontDefault;

function increaseFontSize() {
  if (fontCurrentSize < fontMax) {
    fontCurrentSize++
    document.body.style.fontSize = fontCurrentSize + 'px';
    document.getElementsByTagName('html')[0].style.fontSize = fontCurrentSize + 'px';
  }
}
function decreaseFontSize() {
  if (fontCurrentSize > fontMin) {
    fontCurrentSize--
    document.body.style.fontSize = fontCurrentSize + 'px';
    document.getElementsByTagName('html')[0].style.fontSize = fontCurrentSize + 'px';
  }
}
//nome do objeto que controla as ações dento da unity
var unityObjManagerId = "SimulatorManager";
//shorthand pra função da unity
var unityExec = unityInstance.SendMessage;
//chamar o appExec nos botões necessários
function appExec(method, param) {
  console.log('Unity call');
  unityExec(unityObjManagerId, method, param);
}
//uma versao para usar de callback dentro da unity quando mostrar popup
// manager - nome do objeto manager na unity
// method - metodo a ser chamado no objeto
// param - parametro desse metodo, se necessario
function returnToUnity(manager, method, param) {
  console.log('unity return');
  unityExec(manager, method, param);
}

//mostra uma mensagem simples e temporizada na tela

function displayMessage(msg, timer) {
  var displayTime = simpleMsgDefaultTimer;
  if (timer) {
    displayTime = timer
  }
  simpleMsg.innerHTML = msg;
  //simpleMsg.classList.remove('hidden');
  $(simpleMsg).fadeIn(300);
  setTimeout(function () {
    //simpleMsg.classList.add('hidden');
    $(simpleMsg).fadeOut(500);
  }, displayTime)

}

function showLoadScreen(msg) {
  if (msg) {
    document.getElementById('loadMsg').innerHTML = msg
  } else {
    document.getElementById('loadMsg').innerHTML = "Aguarde, carregando aplicação."
  }
  $(loadScreen).fadeIn(200);
}
function hideLoadScreen() {
  $(loadScreen).fadeOut(200)
}

function skipLoader() {
  document.getElementById('loadScreen').classList.add('hidden');
}

function msieversion() {

  var ua = window.navigator.userAgent;
  var msie = ua.indexOf("MSIE ");

  if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))  // If Internet Explorer, return version number
  {
    return true;
  }
  else  // If another browser, return 0
  {
    return false;
  }


}