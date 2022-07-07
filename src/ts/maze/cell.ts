import { HashMap } from "../types/types"; 


class Cell {
    protected row: number; 
    protected column: number;

    protected links: {}; //| HashMap;

    public top: Cell | null = null;
    public bottom: Cell | null = null;
    public right: Cell | null = null;
    public left: Cell | null = null;

    /**
     * Constructor method of class Cell. 
     * @param row the row ID of the cell
     * @param column the column ID of the cell
     */
    public constructor(row: number, column: number) {
        this.row = row; 
        this.column = column; 
    }

    /**
     * Helper function to create a hashcode representation of the object of type Cell. 
     * @param cell instance of class Cell
     * @returns The hashcode corresponding to a specific cell. 
     */
    private hashCode(cell: Cell): string {
        return (cell.row * 1000 + cell.column).toString();
    }

    /**
     * Creates a link between the current and specified adjacent cell given as a 
     * parameter.
     * @param cell the neighbour to link the cell to
     * @param bidirect for internal use, default value set to 'true'
     */
    public linkTo(cell: Cell, bidirect: boolean = true): void {
        this.links[this.hashCode(cell)] = true;
        if (bidirect) {
            cell.linkTo(this, false);
        }
    }

    /**
     * Check if it is linked to any cell in the maze.
     * @return 'true' if it is linked to adjacent cells and
     *         'false' if it is not linked to any.
     */
     public hasLinkedCells(): boolean {
        if (Object.keys(this.links).length !== 0) return true;
        return false;
    }

    /**
     * Checks if it is linked to the specified cell given as a 
     * parameter.
     * @param cell a neighbour of the cell
     * @return  'true' if neighbour is linked to the cell and
     *          'false' if they are not linked.
     */
    public isLinkedTo(cell: Cell): boolean {
        if (this.hashCode(cell) in this.links) return true;
        return false;
    }

    /**
     * Returns a list of all adjacent neighbours to cell.
     * @return list of all the cell's neighbours.
     */
     public neighbours(): Cell[] {
        let lst: Cell[] = [];

        if (this.top != null) {
            lst.push(this.top);
        }
        if (this.bottom != null) {
            lst.push(this.bottom);
        }
        if (this.right != null) {
            lst.push(this.right);
        }
        if (this.left != null) {
            lst.push(this.left);
        }

        return lst;
    }

}