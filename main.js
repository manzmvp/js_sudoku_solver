// ___  ___                                     
// |  \/  |                                     
// | .  . | __ _ _ __  _____ __ _____   ___ __  
// | |\/| |/ _` | '_ \|_  / '_ ` _ \ \ / / '_ \ 
// | |  | | (_| | | | |/ /| | | | | \ V /| |_) |
// \_|  |_/\__,_|_| |_/___|_| |_| |_|\_/ | .__/ 
//                                       | |    
//                                       |_|    

//function for footer animation!
consoleText(['Hello World!', 'Made with Love❤ by Manoj.'], 'text',['purple','red']);
function consoleText(words, id, colors) {
  if (colors === undefined) colors = ['#fff'];
  var visible = true;
  var con = document.getElementById('console');
  var letterCount = 1;
  var x = 1;
  var waiting = false;
  var target = document.getElementById(id)
  target.setAttribute('style', 'color:' + colors[0])
  window.setInterval(function() {

    if (letterCount === 0 && waiting === false) {
      waiting = true;
      target.innerHTML = words[0].substring(0, letterCount)
      window.setTimeout(function() {
        var usedColor = colors.shift();
        colors.push(usedColor);
        var usedWord = words.shift();
        words.push(usedWord);
        x = 1;
        target.setAttribute('style', 'color:' + colors[0])
        letterCount += x;
        waiting = false;
      }, 1000)
    } else if (letterCount === words[0].length + 1 && waiting === false) {
      waiting = true;
      window.setTimeout(function() {
        x = -1;
        letterCount += x;
        waiting = false;
      }, 1000)
    } else if (waiting === false) {
      target.innerHTML = words[0].substring(0, letterCount)
      letterCount += x;
    }
  }, 120)
  window.setInterval(function() {
    if (visible === true) {
      con.className = 'console-underscore hidden'
      visible = false;

    } else {
      con.className = 'console-underscore'

      visible = true;
    }
  }, 400)
}

var easy = 
//normal 770 mrv 79
[[
    [3,0,6,5,0,8,4,0,0], 
    [5,2,0,0,0,0,0,0,0], 
    [0,8,7,0,0,0,0,3,1], 
    [0,0,3,0,1,0,0,8,0], 
    [9,0,0,8,6,3,0,0,5], 
    [0,5,0,0,9,0,6,0,0], 
    [1,3,0,0,0,0,2,5,0], 
    [0,0,0,0,0,0,0,7,4], 
    [0,0,5,2,0,6,3,0,0]
],
//normal 201 mrv 50
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
]]
var medium =
//normal 662 mrv 127
[ [
    [0,0,3,7,0,0,0,8,0],
    [0,0,0,0,0,8,2,5,0],
    [0,8,5,0,1,0,3,0,0],
    [0,9,0,3,6,0,5,0,0],
    [6,0,0,0,0,0,0,0,1],
    [0,0,1,0,7,4,0,9,0],
    [0,0,9,0,8,0,6,4,0],
    [0,3,2,4,0,0,0,0,0],
    [0,4,0,0,0,7,9,0,0]
],
//normal 180 mrv 47
[
    [0,8,0,0,0,0,0,0,3],
    [9,0,1,0,3,4,0,0,8],
    [0,6,4,8,0,0,7,2,0],
    [2,0,3,0,0,0,0,0,0],
    [8,0,6,5,9,3,2,0,4],
    [0,0,0,0,0,0,3,0,5],
    [0,7,8,0,0,2,4,3,0],
    [4,0,0,6,8,0,9,0,7],
    [6,0,0,0,0,0,0,1,0]
]]
var hard = 
//normal 19771 mrv 436
[[
    [0,0,0,6,0,0,7,0,0],
    [0,7,0,8,0,0,6,1,0],
    [0,8,0,4,7,2,0,0,0],
    [0,1,0,0,0,0,5,0,0],
    [0,0,5,0,0,0,4,0,0],
    [0,0,6,0,0,0,0,9,0],
    [0,0,0,5,4,1,0,2,0],
    [0,5,4,0,0,7,0,6,0],
    [0,0,8,0,0,3,0,0,0]
],
//normal 4095 mrv 54
[
    [0,2,4,0,0,0,0,0,0],
    [8,0,5,0,6,0,0,0,0],
    [3,0,0,0,0,0,1,5,9],
    [0,7,0,0,2,0,3,0,0],
    [0,0,1,9,0,7,6,0,0],
    [0,0,2,0,4,0,0,7,0],
    [1,5,9,0,0,0,0,0,6],
    [0,0,0,0,9,0,4,0,7],
    [0,0,0,0,0,0,9,8,0],
]]


