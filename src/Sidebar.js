import React from 'react';
import ReactDOM from 'react-dom';
//I wanna make all the buttons for the topics first
class Side extends React.Component{
	render () {
	//When rendered I just want the topics to be displayed
	return (<li>Topics Here!</li>);
	}
}

// I want all of the buttons for questions to be rendered when the topic item is clicked ie a state change

class Sidebar extends React.Component{
	//I will eventually be changing the state of the sidebar
	constructor (props) {
	super(props)
	this.state = {
		topics: ['Week1']
	}
	}
	render() {
		return <Side />;
	}
}

export default Sidebar

ReactDOM.render(
	<Sidebar />,
	document.getElementById('root'));