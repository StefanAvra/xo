import styles from "./Cell.module.css";

export default function Cell(props) {
    return (
        <div
            className={props.played ? styles[props.played] : styles.cell}
            onClick={(e) => {
                if (props.played) return;
                props.handleClick(e.target, props);
            }}
        ></div>
    );
}