var grid;
var rows;
var columns;
var lives;
var disableSelect;  
var selectedNum;
var selectedTile
var timeRemaining;
var recursions = 0;
var reset = 1;

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
        tile_list = JSON.parse(grid);
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
                }
            }
        });
    }

}
const startGame = () => {
    if(id("diff-1").checked){
        grid = JSON.stringify(easy[randomInteger(0, 1)]);
        tile_list = JSON.parse(grid);
    }
    else if(id("diff-2").checked){
        grid = JSON.stringify(medium[randomInteger(0, 1)]);
        tile_list = grid;
        tile_list = JSON.parse(tile_list);
    }
    else{
        grid = JSON.stringify(hard[randomInteger(0, 1)]);
        tile_list = grid;
        tile_list = JSON.parse(tile_list);
    }
    id("recursion").classList.add("hidden");
    id("solve-btn").classList.remove("hidden");
    recursions = 0;
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
    clearPrevious();
    for(let i=0; i<9; i++ ){
        for(let j=0; j<9; j++){ 
        let tile = document.createElement("p");
        if(tile_list[i][j] != 0){
            tile.textContent = tile_list[i][j];
        }
        else{
            tile.addEventListener("click", function() { //adding eventlistener to empty tile during board generation
                if(!disableSelect){
                    if(tile.classList.contains("selected")){
                        tile.classList.remove("selected");
                        selectedTile = null;
                    }
                    else{
                        for(let m=0; m<81; m++){ // remove selected class from any other tile if present 
                            qsa(".tile")[m].classList.remove("selected");
                        }
                        tile.classList.add("selected") // selecting the tile when clicked
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
//setting position data to all the tiles (pos[i][j])
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

//function for updating move after selecting from num-container
function updateMove(i, j) {
    if(selectedTile && selectedNum){
        selectedTile.textContent = selectedNum.textContent;
        if(checkCorrect(i, j, selectedTile.textContent)){
            tile_list[i][j] = Number(selectedTile.textContent);
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
//function to check for correct position of manually selected number
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

//function to reset board
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
const clearBoard = () => {
    let temp = JSON.parse(grid);
    for(let i=0; i<9; i++ ){
        for(let j=0; j<9; j++){ 
        let tile = document.createElement("p");
        if(tile_list[i][j] != 0){
            tile.textContent = tile_list[i][j];
        }
        else{
            tile.textContent = " ";         
        }}
}}

//function to check completion of sudoku for manual selection
const checkDone = () => {
    let tiles = qsa(".tile");
    for(let i=0; i<tiles.length; i++){
        if(tiles[i].textContent === ""){
            return false;
        }
    }
    return true;
}

//function to check completion of sudoku for auto solving
const checkDonewithRecursion = (tile_list) => {
    for(let i=0; i<9; i++){
        for(let j=0; j<9; j++){
            if(tile_list[i][j] === 0){
                return false;
            }
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

const endGameRecursion = () => {
    clearTimeout(timer);
    id("recursion").classList.remove("hidden");
    id("recursion").textContent = "Number of recursions: " + recursions;
    id("solve-btn").classList.add("hidden");
    id("lives").textContent = "Algorithm Won!";

}

//function to find next empty tile
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

//function to get the tile using pos[row][col]
const findTile = (row, col) => {
        let tiles = qsa(".tile");
        for(let i=0; i<tiles.length; i++){
            if(tiles[i].pos.row == row && tiles[i].pos.col == col){
                return tiles[i];
            }
        }
}
//naiveBacktracking
 const solveGameNormal = () => {  
    recursions++;
    if(checkDonewithRecursion(tile_list)){
        endGameRecursion();
    }
    
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
            let selectTile = findTile(row, col)
            selectTile.textContent = i
            if ((solveGameNormal())){
                return true
}
            tile_list[row][col] = 0
            selectTile = findTile(row, col)
            selectTile.textContent = ""
        }
}   
    return false
}

//MrvBacktracking
const solveGameMrv = () => {
        recursions++;
        break_condition = 0
        checking_range = []
        
        for(let i=0; i<9; i++){
            for(let j=0; j<9; j++){
                if (tile_list[i][j] == 0){
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
                    if(checkDonewithRecursion(tile_list)){
                        endGameRecursion();
                    }
                    return true
                }

                tile_list[row][col] = 0
                selectTile = findTile(row, col)
                selectTile.textContent = ""
        }}
    return false
    }
        
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }