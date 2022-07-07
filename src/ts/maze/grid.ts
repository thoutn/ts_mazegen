import { Cell } from "./cell"

class Grid {
    protected width_: number;
    protected height_: number;

    protected cells: Cell[][];

    protected rand: number;

    /**
     * Constructor method of class Grid.
     * @param width width of the maze
     * @param height height of the maze
     */
    constructor(width: number, height: number) {
        this.width_ = width;
        this.height_ = height;

        this.cells = new Array(height);

        this.prepareGrid();
        this.configureCells();
    }

    /**
     * Creates a matrix for storing the individual cells. The matrix created is of size 
     * *width*×*height*.
     */
    protected prepareGrid(): void {
        for (let row_ = 0; row_ < this.height_; row_++) {
            this.cells.push(new Array(this.width_));
            for (let col_ = 0; col_ < this.width_; col_++) {
                this.cells[row_].push(new Cell(row_, col_));
            }
        }
    }

    /**
     *  Configures the maze
     * - links the cells to their neighbours
     * - defines the maze boundaries
     */
    protected configureCells(): void {
        for (let row of this.cells) {
            for (let cell of row) {
                let row_: number = cell.row;
                let col_: number = cell.column;

                cell.top = this.createNeighbours(row_ - 1, col_);
                cell.bottom = this.createNeighbours(row_ + 1, col_);
                cell.right = this.createNeighbours(row_, col_ + 1);
                cell.left = this.createNeighbours(row_, col_ - 1);
            }
        }
    }

    /**
     * Helper function for method *configureGrid()*.
     * @param row row ID of the neighbour
     * @param col column ID of the neighbour
     * @return the neighbour at *row* and *col* or *null* if it's 
     * outside the maze boundary.
     */
    protected createNeighbours(row: number, col: number): Cell | null {
        if ((0 <= row && row <= this.width_ - 1) && 
            (0 <= col && col <= this.height_ - 1)) {
            return this.cells[row][col];
        } else {
            return null;
        }
    }

    /**
     * Getter for a random cell.
     * @return a random cell of the maze.
     */
    public get randomCell(): Cell {
        let col_: number = Math.floor(Math.random() * this.width_); 
        let row_: number = Math.floor(Math.random() * this.height_);
        return this.cells[row_][col_];
    }

    /**
     * Getter for maze size.
     * @return the size (number of cells) of the maze.
     */
    public get size(): number {
        return this.width_ * this.height_;
    }

    /**
     * Getter for maze width.
     * @return the width of the maze.
     */
    public get width(): number {
        return this.width_;
    }

    /**
     * Getter for maze height.
     * @return the height of the maze.
     */
    public get height(): number {
        return this.height_;
    }

    /**
     * Generator
     * @yield an array containing all cells in a row
     */
    public *getNextRow(): Generator<Cell[], void, undefined> {
        for (let row of this.cells) {
            yield row;
        }
    }

    /**
     * Generator
     * @yield a cell from the maze
     */
    public *getNextCell(): Generator<Cell | null, void, undefined> {
        for (let row of this.cells) {
            for (let cell of row) {
                if (cell) yield cell; 
                yield null;
            }
        }
    }
}


export { Grid }; 
