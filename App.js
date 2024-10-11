import React, { useRef, useState } from "react"
import Data from './data.json'
import './App.css'
function App() {
  const [data, setData] =useState(Data)
  const [editState, setEditState] =useState(-1)
  return (
    <div className="container my-5">
      <div>
        <h1>CURD Databse</h1>
      </div>
      <div>
      <Addmember setData={setData}/>
      <form onSubmit={handleUpdate}>
      <table>
        <thead>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Location</th>
          <th>Action</th>
        </thead>
      {
        data.map((current) =>(
          editState === current.id ?<EditMember current={current} data={data} setData={setData}/> :
          <tr>
            <td>{current.name}</td>
            <td>{current.email}</td>
            <td>{current.phone}</td>
            <td>{current.location}</td>
            <td>
              <button type="button" className="btn btn-warning" onClick={() => handleEdit(current.id)}>Edit</button>
              <button type="button" className="btn btn-danger" onClick={() => handleDelete(current.id)}>Delete</button>
            </td>
          </tr>
        ))
      }
      </table>
      </form>
      </div>
    </div>
  )
  function handleUpdate(event){
      event.preventDefault()
      const name= event.target.elements.name.value
      const email= event.target.elements.email.value
      const phone= event.target.elements.phone.value
      const location= event.target.elements.location.value
      const updateData =data.map(d => d.id === editState ? {...d,id:id, name:name, email:email, phone:phone, location:location}: d)
      setEditState(-1)
      setData(updateData) 
  }

  function handleEdit(id){
    setEditState(id)
  }

  function handleDelete(id){
    const updateData= data.filter((d) => id !== d.id )
    setData(updateData)
  }
}

function EditMember({current,data,setData}){
  function handleName(event){
    const name= event.target.value;
    const updateData =data.map((d) => d.id === current.id ? {...d, name:name} : d)
    setData(updateData)
  }
  function handleEmail(event){
    const email= event.target.value;
    const updateData =data.map((d) => d.id === current.id ? {...d, email:email} : d)
    setData(updateData)
  }
  function handlePhone(event){
    const phone= event.target.value;
    const updateData =data.map((d) => d.id === current.id ? {...d, phone:phone} : d)
    setData(updateData)
  }
  function handleLocation(event){
    const location= event.target.value;
    const updateData =data.map((d) => d.id === current.id ? {...d, location:location} : d)
    setData(updateData)
  }
  return (
      <tr>
        <td><input type="text" value={current.name} onChange={handleName} name="name" placeholder="Enter Your Name..." /></td>
        <td><input type="text" value={current.email} onChange={handleEmail} name="email" placeholder="Enter Your Email..." /></td>
        <td><input type="text" value={current.phone} onChange={handlePhone} name="phone" placeholder="Enter Your Phone..." /></td>
        <td><input type="text" value={current.location} onChange={handleLocation} name="location" placeholder="Enter Location..."/></td>
        <td><button class="btn btn-info" style="color:white" type="submit">Update</button></td>
      </tr>
  )
}

function Addmember({setData}){
  const nameRef =useRef()
  const emailRef =useRef()
  const phoneRef =useRef()
  const locationRef =useRef()
  
  function handleValues(event){
    event.preventDefault();
    const name=event.target.elements.name.value;
    const email=event.target.elements.email.value;
    const phone=event.target.elements.phone.value;
    const location=event.target.elements.location.value;
    const newmember ={
      id: 5,
      name,
      email,
      phone,
      location 
    }
    setData((prevData => prevData.concat(newmember)))
    nameRef.current.value=""
    emailRef.current.value=""
    phoneRef.current.value=""
    locationRef.current.value=""
  }
  return(
    <form className="mb-3" onSubmit={handleValues}>
      <input type="text" name="name" placeholder="Enter Your Name..." ref={nameRef}/>
      <input type="text" name="email" placeholder="Enter Your Email..." ref={emailRef}/>
      <input type="text" name="phone" placeholder="Enter Your Phone..." ref={phoneRef}/>
      <input type="text" name="location" placeholder="Enter Location..." ref={locationRef}/>
      <button className='bg-success'>Add</button>
    </form>
  )
}

export default App;