import React from 'react';
import Category from './Category';
import Author from './Author';
import Link from 'next/link';
import { useState, useEffect } from "react";

const BlogList = (props: IProps) => {
    const { blogs } = props;
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredBlogs, setFilteredBlogs] = useState<IBlog[]>();

    const handleSearch = (event: any) => {
        setSearchTerm(event.target.value);
      };
      
    useEffect(() => {
    if (searchTerm !== "") {
        const results = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredBlogs(results);
    } else {
        setFilteredBlogs([]);
    }
    }, [searchTerm, blogs]);

    return (
        <>
            <div>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full px-4 py-2 text-sm bg-gray-100 focus:bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mb-4"
                    placeholder="Search posts..."
                />
                <div>
                    {searchTerm ? (
                    filteredBlogs && filteredBlogs.length > 0 ? (
                        filteredBlogs?.map((blog) => (
                        <div key={blog.id} className="my-4 p-4 bg-white shadow-md rounded-md">
                            <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                            <p className="text-gray-600 mb-1">
                            <strong>Author:</strong> {blog.author}
                            </p>
                            <p className="text-gray-600">
                            <strong>Content:</strong> {blog.content}
                            </p>
                        </div>
                        ))
                    ) : (
                        <p className="mt-4 text-gray-500">No results found.</p>
                    )
                    ) : null}
                </div>
            </div>
            <div className="w-full flex">
                <div className='w-4/5 mb-5'>
                    {blogs?.map((item, index) => (
                        <Link href={`/blog/${item.id}`} key={item.id}>
                            <span className="block bg-white rounded-md shadow-md p-4 m-4 ml-0 hover:shadow-lg transition duration-300">
                                <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                                <p className="text-gray-600 mb-4">{item.author}</p>
                            </span>
                        </Link>
                    ))}
                </div>
                <div className='w-1/5 flex flex-col'>
                    <Category />
                    <Author />
                </div>
            </div>
        </>
    );
}

export default BlogList;
