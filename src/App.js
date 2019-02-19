import React from "react";
import "./App.css";
import Question from "./Question";

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Question topic="hello" difficulty={0} order={1} tags={
                    [
                        {
                            name: "hello"
                        },
                        {
                            name: "world"
                        }
                    ]
                }/>
            </div>
        );
    }
}

export default App;
