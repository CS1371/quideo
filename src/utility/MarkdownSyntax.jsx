import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import AceEditor from 'react-ace';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMarkdown } from '@fortawesome/free-brands-svg-icons';
import { CodeBlock } from './CodeBlock';
import Blank from './Blank';
import InlineCode from './InlineCode';

import 'brace/mode/markdown';
import 'brace/theme/tomorrow_night_bright';

import './MarkdownArea.css';
import './MarkdownSyntax.css';

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

## Links

To make a link, wrap the text to display in brackets, then the URL in parentheses.

This:

\`\`\`
[Click Here](https://www.google.com)
\`\`\`

Becomes

[Click Here](https://www.google.com)

## Images

Images are actually links preceded by the \`!\`, which turn into images. So to show an image,
use the same syntax, but the "text" becomes the alternate description:

\`\`\`
![Historian](https://cdn.stockphotosecrets.com/wp-content/uploads/2018/08/hide-the-pain-stockphoto-840x560.jpg)
\`\`\`

Becomes

![Historian](https://cdn.stockphotosecrets.com/wp-content/uploads/2018/08/hide-the-pain-stockphoto-840x560.jpg)
`;

export default class MarkdownSyntax extends React.Component {
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

  renderToggler = () => {
    const { alwaysShow } = this.props;
    const { isShown } = this.state;
    if (alwaysShow) {
      return null;
    }
    return (
      <button
        type="button"
        className="markdown-syntax-btn"
        onClick={() => this.setState({ isShown: !isShown })}
      >
        {isShown ? (
          <em>Close Help</em>
        ) : (
          <React.Fragment>
            <em>Psst... This supports</em>
            <FontAwesomeIcon icon={faMarkdown} />
          </React.Fragment>
        )}
      </button>
    );
  };

  render() {
    const { isShown } = this.state;
    const { alwaysShow } = this.props;
    return (
      <div className="markdown-syntax">
        {this.renderToggler()}
        {!isShown && !alwaysShow ? null : (
          <React.Fragment>
            <div className="markdown-preview">
              <Markdown
                source={MARKDOWN_GUIDE}
                renderers={{ inlineCode: InlineCode, code: CodeBlock, delete: Blank }}
              />
              <AceEditor
                mode="markdown"
                theme="tomorrow_night_bright"
                value="Anywhere you see a dark editor, Markdown is supported!"
                height="150px"
                setOptions={{ autoScrollEditorIntoView: true }}
                editorProps={{ $blockScrolling: true }}
                width="50%"
                className="code-editor"
                fontSize={18}
                wrapEnabled
                readOnly
              />
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}
