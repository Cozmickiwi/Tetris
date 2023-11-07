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
    let shapeHis = [];
    let currentShape = 'line';
    let shapeSettled = false;
    let i=0;
    let interval;
    window.addEventListener('keydown', event =>{
        if(event.key == 'ArrowRight'){
            for(let q = 0; q<line.length; q++){
                document.getElementById(line[q]).style.backgroundColor = 'rgb(90, 90, 240)'
            }
            for(let g = 0; g<line.length; g++){
                line[g] += 1;
                document.getElementById(line[g]).style.backgroundColor = 'red';
            }
        }
        else if(event.key == 'ArrowLeft'){
            for(let q = 0; q<line.length; q++){
                document.getElementById(line[q]).style.backgroundColor = 'rgb(90, 90, 240)'
            }
            for(let g = 0; g<line.length; g++){
                line[g] -= 1;
                document.getElementById(line[g]).style.backgroundColor = 'red';
            }
        }
    })
    interval = setInterval(() =>{
        shapeMove();
    }, 500);
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
                //clearInterval(interval);
                for(let k=0; k<4; k++){
                    document.getElementById(line[k]).style.backgroundColor = 'rgb(90, 90, 240)'
                }
                shapeHis = line.slice();
                let settled = false;
                for(let j=0; j<4;j++){
                    line[j]+=10;
                    if(line[j] > 200){
                        settled = true;
                    }
                    else if(takenTiles.includes(line[j])){
                        settled = true;
                    }
                    if(settled == true){
                    for(let n = 0; n<line.length;n++){
                        if(line[n] <= 200 && !(takenTiles.includes(line[n]))){
                            document.getElementById(line[n]).style.backgroundColor = 'rgb(90, 90, 240)';
                        }
                        document.getElementById(shapeHis[n]).style.backgroundColor = 'red';
                    }
                    for(let l = 0; l<4; l++){
                        takenTiles.push(shapeHis[l]);
                    }
                    line = [5, 15, 25, 35];
                    i = 0;
                    settled = false;
                    return;
                }
                    
                    document.getElementById(line[j]).style.backgroundColor = 'red';
                }
                
                /*for(let k=0; k<4;k++){
                    for(let y=0; y<4)
                    if(shapeHis[k] != line[k]){
                        document.getElementById(shapeHis[k]).style.backgroundColor = 'rgb(90, 90, 240)';
                    }
                }
                */
            }
        }
    }
}
game();