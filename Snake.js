// Глобальные переменные
var FIELD_SIZE_X = 20;
var FIELD_SIZE_Y = 20;
var SNAKE_SPEED = 300; // Интервал между перемещениями змейки
var snake = []; // Сама змейка
var direction = 'y+'; // Напрвление движения змейки
var oldDirection = 'y+'; // Старое напрвление движения змейки
var gameIsRunning = false; // Запущена ли игра
var snake_timer; // Таймер змейки
var score = 0; // Результат

prepareGameField(); // Генерация поля

var wrap = document.getElementsByClassName('wrap')[0];


// -------------- Д/З - Task1 -----------------
var newDiv = document.createElement ('div');                // <------ New Line ------>
newDiv.style.width = '100%';                                // <------ New Line ------>
newDiv.style.Height = '3.5em';                              // <------ New Line ------>
newDiv.style.fontSize = '1.6em';                            // <------ New Line ------>
newDiv.style.textAlign = 'center';                          // <------ New Line ------>
newDiv.style.border = '3px solid green';                    // <------ New Line ------>
newDiv.style.boxSizing = 'border-box';                      // <------ New Line ------>
newDiv.style.padding = '1em 0';                             // <------ New Line ------>
newDiv.style.marginBottom = '1em';                          // <------ New Line ------>
var snakeLength = '2';                                      // <------ New Line ------>
wrap.insertBefore(newDiv, wrap.firstChild);                 // <------ New Line ------>
newDiv.innerHTML = 'Длина вашей змейки: ' + snakeLength ;   // <------ New Line ------>
// --------------------------------------------


// Подгоняем размер контейнера под игровое поле
if (16 * (FIELD_SIZE_X + 1) < 200) {
    wrap.style.width = '200px'
}
else {
    wrap.style.width = (16 * (FIELD_SIZE_X + 1)).toString() + 'px';
}

// Событие кнопки Новая игра
document.getElementById('snake-new-game').addEventListener('click', startGame);
// Отслеживание клавиш клавиатуры
addEventListener('keydown', changeDirection);

/**
 * Функция генерации поля
 */
function prepareGameField() {
    // Создаём таблицу
    var game_table = document.createElement('table');
    game_table.classList.add('game-table');
    // Генерация ячеек игровой таблицы
    for (var i = 0; i < FIELD_SIZE_Y; i++) {
        // Создаём строки
        var row = document.createElement('tr');
        row.classList.add('game-table-row');
        for (var j = 0; j < FIELD_SIZE_X; j++) {
            // Создаём ячейки
            var cell = document.createElement('td');
            cell.className = 'game-table-cell cell-' + i + '-' + j;
            row.appendChild(cell);
        }
        game_table.appendChild(row);
    }
    document.getElementById('snake-field').appendChild(game_table);
}


/**
 * Старт Игры
 */
function startGame() {
    // Игра началась
    gameIsRunning = true;
    // Сброс предыдущей игры
    direction = 'y+';
    oldDirection = 'y+';
    score = 0;

    // -------------- Д/З - Task1 -----------------
    newDiv.innerHTML = 'Длина вашей змейки: ' + snakeLength;   // <------ New Line ------>
    // --------------------------------------------

    for (var i = 0; i < snake.length; i++) {
        snake[i].classList.remove('snake-unit');
    }
    snake = [];
    var unitsFood = document.querySelectorAll('.food-unit');
    for (i = 0; i < unitsFood.length; i++) {
        unitsFood[i].classList.remove('food-unit');
    }

    // -------------- Д/З - Task2 -----------------
    var unitsWall = document.querySelectorAll('.wall-unit');    // <------ New Line ------>
    for (i = 0; i < unitsWall.length; i++) {                    // <------ New Line ------>
        unitsWall[i].classList.remove('wall-unit');             // <------ New Line ------>
    }
    // --------------------------------------------

    // Начало новой игры
    clearInterval(snake_timer);
    respawn();
    snake_timer = setInterval(move, SNAKE_SPEED);
    setTimeout(createFood, 1000);
}

