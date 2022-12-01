import { useState } from 'react'
import { Link } from 'react-router-dom'
import { readFile } from '../../main/helpers'

export default function PhotoCrop(){
  const [imageSrc, setImageSrc] = useState() //file data
  const [fileName, setFileName] = useState() //file address

  const handleFileChange = async (e: any) : Promise<void> => {
    if(e.target.files && e.target.files.length){
      const file = e.target.files[0]
      setFileName(file.path)
      const imageData: any = await readFile(file)
      setImageSrc(imageData)
    }
  }

  if(!imageSrc){
    return(
      <>
      <Link to='/'> &larr; Go Back</Link>
      <h1>Select a photo to crop</h1>
      <input type="file" accept='image/*' onChange={handleFileChange}/>
    </>
    )
  }

  return (
    <>
      <img src={imageSrc} alt='' />
    </>
  )
}