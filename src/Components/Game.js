import styles from "./Game.module.css";
import Cell from "./Cell";
import { useState } from "react";

const size = [3, 3];

export default function Game() {
    const [cells, setCells] = useState(
        Array.from({ length: size[0] * size[1] }, (v, k) =>
            Object({ index: k, played: "" })
        )
    );

    const [player, setPlayer] = useState("x");
    const [winner, setWinner] = useState(false);

    function handleClick(cell, props) {
        console.log(cell, props);
        let newCells = [...cells];
        newCells[props.cellIndex].played = player;
        setCells(newCells);
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
                <h3>
                    {winner
                        ? winner
                        : "Next player: " + player[0].toUpperCase()}
                </h3>
                <button
                    className={styles.resetButton}
                    onClick={() => {
                        setCells(
                            Array.from({ length: size[0] * size[1] }, (v, k) =>
                                Object({ index: k, played: "" })
                            )
                        );
                    }}
                >
                    Reset Game
                </button>
            </div>
        </>
    );
}
