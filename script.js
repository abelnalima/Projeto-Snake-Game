let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = { //Posicao inicial da snake no centro da tela
    x: 8 * box,
    y: 8 * box
}
let direction = "right"; //direcao inicial padrao
let food = { //Aparece em locais aleatorios
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
    //Math.floor remove o ponto flutuante do Math.random
}

function criarBG() { //Cria o background da "area de jogo"
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarSnake() { //Cria o marcador da snake
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = "blue";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update); //Escuta as teclas do teclado

function update(event) { //Atualiza a direção de acordo com o jogador
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

function iniciarJogo() { //Define o movimento da snake
    //Alteração das propriedades para permitir que a snake "atravesse" a tela
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;
    
    //Verificar se a "cabeça" se chocou com o "corpo"
    for (i = 1; i < snake.length; i++) {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(jogo); //Interrompe a taxa de atualizacao
            alert('Game Over');
        }
    }

    criarBG();
    criarSnake();
    drawFood();

    let snakeX = snake[0].x; //Coordenadas iniciais da snake
    let snakeY = snake[0].y;

    if (direction == "right") snakeX += box; //Adiciona uma box na direção do movimento
    if (direction == "left") snakeX -= box; 
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y) {//Verifica se a "cabeça" da snake entrou em colisão com a "comida"
        snake.pop(); //remove a box no final da snake
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

let jogo = setInterval(iniciarJogo, 100); //Taxa de atualizacao

