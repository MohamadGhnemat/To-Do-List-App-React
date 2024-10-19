
import './App.css';
import TodoList from './components/TodoList';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { orange } from '@mui/material/colors';
import TodosProvider, { TodosContext, todosContext } from './contexts/TodosContext';
import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import MySnackBar from './components/MySnackBar';
import {  ToastProvider } from './contexts/ToastContext';

const theme = createTheme({
  typography: {
    "fontFamily": [ "Alexandria"],
   },
   palette: {
    primary:{
      main: "#d50000",

    }
   }
});

let initialTodos= [
  {
  id:uuidv4(),
  title:"قراءة كتاب",
  details:"يجب علينا ق البداية يا صديقي",
  isCompleted:false
},
  {
  id:uuidv4(),
  title:" كتاب",
  details:" الكتاب من البداية يا صديقي",
  isCompleted:false
},
  {
  id:uuidv4(),
  title:" نسخ",
  details:" علينا يا صديقي",
  isCompleted:false
},
]


function App() {
  const [todos,setTodos]=React.useState(initialTodos)
  return (
  
<ThemeProvider theme={theme}>
  <TodosProvider>
  <ToastProvider>
 
    <div className="App" style={{display:"flex",justifyContent:"center",minHeight:"100vh",background:"#191b1f",direction:"rtl"}}>
   
    {/* <TodosContext.Provider value={{todos,setTodos}}> */}
        <TodoList  />
        {/* </TodosContext.Provider> */}
    </div>
    </ToastProvider>
    </TodosProvider>
    </ThemeProvider>
    
 
  );
}

export default App;
