import PropTypes from 'prop-types';

const Tag = PropTypes.shape({
  name: PropTypes.string.isRequired,
  week: PropTypes.number.isRequired
});

const MultipleChoiceAnswer = PropTypes.shape({
  answer: PropTypes.string.isRequired,
  explanation: PropTypes.string.isRequired,
  isCorrect: PropTypes.bool.isRequired
});

export { Tag, MultipleChoiceAnswer };
