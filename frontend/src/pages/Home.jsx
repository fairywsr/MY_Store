import Features from '../components/Features'
import Header from '../components/Header'
import Hero from "../components/Hero"
import Categories from "../components/Categories"
import PopularProducts from "../components/PopularProducts"
import bannerImg from "../assets/bannerImg.webp"
import Blog from "../components/Blog"
function Home() {
  return (
    <>
    <Header/>
    <Hero/>
    <Features/>
    <Categories/>
    <PopularProducts/>
    <div className='max-padd-container lg:py-8 overflow-hidden'>
      <img src={bannerImg} alt='banner Image' className='rounded min-w-[711px] max-h-[400px] w-full max-w-none object-cover'/>
    </div>
    <Blog/>
    </>
  )
}

export default Home