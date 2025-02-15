'use client'
import Modal from "@/components/Modal";
import { BASE_URL } from "@/contains/config";
import { useState } from 'react';
import { mutate } from "swr";
import useSWR from "swr";

const Table = (props: IProps) => {
    const { blogs } = props;
    const [showModal, setShowModal] = useState(false);
    const [blog, setBlog] = useState<IBlog | null>(null);

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

    const handleDelete = (id: number) => {
        if (confirm(`Do you want to delete this blog id = ${id}`)) {
            fetch(`${BASE_URL}/blogs/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
            }).then(res => res.json())
                .then(res => {
                    mutate(`${BASE_URL}/blogs`);
                });
        }
    };

    return (
        <>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th className="text-center px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">STT</th>
                            <th className="text-center px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="text-center px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Author</th>
                            <th className="text-center px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Content</th>
                            <th className="text-center px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="text-center px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {blogs.map((item, index) => (
                            <tr key={item.id}>
                                <td className="px-6 py-4 whitespace-no-wrap">{index + 1}</td>
                                <td className="px-6 py-4 whitespace-no-wrap">{item.title}</td>
                                <td className="px-6 py-4 whitespace-no-wrap">{item.author}</td>
                                <td className="px-6 py-4 whitespace-no-wrap">{item.content}</td>
                                <td className="px-6 py-4 whitespace-no-wrap w-1/5">
                                    {item.category?.map((category: string, index: number) => (
                                        <div key={index} className="bg-blue-100 text-blue-800 font-semibold rounded-full px-3 py-1 m-1 w-max inline-block">
                                            {category}
                                        </div>
                                    ))}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap">
                                    <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 w-full" onClick={() => {
                                        setBlog(item);
                                        handleShowModal();
                                    }}>Update</button>
                                    <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 w-full mt-2" onClick={() => handleDelete(item.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Modal show={showModal} onHide={handleCloseModal} isUpdate={true} blog={blog} setBlog={setBlog} />
        </>
    );
}

export default Table;