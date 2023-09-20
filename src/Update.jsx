import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Update = () => {
    const {id} =useParams();
    const navigate = useNavigate();
    const [values,setValues] = useState({
        name:'',
        email:''
    })
    useEffect(()=>{
        axios.get("http://localhost:8081/read/"+id)
        .then(res => {
            console.log(res)
            setValues({...values, name: res.data[0].name, email: res.data[0].email});
        })
        .catch(error => console.log(error))
    },[])
    
    const handleUpdate = (event) =>{
        event.preventDefault();
        axios.put("http://localhost:8081/update/"+id, values)
        .then(res =>{console.log(res); navigate('/')})
        .catch(error=>{console.log(error);})

    }

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleUpdate}>
                    <h2>Update Student</h2>
                    <div className='mb-2'>
                        <label htmlFor="">Name</label>
                        <input type="text" name="name" placeholder='Enter Name' value={values.name} className='form-control'
                        onChange={e => setValues({...values,name:e.target.value})} />

                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Email</label>
                        <input type="email" name='email' placeholder='Enter Email' value={values.email} className='form-control' 
                        onChange={e => setValues({...values,email:e.target.value})}/>

                    </div>

                    <button className='btn btn-success'>Update</button>
                </form>

            </div>
        </div>
  )
}

export default Update