import PropTypes from 'prop-types';

const TYPES = {
  MC: 'Multiple Choice',
  SA: 'Short Answer',
  FB: 'Fill in the Blank',
  CA: 'Coding'
};

const Tag = PropTypes.shape({
  name: PropTypes.string.isRequired,
  week: PropTypes.number.isRequired
});

const MultipleChoiceAnswer = PropTypes.shape({
  answer: PropTypes.string.isRequired,
  explanation: PropTypes.string.isRequired,
  isCorrect: PropTypes.bool.isRequired
});

const Question = {
  type: PropTypes.oneOf(Object.values(TYPES)).isRequired,
  prompt: PropTypes.string.isRequired,
  answer: PropTypes.oneOfType([
    PropTypes.arrayOf(MultipleChoiceAnswer).isRequired,
    PropTypes.string.isRequired
  ]).isRequired,
  hints: PropTypes.arrayOf(PropTypes.string).isRequired
};

export { Tag, MultipleChoiceAnswer, Question, TYPES };
