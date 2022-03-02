import styles from "./Game.module.css";
import Cell from "./Cell";
import { useState } from "react";
import NextPlayer from "./NextPlayer";

const size = [3, 3];

export default function Game() {
    const [cells, setCells] = useState(
        Array.from({ length: size[0] * size[1] }, (v, k) =>
            Object({ index: k, played: "" })
        )
    );

    const [player, setPlayer] = useState("x");
    const [winner, setWinner] = useState(null);

    function checkGameover(cells) {
        const winningCombs = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [6, 4, 2],
        ];

        for (let comb of winningCombs) {
            const [a, b, c] = comb;
            if (
                cells[a].played &&
                cells[a].played === cells[b].played &&
                cells[a].played === cells[c].played
            ) {
                return cells[a].played;
            }
        }

        if (cells.every((cell) => cell.played)) return "draw";

        return null;
    }

    function resetGame() {
        setCells(
            Array.from({ length: size[0] * size[1] }, (v, k) =>
                Object({ index: k, played: "" })
            )
        );
        setWinner(null);
    }

    function handleClick(cell, props) {
        // console.log(cell, props);
        if (winner) return;
        let newCells = [...cells];
        newCells[props.cellIndex].played = player;
        setCells(newCells);
        setWinner(checkGameover(cells));
        if (player === "x") {
            setPlayer("o");
        } else setPlayer("x");
    }

    return (
        <>
            <div className={styles.board}>
                {cells.map((c, index) => (
                    <Cell
                        cellIndex={c.index}
                        handleClick={handleClick}
                        played={c.played}
                        key={c.index}
                    ></Cell>
                ))}
            </div>
            <div>
                <NextPlayer winner={winner} player={player}></NextPlayer>
                <button className={styles.resetButton} onClick={resetGame}>
                    Reset Game
                </button>
            </div>
        </>
    );
}
