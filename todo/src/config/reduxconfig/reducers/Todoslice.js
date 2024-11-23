

import {createSlice} from '@reduxjs/toolkit'

export const todoSlice = createSlice({
    name : 'Todos',
    initialState:{
        todo: [

        

        ],
    },
    reducers:{
        addTodo:(state , action)=>{
            if(state.todo.length >= 0){
                
                state.todo.push({
                    title: action.payload.title
                })
            }
        },
        removeTodo:(state , action)=>{
            state.todo.splice(action.payload.index , 1)
        },
        editTodo:(state , action)=>{
           const {input , index} = action.payload
           
            if (index >= 0 && index < state.todo.length) {
        state.todo[index].title = input;
    }
        }

    }
})
export const {addTodo , removeTodo , editTodo } = todoSlice.actions
export default todoSlice.reducer

