var cols = 20;
var rows = 20;
var w,l;
var cells=[];
var current;
var stack =[];

function setup() {
  createCanvas(502,502);
  w = floor(width/cols);
  l = floor(height/rows);
  for(var i = 0 ; i<cols;i++){
      var temp = [];
    for(var j = 0;j<rows;j++){
      temp.push(new Cell(i,j,w,l));
    }
    cells.push(temp);
  }
  current = random(random(cells));
  console.log(current);

}

function draw() {
  background(23);
  for(var i = 0;i<cols;i++){
    for(var j = 0;j<rows;j++){
      cells[i][j].show();
    }
  }
  //for(var i = 0;i<400;i++){//use this outter loop if want to generate maze immediately and not animate generation
    current.visited = true;
    current.high();
    var next = current.search();
    if(next){
      stack.push(current);
      current.removeWall(next);
      current = next;
    }
    else{
      if(stack.length>0){
        current = stack.pop();
      }
    }
  //}
}

class Cell{
  constructor(i, j, w, l) {
    this.col = i;
    this.row = j;
    this.width = w;
    this.length = l;
    this.walls = [true, true, true, true];
    this.visited = false;
  }

  show(){
    var x = this.col*this.width;
    var y = this.row*this.length;
    if(this.visited){
      noStroke();
      fill(0,255,0);
      rect(x,y,this.width,this.length);
    }
    stroke(0);
    if(this.walls[0]){
      line(x,y,x+this.width,y); //top
    }
    if(this.walls[1]){
      line(x,y,x,y+this.length); //left
    }
    if(this.walls[2]){
      line(x+this.width,y,x+this.width,y+this.length); //right
    }
    if(this.walls[3]){
      line(x,y+this.length,x+this.width,y+this.length); //bottom
    }
  }

  high(){
    var x = this.col*this.width;
    var y = this.row*this.length;
    noStroke();
    fill(255,0,255,100);
    rect(x,y,this.width,this.length);
  }

  search(){
    var borders = [];
    var top = cells[this.col][this.row-1];
    var left = cells[this.col-1];
    var right = cells[this.col+1];
    var bottom = cells[this.col][this.row+1];

    if(top && !top.visited){
      borders.push(top);
    }

    if(left && !left[this.row].visited){
      borders.push(left[this.row]);
    }

    if(right && !right[this.row].visited){
      borders.push(right[this.row]);
    }

    if(bottom && !bottom.visited){
      borders.push(bottom);
    }
    if(random.length>0){
      return random(borders);
    }
    else{
      return undefined;
    }
  }


  removeWall(border){
    if(border.col==this.col){
      if(border.row==(this.row-1)){
        this.walls[0] = false;
        border.walls[3] = false;
      }
      else{
        this.walls[3] = false;
        border.walls[0] = false;
      }
    }
    else{
      if(border.col==(this.col-1)){
        this.walls[1] = false;
        border.walls[2] = false;
      }
      else{
        this.walls[2] = false;
        border.walls[1] = false;
      }
    }
  }

}
