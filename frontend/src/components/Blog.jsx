import React from 'react'
import Title from './Title'
import { blogs } from "../assets/data";

function Blog() {
  return (
    <section className='max-padd-container py-16'>
      <Title
        title1={"Useful Blogs"}
        title2={"Blogs"}
        titleStyles={"pb-10"}
        para={"Read blogs to choose best"}
      />

      {/* Blogs */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
        {blogs.map((blog) => (
          <div key={blog._id} className='border-[11px] border-primary overflow-hidden relative'>
            <img src={blog.image[0]} alt={blog.title} className="w-full h-[250px] object-cover" />

            {/* overlay */}
            <div className='absolute top-0 left-0 h-full w-full bg-black/30' />

            {/* Info */}
            <div className='absolute bottom-4 left-4 text-white text-[15px]'>
              <h3 className='font-[600] text-[16px] pr-4 leading-5'>{blog.title}</h3>
              <button className='bg-white/30 py-0.5 px-2 rounded-md medium-14 mt-2'>
                Continue Reading
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Blog
