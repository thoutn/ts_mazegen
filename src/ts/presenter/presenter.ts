import { Grid } from "../maze/grid"; 
import { canvas, ctx } from "../main"; 


class Presenter {
    static grid: Grid;
    private static dimension: number;
    private static size: number;


    private constructor() {}


    /**
     * Sets the configuration of the maze.
     * @param dimension the number of cells per side of a square maze
     */
    public static initImg(dimension: number): void {
        this.grid = new Grid(dimension, dimension);
        this.dimension = dimension;

        this.size = canvas.width / dimension;

        this.drawBkg(); 
    }


    private static drawRect(x: number, y: number, width: number, height: number, 
                            colour: string): void {
        ctx.fillStyle = colour;
        ctx.fillRect(x, y, width, height);
    }


    private static drawBkg(): void {
        this.drawRect(0, 0, canvas.width, canvas.height, "black");
    }

    public static drawCell(x: number, y: number, w: number, h: number, 
                           colour: string = "white"): void {
        this.drawRect(x, y, w * this.size, h * this.size, colour); 
    }
}


export { Presenter };
