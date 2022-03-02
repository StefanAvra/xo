export default function NextPlayer(props) {
    let fragment = <></>;
    if (props.winner === "draw") {
        fragment = <>It's a draw!</>;
    } else if (props.winner) {
        fragment = <>{props.winner.toUpperCase() + " won!"}</>;
    } else {
        fragment = <>{"Next player: " + props.player[0].toUpperCase()}</>;
    }
    return <h3>{fragment}</h3>;
}
