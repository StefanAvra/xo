import styles from "./MultiplayerConnection.module.css";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function MultiplayerConnection(props) {
    const { socket } = props;

    const [room, setRoom] = useState(null);
    const [roomFromShareLink, setRoomFromShareLink] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    const join = useCallback(
        (roomId) => {
            socket.emit("join", roomId);
            navigate("");
            setRoom(roomId);
        },
        [socket, navigate]
    );

    useEffect(() => {
        if (room === null) {
            console.log("room is null");
            console.log(`pathname is ${location.pathname}`);
            if (location.pathname !== "/") {
                console.log(
                    `found a room id: ${location.pathname.replace("/", "")}`
                );

                setRoomFromShareLink(location.pathname.replace("/", ""));
            }
        } else console.log("room is not null");
    }, [join, location.pathname, room]);

    useEffect(() => {
        socket?.on("new_room", (newRoom) => {
            console.log(`got new room: ${newRoom}`);

            join(newRoom);
        });
    }, [socket, room, join]);

    useEffect(() => {
        if (room === null && roomFromShareLink) {
            console.log("about to join shared");
            join(roomFromShareLink);
        }
    }, [roomFromShareLink, join, socket, room]);

    useEffect(() => {
        console.log(location);
    }, [location]);

    return (
        <div className={styles.multiplayer}>
            {room === null && (
                <button
                    onClick={() => {
                        socket.emit("init");
                    }}
                >
                    New Game
                </button>
            )}
            {room !== null && (
                <div className={styles.shareLink}>
                    <span>Invite a friend:</span>

                    <input disabled value={`${window.location.href}${room}`} />
                </div>
            )}
            <div
                className={
                    socket && socket.id ? styles.connected : styles.disconnected
                }
            >
                {socket && socket.id ? "connected to " + socket?.id : "offline"}
            </div>
        </div>
    );
}
