import logo from './logo.svg';
import './App.css';
import Header from './components/Header'
import ToDoList from './components/ToDoList'
import { Container, Row, Col } from 'react-bootstrap';
function App() {
  const Name = "Damyiel"
  return (
    <Container>
      <Row>
      <Col><Header/></Col>
      </Row>
      <Row>
      <Col><Header title = "Ongoing"/></Col>
      <Col><Header title = "Finished"/></Col>
      </Row>
      <Row>
        <Col><ToDoList type1 = "Done"/></Col>
        <Col><ToDoList type1 = "Return"/></Col>
        
      </Row>
      
    </Container>
  );
}

export default App;
