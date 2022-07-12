import { Cell } from "../maze/cell.js"; 
import { Grid } from "../maze/grid.js"; 


/**
 * Helper function that randomly chooses a neighbour of the cell.
 * @param cell the cell, which neighbours are chosen from
 * @returns the selected neighbour or *null* (if no bottom or right neighbour is available).
 */
function chooseNeighbourOf(cell: Cell): Cell | null {
    let neighbours: Cell[] = []; 

    if (cell.bottom) neighbours.push(cell.bottom);
    if (cell.right)  neighbours.push(cell.right);

    if (neighbours) return neighbours[Math.floor(Math.random() * neighbours.length)];
    return null;
}


/**
 * Builds a maze using the Binary Tree algorithm.
 * @param grid the initialised raw representation of the maze
 */
function* buildMaze(grid: Grid): Generator<number[], void, undefined> {
    for (let cell of grid.getNextCell()) {
        if (cell === null) continue; 
        let neighbour: Cell | null = chooseNeighbourOf(cell); 

        if (neighbour) {
            cell.linkTo(neighbour);
            yield [cell.column, cell.row, neighbour.column, neighbour.row, 1]; 
        }
    }
}


export { buildMaze };
