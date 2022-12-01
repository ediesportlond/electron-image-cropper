import { useState } from 'react'
import { Link } from 'react-router-dom'
import Cropper from 'react-easy-crop'
import { readFile } from '../../main/helpers'

export default function PhotoCrop(){
  const [imageSrc, setImageSrc] = useState() //file data
  const [fileName, setFileName] = useState() //file address
  const [crop, setCrop] = useState({x:0, y:0})
  const [zoom, setZoom] = useState(1)

  const handleFileChange = async (e: any) : Promise<void> => {
    if(e.target.files && e.target.files.length){
      const file = e.target.files[0]
      setFileName(file.path)
      const imageData: any = await readFile(file)
      setImageSrc(imageData)
    }
  }

  const handleSave = (): any => {
    //save cropped image
    //save cropped image (filename, imageSrc, croppedAreaPixels)
    //then reset for next photo
    setImageSrc(undefined)
    setZoom(1)
    setCrop({x:0, y:0})

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
      <Cropper 
        image={imageSrc}
        crop={crop}
        zoom={zoom}
        onCropChange={setCrop}
        onZoomChange={setZoom} />
      <button className='save-btn' onClick={handleSave}>Save</button> 
    </>
  )
}