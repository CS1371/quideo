import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';

class questionsTopic1 extends React.Component{
    render() {
    return(<ButtonToolbar>
  <ButtonGroup>
    <Button>1</Button>
    <Button>2</Button>
    <Button>3</Button>
    <Button>4</Button>
  </ButtonGroup>

  <ButtonGroup>
    <Button>1</Button>
    <Button>2</Button>
    <Button>3</Button>
  </ButtonGroup>

  <ButtonGroup>
    <Button>1</Button>
  </ButtonGroup>
</ButtonToolbar>);
    }
}

class questionsTopic2 extends React.Component{
    render(){
    return(<ButtonToolbar>
  <ButtonGroup>
    <Button>1</Button>
    <Button>2</Button>
    <Button>3</Button>
    <Button>4</Button>
  </ButtonGroup>

  <ButtonGroup>
    <Button>5</Button>
    <Button>6</Button>
    <Button>7</Button>
  </ButtonGroup>

  <ButtonGroup>
    <Button>8</Button>
  </ButtonGroup>
</ButtonToolbar>);
    }
}