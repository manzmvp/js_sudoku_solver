
var grid = 
// [
//     [3,0,6,5,0,8,4,0,0], 
//     [5,2,0,0,0,0,0,0,0], 
//     [0,8,7,0,0,0,0,3,1], 
//     [0,0,3,0,1,0,0,8,0], 
//     [9,0,0,8,6,3,0,0,5], 
//     [0,5,0,0,9,0,6,0,0], 
//     [1,3,0,0,0,0,2,5,0], 
//     [0,0,0,0,0,0,0,7,4], 
//     [0,0,5,2,0,6,3,0,0]
// ]
[
    [0,0,3,0,2,0,6,0,0],
    [9,0,0,3,0,5,0,0,1],
    [0,0,1,8,0,6,4,0,0],
    [0,0,8,1,0,2,9,0,0],
    [7,0,0,0,0,0,0,0,8],
    [0,0,6,7,0,8,2,0,0],
    [0,0,2,6,0,9,5,0,0],
    [8,0,0,2,0,3,0,0,9],
    [0,0,5,0,1,0,3,0,0]
]
// [
//     [0,0,0,6,0,0,7,0,0],
//     [0,7,0,8,0,0,6,1,0],
//     [0,8,0,4,7,2,0,0,0],
//     [0,1,0,0,0,0,5,0,0],
//     [0,0,5,0,0,0,4,0,0],
//     [0,0,6,0,0,0,0,9,0],
//     [0,0,0,5,4,1,0,2,0],
//     [0,5,4,0,0,7,0,6,0],
//     [0,0,8,0,0,3,0,0,0]
// ]
// [
//     [0,8,0,0,0,0,0,0,3],
//     [9,0,1,0,3,4,0,0,8],
//     [0,6,4,8,0,0,7,2,0],
//     [2,0,3,0,0,0,0,0,0],
//     [8,0,6,5,9,3,2,0,4],
//     [0,0,0,0,0,0,3,0,5],
//     [0,7,8,0,0,2,4,3,0],
//     [4,0,0,6,8,0,9,0,7],
//     [6,0,0,0,0,0,0,1,0]
// ]
// [
//     [0,0,3,7,0,0,0,8,0],
//     [0,0,0,0,0,8,2,5,0],
//     [0,8,5,0,1,0,3,0,0],
//     [0,9,0,3,6,0,5,0,0],
//     [6,0,0,0,0,0,0,0,1],
//     [0,0,1,0,7,4,0,9,0],
//     [0,0,9,0,8,0,6,4,0],
//     [0,3,2,4,0,0,0,0,0],
//     [0,4,0,0,0,7,9,0,0]
// ]
// [
//     [0,2,4,0,0,0,0,0,0],
//     [8,0,5,0,6,0,0,0,0],
//     [3,0,0,0,0,0,1,5,9],
//     [0,7,0,0,2,0,3,0,0],
//     [0,0,1,9,0,7,6,0,0],
//     [0,0,2,0,4,0,0,7,0],
//     [1,5,9,0,0,0,0,0,6],
//     [0,0,0,0,9,0,4,0,7],
//     [0,0,0,0,0,0,9,8,0],
// ]

var tile_list = grid;
var rows;
var columns;
var lives;
var disableSelect;  
var selectedNum;
var selectedTile
var timeRemaining;
var recursions = 0;
var reset = 1;
// var board;
const id = (id) => {
    return(document.getElementById(id));
}
const qs = (selector) => {
    return document.querySelector(selector)
}
const qsa = (selector) => {
    return document.querySelectorAll(selector)
}
const startTimer = () => {
    if(id("time-1").checked){
        timeRemaining = 180;
    }
    else if (id("time-2").checked){
        timeRemaining = 300;
    }
    else{
        timeRemaining = 600;
    }
    id("timer").textContent = timeConversion(timeRemaining);
    timer = setInterval(() => {
        timeRemaining --;
        if(timeRemaining === 0) endGame();
        id("timer").textContent = timeConversion(timeRemaining);
    }, 1000)
}

const timeConversion = (time) => {
    let minutes = Math.floor(time/60);
    if(minutes < 10) minutes = "0" + minutes;
    let seconds = time%60;
    if(seconds < 10) seconds = "0" + seconds;
    return minutes + ":" + seconds;
}

