import fs from 'fs';  //access file system

export function readFile(file: any): Promise<any> | any{
  return new Promise(resolve=>{
    const reader = new FileReader() //creates the reader
    //what to do when done reading
    reader.addEventListener('load', () => resolve(reader.result), false)
    reader.readAsDataURL(file) // read the file
  })
}

function createImage(imageSrc:string ): any{
  return new Promise((resolve, reject)=>{
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', reject)
    image.setAttribute('crossOrigin', 'anonymous')
    image.src = imageSrc
  })
}

export async function cropImageData(imageSrc: string, croppedAreaPixels: any){
  const image: any = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const maxSize = Math.max(image.width, image.height) //.max gets the bigger number
  canvas.width = maxSize
  canvas.height = maxSize
  ctx?.drawImage(image, maxSize/2 - image.width/2, maxSize/2 - image.height/2)
  const data: any = ctx?.getImageData(0,0, maxSize, maxSize)

  //now we can set our canvas to the desired size
  canvas.width = croppedAreaPixels.width
  canvas.height = croppedAreaPixels.height

  //now drop our image data in with the correct position
  ctx?.putImageData(data, 
    Math.round(0 - maxSize/2 + image.width/2 - croppedAreaPixels.x),
    Math.round(0 - maxSize/2 + image.height/2 - croppedAreaPixels.y)
    )

    const url: any = canvas.toDataURL('image/jpg', 0.8)
    const base64data = url.replace(/^data:image\/png;base64,/, '')

    return base64data
}