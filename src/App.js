import React from "react";
import "./App.css";
import Question from "./Question";

class App extends React.Component {
    render() {
        const mcResp = {
            index: 0,
            tags: [
                {
                    name: "Recursion",
                    week: 14
                },
                {
                    name: "Indexing",
                    week: 1
                },
                {
                    name: "Recursion",
                    week: 14
                },
                {
                    name: "Recursion",
                    week: 14
                },
                {
                    name: "Recursion",
                    week: 14
                },
                {
                    name: "Recursion",
                    week: 14
                },
                {
                    name: "Recursion",
                    week: 14
                },
                {
                    name: "Recursion",
                    week: 14
                },
                {
                    name: "Recursion",
                    week: 14
                },
                {
                    name: "Recursion",
                    week: 14
                },
                {
                    name: "Recursion",
                    week: 14
                },
                {
                    name: "Recursion",
                    week: 14
                },
                {
                    name: "High Level I/O",
                    week: 14
                },
                {
                    name: "Low Level I/O",
                    week: 14
                },
                {
                    name: "Graph Theory",
                    week: 14
                },
                {
                    name: "Conditionals",
                    week: 14
                },
                {
                    name: "Iteration",
                    week: 14
                },
                {
                    name: "Recursion",
                    week: 14
                },
                {
                    name: "Recursion",
                    week: 14
                }
            ],
            rubric: "",
            preamble: "If I write `a = 1;`, what is a? If I write `a = 1;`, what is a? If I write `a = 1;`, what is a? If I write `a = 1;`, what is a? If I write `a = 1;`, what is a? If I write `a = 1;`, what is a? If I write `a = 1;`, what is a? If I write `a = 1;`, what is a? If I write `a = 1;`, what is a? If I write `a = 1;`, what is a?  ",
            difficulty: 2,
            type: "MC",
            hints: [
                "Have you considered A?",
                "How about B? Could it work?"
            ],
            answers: [
                {
                    text: "1",
                    isCorrect: true
                },
                {
                    text: "2",
                    isCorrect: false
                },
                {
                    text: "1.0",
                    isCorrect: true
                }
            ]
        };
        return (
            <div className="App">
                <Question
                    index={mcResp.index}
                    tags={mcResp.tags}
                    rubric={mcResp.rubric}
                    preamble={mcResp.preamble}
                    difficulty={mcResp.difficulty}
                    type={mcResp.type}
                    hints={mcResp.hints}
                    answers={mcResp.answers} />
            </div>
        );
    }
}

export default App;
