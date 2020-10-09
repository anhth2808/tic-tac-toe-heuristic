const N_SIZE = 3, 
    EMPTY = "&nbsp;";

var boxes = [],
    turn = "X",
    score,
    moves;
var winCheck = false;
/*
* Initializes the Tic Tac Toe board and starts the game.
*/
function init() {
    var board = document.createElement('table');
    board.setAttribute("border", 1);
    board.setAttribute("cellspacing", 0);

    var identifier = 1;
    for (var i = 0; i < N_SIZE; i++) {
        var row = document.createElement('tr');
        board.appendChild(row);
        for (var j = 0; j < N_SIZE; j++) {
            
            var cell = document.createElement('td');
            cell.setAttribute('height', 120);
            cell.setAttribute('width', 120);
            cell.setAttribute('align', 'center');
            cell.setAttribute('valign', 'center');
            cell.classList.add('col' + j,'row' + i);
            if (i == j) {
                cell.classList.add('diagonal0');
            }
            if (j == N_SIZE - i - 1) {
                cell.classList.add('diagonal1');
            }

            cell.identifier = identifier;
            // if turn = 0 may danh
            
            cell.addEventListener("click", set);

            row.appendChild(cell);
            boxes.push(cell);
            identifier += identifier;
            cell.classList.add("cell")
        }
    }

    document.getElementById("tictactoe").appendChild(board);
    startNewGame();
    
}

/*
* New game
*/

function startNewGame() {
    score = {
        "X": 0,
        "O": 0
    };
    moves = 0;
    turn = "X";
    boxes.forEach(function (square) {
        square.innerHTML = EMPTY;
    });
}

/*
* Check if a win or not
*/
function win(clicked) {
    // Get all cell classes
    // var memberOf = clicked.className.split(/\s+/);
    // for (var i = 0; i < memberOf.length; i++) {
    //     var testClass = '.' + memberOf[i];
    //     var items = contains('#tictactoe ' + testClass, turn);
    //     // winning condition: turn == N_SIZE
    //     if (items.length == N_SIZE) {
    //         return true;
    //     }
    // }
    return false;
}

function contains(selector, text) {
    var elements = document.querySelectorAll(selector);

    return [].filter.call(elements, function(element){
        return RegExp(text).test(element.textContent);
    });
}

/*
* Sets clicked square and also updates the turn.
*/
function set() {
    if (this.innerHTML !== EMPTY) {
        return;
    }

    this.innerHTML = turn;
    moves += 1;
    score[turn] += this.identifier;
    console.log(`score[${turn}]: ${score[turn]}`);
    if (win(this)) {
        alert('Winner: Player ' + turn);
        startNewGame();
    } else if (moves === N_SIZE * N_SIZE) {
        alert("Draw");
        startNewGame();
    } else {
        turn = turn === "X" ? "O" : "X";
        document.getElementById('turn').textContent = 'Player ' + turn;
    }

    mSet()
}

    // machine == "O"
    // MAX machine
    // MIN player
function mSet() {
    const cellList = getCellList();
    // console.log(cellList);
    
    // moves con lai phai lon hon 2

    /*
        se co cellsIsAble2Set.lenth truong hop
        luu gia tri max cua cac node lai so luong gia tri max = cellsIsAble2Set.lenth
        
        ben trong node
        
        dung vong lap xet min max 

    */

    const cia2s = getCellsIsAble2Set(cellList);

    const nodeList = [];

    for (let a = 0; a < cia2s.length; a++ ){   
        console.log("===========================")             
        console.log("step 1")
        const clone = cloneCells(cellList);
        clone[cia2s[a][0]][cia2s[a][1]] = "O";
        displayBox(clone);
        const cloneCia2s = getCellsIsAble2Set(clone);
        // console.log(cloneCia2s);
        // console.log(`arr[${cia2s[a][0]}][${cia2s[a][1]}]`);
        // displayBox(clone);

        nodeList.push(nodeValue(clone, cloneCia2s));
        
        
        
        // for(let b = 0; b < cloneCia2s.length; b++) {
        //     let maxPosibleWinPaths = 0;
        //     let minPosibleWinPaths = 0;            
        //     let clone2 = cloneCells(clone);

        //     clone2[cloneCia2s[b][0]][cloneCia2s[b][1]] = "X";

        //     displayBox(clone2);

        //     maxPosibleWinPaths += rCheck(clone2, "X");
        //     console.log(maxPosibleWinPaths);
        //     maxPosibleWinPaths += cCheck(clone2, "X");
        //     console.log(maxPosibleWinPaths);
        //     maxPosibleWinPaths += dCheck(clone2, "X");
        //     console.log(maxPosibleWinPaths);

        //     minPosibleWinPaths += rCheck(clone2, "O");
        //     console.log(minPosibleWinPaths);
        //     minPosibleWinPaths += cCheck(clone2, "O");
        //     console.log(minPosibleWinPaths);
        //     minPosibleWinPaths += dCheck(clone2, "O");
        //     console.log(minPosibleWinPaths);
        //     console.log(maxPosibleWinPaths - minPosibleWinPaths);
        //     console.log("============");

        //     clone2 = [...clone];
        // }

        
        

    }
    console.log("nodeList", nodeList)
    let maxP = nodeList.reduce((iMax, x, i, arr) =>       
        x > arr[iMax] ? i : iMax, 0
    );
    // let maxP = nodeList.indexOf(Math.min.apply(Math, nodeList));
    
    console.log("cia2s", cia2s)
    console.log("maxP:", maxP);
    console.log("nodeValue:", nodeList[maxP]);
    console.log("p:", cia2s[maxP]);

    getHTMLCellList()[cia2s[maxP][0]][cia2s[maxP][1]].innerHTML = "O";
    turn = turn === "X" ? "O" : "X";
}

