import React, {useState, useEffect} from 'react'
import Header from './components/Header'
import ToDoList from './components/ToDoList'
import { Container, Row, Col, Form, Button, Modal} from 'react-bootstrap';
import axios from 'axios'
function App() {

  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false)
  
  const [list, setToDoList] = useState([])
  
  const [inputTitle, setInputTitle] = useState('')
  const [inputDescription, setInputDescription] = useState('')
  const [editToDO, setToDoEdit] = useState()
  const [editTitle, setEditTitle] = useState('')
  const [editDescription, setEditDescription] = useState('')
  
  
    
  
  useEffect(() => {
    getLists()
    
  }, [])
  
  function handleTitleChange(e){
    setInputTitle(e.target.value)
    console.log(e.target.value)
  }
  
  function handleEditTitleChange(e){
    setEditTitle(e.target.value)
    console.log(e.target.value)
  }
  function handleEditDescriptionChange(e){
    setEditDescription(e.target.value)
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
  

  function handleLineThrough(id){
    try {
      const setLine = list.map(item => {
        if (item._id === id && item.status === true){
          axios.put(`lists/${id}`, {
            status: false
          })
          item.status = false
          console.log(item)
        }else if (item._id === id && item.status === false){
          axios.put(`lists/${id}`, {
            status: true
          })
          item.status = true
          
        }
        return item
        
      })
      setToDoList(setLine)
      
     
      
    } catch (error) {
      console.log(error)
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
      //const requestFinished = await axios.get('lists/getFinished')
      const data = request.data
     // const dataFinished = requestFinished.data
      setToDoList(data)
     
      console.log('got it')
      console.log(data)
      console.log(list)
    
      
    } catch (error) {
      alert(error)
    }
  }

  console.log(list)
  const updateStatus = id => {
    const listDescription = list.filter(item => {
      return item._id === id
        
      })
    console.log(listDescription)
    
    console.log(listDescription[0].description)
    console.log(listDescription[0].title)
    setEditDescription(listDescription[0].description)
    setEditTitle(listDescription[0].title)
    
    setToDoEdit(id)
    console.log(editToDO)
    setShow(true)
  }
   
  function Example() {
  
       return (
         <>
         
              <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <label>Title: </label>
                <Modal.Title><input type= "text" value = {editTitle} onChange = {handleEditTitleChange}></input></Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <label>Description: </label>
              <input type= "text" value = {editDescription} onChange = {handleEditDescriptionChange}></input>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary">Understood</Button>
              </Modal.Footer>
            </Modal>
          
         
          
           
          </>
         
        );
 
    
}

   
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
     
       <Col><Header title = "List"/></Col>
      
      </Row>
      <Row>
      
        {list.length && list.map((list) => (
        <Container>
        <ToDoList id = {list._id} completed = {list.status} deleteHandler={deleteHandler} handleLineThrough = {handleLineThrough} updateStatus= {updateStatus} 
        title = {list.title} button1 = "Edit" button2 = "Delete" description = {list.description}/>
        </Container>
        ))}
        
        
       
       
      </Row>
   
      <Example/>
    </Container>
    
  );
}

export default App;
