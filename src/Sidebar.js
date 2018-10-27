import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/Button';
//I wanna make all the buttons for the topics first
class Side extends React.Component{

	render () {
	//When rendered I just want the topics to be displayed as buttons but stacked
	return (<ButtonToolbar>
			<Button>Functions</Button>
			<Button>Vectors</Button>
			<Button>Strings</Button>
			<Button>Arrays</Button>
			<Button>Conditionals</Button>
			<Button>Iteration</Button>
			<Button>Low Level I/O</Button>
			<Button>Cells</Button>
			<Button>High Level I/O</Button>
			<Button>Structures</Button>
			<Button>Plotting</Button>
			<Button>Numerical Methods</Button>
			<Button>Recursion</Button>
			<Button>Images</Button>
			<Button>Sorting</Button>
			<Button>Big O</Button>
			<Button>Graph Theory</Button>
			</ButtonToolbar>
	);
	};
};

// I want all of the buttons for questions to be rendered when the topic item is clicked ie a state change

class Sidebar extends React.Component{
	//I will eventually be changing the state of the sidebar
	constructor (props) {
	super(props)
	this.State = {
		topics: ['Week 1']
	}
	}

	render() {
	return <Side />
	};
};

export default Sidebar

ReactDOM.render(
	<Sidebar />,
	document.getElementById('root'));