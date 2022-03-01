import "./App.css";

import Game from "./Components/Game";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Tic Tac Toe</h1>
            </header>
            <main className="App-main">
                <Game />
            </main>
        </div>
    );
}

export default App;
