"use client";
import React, { useEffect, useState } from "react";
import BlogList from "./AdminBlogList";

import BlogListSkeleton from "./BlogListSkeleton";
import { PiPlusCircleThin } from "react-icons/pi";

const cloudName = "dzixkcq2a";

const AdminDashboard = () => {
  // const cld = new Cloudinary({ cloud: { cloudName, apiKey, apiSecret } });
  const [posts, setPosts] = useState([]);
  const [modal, setModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [id, setId] = useState("");
  const [image, setImage] = React.useState<File | null>(null);
  const [files, setFiles] = React.useState<FileList | null>(null);
  const [uploadCredentials, setUploadCredentials] = React.useState<any>();
  const fetchUploadCredentials = async () => {
    const response = await fetch("/api/upload", {
      method: "GET",
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
    setUploadCredentials(response);
  };

  const awaitPosts = async () => {
    const res = await fetch("/api/posts").then((res) => {
      setLoading(false);
      return res.json();
    });
    setPosts(res);
    console.log(res);
  };
  const modalOpener = (id: string) => {
    setModal(true);
    setId(id);
  };
  const deleteModalOpener = (id: string) => {
    setDeleteModal(true);
    setId(id);
  };
  const modalCloser = () => {
    setModal(false);
    setDeleteModal(false);
    setAddModal(false);
    setTitle("");
    setContent("");
    setImage(null);
    setFiles(null);
    setError("");
    setId("");
  };
  useEffect(() => {
    awaitPosts();
    fetchUploadCredentials();
  }, []);
  const addHandler = async () => {
    var imageUrl = "";
    var fileUrl = [];
    if (!title || !content) {
      return setError("Title and content are required");
    }
    setError("");
    const imageData = new FormData();
    const filesData = new FormData();
    if (image) {
      imageData.append(image.name, image);
      const res = await fetch(`${uploadCredentials.url}/upload/image`, {
        method: "POST",
        body: imageData,
        headers: {
          keys: uploadCredentials.secret,
        },
      })
        .then((res) => res.json())
        .catch((err) => console.log(err));
      if (res) {
        imageUrl = res.urlPath;
      }
    }
    if (files) {
      Object.keys(files).forEach((key: any) => {
        filesData.append(files[key].name, files[key]);
      });
      const res = await fetch(`${uploadCredentials.url}/upload/doc`, {
        method: "POST",
        body: filesData,
        headers: {
          keys: uploadCredentials.secret,
        },
      })
        .then((res) => res.json())
        .catch((err) => console.log(err));
      if (res) {
        fileUrl = res.urlPaths;
      }
    }

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title || null,
        content: content || null,
        image: imageUrl || null,
        fileAttached: fileUrl || null,
      }),
    });
    if (res.status === 200) {
      alert("Post added successfully");
      console.log("Post added successfully");
      awaitPosts();
      modalCloser();
    } else {
      alert("An error occurred while adding post");
    }
  };
  const deleteHandler = async () => {
    const res = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });
    if (res.status === 200) {
      alert("Post deleted successfully");
      console.log("Post deleted successfully");
      awaitPosts();
      modalCloser();
    } else if (res.status === 404) {
      alert("Post not found");
    } else {
      alert("An error occurred while deleting post");
    }
  };
  const updateHandler = async () => {
    var imageUrl = "";
    var fileUrl = [];

    setError("");
    const imageData = new FormData();
    const filesData = new FormData();
    if (image) {
      imageData.append(image.name, image);
      const res = await fetch(`${uploadCredentials.url}/upload/image`, {
        method: "POST",
        body: imageData,
        headers: {
          keys: uploadCredentials.secret,
        },
      })
        .then((res) => res.json())
        .catch((err) => console.log(err));
      if (res) {
        imageUrl = res.urlPath;
      }
    }
    if (files) {
      Object.keys(files).forEach((key: any) => {
        filesData.append(files[key].name, files[key]);
      });
      const res = await fetch(`${uploadCredentials.url}/upload/doc`, {
        method: "POST",
        body: filesData,
        headers: {
          keys: uploadCredentials.secret,
        },
      })
        .then((res) => res.json())
        .catch((err) => console.log(err));
      if (res) {
        fileUrl = res.urlPaths;
      }
    }

    const res = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title || null,
        content: content || null,
        image: imageUrl || null,
        fileAttached: fileUrl || null,
      }),
    });
    if (res.status === 200) {
      alert("Post updated successfully");
      awaitPosts();
      modalCloser();
    } else {
      alert("An error occurred while updating post");
    }
  };
  return (
    <div className="relative">
      {modal && (
        <>
          <div className="fixed top-0 left-0 min-w-full min-h-full glass z-30">
            <div className="w-[500px] bg-white p-7 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-[var(--theme-yellow)] border-[2px] rounded-md">
              {error && <p className="text-red-400 text-xl">{error}</p>}
              <h1 className="text-2xl font-semibold text-[var(--theme-yellow)] mb-5">
                Edit Post
              </h1>
              <form>
                <input
                  type="text"
                  placeholder="Title"
                  className="w-full border-[1px] border-[#333] rounded-md p-2 mb-3"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                  placeholder="Content"
                  className="w-full h-[100px] border-[1px] border-[#333] rounded-md p-2 mb-3"
                  onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <label className="text-[var(--theme-yellow)]">
                  Update Image
                </label>
                <input
                  type="file"
                  placeholder="Image"
                  className="w-full border-[1px] border-[#333] rounded-md p-2 mt-2 mb-3"
                  accept=".png, .jpeg, .jpg, .gif"
                  onChange={(e) => {
                    if (!e.target.files) return;
                    const currentImage = e.target.files[0];
                    setImage(currentImage);
                  }}
                />
                <label className="text-[var(--theme-yellow)]">
                  Update File Attached
                </label>
                <input
                  type="file"
                  placeholder="Image"
                  className="w-full border-[1px] border-[#333] rounded-md p-2 mt-2 mb-3"
                  accept=".pdf, .docx, .doc, .txt"
                  onChange={(e) => {
                    if (!e.target.files) return;
                    const currentFiles = e.target.files;
                    setFiles(currentFiles);
                  }}
                  multiple
                />
              </form>
              <div className="flex gap-10 justify-start items-center">
                <button
                  className="bg-[var(--theme-yellow)] text-white rounded-md p-2 mt-2"
                  onClick={updateHandler}
                >
                  Update
                </button>
                <button
                  className="bg-red-400 text-white rounded-md p-2 mt-2"
                  onClick={modalCloser}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      {deleteModal && (
        <>
          <div className="fixed top-0 left-0 min-w-full min-h-full glass z-30">
            <div className="w-[500px] bg-white p-7 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-[var(--theme-yellow)] border-[2px] rounded-md text-center">
              <h1 className="text-2xl font-semibold text-[var(--theme-yellow)] mb-5">
                Delete Post
              </h1>
              <p>Are you sure you want to delete this post?</p>
              <div className="flex gap-10 justify-center items-center mt-5">
                <button
                  className="bg-[var(--theme-yellow)] text-white rounded-md p-2 px-10 mt-2"
                  onClick={deleteHandler}
                >
                  Yes
                </button>
                <button
                  className="bg-red-400 text-white rounded-md p-2 px-10 mt-2"
                  onClick={modalCloser}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      {addModal && (
        <>
          <div className="fixed top-0 left-0 min-w-full min-h-full glass z-30">
            <div className="w-[500px] bg-white p-7 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-[var(--theme-yellow)] border-[2px] rounded-md">
              {error && <p className="text-red-400 text-xl">{error}</p>}
              <h1 className="text-2xl font-semibold text-[var(--theme-yellow)] mb-5">
                Add Post
              </h1>
              <form>
                <input
                  type="text"
                  placeholder="Title"
                  className="w-full border-[1px] border-[#333] rounded-md p-2 mb-3"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                  placeholder="Content"
                  className="w-full h-[100px] border-[1px] border-[#333] rounded-md p-2 mb-3"
                  onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <label className="text-[var(--theme-yellow)]">Add Image</label>
                <input
                  type="file"
                  accept=".png,.jpg,.jpeg"
                  placeholder="Image"
                  className="w-full border-[1px] border-[#333] rounded-md p-2 mt-2 mb-3"
                  onChange={(e) => {
                    if (!e.target.files) return;
                    const currentImage = e.target.files[0];
                    setImage(currentImage);
                  }}
                />
                <label className="text-[var(--theme-yellow)]">
                  Add File to be Attached
                </label>
                <input
                  multiple
                  type="file"
                  accept=".pdf, .docx, .doc, .txt"
                  placeholder="Files"
                  className="w-full border-[1px] border-[#333] rounded-md p-2 mt-2 mb-3"
                  onChange={(e) => setFiles(e.target.files)}
                />
              </form>
              <div className="flex gap-10 justify-start items-center">
                <button
                  className="bg-[var(--theme-yellow)] text-white rounded-md px-6 p-2 mt-2"
                  onClick={addHandler}
                >
                  Add
                </button>
                <button
                  className="bg-red-400 text-white rounded-md px-6 p-2 mt-2"
                  onClick={modalCloser}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      {/* <SignOut /> */}

      {/* <h1>Admin Dashboard</h1> */}
      <div>
        <div className="w-[75%] mx-auto">
          <h1 className="text-6xl text-[var(--theme-yellow)] font-semibold text-center mb-6">
            Write a new post
          </h1>
          <div
            className="max-w-[700px] mx-auto h-[150px] border-[3px] cursor-pointer hover:scale-[1.02] duration-300 boxShadow rounded-md border-[var(--theme-yellow)] mb-5 flex justify-center items-center"
            onClick={() => setAddModal(true)}
          >
            <PiPlusCircleThin className="text-[var(--theme-yellow)] text-8xl" />
          </div>
          <h1 className="text-[50px] text-[var(--theme-yellow)] font-semibold text-center mb-8">
            Recent posts
          </h1>
          {loading && (
            <>
              {Array.from({ length: 4 }).map((_, i) => (
                <BlogListSkeleton key={i} />
              ))}
            </>
          )}
          {posts &&
            posts.map((post: any) => (
              <BlogList
                key={post._id}
                id={post._id}
                title={post.title}
                content={post.content}
                image={post.image}
                file={post.fileAttached}
                handleEdit={modalOpener}
                handleDelete={deleteModalOpener}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
