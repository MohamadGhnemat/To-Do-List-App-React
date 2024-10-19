import { createContext ,useContext} from "react";

import * as React from 'react';
import MySnackBar from "../components/MySnackBar";

 const ToastContext = createContext({})

  export const ToastProvider = ({children}) => {
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("");
  
  
    function showHideToast(message){
  
        setOpen(true);
        setMessage(message);
        setTimeout(() => {
          setOpen(false);
        }, 2000);
      }
    
    return (
          <ToastContext.Provider value={{ showHideToast }}>
             <MySnackBar open={open} message={message} />
            {children}
          </ToastContext.Provider>
    )
  }

 export const useToast= () =>{
   return  useContext(ToastContext)
 } 
