import BlogPaginator from "./BlogPaginator";
import Hero from '../../components/Hero'


export default function page() {
  return (
    <div className="w-full min-h-screen relative">
        <Hero title="News" />
        <BlogPaginator />
    </div>
  )
}
