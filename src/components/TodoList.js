import * as React from 'react';

import Container from '@mui/material/Container';
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {  Divider, TextField } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Todo from './Todo';
import  Grid  from '@mui/material/Grid2';
import { v4 as uuidv4 } from 'uuid';
import  {TodosContext } from "../contexts/TodosContext";



export default function TodoList() {
const {todos,setTodos}=React.useContext(TodosContext);
  const [titleInput,setTitleInput] = React.useState("");
  const [displayedTodosType,setDisplayedTodosType] = React.useState("all");

  const completedTodos=todos.filter((t) => {
    return t.isCompleted
  })
  const notCompletedTodos=todos.filter((t) => {
    return !t.isCompleted
  })
  
  let todosToBeRendered =todos
  if(displayedTodosType =="completed"){
    todosToBeRendered =completedTodos
  } else if(displayedTodosType == "non-completed"){
    todosToBeRendered = notCompletedTodos
  } else {
    todosToBeRendered =todos
  }
  const todosJsx = todosToBeRendered.map(t =>{
    return <Todo key={t.id}  todo={t}   />
  })



  React.useEffect(() => {
    try {
      const storageTodos=JSON.parse(localStorage.getItem("todos") ?? "[]")
   setTodos( storageTodos)
  } catch (error){
    console.error("Error parsing todos from localstorage ", error)
  
  }
  },[])
  function changeDisplayedType(e) {
  // console.log(e.target.value)
  setDisplayedTodosType(e.target.value)
  }
  function handleAddClick() {
    const newTodo= {
      id:uuidv4(),
      title:titleInput,
      details:"",
      isCompleted:false
    }
    
      const updatedTodos=[...todos,newTodo]
      setTodos(updatedTodos)
      localStorage.setItem("todos",JSON.stringify(updatedTodos) )
      setTitleInput("")
    
  
  }

 
  return (
    <>
      <Container maxWidth="sm" style={{marginTop:"30px"}}>
       
        <Card sx={{ minWidth: 275 }} style={{maxHeight:"90vh",overflow:"auto"}}>
      <CardContent>
        <Typography variant="h2"  style={{fontWeight:"bold"}}>
            مهامي
        </Typography>
        <Divider  />
        <ToggleButtonGroup
        style={{direction:"ltr",marginTop:"30px"}}
      color="primary"
     value={displayedTodosType}
     exclusive
     onChange={changeDisplayedType}
      aria-label="Platform"
    >
 
     
      <ToggleButton value="non-completed">غير منجز</ToggleButton>
      <ToggleButton value="completed">منجز</ToggleButton>
      <ToggleButton value="all">الكل</ToggleButton>
    </ToggleButtonGroup>
    
    {todosJsx}
   
     
      
      <Grid    container spacing={2} style={{marginTop:"20px"}}>
        <Grid size={8} >
       
        <TextField id="outlined-basic"  label="عنوان المهمة" variant="outlined" style={{width:"100%"}} value={titleInput} onChange={
          (e)=> setTitleInput(e.target.value)
          }/>
        </Grid>
        <Grid size={4} >
      
        <Button disabled={titleInput.length == 0} variant="contained" style={{width:"100%",height:"100%"}} onClick={() => handleAddClick()}>إضافة</Button>
        </Grid>
        
      </Grid>
   
      </CardContent>

     
    </Card>

      </Container>
    </>
  );
}
