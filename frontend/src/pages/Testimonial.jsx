import React from 'react'
import Title from '../components/Title'
import { FaStar } from 'react-icons/fa';

function Testimonial() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Ahmed",
      date: "2025-08-01",
      message: "This platform has completely changed the way I shop online. Super smooth experience!",
      userImg: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 2,
      name: "Ali Khan",
      date: "2025-07-18",
      message: "Excellent service and great product quality. Highly recommended!",
      userImg: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 3,
      name: "Maria Hussain",
      date: "2025-06-22",
      message: "Fast delivery and amazing customer support. I’ll definitely shop again!",
      userImg: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
      id: 4,
      name: "Hamza Iqbal",
      date: "2025-05-10",
      message: "Great variety of products and easy checkout process.",
      userImg: "https://randomuser.me/api/portraits/men/75.jpg",
    },
  ];

  return (
    <div className='max-padd-container pt-28 py-16 bg-primary'>
      <Title
        title1={"People"}
        title2={"Says"}
        titleStyles={"pb-10"}
        para={"Real stories from our Happy customers sharing their experience, style inspiration, and trusted feedback on what they love"}
      />

      <div className='flex flex-wrap gap-6 pb-12'>
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className='bg-white w-full max-w-[370px] space-y-4 p-3 border border-gray-300/60 text-gray-500 text-sm'
          >
            {/* Stars & Date */}
            <div className='flex justify-between items-center'>
              <div className='flex gap-1'>
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} size={16} className="text-[#ff532e]" />
                ))}
              </div>
              <p>{testimonial.date}</p>
            </div>

            {/* Message */}
            <p>{testimonial.message}</p>

            {/* User Info */}
            <div className='flex items-center gap-2'>
              <img
                src={testimonial.userImg}
                alt={testimonial.name}
                className='h-8 w-8 rounded-full'
              />
              <p className='font-medium text-gray-800'>{testimonial.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Testimonial
