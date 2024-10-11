
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import {  Button, Card, CardContent, IconButton, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import CheckIcon from '@mui/icons-material/Check';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import '../App.css';

import { React, useContext, useState } from 'react';
import  {TodosContext } from "../contexts/TodosContext";





function Todo({ todo}) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState({title:todo.title,details:todo.details});

  const {todos,setTodos}=useContext(TodosContext);



  function handleCheckClick(){
    // handleCheck(todo.id)
    const updatedTodos=todos.map((t) => {
      if(t.id==todo.id){
        // if(t.isCompleted){
        //   t.isCompleted=false;
        // }else {
        //   t.isCompleted=true;
        // }
       t.isCompleted = !t.isCompleted ;
      }
      return t
     
    })
    setTodos(updatedTodos)
    localStorage.setItem("todos",JSON.stringify(updatedTodos) )
  }
 function handleDeleteClick()  {
    setShowDeleteDialog(true);
  };
 function handleUpdateClick()  {
    setShowUpdateDialog(true);
  };
  function handleDeleteDialogClose()  {
    setShowDeleteDialog(false);
  };
  function handleUpdateClose()  {
    setShowUpdateDialog(false);
  };
  const handleDeleteConfirm = () => {
    const updatedTodos = todos.filter(t =>{return t.id != todo.id})

    setTodos(updatedTodos);
    localStorage.setItem("todos",JSON.stringify(updatedTodos) )
    // setShowDeleteDialog(false);
  };
  const handleUpdateConfirm = () => {
    const updatedTodos = todos.map(t => {
      if(t.id == todo.id){
        // t.title=updatedTodo.title;
        // t.details=updatedTodo.details;
        return {...t,title:updatedTodo.title,details:updatedTodo.details}
      } else {
        return t
      }
     
    })

    setTodos(updatedTodos);
 
    setShowUpdateDialog(false);
    localStorage.setItem("todos",JSON.stringify(updatedTodos) )
  };
  return (
    <>
    {/* Delete Dialog  */}
    <Dialog style={{direction:"rtl"}} 
    onClose={ handleDeleteDialogClose}
        open={showDeleteDialog}
       
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        هل أنت متاكد من رغبتك في حذف المهمة ؟
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           لا يمكنك التراجع عن الحذف بعد إتمامه
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={ handleDeleteDialogClose} >إغلاق</Button>
          <Button  autoFocus onClick={handleDeleteConfirm}>
            نعم , قم بالحذف
          </Button>
        </DialogActions>
      </Dialog>
    {/* Delete Dialog   */}
       
    {/* UPDATE Dialog   */}
    <Dialog style={{direction:"rtl"}} 
    onClose={ handleUpdateClose}
        open={showUpdateDialog}
       
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          تعديل مهمة
        </DialogTitle>
        <DialogContent>
        <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="عنوان المهمة"
           
            fullWidth
            variant="standard"
            value={updatedTodo.title}
            onChange={(e)=>setUpdatedTodo({...updatedTodo,title:e.target.value})}
          />
        <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="التفاصيل"
           
            fullWidth
            variant="standard"
            value={updatedTodo.details}
            onChange={(e)=>setUpdatedTodo({...updatedTodo,details:e.target.value})}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={ handleUpdateClose} >إغلاق</Button>
          <Button  autoFocus onClick={handleUpdateConfirm}>
          تأكيد
          </Button>
        </DialogActions>
      </Dialog>
    {/* UPDATE Dialog   */}
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
