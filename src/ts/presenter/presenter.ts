import { Grid } from "../maze/grid.js"; 
/*import { canvas, ctx } from "../main"; */


const COLOUR_WHITE: string = "#e5e5e5";
const COLOUR_RED: string = "#f27575"; 


class Presenter {
    static grid: Grid;
    private static dimension: number;
    private static size: number;
    private static cellSize: number;
    private static wallSize: number;

    static canvas = document.querySelector("canvas") as HTMLCanvasElement;
    static ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    

    /**
     * Don't let anyone instantiate this class. 
     */
    private constructor() {}


    /**
     * Sets the configuration of the maze.
     * @param dimension the number of cells per side of a square maze
     */
    public static initImg(dimension: number): void {
        this.dimension = dimension;
        
        /* 
        Deriving the equations
        ----------------------
        width = dimension * cellSize + (dimension + 1) * wallSize

        S = wallSize + cellSize
        wallSize = 0.1 * S
        cellSize = 0.9 * S

        S = cellSize / 0.9
        wallSize = 0.1 * cellSize / 0.9 = cellSize / 10 / 0.9 = cellSize / 9

        width = dimension * cellSize + (dimension + 1) * (cellSize / 9)
        width = cellSize * (dimension + (dimension + 1) / 9)
        width = cellSize * (1/9 + 10/9 * dimension)
        
        cellSize = width / (1/9 + 10/9 * dimension)
        wallSize = (width - cellSize * dimension) / (dimension + 1)
        */
        this.cellSize = Math.floor(this.canvas.width / (1/9 + 10/9 * dimension));
        this.wallSize = Math.ceil((this.canvas.width - this.cellSize * dimension) 
            / (dimension + 1)); 

        this.size = this.cellSize + this.wallSize;

        this.drawBkg(); 
    }


    /**
     * Helper function to draw a rectangle of the specified dimensions and colour. 
     * @param x the *x* coordinate of the rectangle's upper left corner 
     * @param y the *y* coordinate of the rectangle's upper left corner 
     * @param width the width of the rectangle
     * @param height the height of the rectangle
     * @param colour the colour of the rectangle
     */
    private static drawRect(x: number, y: number, width: number, height: number, 
                            colour: string): void {
        this.ctx.fillStyle = colour;
        this.ctx.fillRect(x, y, width, height);
    }


    /**
     * Helper function to draw a grid to the background. 
     */
    private static drawGrid(): void {
        for (let i = 0; i < this.dimension; i++) {
            for (let j = 0; j < this.dimension; j++) {
                this.drawRect(j*this.size + this.wallSize/2, 
                              i*this.size + this.wallSize/2, 
                              this.cellSize, this.cellSize, '#444');
            }
        }
    }


    /**
     * Helper function used to clear the drawing board. 
     */
    private static drawBkg(): void {
        this.drawRect(0, 0, this.canvas.width, this.canvas.height, "#332b25");

        this.drawGrid(); 
    }


    /**
     * Draws one cell and the path (wall) to an adjacent cell. 
     * @param x1 the *x* coordinate of the cell 
     * @param y1 the *y* coordinate of the cell
     * @param x2 the *x* coordinate of the adjacent cell
     * @param y2 the *y* coordinate of the adjacent cell
     * @param colour the colour of the rectangle representing the cell
     */
    public static drawCell(x1: number, y1: number, x2: number, y2: number, 
                           colour: string = COLOUR_WHITE): void {

        let offset1 = Math.floor(this.wallSize / 2);
        let offset2: number; 
        if (this.wallSize % 2 !== 0) offset2 = offset1 + 1; 
        else offset2 = offset1; 

        let x = (x1 <= x2) ? (x1 * this.size + offset1) : x1 * this.size - offset2; 
        let y = (y1 <= y2) ? (y1 * this.size + offset1) : y1 * this.size - offset2; 
        let w = (x1 === x2) ? this.cellSize : this.size; 
        let h = (y1 === y2) ? this.cellSize : this.size;

        this.drawRect(x, y, w, h, colour); 
    }


    /**
     * Draws two linked cells = a carved passage of the maze. 
     * @param x1 the *x* coordinate of the first cell 
     * @param y1 the *y* coordinate of the first cell
     * @param x2 the *x* coordinate of the second cell
     * @param y2 the *y* coordinate of the second cell
     * @param colour the colour of the rectangle representing the passage
     */
    public static drawTwoCells(x1: number, y1: number, 
                               x2: number, y2: number, 
                               colour: string = COLOUR_WHITE): void {
        let offset = Math.floor(this.wallSize / 2); 

        let x = ((x1 <= x2) ? x1 : x2) * this.size + offset;
        let y = ((y1 <= y2) ? y1 : y2) * this.size + offset;
        let w = (x1 === x2) ? this.cellSize : (2 * this.cellSize + this.wallSize); 
        let h = (y1 === y2) ? this.cellSize : (2 * this.cellSize + this.wallSize);
        
        this.drawRect(x, y, w, h, colour); 
    }
}


export { Presenter, COLOUR_WHITE, COLOUR_RED };
