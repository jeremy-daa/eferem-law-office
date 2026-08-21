"use client";

import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import BlogCard from "./BlogCard";

interface BlogPaginatorProps {
  initialPosts?: any[];
}

export default function BlogPaginator({ initialPosts = [] }: BlogPaginatorProps) {
  const [blogs, setBlogs] = useState(initialPosts);

  useEffect(() => {
    if (!initialPosts || initialPosts.length === 0) {
      fetch("/api/posts")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) setBlogs(data);
        })
        .catch((err) => console.error("Client fallback fetch error:", err));
    }
  }, [initialPosts]);

  return <Paginator d={blogs} />;
}

const Paginator = ({ d }: { d: any[] }) => {
  const [currentItems, setCurrentItems] = useState<any[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const itemsPerPage = 6;
  const data = d || [];

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % (data.length || 1);
    setItemOffset(newOffset);
  };

  return (
    <div className="w-full pb-20">
      <BlogCard d={currentItems} />

      {pageCount > 1 && (
        <div className="flex justify-center mt-10">
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="<"
            containerClassName={"pagination"}
            pageClassName={"pagination__page"}
            activeClassName={"pagination__pageActive"}
            previousClassName={"pagination__pagePrev"}
            nextClassName={"pagination__pageNext"}
          />
        </div>
      )}
    </div>
  );
};
