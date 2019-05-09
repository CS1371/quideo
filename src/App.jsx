import React from 'react';
import './App.css';
import QuestionViewer from './QuestionViewer';

const saResp = {
  index: 1,
  tags: [
    {
      name: 'Recursion',
      week: 1
    }
  ],
  rubric:
    '+1 for getting it right\n\n+2 for writing `wassup`\n\n+5 for explaining `wassup = 2;`\n\n+10 for writing the following function:\n\n``` matlab\nfunction out = myFun(in1, in2)\na = 1;\nb = a(1:end)\n```',
  preamble: 'Please answer the following questions',
  difficulty: 5,
  hints: ["What's up?", 'Who is there?'],
  type: 'SA',
  prompts: [
    {
      text:
        'a. Suppose the following is defined in the current folder:\n\n```matlab\nfunction out = myFun(in1, in2)\na = 1;\nb = 2;\nc = zeros(1, 100);\nd = c(1:end/2);\nout = d;\nend\n```\n What is the output when the following is run in the command window?\n\n```\n>> myFun(1, 2);\n```',
      isCode: true
    },
    {
      text: '# Hello\n\nWhat is **up** my _friend_?',
      isCode: false
    },
    {
      text: '## `Hi` **there**',
      isCode: false
    }
  ],
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
/*
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
      name: 'Sorting',
      week: 3
    },
    {
      name: 'Images',
      week: 4
    },
    {
      name: 'Iteration',
      week: 5
    },
    {
      name: 'Graph Theory',
      week: 6
    },
    {
      name: 'High Level I/O',
      week: 7
    },
    {
      name: 'Low Level I/O',
      week: 8
    },
    {
      name: 'Conditionals',
      week: 9
    },
    {
      name: 'Functions',
      week: 10
    },
    {
      name: 'Introduction',
      week: 11
    },
    {
      name: 'Vectors',
      week: 12
    },
    {
      name: 'Structures',
      week: 13
    },
    {
      name: 'Plotting',
      week: 14
    },
    {
      name: 'Numerical Methods',
      week: 15
    }
  ],
  rubric:
    '+1 for getting it right\n\n+2 for writing `wassup`\n\n+5 for explaining `wassup = 2;`\n\n+10 for writing the following function:\n\n``` matlab\nfunction out = myFun(in1, in2)\na = 1;\nb = a(1:end)\n```',
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
*/
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <QuestionViewer
          index={saResp.index}
          tags={saResp.tags}
          rubric={saResp.rubric}
          preamble={saResp.preamble}
          difficulty={saResp.difficulty}
          type={saResp.type}
          hints={saResp.hints}
          prompts={saResp.prompts}
          answers={saResp.answers}
        />
      </header>
    </div>
  );
}

export default App;
