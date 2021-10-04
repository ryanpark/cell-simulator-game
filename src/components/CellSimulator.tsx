import { useState, useEffect } from 'react';
import { Simulator, GameBoard, Buttons, Button, Wrapper, Cell } from './CellSimulatorStyles';

type GridTypes = {
    ROWS: number,
    COLS: number,
}

type CellTypes = {
    ALIVE: string,
    DEAD: string,
}

const GRID: GridTypes = {
    ROWS: 24,
    COLS: 24,
};

const SPEED: number = 500;

const CELL_IS: CellTypes = {
    ALIVE: 'alive',
    DEAD: 'dead',
};

const resetGrid = (rows: number, cols: number) => {
    return Array(rows)
        .fill(null)
        .map(() => {
            return Array(cols)
                .fill(null)
                .map(() => {
                    return CELL_IS.DEAD;
                });
        });
};

function CellSimulator() {
    const [grids, setGrids] = useState(() => {
        return resetGrid(GRID.ROWS, GRID.COLS);
    });
    
    const [isRunning, setRunning] = useState(false);

    useEffect(() => {
        if (!isRunning) return;
        const interval = setInterval(() => {
            runNextGeneration(grids);
        }, SPEED);
        return () => {
            clearInterval(interval);
        };
    });

    const runNextGeneration = (grids: Array<Array<string>>) => {
        let newGrids = JSON.parse(JSON.stringify(grids));
       
        grids?.forEach((grids: Array<string>, x: number) => {
            grids?.forEach((cell: string, y: number) => {
                newGrids[x][y] = shouldLiveOrDie(cell, x, y);
            });
        });
      
        const hasStop = JSON.stringify(newGrids) === JSON.stringify(grids);
        if (hasStop) {
            setRunning(false);
            return;
        };

        setGrids(newGrids);
        setRunning(true);
    };

    const resetGame = () => {
        setGrids(resetGrid(GRID.ROWS, GRID.COLS));
    };

    const shouldLiveOrDie = (cell: string, x: number, y: number) => {
        const directions = [[-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]];
        let neighbors = 0;

        for (const dir of directions) {
            const isOutOfBoard = x + dir[0] < 0 || y + dir[1] < 0;
            const isOutOfGrid = x + dir[0] === GRID.ROWS || y + dir[1] === GRID.COLS;
          
            if (!isOutOfBoard && !isOutOfGrid) {
                if (grids[x + dir[0]][y + dir[1]] && grids[x + dir[0]][y + dir[1]] === CELL_IS.ALIVE) {
                    neighbors += 1;
                }
            }
        }

        if (cell === CELL_IS.ALIVE) {
            if (neighbors === 2 || neighbors === 3) {
                return CELL_IS.ALIVE;
            } else if (neighbors > 3 || neighbors <= 2) {
                return CELL_IS.DEAD;
            }
        }

        if (cell === CELL_IS.DEAD) {
            return neighbors === 3 ? CELL_IS.ALIVE : CELL_IS.DEAD;
        }
    };

    const handleOnClick = (x: number, y: number) => {
        let newGrids = [...grids];
        newGrids[x][y] = grids[x][y] === CELL_IS.DEAD ? CELL_IS.ALIVE : CELL_IS.DEAD;
        setGrids(newGrids);
    };

    const stopGeneration = () => {
        setRunning(false);
    };

    return (
        <Simulator>
            <Wrapper>
                <GameBoard col={GRID.COLS} row={GRID.ROWS}>
                    {grids.map((rows, x) =>
                        rows.map((col, y) => {
                            return (
                                <Cell
                                    key={y}
                                    cellState={col}
                                    onClick={() => {
                                        handleOnClick(x, y);
                                    }}></Cell>
                            );
                        }),
                    )}
                </GameBoard>
                <Buttons>
                    <Button
                        onClick={() => {
                            //runNextGeneration(grids);
                            setRunning(true);
                        }}>
                        Next Generation
                    </Button>
                    <Button onClick={stopGeneration}>Stop</Button>
                    <Button onClick={resetGame}>Reset</Button>
                </Buttons>
            </Wrapper>
        </Simulator>
    );
}

export default CellSimulator;
