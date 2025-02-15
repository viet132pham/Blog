'use client';

import useSWR from "swr";
import Table from "@/components/Table";
import Modal from "@/components/Modal";
import { useState } from 'react';
import ProtectedRoute from "@/helper/protectedRoute";
import {BASE_URL} from "@/contains/config";

const Blog = () => {
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
      };
    
    const handleCloseModal = () => {
        setShowModal(false);
    };

    const fetcher = (url: string) => fetch(url)
    .then((res) => res.json());

    const {data, error, isLoading} = useSWR(
        `${BASE_URL}/blogs`, 
        fetcher, 
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
        );

    if(isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <ProtectedRoute>
            <div className="ml-72 mt-20 mr-10">
                <div className="flex justify-between mb-6">
                    <span className="text-xl">Blog</span>
                    <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 mr-[22px]" onClick={handleShowModal}>Add blog</button>
                </div>
                <Table blogs={data?.sort((a: any, b:any) => b.id - a.id)}/>
                <Modal show={showModal} onHide={handleCloseModal} isUpdate={false} blog={null} setBlog={()=>null}/>
            </div>
        </ProtectedRoute>
    )
}

export default Blog;