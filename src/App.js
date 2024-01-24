import React , {useRef,useState} from 'react';
import './index.css'


function App() {
  const list=[
    {
      id:1,
      name:"John Doe",
      price:"2222"
    },
 {
  id:2,
  name:"dell",
  price:"344"
   }
  ]
  const[lists,setList]= useState(list)
  const[updateState,setUpdateState]=useState(-1)
  return (
    <div className='crud'> 
    
    <div>
    <AddList setList={setList}/>
    <form onSubmit={handleSubmit}>
      
      <table>
    {
      lists.map((current)=>{
      
        return(
          updateState===current.id?<Edit current={current} lists={lists} setList={setList}/>:
      <tr>
        <td >{current.name}</td>
        <td >{current.price}</td>
        <td>
          <button className='edit'onClick={()=>handleEdit(current.id)}>Edit</button>
          <button className='delete' type='button' onClick={()=>handledelete(current.id)}>Delete</button>
        </td>
      
      </tr>
        )
        
      })
    }
      </table>
      </form>
      </div>
    </div>
  )
  function handleEdit(id){
   setUpdateState(id)
  }
  function handledelete(id){
  const newList=lists.filter((li)=>li.id!== id)
  setList(newList)
  }
  function handleSubmit(e){
  e.preventDefault();
  const name =e.target.elements.name.value
  const price=e.target.elements.price.value
  const newList=lists.map((li)=>(
    li.id===updateState ? {...li , name:name, price:price} : li
  ))
  setList(newList)
  setUpdateState(-1)
  }
}
function Edit ({current,lists,setList}){
  function handInputname(e){

    
    const value=e.target.value;
     const newList=lists.map((li)=>(
      li.id===current.id ? {...li , name:value} : li
     ))
    setList(newList)
  }
  
    function handInputprice(e){
  
      
      const value=e.target.value;
       const newList=lists.map((li)=>(
        li.id===current.id ? {...li , price:value} : li
       ))
      setList(newList)
    }
  return(
    <tr>
      <td> <input type='text' onChange={handInputname} name='name' value={current.name}/></td>
      <td> <input type='text' onChange={handInputprice} name='price' value={current.price}/></td>
      <td><button type='submit' >Update</button></td>

    </tr>
  )
}
function AddList({setList}){
  const nameRef=useRef();
  const priceRef=useRef()
  function handleSubmit(e) {
    e.preventDefault();
    const name=e.target.elements.name.value;
    const price=e.target.elements.price.value;
    const newList={
      id:3,
      name,
      price
    }
    setList((prevList)=>{
      return prevList.concat(newList);
    })
    nameRef.current.value=""
    priceRef.current.value=""
  }
  return(
    <form className='addForm' onSubmit={handleSubmit}>
      <input type='text' name='name' placeholder='Enter name' ref={nameRef}/>
      <input type='text' name='price' placeholder='Enter price' ref={priceRef}/>
      <button type='submit'>Add</button>
    </form>
  )
}

export default App;
