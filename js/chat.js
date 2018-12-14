let sendForm = document.querySelector('#chatform'),
    textInput = document.querySelector('.chatbox'),
    chatList = document.querySelector('.chatlist'),
    userBubble = document.querySelectorAll('.userInput'),
    botBubble = document.querySelectorAll('.bot__output'),
    animateBotBubble = document.querySelectorAll('.bot__input--animation'),
    overview = document.querySelector('.chatbot__overview'),
    hasCorrectInput,
    imgLoader = false,
    animationCounter = 1,
    animationBubbleDelay = 600,
    input,
    previousInput,
    isReaction = false,
    unkwnCommReaction = "Não te entendi direito.",
    chatbotButton = document.querySelector(".submit-button")

sendForm.onkeydown = function (e) {
    if (e.keyCode == 13) {
        e.preventDefault();

        //No mix ups with upper and lowercases
        var input = textInput.value.toLowerCase();

        //Empty textarea fix
        if (input.length > 0) {
            createBubble(input)
        }
    }
};

sendForm.addEventListener('submit', function (e) {
    e.preventDefault();

    //No mix ups with upper and lowercases
    var input = textInput.value.toLowerCase();

    //Empty textarea fix
    if (input.length > 0) {
        createBubble(input)
    }
}) 

let createBubble = function (input) {
    let chatBubble = document.createElement('li');
    chatBubble.classList.add('userInput');

    chatBubble.innerHTML = input;

    chatList.appendChild(chatBubble)

    checkInput(input);
}

var checkInput = function (input) {
    hasCorrectInput = false;
    isReaction = false;
    for (var textVal in possibleInput) {
        if (input == textVal || input.indexOf(textVal) >= 0 && isReaction == false) {
            console.log("successo");
            hasCorrectInput = true;
            botResponse(textVal);
        }
    }
    if (hasCorrectInput == false) {
        console.log("falhou");
        unknownCommand(unkwnCommReaction);
        hasCorrectInput = true;
    }
}


function botResponse(textVal) {
 
    let userBubble = document.createElement('li');
    userBubble.classList.add('bot__output');

    if (isReaction == true) {
        if (typeof reactionInput[textVal] === "function") {
            userBubble.innerHTML = reactionInput[textVal]();
        } else {
            userBubble.innerHTML = reactionInput[textVal];
        }
    }

    if (isReaction == false) {
        if (typeof possibleInput[textVal] === "function") {
        
            userBubble.innerHTML = possibleInput[textVal]();
        } else {
            userBubble.innerHTML = possibleInput[textVal];
        }
    }
    chatList.appendChild(userBubble) 

    textInput.value = "";
}

function unknownCommand(unkwnCommReaction) {

    let failedResponse = document.createElement('li');

    failedResponse.classList.add('bot__output');
    failedResponse.classList.add('bot__output--failed');

    failedResponse.innerHTML = unkwnCommReaction;
    chatList.appendChild(failedResponse)

    animateBotOutput();

    // reset text area input
    textInput.value = "";

    chatList.scrollTop = chatList.scrollHeight;

    animationCounter = 1;
}

function responseText(e) {

    let response = document.createElement('li');

    response.classList.add('bot__output');

    response.innerHTML = e;

    chatList.appendChild(response);

    animateBotOutput();

    console.log(response.clientHeight);

    setTimeout(function () {
        chatList.scrollTop = chatList.scrollHeight;
        console.log(response.clientHeight);
    }, 0)
}

function responseImg(e) {
    let image = new Image();

    image.classList.add('bot__output');
    image.classList.add('bot__outputImage');
    image.src = "/images/" + e;
    chatList.appendChild(image);

    animateBotOutput()
    if (image.completed) {
        chatList.scrollTop = chatList.scrollTop + image.scrollHeight;
    }
    else {
        image.addEventListener('load', function () {
            chatList.scrollTop = chatList.scrollTop + image.scrollHeight;
        })
    }
}


function animateBotOutput() {
    chatList.lastElementChild.style.animationDelay = (animationCounter * animationBubbleDelay) + "ms";
    animationCounter++;
    chatList.lastElementChild.style.animationPlayState = "running";
}

function commandReset(e) {
    animationCounter = 1;
    previousInput = Object.keys(possibleInput)[e];
}


var possibleInput = {
    "gênero": function () {
        responseText("Hmm...Deixa eu ver aqui")
        responseText("Eu sugiro A Mão Esquerda da Escuridão - Ursula K. Le Guin")
        responseText("Ou Terra das Mulheres - Charlotte Perkins Gilman")
        commandReset(0);
        return
    },
    "vigilância": function () {
        responseText("Ótima escolha!");
        responseText("Eu sugiro O Conto da Aia, de Margaret Atwood")
        commandReset(0);
        return
    },
    "distopias": function () {
        responseText("Sempre bom saber quais futuros não queremos e como evitá-los...");
        responseText("Que tal Kindred- Octavia E. Butler?");
        responseText("Ou o aterrorizante O Poder, da Naomi Alderman?");
        commandReset(0);
        return
    },
    "viagem no tempo": function () {
        responseText("Clássico!");
        responseText("A Mulher do Viajante do Tempo, de Audrey Niffenegger é muito bom");
        responseText("Outlander de Diana Gabaldon também");
        commandReset(0);
        return
    },

}