function nodeValue(clone, cloneCia2s) {
    const arr = [];
    console.log("step 2")
    for(let b = 0; b < cloneCia2s.length; b++) {
        let maxPosibleWinPaths = 0;
        let minPosibleWinPaths = 0;            
        let clone2 = cloneCells(clone);

        clone2[cloneCia2s[b][0]][cloneCia2s[b][1]] = "X";

        displayBox(clone2);

        maxPosibleWinPaths += rCheck(clone2, "O");
        // console.log(maxPosibleWinPaths);
        maxPosibleWinPaths += cCheck(clone2, "O");
        // console.log(maxPosibleWinPaths);
        maxPosibleWinPaths += dCheck(clone2, "O");
        // console.log(maxPosibleWinPaths);

        minPosibleWinPaths += rCheck(clone2, "X");
        // console.log(minPosibleWinPaths);
        minPosibleWinPaths += cCheck(clone2, "X");
        // console.log(minPosibleWinPaths);
        minPosibleWinPaths += dCheck(clone2, "X");
        // console.log(minPosibleWinPaths);
        console.log(maxPosibleWinPaths - minPosibleWinPaths);
        console.log("============");

        clone2 = [...clone];

        arr.push(maxPosibleWinPaths - minPosibleWinPaths);
    }

    return Math.min.apply(Math, arr);
}

function getCellsIsAble2Set(arr) {
    const result = [];
    for (let i = 0; i < N_SIZE; i++) {
        for (let j = 0; j < N_SIZE; j++) {
            if (arr[i][j] === EMPTY) {
                result.push([i,j])
            }
        }
    }

    return result;
}

function getCellList() {
    const cells = document.querySelectorAll(".cell");    
    const arr = convertTo2dArray(cells);    
    return arr;

}

function getHTMLCellList() {
    const cells = document.querySelectorAll(".cell");    
    const arr = [];
    for (let i = 0; i < N_SIZE; i++) {
        let temp = [];
        for (let j = i*N_SIZE; j < (i + 1)*N_SIZE; j++) {
            temp.push(cells[j]);
        }
        arr.push(temp);
    }
    return arr;
}
// diagonal 
function dCheck(arr, player) {
    let totalPaths = 0;

    let flag = 0;
    for (let i = 0, j = 0; i < N_SIZE; i++, j++) {       
        if (arr[i][j] === player){
            flag += 1;
        }      
    }
    if (flag === 3) {
      totalPaths += 99;
    }
    if (!flag) {
        totalPaths += 1;
    }
    
    flag = 0;
    for (let i = N_SIZE - 1, j = 0; i >= 0; i--, j++) {                
        if (arr[i][j] === player){
            flag += 1;
        }        
    }
    if (flag === 3) {
      totalPaths += 99;
    }
    if (!flag) {
        totalPaths += 1;
    }

    return totalPaths;   
}

// row
function rCheck(arr, player) {
    let totalPaths = 0;
    for (let i = 0; i < N_SIZE; i++) {
        let flag = 0;
        for (let j = 0; j < N_SIZE; j++) {
            if (arr[i][j] === player) {
                flag += 1;
            }
        }
        
        if (flag === 3) {
          totalPaths += 99;
        }

        if (!flag) {
            totalPaths += 1;
        }
    }

    return totalPaths;
}

// column
function cCheck(arr, player) {
    let totalPaths = 0;
    for (let i = 0; i < N_SIZE; i++) {
        let flag = 0;
        for (let j = 0; j < N_SIZE ; j++) {
            if (arr[j][i] === player) {
                flag += 1;
            }
        }
        if (flag === 3) {
          totalPaths += 99;
        }
        if (!flag) {
            totalPaths += 1;
        }
    }

    return totalPaths;
}

function convertTo2dArray(cells) {
    const arr = [];
    for (let i = 0; i < N_SIZE; i++) {
        let temp = [];
        for (let j = i*N_SIZE; j < (i + 1)*N_SIZE; j++) {
            temp.push(cells[j].innerHTML);
        }
        arr.push(temp);
    }

    return arr;
}

function getRCellPosition(cell) {

    return parseInt(cell.classList[0].match(/\d+/)[0]);
}

function getCCellPosition(cell) {
    return parseInt(cell.classList[1].match(/\d+/)[0]);
}

function cloneCells(cells) {
    const newCells = []
    for (let i = 0; i < N_SIZE; i++) {
        let temp = [];
        for (let j = 0; j < N_SIZE; j++) {
            temp.push(cells[i][j]);
        }
        newCells.push(temp);
    }

    return newCells;
}



function displayBox(box) {
    for (let i = 0; i < N_SIZE; i++) {
        console.log(i + ":", box[i][0], box[i][1], box[i][2]);
    }
}

init();
