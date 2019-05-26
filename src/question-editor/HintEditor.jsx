import React from 'react';
import PropTypes from 'prop-types';
import hash from 'object-hash';
import MarkdownEditor from './MarkdownEditor';
import { OrderedList } from '../utility';
import { Hint } from '../question-viewer';

const HintEditor = props => {
  const { hints, hint, onChange } = props;

  return (
    <div className="hint-editor">
      <OrderedList
        onChange={h => onChange({ hints: h, hint })}
        onEdit={(h, i) => onChange({ hints: hints.splice(i, 1), hint: h })}
        render={h => <Hint key={hash(h)} text={h} isShown />}
      >
        {hints}
      </OrderedList>
      <MarkdownEditor
        value={hint}
        onChange={h => onChange({ hints, hint: h })}
        height="150px"
        title="Add Some Hints"
      />
      <button
        type="button"
        className="hint-add-btn"
        onClick={() => onChange({ hints: hints.concat(hint), hint: '' })}
        disabled={hint === ''}
      >
        Add Hint
      </button>
    </div>
  );
};

HintEditor.propTypes = {
  hints: PropTypes.arrayOf(PropTypes.string).isRequired,
  hint: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default HintEditor;
