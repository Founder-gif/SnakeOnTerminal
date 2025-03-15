const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Configurações iniciais

const box = 20;
const canvasWidth = 800;
const canvasHeight = 600;
let score = 0;
let snake = [{x: 9 * box, y: 10 * box}];
let food = {x: Math.floor(Math.random() * 19 + 1) * box, y: Math.floor(Math.random() * 19 + 1) * box}
let keyPressed;

ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvasWidth, canvasHeight);

// Verificação de colisão com as paredes
function collisionWithWall() {
    if (snake[0].x < 0 || snake[0].x >= canvasWidth || snake[0].y < 0 || snake[0].y >= canvasHeight) {
//        console.log('Colidiu com a parede');
        return true; // A cobra colidiu com a parede
    }
    return false;
}

// Verificação de colisão com o corpo da cobra
function collisionWithBody() {
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
//            console.log('Colidiu com o corpo');
            return true; // A cabeça colidiu com o corpo
        }
    }
    return false;
}

// Verificação de colisão com a comida
function collisionWithFood() {
    if (snake[0].x === food.x && snake[0].y === food.y) {
        // A cobra comeu a comida, gera uma nova comida
        food = { x: Math.floor(Math.random() * 19 + 1) * box, y: Math.floor(Math.random() * 19 + 1) * box };
        // Adicionar um novo segmento ao corpo da cobra
        snake.push({ x: snake[snake.length - 1].x, y: snake[snake.length - 1].y });
        score++; // Aumenta a pontuação
//        console.log('Comeu comida');
    }else{
        snake.pop();
    }
}


// Função para desenhar o jogo
function drawGame() {
    console.log('Desenhando...');

     // Verifica a colisão com as paredes ou com o corpo
     if (collisionWithWall() || collisionWithBody()) {
        clearInterval(game); // Para o jogo se houver colisão
        alert("Game Over");
        return;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    // Colorir canva
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    
    // Desenhar comida
    ctx.fillStyle = `rgb(255,0,0)`;
    ctx.fillRect(food.x, food.y, box, box);

    // Desenhar a cobra
    for (let i = 0; i < snake.length; i++){
        //Calcular gradiente do corpo
        ctx.fillStyle = `rgb( 0, 255, 0)`; 
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    // Movimenta a cobra
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (keyPressed === 'LEFT') snakeX -= box;
    if (keyPressed === 'UP') snakeY -= box;
    if (keyPressed === 'RIGHT') snakeX += box;    
    if (keyPressed === 'DOWN') snakeY += box;    

    // Verifica se a cobra colidiu com a comida
    collisionWithFood();

    // Cria nova cabeça da cobra
    const newHead = {x: snakeX, y: snakeY};
    snake.unshift(newHead);
    
   

    // Atualizar pontuação
    document.getElementById('score').innerText = 'Pontos: \n' + score;
    
//    console.log(snake[0].x, snake[0].y); // Para verificar a posição da cabeça
//    console.log(food.x, food.y); // Para verificar a posição da comida
}



// Função para controlar o movimento da cobra
document.addEventListener('keydown', direction);

function direction(event) {
    if (event.keyCode === 37 && keyPressed !== 'RIGHT') keyPressed = 'LEFT';
    if (event.keyCode === 38 && keyPressed !== 'DOWN') keyPressed = 'UP';
    if (event.keyCode === 39 && keyPressed !== 'LEFT') keyPressed = 'RIGHT';
    if (event.keyCode === 40 && keyPressed !== 'UP') keyPressed = 'DOWN';
}

// Função para iniciar o jogo
document.getElementById('startButton').addEventListener('click', () => {
//    console.log('Jogo iniciado');
    score = 0;
    snake = [{ x: 9 * box, y: 10 * box }];
    food = { x: Math.floor(Math.random() * 19 + 1) * box, y: Math.floor(Math.random() * 19 + 1) * box };
    keyPressed = 'RIGHT';
    
    // Inicia o loop do jogo
    game = setInterval(drawGame, 100);
});