/**
 * Функция расположения змейки на игровом поле
 */
function respawn() {
    // Змейка - массив td
    // Стартовая длина змейки = 2
    // respawn змейки из центра
    var start_coord_x = Math.floor(FIELD_SIZE_X / 2);
    var start_coord_y = Math.floor(FIELD_SIZE_Y / 2);
    // Голова змейки
    var snake_head = document.getElementsByClassName('cell-' + start_coord_y + '-' + start_coord_x)[0];
    snake_head.classList.add('snake-unit');
    snake_head.setAttribute('data_y', start_coord_y.toString());
    snake_head.setAttribute('data_x', start_coord_x.toString());
    // Тело змейки
    var snake_tail = document.getElementsByClassName('cell-' + (start_coord_y + 1) + '-' + start_coord_x)[0];
    snake_tail.classList.add('snake-unit');
    snake.push(snake_tail);
    snake.push(snake_head);
}

/**
 * Движение змейки
 */
function move() {
    var new_unit; // Новый элемент
    var coord_y = parseInt(snake[snake.length - 1].getAttribute('data_y'));
    var coord_x = parseInt(snake[snake.length - 1].getAttribute('data_x'));

    // Определяем новую точку
    switch (direction) {
        case 'x-':
            new_unit = document.querySelector('.cell-' + (coord_y) + '-' + (coord_x -= 1));
            break;
        case 'x+':
            new_unit = document.querySelector('.cell-' + (coord_y) + '-' + (coord_x += 1));
            break;
        case 'y-':
            new_unit = document.querySelector('.cell-' + (coord_y += 1) + '-' + (coord_x));
            break;
        case 'y+':
            new_unit = document.querySelector('.cell-' + (coord_y -= 1) + '-' + (coord_x));
            break;
    }

    // -------------- Д/З - Task3 -----------------
    if ( new_unit === null) {                                                                       // <------ New Line ------>
        switch (direction) {                                                                        // <------ New Line ------>
        case 'x-':                                                                                  // <------ New Line ------>
                new_unit = document.querySelector('.cell-' + (coord_y) + '-' + (coord_x += 20));    // <------ New Line ------>
                break;                                                                              // <------ New Line ------>
            case 'x+':                                                                              // <------ New Line ------>
                new_unit = document.querySelector('.cell-' + (coord_y) + '-' + (coord_x -= 20));    // <------ New Line ------>
                break;                                                                              // <------ New Line ------>
            case 'y-':                                                                              // <------ New Line ------>
                new_unit = document.querySelector('.cell-' + (coord_y -= 20) + '-' + (coord_x));    // <------ New Line ------>
                break;                                                                              // <------ New Line ------>
            case 'y+':                                                                              // <------ New Line ------>
                new_unit = document.querySelector('.cell-' + (coord_y += 20) + '-' + (coord_x));    // <------ New Line ------>
                break;                                                                              // <------ New Line ------>
        }                                                                                           // <------ New Line ------>
    }                                                                                               // <------ New Line ------>
    // --------------------------------------------

    // Проверяем что new_unit не часть змейки и не выход за границы
    if (snake.indexOf(new_unit) === -1) {
        // Добавляем новую часть змейки
        snake[snake.length - 1].removeAttribute('data_y');
        snake[snake.length - 1].removeAttribute('data_x');
        new_unit.classList.add('snake-unit');
        snake.push(new_unit);
        snake[snake.length - 1].setAttribute('data_y', coord_y.toString());
        snake[snake.length - 1].setAttribute('data_x', coord_x.toString());
        // Проверяем, надо ли убрать хвост
        if (!haveFood(new_unit)) {
            // Удаляем хвост
            snake.splice(0, 1)[0].classList.remove('snake-unit');
        }
    }
    else {
        finishTheGame();
    }
    oldDirection = direction;
}

