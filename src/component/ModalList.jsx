import React ,{useState} from 'react'
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';


const ModalList = () => {
    const [inputText ,setInputText] = useState("")
  return (
    <div className='border-2 border-gray-500 w-[100%]  '>
        <div className='flex justify-between border-b-[1px] border-black py-2 px-4'>   
        <h2 className='text-[1rem] font-[600] pb-4 '>Add products</h2>
        <CloseIcon/>
        </div>
        <div className='mt-3 py-2 px-4'>
        <TextField
          id=""
          label=""
          defaultValue="Hello World"
          className='w-[35rem] py-2'
        />
        </div>
    </div>
  )
}

export default ModalList