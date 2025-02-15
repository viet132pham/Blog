'use client';

import useSWR from "swr";
import Card from "@/components/Card";
import ModalCategory from "@/components/ModalCategory";
import { useState } from 'react';
import ProtectedRoute from "@/helper/protectedRoute";
import {BASE_URL} from "@/contains/config";

const Category = () => {
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
        `${BASE_URL}/categories`, 
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
                    <span className="text-xl">Categories</span>
                    <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 mr-[22px]" onClick={handleShowModal}>Add category</button>
                </div>
                <Card categories={data?.sort((a: any, b:any) => b.id - a.id)}/>
                <ModalCategory show={showModal} onHide={handleCloseModal} isUpdate={false} category={null} setCategory={()=>null}/>
            </div>
        </ProtectedRoute>
    )
}

export default Category;