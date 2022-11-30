import { Link } from 'react-router-dom'

export default function PhotoCrop(){
  return(
    <>
      <Link to='/'> &larr; Go Back</Link>
      <h1>Select a photo to crop</h1>
      <input type="file" accept='image/*' />
    </>
  )
}