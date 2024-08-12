"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
// import blogs from '../data/blogs'
import Link from "next/link";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);

  // useEffect(() => {
  //   fetch("/api/posts")
  //     .then((res) => res.json())
  //     .then((data) => setBlogs(data))
  //     .catch((err) => console.log(err));
  // }, []);

  const dateConverter = (date: any) => {
    const newDate = new Date(date);
    return newDate.toDateString();
  };
  const checkNovelty = (date: any) => {
    // take the date and compare it with the current date if it is less than 7 days return new
    const newDate = new Date(date);
    const currentDate = new Date();
    const difference = currentDate.getTime() - newDate.getTime();
    const days = difference / (1000 * 3600 * 24);
    if (days <= 7) {
      return "New";
    } else if (days <= 30) {
      return "Recent";
    }
    return "";
  };
  return (
    <div className="w-full px-8 sm:px-[100px] py-20 flex flex-col gap-5 items-center">
      <h3 className="text-xl sm:text-2xl md:text-3xl text-[#3a3a38] font-semibold">
        News
      </h3>
      <h2 className="text-3xl sm:text-4xl md:text-6xl text-center text-[#3a3a38] font-bold max-w-[650px] md:leading-[4.25rem] mb-10">
        The Latest News And Blog From ELO
      </h2>
      <div className="w-full flex flex-wrap gap-16 justify-center">
        {blogs?.slice(0, 3).map((blog: any, index: any) => (
          <Link
            href={`/blog/${blog._id}`}
            key={index}
            className="group w-[350px] h-[400px] relative book"
          >
            <div className="absolute left-0 top-0 w-full h-full  p-10 bg-[#eee] duration-1000 bookpage">
              <Image
                src={"/images/Logo_water.png"}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[200px] object-contain"
                alt="lets work"
                width={1080}
                height={1080}
                quality={100}
              />
              <Image
                className="w-full h-[200px] object-cover rounded-sm mb-3"
                src={blog.image}
                alt={blog.title}
                width={1920}
                height={1080}
                quality={100}
              />
              <p className="relative text-sm mb-5">
                {blog.content.slice(0, 100)}...
              </p>
              <p className="float-right text-sm">
                {dateConverter(blog.createdAt)}
              </p>
            </div>
            <div className="relative overflow-hidden w-full h-full bg-[#fff] border-2 border-[#085AA3] duration-1000 bookcover">
              <Image
                className="absolute top-0 left-0 w-full h-full object-cover blur-sm"
                src={blog.image}
                alt={blog.title}
                width={1920}
                height={1080}
                quality={100}
              />
              <div className="relative w-full h-full flex flex-col items-center bg-[#ffffffaa] pt-20 pb-10 px-7 gap-10 ">
                <div className="absolute left-10 top-10 -translate-y-1/2 rotate-45 w-10 h-80 bg-[#085AA3]"></div>
                <div className="absolute left-12 top-10 -translate-y-1/2 rotate-45 w-3 h-80 bg-[#fff]"></div>
                <Image
                  className="max-w-[80px] object-contain"
                  src={"/images/Logo.png"}
                  alt="logo"
                  width={1080}
                  height={1080}
                  quality={100}
                />
                <h2 className="text-center text-2xl text-[#38383a] font-bold">
                  {blog.title}
                </h2>
                <span className="absolute px-2 py-2 text-sm w-fit bottom-2 right-4 text-slate-50">
                  {checkNovelty(blog.createdAt) && (
                    <span className="px-4 py-1 rounded-lg bg-[var(--theme-blue)]">
                      {checkNovelty(blog.createdAt)}
                    </span>
                  )}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

{
  /* <Link href={`/blog/${blog._id}`} key={index} className='group w-[350px] min-h-[450px] relative book'>
                    <div className="absolute left-0 top-0 w-full h-full p-10 bg-[#eee] duration-1000 bookpage">
                        <Image src={"/images/Logo_water.png"} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[200px] object-contain" alt="lets work" width={1080} height={1080} quality={100} />
                        <Image className='w-[120px] h-[200px] float-left object-cover rounded-sm mr-3 mb-1' src={blog.image} alt={blog.title} width={1920} height={1080} quality={100} />
                        <p className='text-justify text-sm booktext border border-[#085AA3] p-5'>{blog.content.slice(0, 350)}...</p>
                    </div>
                    <div className="relative overflow-hidden w-full h-full bg-[#fff] border-2 border-[#085AA3] duration-1000 bookcover">
                        <Image className='absolute top-0 left-0 w-full h-full object-cover blur-sm' src={blog.image} alt={blog.title} width={1920} height={1080} quality={100} />
                        <div className="relative w-full h-full flex flex-col items-center bg-[#ffffffaa] pt-20 pb-10 px-7 gap-10 ">
                            <div className="absolute left-10 top-10 -translate-y-1/2 rotate-45 w-10 h-80 bg-[#085AA3]"></div>
                            <div className="absolute left-12 top-10 -translate-y-1/2 rotate-45 w-3 h-80 bg-[#fff]"></div>
                            <Image className='max-w-[80px] object-contain' src={"/images/Logo.png"} alt='logo' width={1080} height={1080} quality={100} />
                            <h2 className='text-center text-2xl text-[#38383a] font-bold'>{blog.title}</h2>
                        </div>
                    </div>
                </Link> */
}
