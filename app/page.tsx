'use client'
import Dropzone from 'react-dropzone'
import { useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
export default function Home() {
  const [files, setFiles] = useState<File[]>([])

  const handleDrop = (acceptedFiles: File[]) => {
    const uniqueFiles = acceptedFiles.filter(
      (file) => !files.some((existingFile) => existingFile.name === file.name)
    )
    setFiles([...files, ...uniqueFiles])
  }

  const handleDelete = (index: number) => {
    const newFiles = [...files]
    newFiles.splice(index, 1)
    setFiles(newFiles)
  }

  return (
    <main className='container max-w-2xl mx-auto my-10 px-4'>
      {/* Image input section */}
      <section className='w-full mx-auto mb-12'>
        <div className='text-center mb-10'>
          <h1 className='font-semibold text-transparent text-5xl bg-gradient-to-r from-blue-500 to-indigo-400 inline-block bg-clip-text'>
            AI Avatar Generator
          </h1>
        </div>
        <div className='flex flex-wrap mb-3'>
          <input
            type='text'
            placeholder='Type model name'
            name='title'
            id='title'
            className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
          />
        </div>

        {/* Dropzone */}
        <div className='w-full text-center border-4 border-gray-500 border-dashed rounded-md cursor-pointer mb-2 text-gray-500 py-10'>
          <Dropzone onDrop={handleDrop}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
              </section>
            )}
          </Dropzone>
        </div>
      </section>

      {/* Images preview */}
      <section className='grid grid-cols-3 gap-4 mt-4'>
        {files.map((file, index) => (
          <div key={index} className='relative'>
            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              className='object-cover w-full h-full'
            />
            {/* Delete icon */}
            <button
              onClick={() => handleDelete(index)}
              className='absolute top-0 right-0 p-2 bg-yellow-500 text-black'
            >
              <FaTrashAlt />
            </button>
            <div className='absolute bottom-0 left-0 right-0 bg-red-900 bg-opacity-50 text-white p-2'>
              {file.name}
            </div>
          </div>
        ))}
      </section>
    </main>
  )
}
