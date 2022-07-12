import { Grid } from "./maze/grid.js";
import { Presenter, COLOUR_WHITE, COLOUR_RED } from "./presenter/presenter.js";
import { buildMaze as btree } from "./algos/binary_tree.js";
import { buildMaze as backtracker } from "./algos/recursive_backtracker.js";


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
            let [a, b, c, d, e] = [...array]; 
            let colour: string;

            switch (selectedAlgo) {
                case "btree": 
                    if (e === 1) colour = COLOUR_WHITE;
                    else colour = "white";
                    Presenter.drawTwoCells(a, b, c, d, colour);
                    break;
                case "sidewinder":

                    break;
                case "backtracker":
                    if (e === 1) Presenter.drawCell(a, b, c, d, COLOUR_WHITE);
                    else Presenter.drawTwoCells(a, b, c, d, COLOUR_RED); 
                    break;
                case "prim":
                    
                    break;
                case "kruskal":
                    
                    break;
                case "eller":
                    
                    break;
                case "huntkill":
                    
                    break;
                case "aldous":
                    
                    break;
                case "wilson":
                    
                    break;
                case "division":
                    
                    break;
            }

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
            builder = backtracker(grid);
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
// -----------------------------------
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
