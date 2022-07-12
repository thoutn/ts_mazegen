import { Cell } from "../maze/cell.js"; 
import { Grid } from "../maze/grid.js"; 


/**
 * Builds a maze using the Binary Tree algorithm.
 * @param grid the initialised raw representation of the maze
 */
function* buildMaze(grid: Grid): Generator<number[], void, undefined> {
    let stack: Cell[] = [grid.randomCell]; 
    
    while (stack.length !== 0) {
        let current_cell = stack[stack.length - 1];
        let neighbours = new Array<Cell>(); 
        
        for (let cell of current_cell.neighbours()) {
            if (!cell.hasLinkedCells()) neighbours.push(cell);
        }

        if (neighbours.length !== 0) {
            // choose a random neighbour of current cell
            let neighbour = neighbours[Math.floor(Math.random() * neighbours.length)]; 

            stack.push(neighbour);
            current_cell.linkTo(neighbour);

            yield [current_cell.column, current_cell.row, 
                   neighbour.column, neighbour.row, 0];
        } else {
            let popped = stack.pop() as Cell;
            if (stack.length !== 0) {
                let unpopped = stack[stack.length - 1]; 
                yield [popped.column, popped.row, unpopped.column, unpopped.row, 1]; 
            } else {
                // when only the last cell remains on the stack
                yield [popped.column, popped.row, popped.column, popped.row, 1];
            }
        }

    }
}


export { buildMaze };
