import { Grid } from "../maze/grid.js"; 
/*import { canvas, ctx } from "../main"; */


class Presenter {
    static grid: Grid;
    private static dimension: number;
    private static size: number;
    private static cellSize: number;
    private static wallSize: number;
    private static cwidth: number; // DELETE

    static canvas = document.querySelector("canvas") as HTMLCanvasElement;
    static ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    

    private constructor() {}


    /**
     * Sets the configuration of the maze.
     * @param dimension the number of cells per side of a square maze
     */
    public static initImg(dimension: number): void {
        this.dimension = dimension;
        this.cwidth = this.canvas.width; // DELETE
        
        /*
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
        this.cellSize = Math.floor(this.cwidth / (1/9 + 10/9 * dimension));
        this.wallSize = Math.ceil((this.cwidth - this.cellSize * dimension) 
            / (dimension + 1)); 

        this.size = this.cellSize + this.wallSize;

        this.drawBkg(); 
    }


    private static drawRect(x: number, y: number, width: number, height: number, 
                            colour: string): void {
        this.ctx.fillStyle = colour;
        this.ctx.fillRect(x, y, width, height);
    }


    private static drawGrid(): void {
        for (let i = 0; i < this.dimension; i++) {
            for (let j = 0; j < this.dimension; j++) {
                this.drawRect(j*this.size, i*this.size, 
                    this.cellSize, this.cellSize, '#444');
            }
        }
    }


    private static drawBkg(): void {
        this.drawRect(0, 0, this.canvas.width, this.canvas.height, "#332b25");

        this.drawGrid(); 
    }


    public static drawCell(x: number, y: number, w: number, h: number, 
                           colour: string = "white"): void {
        let x_ = x * this.size; 
        let y_ = y * this.size;
        
        this.drawRect(x_, y_, w * this.cellSize, h * this.cellSize, colour); 
    }


    public static drawTwoCells(c1x: number, c1y: number, 
                               c2x: number, c2y: number, colour: string = "white"): void {
        let x = (c1x <= c2x) ? c1x : c2x;
        let y = (c1y <= c2y) ? c1y : c2y;
        let w = (c1x === c2x) ? this.cellSize : (2 * this.cellSize + this.wallSize); 
        let h = (c1y === c2y) ? this.cellSize : (2 * this.cellSize + this.wallSize);
        
        this.drawRect(x * this.size, y * this.size, w, h, colour); 
    }
}


export { Presenter };
