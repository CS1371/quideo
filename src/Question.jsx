import "./Question.css";
import React from "react";
import Tag from "./Tag";
import PropTypes from "prop-types";
import MultipleChoice from "./MultipleChoice";

export default class Question extends React.Component {
    /* Props:
    * topic
    * index
    * difficulty
    * type
    * hints
    * prompt
    * answers
    * tags
    * rubric
    */

    wassup = () => 1;
    render() {
        // Print title, then tags. Each tag will be be clickable
        // Then, print our preamble
        // Now, it depends on what kind of question we have:
        // 1. If it's a multiple choice (MC), then we'll have the preamble, then a selection of
        // answers - some of which are correct.
        // 2. If it's a short answer (SA), then we'll have the preamble, then a set of
        // question-answer pairs. However, the question is free response
        // 3. If it's a long answer (LA), then just the preamble and the editor. This editor
        // should just be for Courier New.
        // 4. If it's a fill in the blank (FB). We need to think about this one
        //
        /*
         * This affects our properties. I propose the following:
         *
         * index
         * tags
         * rubric
         * preamble
         * difficulty
         * type
         * hints
         * prompts
         * answers
         *
         * Now, depending on the question, you may or may not have prompts.
         * So, if it's not SA or FB, you won't have prompts, and only have
         * one answer. Here's the question - for SA and FB, does it make
         * more sense to tie the prompt to its corresponding answer?
         * I'm not so sure.
         * I think the following:
         * If SA or FB, prompts and answers will be equal-length arrays
         * Otherwise, prompts won't exist and answers will be:
         *   for LA, answers is a single element array
         *   for MC, answers is an array of all the possible answers
         * For ease of storage, answers will always look the same, which
         * means it'll always have that "isCorrect" option. For now. Given
         * that we're using mongodb, which uses documents, it might not
         * be a big deal to change it up, but that's what my thought process
         * is for now.
         *
         * Look at prop types for what these actually look like
         */
        // Title is the main topic + type of question
        // main topic is topic with highest week
        const tags = [];
        this.props.tags.sort((a, b) => a.week - b.week);
        const topic = this.props.tags[this.props.tags.length - 1];
        for (let t of this.props.tags) {
            // add it to the tags array!
            tags.push(<Tag name={t.name} />);
        }
        let title = topic.name + ": ";
        let questionSpace = null;
        
        switch (this.props.type) {
        case "MC":
            title += "Multiple Choice";
            questionSpace = <MultipleChoice answers={this.props.answers} />;
            break;
        case "FB":
            title += "Fill in the Blank";
            break;
        case "SA":
            title += "Short Answer";
            break;
        case "LC":
            title += "Long Coding";
            break;
        default:
            return null;
        }

        // Some things will have markdown!
        return (
            <div className="question-view">
                <h1>{title}</h1>
                <div className="question-tags">
                    {tags}
                </div>
                <div className="question-preamble">
                    {this.props.preamble}
                </div>
                {questionSpace}
                <div className="question-hints">

                </div>
                <div className="question-rubric">
                
                </div>
            </div>
        );
    }
}
/*
 * index
 * tags
 * rubric
 * preamble
 * difficulty
 * type
 * hints
 * prompts
 * answers
 */
Question.defaultProps = {
    hints: [],
    prompts: []
};

Question.propTypes = {
    /** The ordering of this question */
    index: PropTypes.number.isRequired,
    /** The tags that apply to this question */
    tags: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        week: PropTypes.number.isRequired // should this really be a number?
    })).isRequired,
    /** The markdown rubric that shows how we'd grade this */
    rubric: PropTypes.string.isRequired,
    /** The preamble for a question, and the only part of MC and LA */
    preamble: PropTypes.string.isRequired,
    /** The rating, from 0 to 4 */
    difficulty: PropTypes.number.isRequired,
    /** The type of question (an enum?) */
    type: PropTypes.oneOf([
        "MC", // Multiple choice
        "SA", // Short Answer
        "FB", // Fill in the Blank
        "LC"  // Long Coding
    ]).isRequired,
    /** The hints, which is just a string array in the order they should be given */
    hints: PropTypes.arrayOf(PropTypes.string),
    /** The question prompts, only for SA and FB */
    prompts: PropTypes.arrayOf(PropTypes.string),
    /** The answers as an array. Even though it always has the same shape,
     * there are important implications on how it should be used in different
     * question type contexts:
     * * If we have MC, then this is an array of possible answer choices, with
     * `isCorrect` set to true if the answer is correct.
     * * If we have SA, then this is an array of answers whose length should
     * be the same as prompts
     * * If we have FB, then this is the same as SA
     * * If we have LA, this is a unary array with the TA's answer
     *
     * All answers support markdown in the entry.
     */
    answers: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        isCorrect: PropTypes.boolean,
    })).isRequired
};