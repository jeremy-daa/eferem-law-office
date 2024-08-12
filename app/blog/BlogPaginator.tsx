"use client";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import BlogCard from "./BlogCard";
// import BlogLoading from './BlogLoading';
// import blogs from '../../data/blogs';

interface BlogPaginatorProps {
  d: any;
}

export default function BlogPaginator() {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);
  // if (loading) return <BlogLoading />;
  // if (error) return <p>Error :(</p>;

  return <Paginator d={blogs} />;
}

const Paginator = ({ d }: BlogPaginatorProps) => {
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const itemsPerPage = 6;
  const data = d;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <BlogCard d={currentItems} />

      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        // renderOnZeroPageCount={null}
        containerClassName={"pagination"}
        pageClassName={"pagination__page"}
        activeClassName={"pagination__pageActive"}
        previousClassName={"pagination__pagePrev"}
        nextClassName={"pagination__pageNext"}
      />
    </>
  );
};
