function solve(moves) {
    const board = createEmptyBoard();

    const possiblePositionsForWins = [
        [
            [0, 0],
            [0, 1],
            [0, 2],
        ],
        [
            [1, 0],
            [1, 1],
            [1, 2],
        ],
        [
            [2, 0],
            [2, 1],
            [2, 2],
        ],
        [
            [0, 0],
            [1, 0],
            [2, 0],
        ],
        [
            [1, 0],
            [1, 1],
            [2, 1],
        ],
        [
            [2, 0],
            [2, 1],
            [2, 2],
        ],
        [
            [0, 0],
            [1, 1],
            [2, 2],
        ],
        [
            [2, 0],
            [1, 1],
            [0, 2],
        ],
    ];

    let playerToMove = 'X';
    let isDraw = true;
    let currentGameState;
    let movesPlays = 0;

    for (const move of moves) {
        const [row, col] = move.split(' ').map((e) => +e);

        const validMove = !board[row][col];

        if (!validMove) {
            console.log('This place is already taken. Please choose another!');
            continue;
        }
        movesPlays++;

        board[row][col] = playerToMove;

        playerToMove = playerToMove === 'X' ? 'O' : 'X';

        currentGameState = getGameState(board);
        
        if (currentGameState !== 'Draw!') {
            isDraw = false;
            break;
        }

        if (movesPlays === 9) {
            break;
        }
    }

    if (isDraw) {
        console.log('The game ended! Nobody wins :(');
    } else {
        console.log(currentGameState);
    }

    for (const row of board) {
        console.log(row.join('\t'));
    }

    function getGameState(board) {
        let message = 'Draw!';

        possiblePositionsForWins
            .map((pRow) =>
                pRow
                    .map((p) => board[p[0]][p[1]])
                    .reduce((acc, postionSymbol) => (acc += postionSymbol), '')
            )
            .forEach((row) => {
                if (row === 'XXX') {
                    message = 'Player X wins!';
                    return;
                }
                if (row === 'OOO') {
                    message = 'Player O wins!';
                    return;
                }
            });

        return message;
    }

    function createEmptyBoard() {
        const board = [];
        for (let i = 0; i < 3; i++) {
            const emptyRow = new Array(3);
            emptyRow.fill(false);
            board.push(emptyRow);
        }
        return board;
    }
}

solve(['0 1', '0 0', '0 2', '2 0', '1 0', '1 1', '1 2', '2 2', '2 1', '0 0']);
