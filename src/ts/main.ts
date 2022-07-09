import { Grid } from "./maze/grid.js";
import { Presenter } from "./presenter/presenter.js";
import { buildMaze } from "./algos/binary_tree.js";


//let canvas = document.querySelector("canvas") as HTMLCanvasElement;
//let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;


let dim: number = 20; 
Presenter.initImg(dim); 
let grid = new Grid(dim, dim);

let builder = buildMaze(grid); 


function animate() {
    let array = builder.next().value;
    if (array instanceof Object) { 
        let [a, b, c, d] = [...array]; 

        Presenter.drawTwoCells(a, b, c, d);

        setTimeout(animate, 200);
  }
}

animate();
