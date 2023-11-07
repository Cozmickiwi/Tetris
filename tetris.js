const gameBoard = document.querySelector('.game');

function gameGrid(){
    for(i=1;i<=200;i++){
        let tile = document.createElement('div');
        tile.id = i;
        tile.className = 'tile';
        gameBoard.appendChild(tile);
    }
}

gameGrid();

function game(){
    let line = [5, 15, 25, 35];
    let takenTiles = [];
    let currentShape = 'line';
    let shapeSettled = false;
    let i=0;
    setInterval(() =>{
        shapeMove();
    }, 1000);
    function shapeMove () {
        i++
        let frame = i;
        if(currentShape == 'line'){
            if(frame < 5){
                for(let x=0;x<frame;x++){
                        document.getElementById(line[x]).style.backgroundColor = 'red';
                    }
            }
            else{
                clearInterval(() =>{
                    shapeMove();
                }, 500)
            }
        }
    }
}
game();