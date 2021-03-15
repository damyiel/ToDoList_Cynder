import '../App.css';
import {Button, Card, Container, Modal} from 'react-bootstrap'
import React, {useState, useEffect} from 'react'
import EditModal from './EditModal'
const ToDoList = ({title, description, button1, button2, id, deleteHandler, updateStatus, handleLineThrough, completed}) => {
  
  


    return (

      <Container>
        <Card style={{ width: '18rem' }}>
        
        <Card.Body>
        
          <Card.Title style = {{textDecorationLine: completed ? "line-through" : "none"}}>{title}</Card.Title>
          <Card.Text style = {{textDecorationLine: completed ? "line-through" : "none"}}>
            <input type="checkbox" checked = {completed} onChange ={() => handleLineThrough(id)}/>
            {description}
            
          
          </Card.Text>
          
          <Button variant="info" onClick={() => updateStatus(id)} >{button1}</Button>
          <Button variant="danger" onClick={() => deleteHandler(id)}>{button2}</Button>
        </Card.Body>
      </Card>
      
      </Container>
    )
}

export default ToDoList
