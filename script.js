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
    let movesCount = 0;

    const resetBoard = ()=>{
        for(let i=0;i<rows;i++){
            board[i] = []
            for(let j=0;j<cols;j++){
                board[i].push(Cell());
            }
        }
        movesCount = 0;
    }

    resetBoard();
    

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
        board[rowIndex][colIndex].changeValue(player);
        movesCount++;
    }

    const checkWin = () =>{
        if(board[0][0].getCellValue()!==0 
        && (board[0][0].getCellValue()===board[0][1].getCellValue()) 
        && (board[0][0].getCellValue()===board[0][2].getCellValue())){
            return true;
        }else if(board[1][0].getCellValue()!==0 
        && (board[1][0].getCellValue()===board[1][1].getCellValue()) 
        && (board[1][0].getCellValue()===board[1][2].getCellValue())){
            return true
        }else if(board[2][0].getCellValue()!==0 
        && (board[2][0].getCellValue()===board[2][1].getCellValue()) 
        && (board[2][0].getCellValue()===board[2][2].getCellValue())){
            return true
        }else if(board[0][0].getCellValue()!==0 
        && (board[0][0].getCellValue()===board[1][0].getCellValue()) 
        && (board[1][0].getCellValue()===board[2][0].getCellValue())){
            return true
        }else if(board[0][0].getCellValue()!==0 
        && (board[0][0].getCellValue()===board[1][0].getCellValue()) 
        && (board[1][0].getCellValue()===board[2][0].getCellValue())){
            return true
        }else if(board[0][1].getCellValue()!==0 
        && (board[0][1].getCellValue()===board[1][1].getCellValue()) 
        && (board[1][1].getCellValue()===board[2][1].getCellValue())){
            return true
        }else if(board[0][2].getCellValue()!==0 
        && (board[0][2].getCellValue()===board[1][2].getCellValue()) 
        && (board[1][2].getCellValue()===board[2][2].getCellValue())){
            return true
        }else if(board[0][0].getCellValue()!==0 
        && (board[0][0].getCellValue()===board[1][1].getCellValue()) 
        && (board[1][1].getCellValue()===board[2][2].getCellValue())){
            return true
        }else if(board[0][2].getCellValue()!==0 
        && (board[0][2].getCellValue()===board[1][1].getCellValue()) 
        && (board[1][1].getCellValue()===board[2][0].getCellValue())){
            return true
        }else{
            if(movesCount===9){
                return 'tie';
            }
            return false;
        }
    }

    return {getBoard, printBoard, markCell, checkWin, resetBoard};

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

        if(board.checkWin()){
            console.log('won');
            //board.resetBoard();
            return board.checkWin();
        }

       switchActivePlayer();
    }


    const resetGame = ()=>{
        board.resetBoard();
        activePlayer = players[0];
    }


    return {
        switchActivePlayer, playRound, getActivePlayer, getBoard : board.getBoard(), resetGame
    }
}

function ScreenController(){
    const game = GameController();
    const boardDiv = document.querySelector('.board')
    const turnDiv = document.querySelector('.turn');
    let winFlag = false;

    const updateScreen = () => {
        boardDiv.textContent = '';
        let latestBoard = game.getBoard;
        let activePlayer = game.getActivePlayer();
        turnDiv.textContent = `${activePlayer.player}'s turn`;
        latestBoard.forEach((row, i) => {
            row.forEach((cellEle, j)=>{
                let cell = document.createElement('button');
                cell.classList.add('cell');
                cell.dataset.row = i;
                cell.dataset.column = j;
                cellVal = cellEle.getCellValue();
                if(cellVal === 0){
                    cell.classList.add('no-value');
                    cell.textContent = '';
                }else if(cellVal === 1){
                    cell.classList.add('x-value');
                    cell.textContent = 'X';
                }else{
                    cell.classList.add('o-value');
                    cell.textContent = 'O';
                }
                boardDiv.appendChild(cell);
            })
        });

        if(winFlag){
            if(winFlag === 'tie'){
                turnDiv.textContent = `It's a Tie`;
            }else{
                turnDiv.textContent = `${activePlayer.player} won`;
            }
            document.querySelectorAll('.cell').forEach((cell)=>{
                cell.disabled = true;
            })
        }

    }

    const clickHandler = (e) => {
        let row = e.target.dataset.row;
        let col = e.target.dataset.column;
        winFlag = game.playRound(row, col);
        updateScreen();
    }

    boardDiv.addEventListener('click', clickHandler);

    const resetGameClicked = ()=>{
        game.resetGame();
        winFlag = false;
        updateScreen();

    }

    document.querySelector('#btnReset').addEventListener('click', resetGameClicked);

    updateScreen();

}

ScreenController();
