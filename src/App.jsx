import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Question } from './question-viewer';
import Editor from './question-editor';

import './App.css';

const resp = {
  index: 1,
  primaryTag: {
    name: 'Indexing',
    week: 5
  },
  tags: [
    {
      name: 'Recursion',
      week: 1
    }
  ],
  rubric:
    '+1 for getting it right\n\n+2 for writing `wassup`\n\n+5 for explaining `wassup = 2;`\n\n+10 for writing the following function:\n\n``` matlab\nfunction out = myFun(in1, in2)\na = 1;\nb = a(1:end)\n```',
  preamble:
    '# Function Name: `memeify`\n\n## Inputs: (1)\n\n* (`char`) File Name\n* (`double`) Likes\n\n## Outputs: (1)\n\n* (`uint8`): `MxNx3` image\n\n',
  difficulty: 8,
  questions: [
    {
      hints: [
        'How many likes do you have?',
        'Do you know what the input image will be in terms of size?'
      ],
      type: 'Coding',
      prompt:
        '## Description\n\nYou are given an image, and think "hey, why don\'t I do this?" So you do\n\nMake a function `memeify` that takes in a filename and the number of likes to add, and outputs the new image.',
      answer:
        'function out = memeify(img, likes)\n\nimg = imread(img);\n[r, g, b] = deal(img(:, :, 1), img(:, :, 2), img(:, :, 3));\nmask = r == 0 & g == 0 & b == 0;\nr(mask) = b(mask);\n b(mask) = g(mask);\nfor n = 1:likes\n\tr(n, 1) = g(n, 1) + 1;\nend\nout = cat(3, r, g, b);\nend'
    },
    {
      type: 'Short Answer',
      prompt:
        'What is the value of `out1` if the following is run in the command window:\n\n``` matlab-cw\n>> [out1, out2] = helloWorld(1, 2);\n```\n',
      answer: '`3.00`',
      hints: ['Where is `out1` defined?']
    },
    {
      type: 'Short Answer',
      prompt: 'If line 4 was removed, would the code still run as intended? Why or why not?',
      answer: 'No, if `in1 == in2` then `out2` is never assigned',
      hints: ['What is happening on line 4?', 'Are the outputs always defined?']
    },
    {
      type: 'Multiple Choice',
      hints: ['Have you considered A?', 'How about B? Could it work?'],
      prompt: 'If `a = 1`, and `b = 2`, what is `a + b`?',
      answer: [
        {
          answer: '\n```matlab\nfunction out = myFun(in)\n\nend\n```',
          isCorrect: true,
          explanation: 'Wassup'
        },
        {
          answer: '2',
          isCorrect: false,
          explanation: 'Wassup'
        },
        {
          answer: '1.0',
          isCorrect: true,
          explanation: 'Wassup'
        }
      ]
    },
    {
      type: 'Fill in the Blank',
      prompt: '',
      answer:
        'Hello ~~!fdsafdsafdsafdsafdsafdsafdsafdsafdsafdsafdsa!~~\n``` matlab\nMy name is ~~!answer!~~ And I am ~~!cool!!~~\n```',
      hints: ['Hello, world']
    }
  ]
};

const tags = [
  {
    name: 'Recursion',
    week: 1
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
];

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/editor" render={props => <Editor {...props} availableTags={tags} />} />
          <Route path="/question" render={props => <Question {...props} {...resp} />} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
