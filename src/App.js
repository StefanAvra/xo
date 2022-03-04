import { HashRouter, useLocation } from "react-router-dom";
import "./App.css";
import Game from "./Components/Game";

function App() {
    return (
        <HashRouter basename="/" hashType="noslash">
            <div className="App">
                <header className="App-header">
                    <h1>Tic Tac Toe</h1>
                </header>
                <main className="App-main">
                    <Game />
                </main>
            </div>
        </HashRouter>
    );
}

export default App;
