import React from 'react';
import './App.css';
import { Question } from './question-viewer';
import Editor from './question-editor';

const caResp = {
  index: 2,
  tags: [
    {
      name: 'Recursion',
      week: 1
    }
  ],
  rubric:
    '+1 for getting it right\n\n+2 for writing `wassup`\n\n+5 for explaining `wassup = 2;`\n\n+10 for writing the following function:\n\n``` matlab\nfunction out = myFun(in1, in2)\na = 1;\nb = a(1:end)\n```',
  preamble:
    '# Function Name: `memeify`\n\n## Inputs: (1)\n\n* (`char`) File Name\n* (`double`) Likes\n\n## Outputs: (1)\n\n* (`uint8`): `MxNx3` image\n\n## Description\n\nYou are given an image, and think "hey, why don\'t I do this?" So you do\n\nMake a function `memeify` that takes in a filename and the number of likes to add, and outputs the new image.',
  difficulty: 8,
  hints: [
    'How many likes do you have?',
    'Do you know what the input image will be in terms of size?'
  ],
  type: 'Coding',
  answers:
    'function out = memeify(img, likes)\n\nimg = imread(img);\n[r, g, b] = deal(img(:, :, 1), img(:, :, 2), img(:, :, 3));\nmask = r == 0 & g == 0 & b == 0;\nr(mask) = b(mask);\n b(mask) = g(mask);\nfor n = 1:likes\n\tr(n, 1) = g(n, 1) + 1;\nend\nout = cat(3, r, g, b);\nend'
};

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
  type: 'Short Answer',
  hints: [
    ["What's up1?", 'Who is there?'],
    ["What's up2?", 'Who is there?'],
    ["What's up3?", 'Who is there?']
  ],
  prompts: [
    {
      text:
        'a. __Suppose__ **Suppose2**\n\n__\n\n the following is defined in the current folder:\n\n```matlab\nfunction out = myFun(in1, in2)\na = 1;\nb = 2;\nc = zeros(1, 100);\nd = c(1:end/2);\nout = d;\nend\n```\n What is the output when the following is run in the command window?\n\n```matlab-cw\n>> myFun(1, 2);\n```',
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
  answers: ['function out = myFun(in)\n\nend\n', '2', '1.0']
};

const fbResp = {
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
  hints: [
    ["What's up1?", 'Who is there?'],
    ["What's up2?", 'Who is there?'],
    ["What's up3?", 'Who is there?']
  ],
  type: 'Fill in the Blank',
  prompts: [],
  answers: ['\n```matlab\nfunction out = myFun(in)\n\nend\n```', '2', '1.0']
};

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
  type: 'Multiple Choice',
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
      <Editor
        availableTags={mcResp.tags}
        availableTypes={['Multiple Choice', 'Short Answer', 'Fill in the Blank', 'Coding']}
      />
      <Question {...caResp} />
      <Question {...saResp} />
      <Question {...mcResp} />
      <Question {...fbResp} />
    </div>
  );
}

export default App;
