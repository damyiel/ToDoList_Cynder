import React from 'react'
import '../App.css';
import {Button, Card} from 'react-bootstrap'
const ToDoList = ({title1}, {title2}) => {
    return (
        <Card style={{ width: '18rem' }}>
    
        <Card.Body>
          <Card.Title>To Do Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
          </Card.Text>
          <Button variant="primary">{title1}</Button>
          <Button variant="info">Delete</Button>
        </Card.Body>
      </Card>
    )
}

export default ToDoList
