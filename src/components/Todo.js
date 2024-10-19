

import {  Card, CardContent, IconButton,  Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import CheckIcon from '@mui/icons-material/Check';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

import '../App.css';

import { React } from 'react';

import { useToast } from '../contexts/ToastContext';
import { useTodos ,useTodosDispatch } from '../contexts/TodosContext';






function Todo({ todo,showDelete,showUpdate}) {
  // const {todos,dispatch}=useTodos();
 
  const dispatch = useTodosDispatch();
   const {showHideToast}=useToast();

  function handleCheckClick(){
    dispatch({type:"toggledCompleted",payload:todo})
        showHideToast("تم التعديل بنجاح");
  }
 function handleDeleteClick()  {
    showDelete(todo);
  };


  function handleUpdateClick()  {
    showUpdate(todo)
  };

  return (
    <>
 
     <Card className='todoCard' sx={{ minWidth: 275 , background:"#283593",color:"white",marginTop:5}}>
      <CardContent>
       
       
        <Grid container spacing={2}>
       
        <Grid  size={8} >
        <Typography variant="h5" sx={{ textAlign:"right",textDecoration : todo.isCompleted ? "line-through" : "none"}} >
           {todo.title}
        </Typography>
        <Typography variant="h6" sx={{ textAlign:"right",textDecoration : todo.isCompleted ? "line-through" : "none"}}>
         {todo.details}
                  </Typography>

        </Grid>
        <Grid  display="flex" justifyContent="space-around" alignItems="center" size={4} >
        <IconButton onClick={() =>handleCheckClick()} className='iconButton'  aria-label="delete" size="small" style={{
          color:todo.isCompleted ? "white":"#8bc34a",
          background:todo.isCompleted ? "#8bc34a":"white",
          border:"3px solid #8bc34a"
          }}>
            <CheckIcon fontSize="inherit" />
        </IconButton>
        <IconButton onClick={handleUpdateClick}  className='iconButton' aria-label="delete" size="small" style={{color:"#1769aa",background:"white",border:"3px solid #1769aa"}}>
             <ModeEditOutlineOutlinedIcon fontSize="inherit" />
        </IconButton>
        <IconButton  onClick={handleDeleteClick} className='iconButton' aria-label="delete" size="small" style={{color:"#b23c17",background:"white",border:"3px solid #b23c17"}}>
            <DeleteOutlineOutlinedIcon fontSize="inherit" />
        </IconButton>
        </Grid>
      </Grid>

      
       
    
      
  

      </CardContent>

    
    </Card>    
    </>
  )
}

export default Todo