/**
 * Проверка на еду
 * @param unit
 * @returns {boolean}
 */
function haveFood(unit) {

    if (unit.classList.contains('food-unit')) {
        unit.classList.remove('food-unit');
        createFood();
        // -------------- Д/З - Task2 -----------------
        var unitsWall = document.querySelectorAll('.wall-unit');       // <------ New Line ------>
        for (var i = 0; i < unitsWall.length; i++) {                   // <------ New Line ------>
            unitsWall[i].classList.remove('wall-unit');                // <------ New Line ------>
        }                                                              // <------ New Line ------>
        for (i = 0; i < 15; i++) {                                     // <------ New Line ------>
            createWall();                                              // <------ New Line ------>
        }                                                              // <------ New Line ------>
        // --------------------------------------------
        score++;
        newDiv.innerHTML = 'Длина вашей змейки: ' + (2 + score);
        return true
    }
    // -------------- Д/З - Task2 -----------------
    if (unit.classList.contains('wall-unit')) {                         // <------ New Line ------>
        finishTheGame();                                                // <------ New Line ------>
    }                                                                   // <------ New Line ------>
    // --------------------------------------------
    return false;
}

/**
 * Создание еды
 */
function createFood() {
    var foodCreated = false;
    while (!foodCreated) {
        // Рандом
        var food_x = Math.floor(Math.random() * FIELD_SIZE_X);
        var food_y = Math.floor(Math.random() * FIELD_SIZE_Y);
        // проверка на змейку
        var food_cell = document.querySelector('.cell-' + food_y + '-' + food_x);
        if (!food_cell.classList.contains('snake-unit') && !food_cell.classList.contains('wall-unit')) {  // <------ New Line ------>
            food_cell.classList.add('food-unit');
            foodCreated = true;
        }
    }
}

// -------------- Д/З - Task2 -----------------
/**
 * Создание препятствий
 */
function createWall() {
    var wallCreated = false;
    while (!wallCreated) {
        // Рандом
        var wall_x = Math.floor(Math.random() * FIELD_SIZE_X);
        var wall_y = Math.floor(Math.random() * FIELD_SIZE_Y);
        // проверка на змейку
        var wall_cell = document.querySelector('.cell-' + wall_y + '-' + wall_x);
        if (!wall_cell.classList.contains('snake-unit') && !wall_cell.classList.contains('food-unit')) {  // <------ New Line ------>
            wall_cell.classList.add('wall-unit');
            wallCreated = true;
        }
    }
}
// --------------------------------------------

/**
 * Изменение направления движения змейки
 * @param e - событие
 */
function changeDirection(e) {
    switch (e.keyCode) {
        case 37: // Клавиша влево
            if (oldDirection !== 'x+') {
                direction = 'x-'
            }
            break;
        case 38: // Клавиша вверх
            if (oldDirection !== 'y-') {
                direction = 'y+'
            }
            break;
        case 39: // Клавиша вправо
            if (oldDirection !== 'x-') {
                direction = 'x+'
            }
            break;
        case 40: // Клавиша вниз
            if (oldDirection !== 'y+') {
                direction = 'y-'
            }
            break;
    }
}

/**
 * Функция завершения игры
 */
function finishTheGame() {

    gameIsRunning = false;
    clearInterval(snake_timer);
    if (score < FIELD_SIZE_X * FIELD_SIZE_Y - 2) {
        newDiv.innerHTML = 'Вы проиграли!\nВаш результат: ' + score.toString();     // <------ New Line ------>
    }
    else {
        newDiv.innerHTML = 'Поздравляем! Вы выиграли!\n' +                          // <------ New Line ------>
            'Вы заполнили змейкой всё поле!\nВаш результат: '                       // <------ New Line ------>
            + score.toString();                                                     // <------ New Line ------>
    }
}