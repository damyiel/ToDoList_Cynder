import '../App.css';
import {Button, Card} from 'react-bootstrap'
const ToDoList = ({title, description, button1, button2, id, deleteHandler}) => {


    return (


        <Card style={{ width: '18rem' }}>
        
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            {description}
          </Card.Text>
          <Button variant="primary">{button1}</Button>
          <Button variant="danger" onClick={() => deleteHandler(id)}>{button2}</Button>
        </Card.Body>
      </Card>
    )
}

export default ToDoList
