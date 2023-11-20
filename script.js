`use strict`


function Cell(){
    let value = 0;

    const changeValue = (player)=>{
        value = player;
    };

    const getCellValue = () => value;

    return {changeValue, getCellValue};

}

function GameBoard(){
    let rows = 3;
    let cols = 3;
    let board = [];

    for(let i=0;i<rows;i++){
        board[i] = []
        for(let j=0;j<cols;j++){
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const printBoard = () => {
        const boardWithCellValue = board.map((row)=>{
           return row.map((cell)=>{
               return cell.getCellValue();
            })
        })
        console.log(boardWithCellValue);
    }

    const markCell = (player, rowIndex, colIndex)=>{
        let prevCellVal = board[rowIndex][colIndex].getCellValue();
        if(prevCellVal !== 0){
            return;
        }
        board[rowIndex][colIndex].changeValue(player)
    }

    const checkWin = () =>{
        
    }

    return {getBoard, printBoard, markCell};

}

function GameController(){
    const board = GameBoard();

    const players = [
        {
            player : 'player1',
            token : 1
        },
        {
            player : 'player2',
            token : 2
        }
    ];

    let activePlayer = players[0];

    const getActivePlayer = () => activePlayer;
    const switchActivePlayer = () =>{
        activePlayer = (activePlayer===players[0]) ? players[1] : players[0];
    }

    const playRound = (row, col)=>{
        board.markCell(activePlayer.token, row, col);
        board.printBoard();

        switchActivePlayer();
    }

    return {
        switchActivePlayer, playRound, getActivePlayer
    }
}

const game = GameController();