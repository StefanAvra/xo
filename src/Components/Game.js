import styles from "./Game.module.css";
import Cell from "./Cell";
import { useState } from "react";

const size = [3, 3];

export default function Game() {
    let cols = [];

    const [player, setPlayer] = useState("x");

    function handleClick() {
        if (player === "x") {
            setPlayer("o");
        } else setPlayer("x");
    }

    for (let i = 0; i < size[0]; i++) {
        let cells = [];
        for (let c = 0; c < size[1]; c++) {
            cells.push(
                <Cell
                    player={player}
                    handleClick={handleClick}
                    key={`cell${i}-${c}`}
                ></Cell>
            );
        }
        cols.push(
            <div key={i} className={styles.col}>
                {cells}
            </div>
        );
    }

    return <div className={styles.game}>{cols}</div>;
}
