import { Grid } from "./maze/grid.js";
import { Presenter } from "./presenter/presenter.js";
import { buildMaze as btree } from "./algos/binary_tree.js";


//let canvas = document.querySelector("canvas") as HTMLCanvasElement;
//let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
const btnrun = document.querySelector("#run");
const btnpause = document.querySelector("#pause");
const btnclear = document.querySelector("#clear");
const selectElem = document.querySelector("#select") as HTMLSelectElement; 


let dim: number = 20; 
let grid: Grid; 
let builder: Generator<number[], void, undefined>; 
let isAnimRunning: boolean = false;
let selectedAlgo: string = "btree";


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
 * Initialises or reinitialises the maze. 
 */
function initMaze(): void {
    grid = new Grid(dim, dim);
}


/**
 * Clears the animation drawing board. 
 */
function clearBoard(): void {
    isAnimRunning = false;
    Presenter.initImg(dim); 
}


/**
 * Switches between the various algorithms. 
 * @param event the change of *HTMLSelectElement* state
 */
function switchAlgo(): void {
    switch (selectedAlgo) {
        case "btree":
            builder = btree(grid); 
            break;
        case "sidewinder":
            //builder = sidewinder(grid);
            alertNotImplemented()
            break;
        case "backtracker":
            //builder = backtracker(grid);
            alertNotImplemented()
            break;
        case "prim":
            //builder = prim(grid);
            alertNotImplemented()
            break;
        case "kruskal":
            //builder = kruskal(grid);
            alertNotImplemented()
            break;
        case "eller":
            //builder = eller(grid);
            alertNotImplemented()
            break;
        case "huntkill":
            //builder = huntkill(grid);
            alertNotImplemented()
            break;
        case "aldous":
            //builder = aldous(grid);
            alertNotImplemented()
            break;
        case "wilson":
            //builder = wilson(grid);
            alertNotImplemented()
            break;
        case "division":
            //builder = division(grid);
            alertNotImplemented()
            break;
    } 
}


/**
 * Resets the animation. 
 */
function resetAnim(event?: Event): void {
    initMaze();
    clearBoard();

    if (event !== undefined && event.type === "change") {
        const target = event.target as HTMLOptionElement; 
        selectedAlgo = target.value; 
    }

    switchAlgo();
}


// Delete after algorithms implemented
function alertNotImplemented(): void {
    alert("Not implemented"); 
    selectElem.selectedIndex = 0; 
    selectedAlgo = "btree"; 
    switchAlgo();
}


/*
 * Event listeners for buttons. 
 */
btnrun.addEventListener("click", event => { 
    isAnimRunning = true;
    animate();
});
btnpause.addEventListener("click", event => {isAnimRunning = false;});
btnclear.addEventListener("click", resetAnim);


/*
 * Event listener for select element. 
 */
selectElem.addEventListener("change", resetAnim);


resetAnim();
