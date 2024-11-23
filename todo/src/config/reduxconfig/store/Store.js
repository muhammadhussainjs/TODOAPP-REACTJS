import { configureStore } from "@reduxjs/toolkit";
import  todoReducer  from "../reducers/Todoslice";



export const store = configureStore({
    reducer:{

       todo: todoReducer
    } 
})

