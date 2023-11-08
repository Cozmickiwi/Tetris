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
    let square = [5, 6, 15, 16];
    let shape = [5, 15, 25, 35];
    let takenTiles = [];
    let takenTilesCopy = [];
    let shapeHis = [];
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
    window.addEventListener('keydown', event =>{
        function horizMove() {
            let prevMove = shape.slice();
            if(event.key == 'ArrowRight'){
                for(let u = 0; u<shape.length; u++){
                    if(shape[u] % 10 == 0){
                        return;
                    }
                    else if(takenTiles.includes(shape[u]+1)){
                        return;
                    }
                }
                for(let q = 0; q<shape.length; q++){
                    document.getElementById(shape[q]).style.backgroundColor = 'rgb(90, 90, 240)'
                }
                for(let g = 0; g<shape.length; g++){
                    shape[g] += 1;
                    
                    document.getElementById(shape[g]).style.backgroundColor = 'red';
                }
            }
            else if(event.key == 'ArrowLeft'){
                for(let u = 0; u<shape.length; u++){
                    if((shape[u]-1) % 10 == 0){
                        return;
                    }
                    else if(takenTiles.includes(shape[u]-1)){
                        return;
                    }
                }
                for(let q = 0; q<shape.length; q++){
                    document.getElementById(shape[q]).style.backgroundColor = 'rgb(90, 90, 240)'
                }
                for(let g = 0; g<shape.length; g++){
                    shape[g] -= 1;
                    document.getElementById(shape[g]).style.backgroundColor = 'red';
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
        }
        horizMove();
    });
    interval = setInterval(() =>{
        shapeMove();
    }, time);
    function shapeMove () {
        i++
        let frame = i;
        
        
        
        if(currentShape == 'line'){
            
            if(frame < 5){
                for(let x=0;x<frame;x++){
                    document.getElementById(shape[x]).style.backgroundColor = 'red';
                }
            }
        }
        else if(currentShape == 'square'){
            
            if(frame < 3){
                for(let x=0;x<frame;x++){
                    document.getElementById(shape[x]).style.backgroundColor = 'red';
                }
            }
        }
        for(let k=0; k<shape.length; k++){
            document.getElementById(shape[k]).style.backgroundColor = 'rgb(90, 90, 240)'
        }
        shapeHis = shape.slice();
        let settled = false;
        for(let j=0; j<shape.length;j++){
            shape[j]+=10;
            if(shape[j] > 200){
                settled = true;
            }
            else if(takenTiles.includes(shape[j])){
                settled = true;
            }
            if(settled == true){
            for(let n = 0; n<shape.length;n++){
                if(shape[n] <= 200 && !(takenTiles.includes(shape[n]))){
                    document.getElementById(shape[n]).style.backgroundColor = 'rgb(90, 90, 240)';
                }
                document.getElementById(shapeHis[n]).style.backgroundColor = 'red';
            }
            for(let l = 0; l<4; l++){
                takenTiles.push(shapeHis[l]);
            }
            takenTiles = MergeSort(takenTiles);
            let n = (takenTiles.length)-1;
            if(n>=9){
                takenTilesCopy = takenTiles.slice();
                for(let a = 0; a<=n;a++){
                    if(a>=9 && (takenTiles[a] % 10) == 0 && takenTiles[a-9] == (takenTiles[a] - 9)){
                        repaint = true;
                        ignoreRow = takenTiles[a];
                        takenTiles.splice((a-9), 10)
                        n = (takenTiles.length)-1;
                        a-=10;
                        dropCount+=10;
                    }
                }
                if(repaint == true){
                    repaint = false;
                    for(let r = 1; r<=200; r++){
                        document.getElementById(r).style.backgroundColor = 'rgb(90, 90, 240)';
                    }
                    for(let f = 0; f<takenTiles.length; f++){
                        if(takenTiles[f] <= (ignoreRow+1)){
                            takenTiles[f] += dropCount;
                        }
                    }
                    for(let w = 0; w<takenTiles.length; w++){
                        document.getElementById(takenTiles[w]).style.backgroundColor = 'red';
                    }
                }
            }
            console.log(takenTiles);
            //line = [5, 15, 25, 35];
            let ranShape = Math.floor(Math.random() * 2);
            if(ranShape == 0){
                currentShape = 'line';
                shape = line.slice();
            }
            else if(ranShape == 1){
                currentShape = 'square';
                shape = square.slice();
            }
            dropCount = 0;
            ignoreRow = undefined;
            i = 0;
            settled = false;
            return;
        }
            document.getElementById(shape[j]).style.backgroundColor = 'red';
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
            if(L[i] <= R[j]){
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