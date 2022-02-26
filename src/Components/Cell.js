import { useState } from "react";
import styles from "./Cell.module.css";

export default function Cell(props) {
    const [played, setPlayed] = useState(null);

    return (
        <div
            className={played ? styles[played] : styles.cell}
            onClick={(e) => {
                if (played) return;
                setPlayed(props.player);
                props.handleClick();
            }}
        ></div>
    );
}