window.onload = function(){
    id("start-btn").addEventListener("click", startGame);
    id("solve-btn").addEventListener("click", () => {
        var method = document.getElementById("backtracking").value;
        if(method==1){
            solveGameNormal();
        }
        else{
            solveGameMrv();
        }
    });
    for(let i=0; i<id("number-container").children.length; i++){
        id("number-container").children[i].addEventListener("click", function() {
            if(!disableSelect){
                if(this.classList.contains("selected")){
                    this.classList.remove("selected");
                    selectedNum = null;
                }
                else{
                    for(let i=0; i<9; i++){
                        id("number-container").children[i].classList.remove("selected");
                    }
                    this.classList.add("selected");
                    selectedNum = this;
                    if(selectedTile){
                        updateMove(rows, columns);
                    }
                    // updateMoveContainer();
                }
            }
        });
    }

}
const startGame = () => {
    // var board;
    if(id("diff-1").checked){
        tile_list = grid;
    }
    else if(id("diff-2").checked){
        //qs[random()]
        tile_list = grid;
    }
    else{
        tile_list = grid;
    }
    lives = 3;
    disableSelect = false;
    id("lives").textContent = "Remaining lives: 3";
    generateBoard(tile_list);
    startTimer();
    if(id("theme-1").checked){
        qs("body").classList.remove("dark");
    }
    else{
        qs("body").classList.add("dark");
    }
    id("number-container").classList.remove("hidden")
    
}
const generateBoard = (tile_list) => {
    console.log("here")
    clearPrevious();
    for(let i=0; i<9; i++ ){
        for(let j=0; j<9; j++){ 
        let tile = document.createElement("p");
        if(tile_list[i][j] != 0){
            tile.textContent = tile_list[i][j];
        }
        else{
            tile.addEventListener("click", function() {
                if(!disableSelect){
                    if(tile.classList.contains("selected")){
                        tile.classList.remove("selected");
                        selectedTile = null;
                    }
                    else{
                        for(let m=0; m<81; m++){
                            qsa(".tile")[m].classList.remove("selected");
                        }
                        tile.classList.add("selected")
                        selectedTile = tile;
                        rows = i;
                        columns = j;
                        updateMove(i, j);
                    }
                }
            })
        }
        tile.classList.add("tile");
        if((i==2 && [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(j)) || (i==5 && [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(j))){
            tile.classList.add("bottomBorder");
        }
        if (([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(i) && j==2) || ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(i) && j==5)){
            tile.classList.add("rightBorder");
        } 
        id("board").appendChild(tile);
    }
}
//setting row and col to tiles
let tiles = qsa(".tile");
let m =0;
for(let i=0; i<9; i++){
    for(let j=0; j<9; j++){
        tiles[m].pos={
            row: i,
            col: j,
        }
        m++;
    }
}
}


function updateMove(i, j) {
    console.log(grid)
    if(selectedTile && selectedNum){
        selectedTile.textContent = selectedNum.textContent;
        if(checkCorrect(i, j, selectedTile.textContent)){
            tile_list[i][j] = Number(selectedTile.textContent);
            // console.log(tile_list)
            selectedTile.classList.remove("selected");
            selectedNum.classList.remove("selected");
            selectedNum = null;
            selectedTile=null;
            if(checkDone()){
                endGame();
            }

        }
        else{
            disableSelect = true;
            selectedTile.classList.add("incorrect");
            setTimeout(function (){
                lives--;
                if(lives === 0){
                    endGame();
                }
                else{
                    id("lives").textContent = "Lives Remaining: " + lives;
                    disableSelect = false;
                }
                selectedTile.classList.remove("incorrect");
                selectedTile.classList.remove("selected");
                selectedNum.classList.remove("selected");
                selectedTile.textContent= "";
                selectedTile = null;
                selectedNum = null;
            }, 1000);
        }
    }
}
const checkCorrect = (row, col, num) => {
    for(let i=0; i<9; i++){    
    if(tile_list[row][i] == num && col!==i){
        return false
    }}
    for(let i=0; i<9; i++){
        if(tile_list[i][col] == num && row!=i){
            return false
        }
    }
    box_x = Math.floor(col / 3)
    box_y = Math.floor(row / 3)

    for(let i=box_y * 3; i < box_y * 3 + 3; i++){
        for(let j=box_x * 3; j < box_x * 3 + 3; j++){
            if(tile_list[i][j] == num && i != row && j!=col)
            return false;
        }
    }
    return true;
}

const clearPrevious = () => {
    let tiles = qsa(".tile");
    for(let i=0; i<tiles.length; i++){
        tiles[i].remove();
    }
    if(timer) clearTimeout(timer);
    //deselect numbers in num container
    for(let i=0; i< id("number-container").children.length; i++) {
        id("number-container").children[i].classList.remove("selected");
    }
    selectedNum = null;
    selectedTile = null;
}

const checkDone = () => {
    let tiles = qsa(".tile");
    for(let i=0; i<tiles.length; i++){
        if(tiles[i].textContent === ""){
            return false;
        }
    }
    return true;
}

const checkDonewithRecursion = () => {
    let tiles = qsa(".tile");
    for(let i=0; i<tiles.length; i++){
        if(tiles[i].textContent === ""){
            return false;
        }
    }
    return true;
}


const endGame = () => {
    disableSelect = true;
    clearTimeout(timer);
    if(lives===0 || timeRemaining ===0){
        id("lives").textContent = "You Lost!";
    }
    else{
        id("lives").textContent = "You Won!";
    }
}

const findEmpty = () => {
    for(let i=0; i<9; i++){
        for(let j=0; j<9; j++){
            if(tile_list[i][j] == 0){
                return [i, j]
            }
        }
    }
    return null
}

const findTile = (row, col) => {
        let tiles = qsa(".tile");
        for(let i=0; i<tiles.length; i++){
            if(tiles[i].pos.row == row && tiles[i].pos.col == col){
                return tiles[i];
            }
        }
}
 const solveGameNormal = () => 
 {  generateBoard(grid);
    if(checkDonewithRecursion()){
        id("recursion").textContent = "Number of recursions: " + recursions;
        endGame();
    }
    recursions++;
    let row, col;
    let find = findEmpty();
    if(!find){
        return true
    }
    else{
        [row , col] = find;
    }
    for(let i=1; i<10;i++){
        if (checkCorrect(row, col, i)){
            tile_list[row][col] = i
            // await sleep(900);
            let selectTile = findTile(row, col)
            
            selectTile.textContent = i
            if ((solveGameNormal())){
                return true
}
            tile_list[row][col] = 0
            // await sleep(900);
            selectTile = findTile(row, col)
            
            selectTile.textContent = ""
        }
}   
    return false
}
const solveGameMrv = () => 
{       recursions++;
        break_condition = 0
        checking_range = []
        
        for(let i=0; i<9; i++){
            for(let j=0; j<9; j++){
                if (grid[i][j] == 0){
                    break_condition = 1
                    temp = []
                    temp.push([i, j])
                    temp_2 = []
                    for(let num = 1; num<10; num++){
                        if (checkCorrect(i, j, num)){
                            temp_2.push(num)}}
                    temp.push(temp_2.length)
                    checking_range.push(temp)}}}
        if (break_condition == 0){
            return true
        }
        let minimum_range_selection = checking_range[0][0]
        let low = checking_range[0][1]
        for(let i=0; i<checking_range.length; i++){
            if (checking_range[i][1] < low){
                low = checking_range[i][1]
                minimum_range_selection = checking_range[i][0]}}
        let row = minimum_range_selection[0]
        let col = minimum_range_selection[1]
        for(let i=1; i<10; i++){
            if (checkCorrect(row, col, i)){
                tile_list[row][col] = i
                let selectTile = findTile(row, col);
                selectTile.textContent = i

                if (solveGameMrv()){
                    if(checkDonewithRecursion()){
                        id("recursion").textContent = "Number of recursions: " + recursions;
                        endGame();
                    }
                    return true
                }

                tile_list[row][col] = 0
                selectTile = findTile(row, col)
                selectTile.textContent = ""
        }}
    return false
    }
        


function sleep(ms) {
return new Promise(resolve => setTimeout(resolve, ms));
}
