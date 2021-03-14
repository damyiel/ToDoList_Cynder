import React, {useState, useEffect} from 'react'
import Header from './components/Header'
import ToDoList from './components/ToDoList'
import { Container, Row, Col, Form, Button} from 'react-bootstrap';
import axios from 'axios'
function App() {


  const [list, setToDoList] = useState([])
  const [finishedList, setFinishedList] = useState([])
  const [inputTitle, setInputTitle] = useState('')
  const [inputDescription, setInputDescription] = useState('')
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    getLists()
    
  }, [])

  function handleTitleChange(e){
    setInputTitle(e.target.value)
    console.log(e.target.value)
  }

  const deleteHandler = id => {

    try {
      axios.delete(`lists/${id}`)
      console.log("succesfully deleted")
      const newToDos = list.filter(item => {
        return item._id !== id
      })
      setToDoList(newToDos)
      console.log(newToDos)
    } catch (error) {
      alert(error)
    }
    

  }
  const updateStatus = id => {
    try {
      axios.put(`lists/${id}`)
      console.log("sucessfuly updated")
      
    } catch (error) {
      
    }
  }

  function handleDescriptionChange(e){
    setInputDescription(e.target.value)
    console.log(e.target.value)
  }

  function handleClick(e){
    e.preventDefault()

    const oldList = list
    console.log(oldList)
    const newToDo = {
      title: inputTitle,
      description: inputDescription,
      
    }

    
   
    axios({
      url: 'lists/save',
      method: 'POST',
      data: newToDo
    }).then(()=> {
      console.log('Data has been sent')
    }).catch(() => {
      console.log('Server error')
    })
    const newToDos = oldList.concat([newToDo])
    setToDoList(newToDos)
    setInputTitle('')
    setInputDescription('')
    
  }


  const getLists = async () => 
  {
    try {
      const request = await axios.get('lists/get')
      const requestFinished = await axios.get('lists/getFinished')
      const data = request.data
      const dataFinished = requestFinished.data
      setToDoList(data)
      setFinishedList(dataFinished)
      console.log('got it')
      console.log(data)
      console.log(list)
      setLoading(true)
      
    } catch (error) {
      alert(error)
    }
  }
  console.log(list)
   
 

   
  return (
    <Container>
      <Row>
        <Col>
        <Row>
        <Col><Header/></Col>
        </Row>
        
          
        <Form>
          <Form.Group controlId="formInputTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control type="input" placeholder="Title" value = {inputTitle} onChange = {handleTitleChange}/>
            
          </Form.Group>

          <Form.Group controlId="formInputDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control type="input" placeholder="Description" value = {inputDescription} onChange = {handleDescriptionChange}/>
          </Form.Group>
          
          <Button variant="primary" type="submit" onClick = {handleClick}>
            Add
          </Button>
        </Form>
        
        
        
        </Col>
      </Row>
      
      <Row>
     
       <Col><Header title = "Ongoing"/></Col>
      {/* <Col><Header title = "Finished"/></Col>  */}
      </Row>
      <Row>
      <Col>
        {list.length && list.map((list) => (
        <ToDoList id = {list._id} deleteHandler={deleteHandler} updateStatus = {updateStatus} title = {list.title} button1 = "Done" button2 = "Delete" description = {list.description}/>
        ))}
        </Col> 
        <Col>
        {/* {finishedList.length && finishedList.map((list) => (
        <ToDoList id = {list._id} deleteHandler={deleteHandler} title = {list.title} button1 = "Return" button2 = "Delete" description = {list.description}/>
        ))} */}
        </Col>
       
       
      </Row>
      
    </Container>
  );
}

export default App;
