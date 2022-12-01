import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import Cropper from 'react-easy-crop'
import { Area } from 'react-easy-crop/types'
import { readFile, cropImageData } from '../../main/helpers'

export default function PhotoCrop(){
  const [imageSrc, setImageSrc] = useState() //file data
  const [filename, setFilename] = useState() //file address
  const [crop, setCrop] = useState({x:0, y:0})
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>()

  const handleFileChange = async (e: any) : Promise<void> => {
    if(e.target.files && e.target.files.length){
      const file = e.target.files[0]
      setFilename(file.path)
      const imageData: any = await readFile(file)
      setImageSrc(imageData)
    }
  }

  const handleSave = async () => {
    //save cropped image
    //need the base64data
    if(croppedAreaPixels && imageSrc){

      const base64data = await cropImageData(imageSrc, croppedAreaPixels)
      const newFilename = filename +'-cropped.png'

      window.electron.saveCroppedImage([newFilename, base64data])

      //then reset for next photo
      setImageSrc(undefined)
      setZoom(1)
      setCrop({x:0, y:0})

    }

  }

  const onCropComplete: any = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

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
        onZoomChange={setZoom}
        onCropComplete={onCropComplete} />
      <button className='save-btn' onClick={handleSave}>Save</button> 
    </>
  )
}