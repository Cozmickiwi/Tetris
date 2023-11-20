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
    const line = [[5, 'rgb(46, 211, 230)'], [15, 'rgb(46, 211, 230)'], [25, 'rgb(46, 211, 230)'], [35, 'rgb(46, 211, 230)']];
    const square = [[5, 'rgb(208, 217, 41)'], [6, 'rgb(208, 217, 41)'], [15, 'rgb(208, 217, 41)'], [16, 'rgb(208, 217, 41)']];
    const jBlock = [[5, 'rgb(33, 25, 191)'], [15, 'rgb(33, 25, 191)'], [24, 'rgb(33, 25, 191)'], [25, 'rgb(33, 25, 191)']];
    const lBlock = [[5, 'rgb(232, 162, 23)'], [15, 'rgb(232, 162, 23)'], [25, 'rgb(232, 162, 23)'], [26, 'rgb(232, 162, 23)']];
    const sBlock = [[5, 'rgb(20, 204, 97)'], [15, 'rgb(20, 204, 97)'], [16, 'rgb(20, 204, 97)'], [26, 'rgb(20, 204, 97)']];
    const zBlock = [[6, 'rgb(209, 29, 47)'], [15, 'rgb(209, 29, 47)'], [16, 'rgb(209, 29, 47)'], [25, 'rgb(209, 29, 47)']];
    const tBlock = [[5, 'rgb(193, 25, 212)'], [14, 'rgb(193, 25, 212)'], [15, 'rgb(193, 25, 212)'], [16, 'rgb(193, 25, 212)']];
    //let shape = [5, 15, 25, 35];
    let shape = [[5, 'rgb(46, 211, 230)'], [15, 'rgb(46, 211, 230)'], [25, 'rgb(46, 211, 230)'], [35, 'rgb(46, 211, 230)']];
    let takenTiles = [];
    let takenTilesCopy = [];
    let shapeHis = [];
    //let currentShape = 'line';
    let currentShape = 'line';
    let shapeSettled = false;
    let i=0; 
    let interval;
    let time = 500;
    let downEventFired = false;
    let repaint = false;
    let ignoreRow;
    let dropCount = 0;
    let cont = true;
    let curRotation = 1;
    let takenTileNums = [];
    window.addEventListener('keydown', event =>{
        function horizMove() {
            let prevMove = shape.slice();
            if(event.key == 'ArrowRight'){
                for(let u = 0; u<shape.length; u++){
                    if((shape[u])[0] % 10 == 0){
                        return;
                    }
                    else if(takenTileNums.includes((shape[u])[0]+1)){
                        return;
                    }
                }
                for(let q = 0; q<shape.length; q++){
                    document.getElementById((shape[q])[0]).style.backgroundColor = 'rgb(22, 22, 22)';
                    document.getElementById((shape[q])[0]).style.border = 'none';
                    document.getElementById((shape[q])[0]).style.outline = '1px solid black';
                    
                }
                for(let g = 0; g<shape.length; g++){
                    (shape[g])[0] += 1;
                    
                    document.getElementById((shape[g])[0]).style.backgroundColor = `${(shape[g])[1]}`;
                    document.getElementById((shape[g])[0]).style.border = '4px outset rgba(117, 117, 117, .4)';
                    document.getElementById((shape[g])[0]).style.outline = 'none';
                }
            }
            else if(event.key == 'ArrowLeft'){
                for(let u = 0; u<shape.length; u++){
                    if(((shape[u])[0]-1) % 10 == 0){
                        return;
                    }
                    else if(takenTileNums.includes((shape[u])[0]-1)){
                        return;
                    }
                }
                for(let q = 0; q<shape.length; q++){
                    document.getElementById((shape[q])[0]).style.backgroundColor = 'rgb(22, 22, 22)';
                    document.getElementById((shape[q])[0]).style.border = 'none';
                    document.getElementById((shape[q])[0]).style.outline = '1px solid black';
                }
                for(let g = 0; g<shape.length; g++){
                    (shape[g])[0] -= 1;
                    document.getElementById((shape[g])[0]).style.backgroundColor = `${(shape[g])[1]}`;
                    document.getElementById((shape[g])[0]).style.border = '4px outset rgba(117, 117, 117, .4)';
                    document.getElementById((shape[g])[0]).style.outline = 'none';
                }
            }
            else if(event.key == 'ArrowDown' && downEventFired == false){
                downEventFired = true;
                time = 50;
                clearInterval(interval);
                interval = setInterval(() =>{
                    shapeMove();
                }, time);
                window.addEventListener('keyup', event => {
                    if(event.key == 'ArrowDown'){
                        downEventFired = false;
                        time = 500;
                        clearInterval(interval);
                        interval = setInterval(() =>{
                            shapeMove();
                        }, time);
                    }
                });
            }
            else if(event.code == 'Space'){
                debugger;
            }
            else if(event.key == 'd'){
                if(currentShape == 'line'){
                    for(let i=0;i<4;i++){
                        document.getElementById((shape[i])[0]).style.backgroundColor = 'rgb(22, 22, 22)'
                        document.getElementById((shape[i])[0]).style.border = 'none';
                        document.getElementById((shape[i])[0]).style.outline = '1px solid black';
                    }
                    if(curRotation == 1){
                        if((shape[0])[0] % 10 == 0){
                            (shape[0])[0] = (shape[2])[0]-3;
                            (shape[1])[0] = (shape[2])[0]-2;
                            (shape[3])[0] = (shape[2])[0];
                            (shape[2])[0]--;
                        }
                        else if(((shape[0])[0]+1) % 10 == 0){
                            (shape[0])[0] = (shape[2])[0]-2;
                            (shape[1])[0] = (shape[2])[0]-1;
                            (shape[3])[0] = (shape[2])[0]+1;
                        }
                        else if(((shape[0])[0]-1) % 10 == 0){
                            (shape[0])[0] = (shape[2])[0]+3;
                            (shape[1])[0] = (shape[2])[0]+2;
                            (shape[3])[0] = (shape[2])[0];
                            (shape[2])[0]++;
                        }
                        else if(((shape[0])[0]-2) % 10 == 0){
                            (shape[0])[0] = (shape[2])[0]+2;
                            (shape[1])[0] = (shape[2])[0]+1;
                            (shape[3])[0] = (shape[2])[0]-1;
                        }
                        else{
                            (shape[0])[0] = (shape[2])[0]-2;
                            (shape[1])[0] = (shape[2])[0]-1;
                            (shape[3])[0] = (shape[2])[0]+1;
                        }
                        for(let i=0;i<4;i++){
                            document.getElementById((shape[i][0])).style.backgroundColor = `${(shape[i])[1]}`;
                            document.getElementById((shape[i])[0]).style.border = '4px outset rgba(117, 117, 117, .4)';
                            document.getElementById((shape[i])[0]).style.outline = 'none';
                        }
                        curRotation = 2;
                    }
                    
                    else if(curRotation == 2){
                        if(((shape[2])[0] + 20) <= 200 && !takenTileNums.includes((shape[2])[0] + 20)){
                        (shape[3])[0] = (shape[2])[0]+10;
                        (shape[1])[0] = (shape[2])[0]-10;
                        (shape[0])[0] = (shape[2])[0]-20;
                        for(let i=0;i<4;i++){
                            document.getElementById((shape[i])[0]).style.backgroundColor = `${(shape[i])[1]}`;
                            document.getElementById((shape[i])[0]).style.border = '4px outset rgba(117, 117, 117, .4)';
                            document.getElementById((shape[i])[0]).style.outline = 'none';
                        }
                        curRotation = 1;
                        }
                        else if(((shape[2])[0] + 20) >= 200 || takenTileNums.includes((shape[2])[0] + 20)){
                            (shape[3])[0] = (shape[2])[0]-10;
                            (shape[1])[0] = (shape[2])[0]-20;
                            (shape[0])[0] = (shape[2])[0]-30;
                            for(let i=0;i<4;i++){
                                document.getElementById((shape[i])[0]).style.backgroundColor = `${(shape[i])[1]}`;
                                document.getElementById((shape[i])[0]).style.border = '4px outset rgba(117, 117, 117, .4)';
                                document.getElementById((shape[i])[0]).style.outline = 'none';
                            }
                        }
                    }
                }
                else if(currentShape == 'jBlock'){
                    for(let i=0;i<4;i++){
                        document.getElementById((shape[i])[0]).style.backgroundColor = 'rgb(22, 22, 22)'
                        document.getElementById((shape[i])[0]).style.border = 'none';
                        document.getElementById((shape[i])[0]).style.outline = '1px solid black';
                    }
                    if(curRotation == 1){
                        if((shape[0])[0] % 10 == 0){
                            (shape[1])[0] = (shape[2])[0]-1;
                            (shape[0])[0] = (shape[1])[0]-10;
                            (shape[3])[0] = (shape[2])[0]+1;
                            //(shape[2])[0]--;
                        }
                        else if(((shape[2])[0]-1) % 10 == 0){
                            (shape[1])[0] = (shape[2])[0];
                            (shape[0])[0] = (shape[1])[0]-10;
                            (shape[3])[0] = (shape[2])[0]+2;
                            (shape[2])[0]++;
                        }
                        else{
                            (shape[1])[0] = (shape[2])[0];
                            (shape[0])[0] = (shape[1])[0]-10;
                            (shape[3])[0] = (shape[2])[0]+2;
                            (shape[2])[0]++;
                        }
                        for(let i=0;i<4;i++){
                            document.getElementById((shape[i])[0]).style.backgroundColor = `${(shape[i])[1]}`;
                            document.getElementById((shape[i])[0]).style.border = '4px outset rgba(117, 117, 117, .4)';
                            document.getElementById((shape[i])[0]).style.outline = 'none';
                        }
                        curRotation = 2;
                    }
                    else if(curRotation == 2){
                        (shape[0])[0] = (shape[2])[0]-10;
                        (shape[1])[0] = (shape[0])[0]+1;
                        (shape[3])[0] = (shape[2])[0]+10;
                        for(let i=0;i<4;i++){
                            document.getElementById((shape[i])[0]).style.backgroundColor = `${(shape[i])[1]}`;
                            document.getElementById((shape[i])[0]).style.border = '4px outset rgba(117, 117, 117, .4)';
                            document.getElementById((shape[i])[0]).style.outline = 'none';
                        }
                        curRotation = 3;
                    }
                    else if(curRotation == 3){
                        if(((shape[2])[0]-1) % 10 == 0){
                            if(((shape[2])[0] + 20) <= 200 && !takenTileNums.includes((shape[2])[0] + 20)){
                            (shape[0])[0] = (shape[2])[0];
                            (shape[1])[0] = (shape[0])[0]+1;
                            (shape[2])[0] = (shape[1])[0]+1;
                            (shape[3])[0] = (shape[2])[0]+10;
                            }
                            else if(((shape[2])[0] + 10) >= 200 || takenTileNums.includes((shape[2])[0] + 10)){
                                console.log("NO")
                            }
                            else if(((shape[2])[0] + 20) >= 200 || takenTileNums.includes((shape[2])[0] + 20)){
                                (shape[0])[0] = (shape[2])[0]-20;
                                (shape[1])[0] = (shape[0])[0]-19;
                                (shape[2])[0] = (shape[1])[0]-19;
                                (shape[3])[0] = (shape[2])[0]-10;
                            }
                        }
                        else{
                            if(((shape[2])[0] + 20) <= 200 && !takenTileNums.includes((shape[2])[0] + 20)){
                            (shape[0])[0] = (shape[2])[0]-1;
                            (shape[1])[0] = (shape[0])[0]+1;
                            (shape[2])[0] = (shape[1])[0]+1;
                            (shape[3])[0] = (shape[2])[0]+10;
                            }
                            else if(((shape[2])[0] + 10) >= 200 || takenTileNums.includes((shape[2])[0] + 10)){
                                console.log("NO")
                            }
                            else if(((shape[2])[0] + 20) >= 200 || takenTileNums.includes((shape[2])[0] + 20)){
                                (shape[0])[0] = (shape[2])[0]-21;
                                (shape[1])[0] = (shape[0])[0]-19;
                                (shape[2])[0] = (shape[1])[0]-19;
                                (shape[3])[0] = (shape[2])[0]-10;
                            }
                        }
                        for(let i=0;i<4;i++){
                            document.getElementById((shape[i])[0]).style.backgroundColor = `${(shape[i])[1]}`;
                            document.getElementById((shape[i])[0]).style.border = '4px outset rgba(117, 117, 117, .4)';
                            document.getElementById((shape[i])[0]).style.outline = 'none';
                        }
                        curRotation = 4;
                    }
                    else if(curRotation == 4){
                        if(((shape[2])[0] + 20) <= 200 && !takenTileNums.includes((shape[2])[0] + 20)){
                        (shape[2])[0] = (shape[1])[0]+10;
                        (shape[0])[0] = (shape[1])[0]-10;
                        (shape[3])[0] = (shape[2])[0]-1;
                        for(let i=0;i<4;i++){
                            document.getElementById((shape[i])[0]).style.backgroundColor = `${(shape[i])[1]}`;
                            document.getElementById((shape[i])[0]).style.border = '4px outset rgba(117, 117, 117, .4)';
                            document.getElementById((shape[i])[0]).style.outline = 'none';
                        }
                        curRotation = 1;
                        }
                        else if(((shape[2])[0] + 20) >= 200 || takenTileNums.includes((shape[2])[0] + 20)){
                            (shape[3])[0] = (shape[2])[0]-10;
                            (shape[1])[0] = (shape[2])[0]-20;
                            (shape[0])[0] = (shape[2])[0]-30;
                            for(let i=0;i<4;i++){
                                document.getElementById((shape[i])[0]).style.backgroundColor = `${(shape[i])[1]}`;
                                document.getElementById((shape[i])[0]).style.border = '4px outset rgba(117, 117, 117, .4)';
                            document.getElementById((shape[i])[0]).style.outline = 'none';
                            }
                        }
                    }
                }
                else if(currentShape == 'lBlock'){
                    for(let i=0;i<4;i++){
                        document.getElementById((shape[i])[0]).style.backgroundColor = 'rgb(22, 22, 22)'
                        document.getElementById((shape[i])[0]).style.border = 'none';
                        document.getElementById((shape[i])[0]).style.outline = '1px solid black';
                    }
                    if(curRotation == 1){
                        if((shape[3])[0] % 10 == 0){
                            (shape[1])[0] = (shape[2])[0]-1;
                            (shape[0])[0] = (shape[1])[0]+10;
                            (shape[3])[0] = (shape[2])[0]+1;
                            //(shape[2])[0]--;
                        }
                        else if(((shape[2])[0]-1) % 10 == 0){
                            (shape[1])[0] = (shape[2])[0];
                            (shape[0])[0] = (shape[1])[0]+10;
                            (shape[3])[0] = (shape[2])[0]+2;
                            (shape[2])[0]++;
                        }
                        else{
                            (shape[1])[0] = (shape[2])[0];
                            (shape[0])[0] = (shape[1])[0]+10;
                            (shape[3])[0] = (shape[2])[0]+2;
                            (shape[2])[0]++;
                        }
                        for(let i=0;i<4;i++){
                            document.getElementById((shape[i])[0]).style.backgroundColor = `${(shape[i])[1]}`;
                            document.getElementById((shape[i])[0]).style.border = '4px outset rgba(117, 117, 117, .4)';
                            document.getElementById((shape[i])[0]).style.outline = 'none';
                        }
                        curRotation = 2;
                    }
                    else if(curRotation == 2){
                        (shape[0])[0] = (shape[2])[0]-11;
                        (shape[1])[0] = (shape[0])[0]+1;
                        (shape[3])[0] = (shape[2])[0]+10;
                        for(let i=0;i<4;i++){
                            document.getElementById((shape[i])[0]).style.backgroundColor = `${(shape[i])[1]}`;
                            document.getElementById((shape[i])[0]).style.border = '4px outset rgba(117, 117, 117, .4)';
                            document.getElementById((shape[i])[0]).style.outline = 'none';
                        }
                        curRotation = 3;
                    }
                    else if(curRotation == 3){
                        if(((shape[2])[0]-1) % 10 == 0){
                            if(((shape[2])[0] + 20) <= 200 && !takenTileNums.includes((shape[2])[0] + 20)){
                            (shape[0])[0] = (shape[2])[0];
                            (shape[1])[0] = (shape[0])[0]+1;
                            (shape[2])[0] = (shape[1])[0]+1;
                            (shape[3])[0] = (shape[2])[0]+10;
                            }
                            else if(((shape[2])[0] + 10) >= 200 || takenTileNums.includes((shape[2])[0] + 10)){
                                console.log("NO")
                            }
                            else if(((shape[2])[0] + 20) >= 200 || takenTileNums.includes((shape[2])[0] + 20)){
                                (shape[1])[0] = (shape[2])[0]-20;
                                (shape[2])[0] = (shape[1])[0]-19;
                                (shape[3])[0] = (shape[2])[0]-19;
                                (shape[0])[0] = (shape[3])[0]+10;
                            }
                        }
                        else{
                            if(((shape[2])[0] + 20) <= 200 && !takenTileNums.includes((shape[2])[0] + 20)){
                            (shape[1])[0] = (shape[2])[0]-1;
                            (shape[2])[0] = (shape[1])[0]+1;
                            (shape[3])[0] = (shape[2])[0]+1;
                            (shape[0])[0] = (shape[3])[0]-10;
                            }
                            else if(((shape[2])[0] + 10) >= 200 || takenTileNums.includes((shape[2])[0] + 10)){
                                console.log("NO")
                            }
                            else if(((shape[2])[0] + 20) >= 200 || takenTileNums.includes((shape[2])[0] + 20)){
                                (shape[1])[0] = (shape[2])[0]-21;
                                (shape[2])[0] = (shape[1])[0]-19;
                                (shape[3])[0] = (shape[2])[0]-19;
                                (shape[0])[0] = (shape[3])[0]+10;
                            }
                        }
                        for(let i=0;i<4;i++){
                            document.getElementById((shape[i])[0]).style.backgroundColor = `${(shape[i])[1]}`;
                            document.getElementById((shape[i])[0]).style.border = '4px outset rgba(117, 117, 117, .4)';
                            document.getElementById((shape[i])[0]).style.outline = 'none';
                        }
                        curRotation = 4;
                    }
                    else if(curRotation == 4){
                        if(((shape[2])[0] + 20) <= 200 && !takenTileNums.includes((shape[2])[0] + 20)){
                        (shape[2])[0] = (shape[1])[0]+10;
                        (shape[0])[0] = (shape[1])[0]-10;
                        (shape[3])[0] = (shape[2])[0]+1;
                        for(let i=0;i<4;i++){
                            document.getElementById((shape[i])[0]).style.backgroundColor = `${(shape[i])[1]}`;
                            document.getElementById((shape[i])[0]).style.border = '4px outset rgba(117, 117, 117, .4)';
                            document.getElementById((shape[i])[0]).style.outline = 'none';
                        }
                        curRotation = 1;
                        }
                        else if(((shape[2])[0] + 20) >= 200 || takenTileNums.includes((shape[2])[0] + 20)){
                            (shape[3])[0] = (shape[2])[0]-10;
                            (shape[1])[0] = (shape[2])[0]-20;
                            (shape[0])[0] = (shape[2])[0]-30;
                            for(let i=0;i<4;i++){
                                document.getElementById((shape[i])[0]).style.backgroundColor = `${(shape[i])[1]}`;
                                document.getElementById((shape[i])[0]).style.border = '4px outset rgba(117, 117, 117, .4)';
                            document.getElementById((shape[i])[0]).style.outline = 'none';
                            }
                        }
                    }
                }
                else if(currentShape == 'sBlock'){
                    for(let i=0;i<4;i++){
                        document.getElementById((shape[i])[0]).style.backgroundColor = 'rgb(22, 22, 22)'
                        document.getElementById((shape[i])[0]).style.border = 'none';
                        document.getElementById((shape[i])[0]).style.outline = '1px solid black';
                    }
                    if(curRotation == 1){
                        if((shape[0])[0] % 10 == 0){
                            (shape[1])[0] = (shape[2])[0]-1;
                            (shape[0])[0] = (shape[1])[0]-10;
                            (shape[3])[0] = (shape[2])[0]+1;
                        }
                        else if(((shape[2])[0]-1) % 10 == 0){
                            (shape[1])[0] = (shape[2])[0];
                            (shape[0])[0] = (shape[1])[0]-10;
                            (shape[3])[0] = (shape[2])[0]+2;
                            (shape[2])[0]++;
                        }
                        else{
                            (shape[0])[0] = (shape[1])[0];
                            (shape[1])[0] = (shape[0])[0]+1;
                            (shape[2])[0] = (shape[0])[0]-10;
                            (shape[3])[0] = (shape[2])[0]-1;
                        }
                        for(let i=0;i<4;i++){
                            document.getElementById((shape[i])[0]).style.backgroundColor = `${(shape[i])[1]}`;
                            document.getElementById((shape[i])[0]).style.border = '4px outset rgba(117, 117, 117, .4)';
                            document.getElementById((shape[i])[0]).style.outline = 'none';
                        }
                        curRotation = 2;
                    }
                    else if(curRotation == 2){
                        (shape[0])[0] = (shape[1])[0]-10;
                        (shape[3])[0] = (shape[0])[0]-1;
                        (shape[2])[0] = (shape[3])[0]-10;
                        for(let i=0;i<4;i++){
                            document.getElementById((shape[i])[0]).style.backgroundColor = `${(shape[i])[1]}`;
                            document.getElementById((shape[i])[0]).style.border = '4px outset rgba(117, 117, 117, .4)';
                            document.getElementById((shape[i])[0]).style.outline = 'none';
                        }
                        curRotation = 1;
                    }
                }
                else if(currentShape == 'zBlock'){
                    for(let i=0;i<4;i++){
                        document.getElementById((shape[i])[0]).style.backgroundColor = 'rgb(22, 22, 22)'
                        document.getElementById((shape[i])[0]).style.border = 'none';
                        document.getElementById((shape[i])[0]).style.outline = '1px solid black';
                    }
                    if(curRotation == 1){
                        if((shape[0])[0] % 10 == 0){
                            (shape[1])[0] = (shape[2])[0]-1;
                            (shape[0])[0] = (shape[1])[0]-10;
                            (shape[3])[0] = (shape[2])[0]+1;
                        }
                        else if(((shape[2])[0]-1) % 10 == 0){
                            (shape[1])[0] = (shape[2])[0];
                            (shape[0])[0] = (shape[1])[0]-10;
                            (shape[3])[0] = (shape[2])[0]+2;
                            (shape[2])[0]++;
                        }
                        else{
                            (shape[0])[0]-=2;
                            (shape[1])[0] = (shape[0])[0]+1;
                            (shape[2])[0] = (shape[1])[0]+10;
                            (shape[3])[0] = (shape[2])[0]+1;
                        }
                        for(let i=0;i<4;i++){
                            document.getElementById((shape[i])[0]).style.backgroundColor = `${(shape[i])[1]}`;
                            document.getElementById((shape[i])[0]).style.border = '4px outset rgba(117, 117, 117, .4)';
                            document.getElementById((shape[i])[0]).style.outline = 'none';
                        }
                        curRotation = 2;
                    }
                    else if(curRotation == 2){
                        (shape[0])[0] = (shape[1])[0]-9;
                        (shape[1])[0] = (shape[0])[0]+9;
                        (shape[2])[0] = (shape[1])[0]+1;
                        (shape[3])[0] = (shape[1])[0]+10;
                        for(let i=0;i<4;i++){
                            document.getElementById((shape[i])[0]).style.backgroundColor = `${(shape[i])[1]}`;
                            document.getElementById((shape[i])[0]).style.border = '4px outset rgba(117, 117, 117, .4)';
                            document.getElementById((shape[i])[0]).style.outline = 'none';
                        }
                        curRotation = 1;
                    }
                }
                if(currentShape == 'tBlock'){
                    for(let i=0;i<4;i++){
                        document.getElementById((shape[i])[0]).style.backgroundColor = 'rgb(22, 22, 22)'
                        document.getElementById((shape[i])[0]).style.border = 'none';
                        document.getElementById((shape[i])[0]).style.outline = '1px solid black';
                    }
                    if(curRotation == 1){
                        if((shape[0])[0] % 10 == 0){
                            (shape[1])[0] = (shape[0])[0]-10;
                            (shape[2])[0] = (shape[1])[0]+1;
                            (shape[3])[0] = (shape[1])[0]-10;
                        }
                        else if(((shape[0])[0]+1) % 10 == 0){
                            (shape[0])[0] = (shape[2])[0]-2;
                            (shape[1])[0] = (shape[2])[0]-1;
                            (shape[3])[0] = (shape[2])[0]+1;
                        }
                        else if(((shape[0])[0]-1) % 10 == 0){
                            (shape[0])[0] = (shape[2])[0]+3;
                            (shape[1])[0] = (shape[2])[0]+2;
                            (shape[3])[0] = (shape[2])[0];
                            (shape[2])[0]++;
                        }
                        else if(((shape[0])[0]-2) % 10 == 0){
                            (shape[0])[0] = (shape[2])[0]+2;
                            (shape[1])[0] = (shape[2])[0]+1;
                            (shape[3])[0] = (shape[2])[0]-1;
                        }
                        else{
                            (shape[1])[0] = (shape[0])[0]+10;
                            (shape[2])[0] = (shape[1])[0]+1;
                            (shape[3])[0] = (shape[1])[0]+10;
                        }
                        for(let i=0;i<4;i++){
                            document.getElementById((shape[i])[0]).style.backgroundColor = `${(shape[i])[1]}`;
                            document.getElementById((shape[i])[0]).style.border = '4px outset rgba(117, 117, 117, .4)';
                            document.getElementById((shape[i])[0]).style.outline = 'none';
                        }
                        curRotation = 2;
                    }
                    
                    else if(curRotation == 2){
                        if(((shape[2])[0] + 20) <= 200 && !takenTileNums.includes((shape[2])[0] + 20)){
                        (shape[0])[0] = (shape[1])[0]-1;
                        for(let i=0;i<4;i++){
                            document.getElementById((shape[i])[0]).style.backgroundColor = `${(shape[i])[1]}`;
                            document.getElementById((shape[i])[0]).style.border = '4px outset rgba(117, 117, 117, .4)';
                            document.getElementById((shape[i])[0]).style.outline = 'none';
                        }
                        curRotation = 3;
                        }
                        else if(((shape[2])[0] + 20) >= 200 || takenTileNums.includes((shape[2])[0] + 20)){
                            (shape[3])[0] = (shape[2])[0]-10;
                            (shape[1])[0] = (shape[2])[0]-20;
                            (shape[0])[0] = (shape[2])[0]-30;
                            for(let i=0;i<4;i++){
                                document.getElementById((shape[i])[0]).style.backgroundColor = `${(shape[i])[1]}`;
                                document.getElementById((shape[i])[0]).style.border = '4px outset rgba(117, 117, 117, .4)';
                            document.getElementById((shape[i])[0]).style.outline = 'none';
                            }
                        }
                    }
                    else if(curRotation == 3){
                        if(((shape[2])[0] + 20) <= 200 && !takenTileNums.includes((shape[2])[0] + 20)){
                        (shape[0])[0] = (shape[1])[0];
                        (shape[1])[0]+=9;
                        (shape[2])[0] = (shape[1])[0]+1;
                        (shape[3])[0] = (shape[2])[0]+10;
                        for(let i=0;i<4;i++){
                            document.getElementById((shape[i])[0]).style.backgroundColor = `${(shape[i])[1]}`;
                            document.getElementById((shape[i])[0]).style.border = '4px outset rgba(117, 117, 117, .4)';
                            document.getElementById((shape[i])[0]).style.outline = 'none';
                        }
                        curRotation = 4;
                        }
                        else if(((shape[2])[0] + 20) >= 200 || takenTileNums.includes((shape[2])[0] + 20)){
                            (shape[3])[0] = (shape[2])[0]-10;
                            (shape[1])[0] = (shape[2])[0]-20;
                            (shape[0])[0] = (shape[2])[0]-30;
                            for(let i=0;i<4;i++){
                                document.getElementById((shape[i])[0]).style.backgroundColor = `${(shape[i])[1]}`;
                                document.getElementById((shape[i])[0]).style.border = '4px outset rgba(117, 117, 117, .4)';
                            document.getElementById((shape[i])[0]).style.outline = 'none';
                            }
                        }
                    }
                    else if(curRotation == 4){
                        if(((shape[2])[0] + 20) <= 200 && !takenTileNums.includes((shape[2])[0] + 20)){
                        (shape[3])[0] = (shape[2])[0]+1;
                        for(let i=0;i<4;i++){
                            document.getElementById((shape[i])[0]).style.backgroundColor = `${(shape[i])[1]}`;
                            document.getElementById((shape[i])[0]).style.border = '4px outset rgba(117, 117, 117, .4)';
                            document.getElementById((shape[i])[0]).style.outline = 'none';
                        }
                        curRotation = 1;
                        }
                        else if(((shape[2])[0] + 20) >= 200 || takenTileNums.includes((shape[2])[0] + 20)){
                            (shape[3])[0] = (shape[2])[0]-10;
                            (shape[1])[0] = (shape[2])[0]-20;
                            (shape[0])[0] = (shape[2])[0]-30;
                            for(let i=0;i<4;i++){
                                document.getElementById((shape[i])[0]).style.backgroundColor = `${(shape[i])[1]}`;
                                document.getElementById((shape[i])[0]).style.border = '4px outset rgba(117, 117, 117, .4)';
                            document.getElementById((shape[i])[0]).style.outline = 'none';
                            }
                        }
                    }
                }
            }
        }
        horizMove();
    });
    interval = setInterval(() =>{
        shapeMove();
    }, time);
    function shapeMove () {
        i++;
        let frame = i;
        if(currentShape == 'line'){
            if(frame < 5){
                for(let x=0;x<frame;x++){
                    document.getElementById((shape[x])[0]).style.backgroundColor = `${(shape[x])[1]}`;
                    document.getElementById((shape[x])[0]).style.border = '4px outset rgba(117, 117, 117, .4)';
                }
            }
        }
        else if(currentShape == 'square'){
            if(frame < 4){
                for(let x=0;x<frame;x++){
                    document.getElementById((shape[x])[0]).style.backgroundColor = `${(shape[x])[1]}`;
                    document.getElementById((shape[x])[0]).style.border = '4px outset rgba(117, 117, 117, .4)';
                }
            }
        }
        else if(currentShape == 'jBlock'){
            if(frame < 4){
                for(let x=0;x<frame;x++){
                    document.getElementById((shape[x])[0]).style.backgroundColor = `${(shape[x])[1]}`;
                    document.getElementById((shape[x])[0]).style.border = '4px outset rgba(117, 117, 117, .4)';
                }
            }
        }
        else if(currentShape == 'lBlock'){
            if(frame < 4){
                for(let x=0;x<frame;x++){
                    document.getElementById((shape[x])[0]).style.backgroundColor = `${(shape[x])[1]}`;
                    document.getElementById((shape[x])[0]).style.border = '4px outset rgba(117, 117, 117, .4)';
                }
            }
        }
        else if(currentShape == 'sBlock'){
            if(frame < 4){
                for(let x=0;x<frame;x++){
                    document.getElementById((shape[x])[0]).style.backgroundColor = `${(shape[x])[1]}`;
                    document.getElementById((shape[x])[0]).style.border = '4px outset rgba(117, 117, 117, .4)';
                }
            }
        }
        else if(currentShape == 'zBlock'){
            if(frame < 4){
                for(let x=0;x<frame;x++){
                    document.getElementById((shape[x])[0]).style.backgroundColor = `${(shape[x])[1]}`;
                    document.getElementById((shape[x])[0]).style.border = '4px outset rgba(117, 117, 117, .4)';
                }
            }
        }
        else if(currentShape == 'tBlock'){
            if(frame < 3){
                for(let x=0;x<frame;x++){
                    document.getElementById((shape[x])[0]).style.backgroundColor = `${(shape[x])[1]}`;
                    document.getElementById((shape[x])[0]).style.border = '4px outset rgba(117, 117, 117, .4)';
                }
            }
        }
        for(let k=0; k<shape.length; k++){
            document.getElementById((shape[k])[0]).style.backgroundColor = 'rgb(22, 22, 22)'
            document.getElementById((shape[k])[0]).style.border = 'none'
            document.getElementById((shape[k])[0]).style.outline = '1px solid black';
        }
        //shapeHis = shape.slice();
        for(let b=0; b<4; b++){
            shapeHis[b] = [];
            shapeHis[b].push((shape[b])[0]);
            shapeHis[b].push((shape[b])[1]);
            console.log(shapeHis);
        }
        let settled = false;
        for(let j=0; j<shape.length;j++){
            (shape[j])[0]+=10;
            if((shape[j])[0] > 200){
                settled = true;
            }
            else if(takenTileNums.includes((shape[j])[0])){
                settled = true;
            }
            if(settled == true){
            for(let n = 0; n<shape.length;n++){
                if((shape[n])[0] <= 200 && !(takenTileNums.includes((shape[n])[0]))){
                    document.getElementById((shape[n])[0]).style.backgroundColor = 'rgb(22, 22, 22)';
                    document.getElementById((shape[n])[0]).style.border = 'none'
                    document.getElementById((shape[n])[0]).style.outline = '1px solid black';
                }
                document.getElementById((shapeHis[n])[0]).style.backgroundColor = `${(shapeHis[n])[1]}`;
                document.getElementById((shapeHis[n])[0]).style.border = '4px outset rgba(117, 117, 117, .4)';
                document.getElementById((shapeHis[n])[0]).style.outline = 'none';
            }
            for(let l = 0; l<4; l++){
                takenTiles.push((shapeHis[l]));
            }
            takenTiles = MergeSort(takenTiles);
            takenTileNums = [];
            for(let i=0; i<takenTiles.length; i++){
                takenTileNums[i] = (takenTiles[i])[0];
            }
            let n = (takenTiles.length)-1;
            if(n>=9){
                takenTilesCopy = takenTiles.slice();
                for(let a = 0; a<=n;a++){
                    if(a>=9 && ((takenTiles[a])[0] % 10) == 0 && (takenTiles[(a-9)])[0] == ((takenTiles[a])[0] - 9)){
                        repaint = true;
                        ignoreRow = (takenTiles[a])[0];
                        takenTiles.splice((a-9), 10);
                        takenTileNums.splice((a-9), 10);
                        n = (takenTiles.length)-1;
                        a-=10;
                        dropCount+=10;
                    }
                }
                if(repaint == true){
                    repaint = false;
                    for(let r = 1; r<=200; r++){
                        document.getElementById(r).style.backgroundColor = 'rgb(22, 22, 22)';
                        document.getElementById(r).style.border = 'none'
                        document.getElementById(r).style.outline = '1px solid black';
                    }
                    for(let f = 0; f<takenTiles.length; f++){
                        if((takenTiles[f])[0] <= (ignoreRow) && ((takenTiles[f])[0] + dropCount <=200)){
                            (takenTiles[f])[0] += dropCount;
                            takenTileNums[f] += dropCount;
                        }
                    }
                    for(let w = 0; w<takenTiles.length; w++){
                        document.getElementById((takenTiles[w])[0]).style.backgroundColor = `${(takenTiles[w])[1]}`;
                        document.getElementById((takenTiles[w])[0]).style.border = '4px outset rgba(117, 117, 117, .4)';
                        document.getElementById((takenTiles[w])[0]).style.outline = 'none';
                    }
                }
            }
            console.log(takenTiles);
            //line = [5, 15, 25, 35];
            let ranShape = Math.floor(Math.random() * 7);
            if(ranShape == 0){
                currentShape = 'line';
                for(let b=0; b<4; b++){
                    shape[b] = [];
                    shape[b].push((line[b])[0]);
                    shape[b].push((line[b])[1]);
                }
            }
            else if(ranShape == 1){
                currentShape = 'square';
                for(let b=0; b<4; b++){
                    shape[b] = [];
                    shape[b].push((square[b])[0]);
                    shape[b].push((square[b])[1]);
                }
            }
            else if(ranShape == 2){
                currentShape = 'jBlock';
                for(let b=0; b<4; b++){
                    shape[b] = [];
                    shape[b].push((jBlock[b])[0]);
                    shape[b].push((jBlock[b])[1]);
                }
            }
            else if(ranShape == 3){
                currentShape = 'lBlock';
                for(let b=0; b<4; b++){
                    shape[b] = [];
                    shape[b].push((lBlock[b])[0]);
                    shape[b].push((lBlock[b])[1]);
                }
            }
            else if(ranShape == 4){
                currentShape = 'sBlock';
                for(let b=0; b<4; b++){
                    shape[b] = [];
                    shape[b].push((sBlock[b])[0]);
                    shape[b].push((sBlock[b])[1]);
                }
            }
            else if(ranShape == 5){
                currentShape = 'zBlock';
                for(let b=0; b<4; b++){
                    shape[b] = [];
                    shape[b].push((zBlock[b])[0]);
                    shape[b].push((zBlock[b])[1]);
                }
            }
            else if(ranShape == 6){
                currentShape = 'tBlock';
                for(let b=0; b<4; b++){
                    shape[b] = [];
                    shape[b].push((tBlock[b])[0]);
                    shape[b].push((tBlock[b])[1]);
                }
            }
            dropCount = 0;
            ignoreRow = undefined;
            i = 0;
            settled = false;
            curRotation = 1;
            return;
        }
            document.getElementById((shape[j])[0]).style.backgroundColor = `${(shape[j])[1]}`;
            document.getElementById((shape[j])[0]).style.border = '4px outset rgba(117, 117, 117, .4)';
            document.getElementById((shape[j])[0]).style.outline = 'none';
        }
    }
}
game();

function MergeSort(A){
    let n = A.length;
    let Separate = function(A, p, r){
        if(p==r){
            return;
        }
        let q = Math.floor((p+r)/2);
        Separate(A, p, q);
        Separate(A, (q+1), r);
        Merge(A, p, q, r);
    }
    let Merge = function(A, p, q, r){
        let nl = q-p+1;
        let nr = r-q;
        let L = new Array(nl);
        let R = new Array(nr);
        for(let i = 0; i<=nl-1;i++){
            L[i] = A[p+i];
        }
        for(let j = 0; j<=nr-1;j++){
            R[j] = A[q+j+1];
        }
        let i=0;
        let j=0;
        let k=p;
        while(i<nl&&j<nr){
            if((L[i])[0] <= (R[j])[0]){
                A[k] = L[i];
                i++;
            }else{
                A[k] = R[j];
                j++;
            }
            k++;
        }
        while(i<nl){
            A[k] = L[i];
            i++;
            k++;
        }
        while(j<nr){
            A[k] = R[j];
            j++;
            k++;
        }
    }
    Separate(A, 0, n-1);
    return(A)
}
