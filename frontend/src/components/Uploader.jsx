import React, { useState } from 'react'

export const Uploader = () => {
    const [image,setImage]=useState([]);
    const [error,setError]=useState('');



const handleInput=async(e)=>{
    const file=e.target.
}

const handleUpload=async(file)=>{
try{
const data=new FormData()
data.append('image',file)
const res=await axios.post('/upload',data,{
    headers:{
        'Content-type':"multipart/form-data"
    }
})
const {url}=res.data
setImage([...image,url])
}catch(err){
    console.log(err);
}
}
  return (
    <div>
        <div >
            Drop Image here
        </div>
        <input placeholder='select image'/>
    </div>
  )
}
