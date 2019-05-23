import React from 'react';
import PropTypes from 'prop-types';
import Blank from './Blank';

const DELIM = '%{~~!';

// This is **almost** a complete copy-paste of the default renderer - it is overridden to give
// input text boxes for lines
function createStyleObject(classNames, elementStyle = {}, stylesheet) {
  return classNames.reduce((styleObject, className) => {
    return { ...styleObject, ...stylesheet[className] };
  }, elementStyle);
}

function createClassNameString(classNames) {
  return classNames.join(' ');
}

let createChildren;
// Declare before use
const createElement = props => {
  const { node, stylesheet, style = {}, useInlineStyles, key } = props;
  const { properties, type, tagName: TagName, value } = node;
  if (type === 'text') {
    // check
    if (/%{~~![^~]*!~~}%/.test(value)) {
      return (
        <Blank key={key} value={value.substr(DELIM.length, value.length - 2 * DELIM.length)} />
      );
    }
    return value;
  }
  // check tag name - if it's a comment, engage?
  const childrenCreator = createChildren(stylesheet, useInlineStyles);
  const nonStylesheetClassNames =
    useInlineStyles &&
    properties.className &&
    properties.className.filter(className => !stylesheet[className]);
  const className =
    nonStylesheetClassNames && nonStylesheetClassNames.length ? nonStylesheetClassNames : undefined;
  const props2 = useInlineStyles
    ? {
        ...properties,
        ...{ className: className && createClassNameString(className) },
        style: createStyleObject(
          properties.className,
          Object.assign({}, properties.style, style),
          stylesheet
        )
      }
    : {
        ...properties,
        className: createClassNameString(properties.className)
      };
  const children = childrenCreator(node.children);
  return (
    <TagName key={key} {...props2}>
      {children}
    </TagName>
  );
};

createChildren = (stylesheet, useInlineStyles) => {
  let childrenCount = 0;
  return children => {
    childrenCount += 1;
    return children.map((child, i) =>
      createElement({
        node: child,
        stylesheet,
        useInlineStyles,
        key: `code-segment-${childrenCount}-${i}`
      })
    );
  };
};

createElement.propTypes = {
  node: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  stylesheet: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object.isRequired,
  useInlineStyles: PropTypes.bool.isRequired,
  key: PropTypes.string.isRequired
};

export default function lineRenderer({ rows, stylesheet, useInlineStyles }) {
  return rows.map((node, i) =>
    createElement({
      node,
      stylesheet,
      useInlineStyles,
      key: `code-segement${i}`
    })
  );
}
