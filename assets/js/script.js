// Referencias del HTML
const board = document.getElementById('board');
const btnPlay = document.getElementById('play');
const nickName = document.getElementById('name');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalInner');

// Tablero del juego
let playBoard = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
]
// Juagadas ganadoras
winPlay = [
    ['0,0', '1,0', '2,0'],
    ['0,1', '1,1', '2,1'],
    ['0,2', '1,2', '2,2'],
    ['0,0', '0,1', '0,2'],
    ['1,0', '1,1', '1,2'],
    ['2,0', '2,1', '2,2'],
    ['0,0', '1,1', '2,2'],
    ['0,2', '1,1', '2,0']
]
// Jugador actual
let currentPlay = 1

// Inicio del juego
btnPlay.addEventListener('click', () => {
    if (nickName.value) {
        drawnBoard()
        nickName.disabled = true
    } else {
        alert('Escriba su nombre para poder jugar')
    }
});

// Dibujar tablero
function drawnBoard() {
    board.innerHTML = '';
    let turn = document.createElement('div');
    turn.setAttribute('class', 'currentPlay');
    if (currentPlay == 1) {
        turn.innerHTML = 'Turno de ' + nickName.value;
    } else {
        turn.innerHTML = 'Turno de la computadora';
    }
    board.appendChild(turn);
    let table = document.createElement('div');
    for (let i = 0; i < playBoard.length; i++) {
        let row = document.createElement('div');
        row.setAttribute('class', 'row');
        for (let j = 0; j < playBoard[i].length; j++) {
            let cell = document.createElement('div');
            cell.setAttribute('id', 'cell' + i + j);
            switch (playBoard[i][j]) {
                case 0:
                    cell.setAttribute('class', 'col-4 cell empty');
                    cell.addEventListener('click', () => {
                        if (currentPlay == 1) {
                            selectCell(i, j)
                        } else {
                            alert('Es el turno de jugador 2')
                        }
                    });
                    break;
                case 1:
                    cell.setAttribute('class', 'col-4 cell jugado');
                    let imagen = document.createElement('img');
                    imagen.setAttribute('src', 'assets/images/ficha_negra.png');
                    cell.appendChild(imagen);
                    break;
                case 2:
                    cell.setAttribute('class', 'col-4 cell jugado');
                    let imagen2 = document.createElement('img');
                    imagen2.setAttribute('src', 'assets/images/ficha_roja.png');
                    cell.appendChild(imagen2);
                    break;
                default:
                    break;
            }
            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    board.appendChild(table);
}

// Selecciona jugador 1, el usuario
function selectCell(i, j) {
    playBoard[i][j] = currentPlay
    if (!isWin()) {
        setTimeout(() => {
            selectComputer()
        }, 1500)
    }
    currentPlay = 2
    drawnBoard()

}
// Selecciona la computadora
function selectComputer() {
    let i = getRandom(0, 3)
    let j = getRandom(0, 3)

    if (playBoard[i][j] == 0) {
        playBoard[i][j] = 2
        currentPlay = 1
        drawnBoard()
    } else {
        selectComputer()
    }
}
// Verificar si se ha ganado
function isWin() {
    let plays = []
    for (let i = 0; i < playBoard.length; i++) {
        for (let j = 0; j < playBoard[i].length; j++) {
            if (playBoard[i][j] == currentPlay) {
                plays.push(i + ',' + j)
            }
        }
    }
    let winner = false
    for (let k = 0; k < winPlay.length; k++) {
        let filterPlays = plays.filter(pl => winPlay[k].includes(pl))
        winner = winner || (filterPlays.length == winPlay[k].length)
    }

    if (winner) {
        showModal()
    }

    return winner
}
// Mostrar modal
function showModal() {
    let title = document.createElement('h4');
    let subtitle = document.createElement('h4');

    if (currentPlay == 1) {
        title.innerHTML = 'Felicidades ' + nickName.value;
        subtitle.innerHTML = '¡Ganaste el juego!';
    } else {
        title.innerHTML = '¡Oh no ' + nickName.value + '!';
        subtitle.innerHTML = '¡Perdiste el juego!';
    }

    modalContent.appendChild(title);
    modalContent.appendChild(subtitle);
    modal.classList.remove('d-none')
    modal.classList.add('d-block')
}
// Número aleatorio
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

