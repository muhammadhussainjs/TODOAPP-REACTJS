import React, { useEffect, useRef, useState } from 'react'
import { useDispatch , useSelector } from 'react-redux'
import { addTodo , removeTodo , editTodo } from './config/reduxconfig/reducers/Todoslice'

const App = () => {
  const dispatch = useDispatch()
  const selector = useSelector(state => state.todo.todo)
  
  const [data , setData] = useState('Add Todo')
  const [editingindex , setEditingindex] = useState(null)
  const [input, setInput] = useState(false)
  const [checkedItems, setCheckedItems] = useState({}) // State for tracking checked items
  
  const inputvalue = useRef()
  
  function Addtodo(e) {
    e.preventDefault()
    const value = inputvalue.current.value.trim()
    if(value === ''){
      alert('please enter todo')
      return
    }
    
    if(editingindex != null){
      dispatch(editTodo({
        input: inputvalue.current.value,
        index: editingindex
      }))
      setEditingindex(null)
      setData('Add Todo')
    } else {
      dispatch(
        addTodo({
          title: value
        })
      )
    }
    
    inputvalue.current.value = ''
    setInput(false)
  }
  
  useEffect(() => {
    console.log(selector)
  }, [selector])

  function deletetodo(index) {
    dispatch(removeTodo({
      index: index
    }))
    inputvalue.current.value = ''
    setData('Add Todo')
    setEditingindex(null)
  }
  
  function edittodo(index, title) {
    inputvalue.current.value = title
    setData('EDIT TASK')
    setEditingindex(index)
  }
  
  function Changes() {
    setInput(inputvalue.current.value.trim() !== '')
  }
  
  function toggleCheckbox(index) {
    setCheckedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  return (
    <>
      <form onSubmit={Addtodo} className='mt-14 w-[100%] flex justify-center gap-2'>
        <input
          type="text"
          ref={inputvalue}
          placeholder='type your task'
          className='p-4 w-[60%] outline outline-slate-200 outline-1 hover:outline-black'
          onChange={Changes}
        />
        <button
          className={`p-4 w-32 rounded-md ${input ? 'bg-blue-500 text-white' : 'bg-slate-100 text-gray-400'}`}
        >
          {data}
        </button>
      </form>
      {selector.length > 0 ? (
        selector.map((item, index) => (
          <div className='w-[100%] flex justify-center' key={index}>
            <div className='flex justify-between min-h-16  h-auto items-center shadow-xl  w-[70%] mt-2'>
              <div className=' flex bg-white items-center'>
                <span className='pl-4'>
                  <input
                    type="checkbox"
                    checked={!!checkedItems[index]}
                    onChange={() => toggleCheckbox(index)}
                  />
                </span>
                <p className={`pl-6 break-words flex flex-wrap  ${checkedItems[index] ? 'text-green-500' : 'text-black'}`}>
                  {item.title}
                </p>
              </div>
              <div className='flex gap-4'>
                <button
                  onClick={() => edittodo(index, item.title)}
                  className='bg-gray-200 p-2 w-14 rounded-md hover:bg-slate-300'
                >
                  EDIT
                </button>
                <button
                  onClick={() => deletetodo(index)}
                  className='bg-red-500 text-white p-2 w-20 rounded-md hover:bg-red-700 mr-6'
                >
                  DELETE
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className='text-center mt-4 text-blue-700 text-xl font-semibold'>
          <p>PLEASE ENTER TODO</p>
        </div>
      )}
    </>
  )
}

export default App
