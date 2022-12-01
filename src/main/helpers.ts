import fs from 'fs';  //access file system

export function readFile(file: any): Promise<any> | any{
  return new Promise(resolve=>{
    const reader = new FileReader() //creates the reader
    //what to do when done reading
    reader.addEventListener('load', () => resolve(reader.result), false)
    reader.readAsDataURL(file) // read the file
  })
}