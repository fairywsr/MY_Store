import React from 'react'

function ProductDescription() {
  return (
    <div className='mt-14 bg-white'>
        <div className='flex gap-3'>
         <button className='medium-14 p-3 w-32 border-b-2 border-secondary'>Description</button>
         <button className='medium-14 p-3 w-32'>Color Guide</button>
         <button className='medium-14 p-3 w-32'>Sized Guide</button>
        </div>
        <hr className='h-[1px] w-full'/>
        <div className='flex flex-col gap-3 p-3'>
         <div>
            <h5 className='h5'>Overall</h5>
            <p className='text-sm'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni vel voluptatem eligendi incidunt assumenda, officia totam veniam, non est libero tempore repellendus vero enim obcaecati placeat debitis porro sapiente unde.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi quam temporibus, incidunt hic maiores culpa.</p>
         </div>
         <div>
            <h5 className='h5'>Benefit</h5>
            <ul className='list-disc pl-5 text-sm text-gray-30 flex flex-col gap-1'>
                <li>Lorem ipsum dolor sit amet consectetur.</li>
                <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus aspernatur hic doloribus!</li>
                <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</li>
            </ul>
         </div>
        </div>
    </div>
  )
}

export default ProductDescription