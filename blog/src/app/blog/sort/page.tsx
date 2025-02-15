'use client';

import BlogList from "@/components/BlogList";
import useSWR from "swr";
import ReactPaginate from 'react-paginate';
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import { BASE_URL } from "@/contains/config";

const Sort = () => {
    const searchParams = useSearchParams();

    const type = searchParams.get('type');
    const name = searchParams.get('name');
    
    const limit = 2;
    const initState = 1;
    const [page, setPage] = useState(initState);

    const fetcher = (url: string) => fetch(url)
    .then((res) => res.json());

    const {data: data2, error: error2, isLoading: isLoading2} = useSWR(
        `${BASE_URL}/blogs?${type}_like=${name}`,
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

    useEffect(() => {
        setPage(1);
    }, [name]); 

    const paginateData = () => {
        const startIndex = (page - 1) * limit;
        const pageData = data2?.slice(startIndex, startIndex + limit);
        return pageData;
    }

    return (
        <div className="mx-72 mt-20">
            {isLoading2 ? (
                <div>Loading...</div>
                ) : error2 ? (
                <div>Error loading ...</div>
                ) : (
                    <BlogList blogs={paginateData()}/>
                )}
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                onClick={handlePageClick}
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

export default Sort;