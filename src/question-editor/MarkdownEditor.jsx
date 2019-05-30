import React from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';
import Markdown from 'react-markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/pro-light-svg-icons';
import { CodeBlock, Blank } from '../utility';

import 'brace/mode/markdown';
import 'brace/theme/tomorrow_night_bright';

import './MarkdownEditor.css';

const MARKDOWN_GUIDE = `
# Markdown Syntax

Markdown is a simple markup language that makes it easy to apply formatting.

## Headers

To make headers, just use the \`#\` character, like so:

\`\`\` markdown
# Header
## Small Header
### Even Smaller Header
\`\`\`

Becomes

# Header
## Small Header
### Even Smaller Header

## Text

Text will automatically be wrapped - long lines of text, or consecutive lines of text,
will be shown as one flowing line. To insert a line break, just leave a blank line in between.

Use double \`**asterisks**\` to make it **bold**, single \`_underscores_\` for _italics_,
and double \`~~tildes~~\` for ~~strikethrough~~.

## Blanks

To insert blanks (for fill in the blank), use \`~~!Answer!~~\`. This can be used ~~!Anywhere!!~~

In general, you should try to make your ~~!blanks!~~ less than 20 characters.
Otherwise, it ~~!turns red, like this box is. You should keep it to fewer than 20 characters!!~~


## Lists

There are two types of lists - ordered and unordered.

To do an unordered list, you can use \`*\` or \`-\`. For an ordered list, 
you'll have to do that yourself (though it will be formatted). Make sure to include
a space after the bullet (i.e., \`* bullet\`, not \`*bullet\`)

\`\`\` markdown
* Bullet 1
* Bullet 2
...
- Bullet 1
- Bullet 2
...
1. Order one
2. Order two
\`\`\`

Becomes

* Bullet 1
* Bullet 2
...
- Bullet 1
- Bullet 2
...
1. Order one
2. Order two

## Code

To make something look like generic code, use backticks: \\\`I am code\\\`.

To make a code _block_, use triple backticks.

\`\`\`
Hello! I am generic code!
\`\`\`

To make \`matlab\` code, use the triple backticks followed by the word \`matlab\`:

\\\`\\\`\\\` matlab

Code

\\\`\\\`\\\`

Will look like

\`\`\` matlab
function myFun(in1, in2, in3)
    disp('hello, world!');
end
\`\`\`
`;

class MarkdownSyntax extends React.Component {
  static propTypes = {
    alwaysShow: PropTypes.bool
  };

  static defaultProps = {
    alwaysShow: false
  };

  constructor(props) {
    super(props);

    this.state = {
      isShown: false
    };
  }

  render() {
    const { isShown } = this.state;
    const { alwaysShow } = this.props;
    return (
      <div className="markdown-syntax">
        {alwaysShow ? null : (
          <button
            type="button"
            className="markdown-syntax-btn"
            onClick={() => this.setState({ isShown: !isShown })}
          >
            <FontAwesomeIcon icon={faQuestionCircle} />
          </button>
        )}
        {!isShown && !alwaysShow ? null : (
          <div className="markdown-preview">
            <Markdown source={MARKDOWN_GUIDE} renderers={{ code: CodeBlock, delete: Blank }} />
          </div>
        )}
      </div>
    );
  }
}
const MarkdownEditor = props => {
  const { value, title, help, onChange, hidePreview, height } = props;
  // if the type isn't specified, hidden!
  return (
    <div className={`markdown-container ${title === '' ? 'markdown-hidden' : 'markdown-shown'}`}>
      <h2>{title}</h2>
      <p>{help}</p>
      <MarkdownSyntax />
      <div className="markdown-editor" title="I support Markdown!">
        <AceEditor
          mode="markdown"
          theme="tomorrow_night_bright"
          value={value}
          height={height}
          onChange={val => onChange(val)}
          setOptions={{ autoScrollEditorIntoView: true }}
          editorProps={{ $blockScrolling: true }}
          width={!hidePreview ? '45%' : '90%'}
          className="code-editor"
          fontSize={18}
          wrapEnabled
        />
        {!hidePreview ? (
          <div className="markdown-preview">
            <Markdown source={value} renderers={{ code: CodeBlock, delete: Blank }} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

MarkdownEditor.propTypes = {
  value: PropTypes.string.isRequired,
  title: PropTypes.string,
  help: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  hidePreview: PropTypes.bool,
  height: PropTypes.string
};

MarkdownEditor.defaultProps = {
  title: '',
  help: '',
  hidePreview: false,
  height: '500px'
};

export default MarkdownEditor;
