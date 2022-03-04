import styles from "./Game.module.css";
import Cell from "./Cell";
import MultiplayerConnection from "./MultiplayerConnection";
import { useState, useEffect } from "react";
import NextPlayer from "./NextPlayer";
import io from "socket.io-client";

const size = [3, 3];

const API_URL = process.env.API_URL || "ws://localhost:3001/";

export default function Game() {
    const [cells, setCells] = useState(
        Array.from({ length: size[0] * size[1] }, (v, k) =>
            Object({ index: k, played: "" })
        )
    );

    const [player, setPlayer] = useState("x");
    const [winner, setWinner] = useState(null);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io(API_URL);
        setSocket(newSocket);
        return () => newSocket.close();
    }, [setSocket]);

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

    function switchPlayer() {
        if (player === "x") {
            setPlayer("o");
        } else setPlayer("x");
    }

    function handleClick(cell, props) {
        // console.log(cell, props);
        if (winner) return;
        let newCells = [...cells];
        newCells[props.cellIndex].played = player;
        setCells(newCells);
        setWinner(checkGameover(cells));
        socket.emit("played", props.cellIndex);
        switchPlayer();
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
            <div className={styles.ui}>
                <NextPlayer winner={winner} player={player}></NextPlayer>
                <button className={styles.resetButton} onClick={resetGame}>
                    Reset Game
                </button>
                <MultiplayerConnection socket={socket} socketId={socket?.id} />
            </div>
        </>
    );
}
