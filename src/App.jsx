import React from 'react';
import './App.css';
import QuestionViewer from './QuestionViewer';

const mcResp = {
  index: 0,
  tags: [
    {
      name: 'Recursion',
      week: 1
    },
    {
      name: 'Indexing',
      week: 2
    },
    {
      name: 'Recursion',
      week: 3
    },
    {
      name: 'Recursion',
      week: 4
    },
    {
      name: 'Recursion',
      week: 5
    },
    {
      name: 'Recursion',
      week: 6
    },
    {
      name: 'Recursion',
      week: 7
    },
    {
      name: 'Recursion',
      week: 8
    },
    {
      name: 'Recursion',
      week: 14
    },
    {
      name: 'Recursion',
      week: 9
    },
    {
      name: 'Recursion',
      week: 10
    },
    {
      name: 'Recursion',
      week: 11
    },
    {
      name: 'High Level I/O',
      week: 12
    },
    {
      name: 'Low Level I/O',
      week: 13
    },
    {
      name: 'Graph Theory',
      week: 14
    },
    {
      name: 'Conditionals',
      week: 15
    },
    {
      name: 'Iteration',
      week: 19
    },
    {
      name: 'Recursion',
      week: 17
    },
    {
      name: 'Recursion',
      week: 18
    }
  ],
  rubric: '+1 for getting it right\n\n+2 for writing `wassup`\n\n+5 for explaining `wassup = 2;`',
  preamble:
    'If I write `a = 1;`, what is a? If I write `a = 1;`, what is a? If I write `a = 1;`, what is a? If I write `a = 1;`, what is a? If I write `a = 1;`, what is a? If I write `a = 1;`, what is a? If I write `a = 1;`, what is a? If I write `a = 1;`, what is a? If I write `a = 1;`, what is a? If I write `a = 1;`, what is a?  ',
  difficulty: 2,
  type: 'MC',
  hints: ['Have you considered A?', 'How about B? Could it work?'],
  answers: [
    {
      text: '\n```matlab\nfunction out = myFun(in)\n\nend\n```',
      isCorrect: true,
      explanation: 'Wassup'
    },
    {
      text: '2',
      isCorrect: false,
      explanation: 'Wassup'
    },
    {
      text: '1.0',
      isCorrect: true,
      explanation: 'Wassup'
    }
  ]
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <QuestionViewer
          index={mcResp.index}
          tags={mcResp.tags}
          rubric={mcResp.rubric}
          preamble={mcResp.preamble}
          difficulty={mcResp.difficulty}
          type={mcResp.type}
          hints={mcResp.hints}
          answers={mcResp.answers}
        />
      </header>
    </div>
  );
}

export default App;
