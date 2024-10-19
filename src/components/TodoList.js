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
import  {TodosContext, useTodos ,useTodosDispatch  } from "../contexts/TodosContext";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MySnackBar from './MySnackBar';
import { ToastContext, useToast } from '../contexts/ToastContext';
import todosReducer from "../reducers/todosReducer"; 
import { type } from '@testing-library/user-event/dist/type';


export default function TodoList() {
    // const {todos,dispatch}=useTodos();

  const todos= useTodos();
  const dispatch = useTodosDispatch();
  // console.log("todos is " + todos)

// const {todos2,setTodos}=React.useContext(TodosContext);

// const [todos,dispatch] = React.useReducer(todosReducer,[])

const {showHideToast}=useToast();
const [dialogTodo, setDialogTodo] = React.useState({title:"",details:""});

// const [updatedTodo, setUpdatedTodo] = React.useState({title:dialogTodo.title,details:dialogTodo.details});
  
const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);

const [showUpdateDialog, setShowUpdateDialog] = React.useState(false);

  const [titleInput,setTitleInput] = React.useState("");
  const [displayedTodosType,setDisplayedTodosType] = React.useState("all");

   
  const completedTodos=React.useMemo(() => {
  return   todos.filter((t) => {
      console.log("calling completed todos")
      return t.isCompleted
    })
   },[todos])
  const notCompletedTodos= React.useMemo(() => {
    return  todos.filter((t) => {
      console.log("calling not completed todos")
      return !t.isCompleted
    })
  } ,[todos])
  
  
  
  
  let todosToBeRendered =todos
  if(displayedTodosType =="completed"){
    todosToBeRendered =completedTodos
  } else if(displayedTodosType == "non-completed"){
    todosToBeRendered = notCompletedTodos
  } else {
    todosToBeRendered =todos
  }
 



  React.useEffect(() => {
    dispatch({type:"get"})
  //   try {
  //     const storageTodos=JSON.parse(localStorage.getItem("todos") ?? "[]")
  //  setTodos( storageTodos)
  // } catch (error){
  //   console.error("Error parsing todos from localstorage ", error)
  
  // }
  },[])
  function changeDisplayedType(e) {
  // console.log(e.target.value)
  setDisplayedTodosType(e.target.value)
  }
  function handleAddClick() {
    // const newTodo= {
    //   id:uuidv4(),
    //   title:titleInput,
    //   details:"",
    //   isCompleted:false
    // }
    
    //   const updatedTodos=[...todos,newTodo]
    //   setTodos(updatedTodos)
    //   localStorage.setItem("todos",JSON.stringify(updatedTodos) )
    dispatch({type:"added" ,payload:{newTitle:titleInput}})
      setTitleInput("")
      showHideToast("تمت الإضافة بنجاح");
  }
  
  function openDeleteDialog(todo){
    setDialogTodo(todo)
    // alert(todo.id)
    setShowDeleteDialog(true); 
  }
  function openUpdateDialog(todo){
    setDialogTodo(todo)
    // alert(todo.id)
    setShowUpdateDialog(true);
  }
  function handleDeleteDialogClose()  {
    setShowDeleteDialog(false);
  };
  function handleUpdateClose()  {
    setShowUpdateDialog(false);
  };

  const handleUpdateConfirm = () => {
    // const updatedTodos = todos.map(t => {
    //   if(t.id == dialogTodo.id){
    //     // t.title=updatedTodo.title;
    //     // t.details=updatedTodo.details;
    //     return {...t,title:dialogTodo.title,details:dialogTodo.details}
    //   } else {
    //     return t
    //   }
     
    // })

    // setTodos(updatedTodos);
 
  
   dispatch({type: "updated",payload :dialogTodo})
   setShowUpdateDialog(false);
    showHideToast("تم التعديل بنجاح");
    // showHideContext();
  };
  const handleDeleteConfirm = () => {
    // const updatedTodos = todos.filter(t =>{return t.id != dialogTodo.id})

    // setTodos(updatedTodos);
    // localStorage.setItem("todos",JSON.stringify(updatedTodos) )
    dispatch({type:"deleted",payload:dialogTodo})

    setShowDeleteDialog(false);
    showHideToast("تم الحذف بنجاح ")
  };
  const todosJsx = todosToBeRendered.map(t =>{
    return <Todo key={t.id}  todo={t} showDelete={openDeleteDialog} showUpdate={openUpdateDialog} />
  })
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
            value={dialogTodo.title}
            onChange={(e)=>setDialogTodo({...dialogTodo,title:e.target.value})}
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
            value={dialogTodo.details}
            onChange={(e)=>setDialogTodo({...dialogTodo,details:e.target.value})}
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
