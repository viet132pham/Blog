'use client';

import BlogList from "@/components/BlogList";
import useSWR from "swr";
import ReactPaginate from 'react-paginate';
import { useState } from "react";
import {BASE_URL} from "@/contains/config";

const Blog = () => {
    const limit = 6;
    const [page, setPage] = useState(1);

    const fetcher = (url: string) => fetch(url)
    .then((res) => res.json());

    const {data: data1, error: error1, isLoading: isLoading1} = useSWR(
        `${BASE_URL}/blogs?_page=${page}&_limit=${limit}`,
        fetcher, 
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    );

    const {data: data2, error: error2, isLoading: isLoading2} = useSWR(
        `${BASE_URL}/blogs`,
        fetcher, 
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    );
    
    const handlePageClick = (event: any) => {
        setPage(event.selected + 1);
    }

    return (
        <div className="mx-72 mt-20 pb-12">
            {isLoading2 ? (
                <div>Loading...</div>
                ) : error2 ? (
                <div>Error loading categories</div>
                ) : (
                    <BlogList blogs={data1}/>
                )}
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={Math.ceil(data2?.length/limit)}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
            />
        </div>
    )
}

export default Blog;