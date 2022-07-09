import { Grid } from "./maze/grid.js";
import { Presenter } from "./presenter/presenter.js";
import { buildMaze } from "./algos/binary_tree.js";


//let canvas = document.querySelector("canvas") as HTMLCanvasElement;
//let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
const btnrun = document.querySelector("#run");
const btnpause = document.querySelector("#pause");
const btnclear = document.querySelector("#clear");


let dim: number = 20; 
let grid: Grid; 
let builder: Generator<number[], void, undefined>; 
let isAnimRunning: boolean = false;


/**
 * Builds the maze.
 */
function animate(): void {
    if (isAnimRunning) {
        let array = builder.next().value;
        if (array instanceof Object) { 
            let [a, b, c, d] = [...array]; 

            Presenter.drawTwoCells(a, b, c, d);

            setTimeout(animate, 100);
        }
    }
}


/**
 * Resets the maze. 
 */
function clearBoard(): void {
    isAnimRunning = false;
    Presenter.initImg(dim); 
    grid = new Grid(dim, dim);
    builder = buildMaze(grid); 
}


/**
 * Event listeners for buttons. 
 */
btnrun.addEventListener("click", event => { 
    isAnimRunning = true;
    animate();
});
btnpause.addEventListener("click", event => {isAnimRunning = false;});
btnclear.addEventListener("click", clearBoard);


clearBoard();
