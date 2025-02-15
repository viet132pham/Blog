'use client'
import { useState } from 'react';
import { mutate } from "swr";
import ModalCategory from "@/components/ModalCategory";
import useSWR from "swr";
import { BASE_URL } from '@/contains/config';

const Card = (props: ICategoryProps) => {
    const { categories } = props;
    const [showModal, setShowModal] = useState(false);
    const [category, setCategory] = useState<ICategory | null>(null);

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

    const handleDelete = async (id: number, name: string) => {
        if (confirm(`Do you want to delete this category id = ${id}`)) {
            await fetch(`${BASE_URL}/categories/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
            }).then(res => res.json())
                .then(res => {
                    mutate(`${BASE_URL}/categories`);
                });
            data.forEach((item:any) => {
                if (item.category.includes(name)) {
                    const filteredItems = item.category.filter((item: any) => item !== name)
                    fetch(`${BASE_URL}/blogs/${item.id}`, {
                        method: 'PUT',
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({...item, category: filteredItems})
                    }).then(res => res.json())
                    .then(res => {
                        mutate(`${BASE_URL}/blogs`);
                    });
                }
            });
        }
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((item, index) => (
                <div key={item.id} className="bg-white shadow-md rounded-lg p-4 m-4">
                    <img src={item.image} alt={item.image} className="w-full h-40 object-cover rounded-md mb-4" />
                    <div className="flex justify-between">
                        <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
                        <div className="">
                            <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => {
                                        setCategory(item);
                                        handleShowModal();
                                    }}>Edit</button>
                            <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 mt-2 ml-2" onClick={() => handleDelete(item.id, item.name)}>Delete</button>
                        </div>
                    </div>
                </div>
            ))}
            </div>
            <ModalCategory show={showModal} onHide={handleCloseModal} isUpdate={true} category={category} setCategory={setCategory}/>
        </>
    );
}

export default Card;
