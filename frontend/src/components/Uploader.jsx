import React, { useState } from 'react'
import axios from 'axios'
export const Uploader = () => {
    const [image,setImage]=useState([]);
    const [error,setError]=useState('');



const handleInput=async(e)=>{
    const file=e.target.file[0]
    await handleUpload(file)
}

const handleUpload=async(file)=>{
try{
const data=new FormData()
data.append('image',file)
const res=await axios.post('http://localhost:8080/upload',data,{
    headers:{
        'Content-type':"multipart/form-data"
    }
})

const {url}=res.data
setImage([...image,url])
}catch(err){
    console.log(err);
    setError('Error')
}
}
  return (
    <div>
        <div style={{padding:'40px'}}>
            Drop Image here
        </div>
        <input type='file' 
        onChange={handleInput}
        placeholder='select image'/>

        {error && <p>{error}</p>}
        <div>
            {image.map((e,i)=>(
                <img key={i} src={e} alt='img'/>
            ))}
        </div>
    </div>
  )
}
