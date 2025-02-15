import { BASE_URL } from '@/contains/config';
import { useEffect, useState } from 'react';
import { mutate } from "swr";
import useSWR from "swr";

const Modal = (props: ModalProps) => {
    const { show, onHide, isUpdate, blog, setBlog } = props;
    const [category, setCategory] = useState<string[]>([]);
    const user = localStorage.getItem('user');
    const author = typeof user === 'string' ? user : '';
    const [formData, setFormData] = useState({
        id: 0,
        title: '',
        author: author,
        content: ''
    });

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

    useEffect(() => {
        if (isUpdate && blog && blog.id) {
            setCategory([...blog?.category ?? []]); 

            setFormData({
            id: blog.id,
            title: blog.title,
            author: author,
            content: blog.content
        });
        }
    }, [blog])

    const resetForm = () => {
        setFormData({
            id: 0,
            title: '',
            author: author,
            content: ''
        });
        setCategory([]);
        setBlog(null);
    };
    const getSelectValues = (select: any) => {
        var result = [];
        var options = select && select.options;
        var opt;
      
        for (var i=0, iLen=options.length; i<iLen; i++) {
          opt = options[i];
      
          if (opt.selected) {
            result.push(opt.value || opt.text);
          }
        }
        return result;
      }

    const handleSave = () => {
        if(!formData.title || !formData.content || !formData.author) {
            return;
        }
        if(isUpdate) {
            fetch(`${BASE_URL}/blogs/${formData.id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...formData, category })
            }).then(res => res.json())
            .then(res => {
                mutate(`${BASE_URL}/blogs`);
            });
        } else {
            fetch(`${BASE_URL}/blogs`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...formData, category })
            }).then(res => res.json())
            .then(res => {
                mutate(`${BASE_URL}/blogs`);
            });
        }
        
        onHide();
        resetForm();
    };

    return (
        <>
            {show && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
                    <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                        <div className="modal-content py-4 text-left px-6">
                            <h2 className="text-xl font-semibold mb-4">Add Blog</h2>
                            <div className="mb-4">
                                <label htmlFor="title" className="block text-gray-600 font-bold mb-2">Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    className="block w-full border rounded py-2 px-3"
                                    value={formData.title}
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="author" className="block text-gray-600 font-bold mb-2">Author</label>
                                <input
                                    type="text"
                                    id="author"
                                    className="block w-full border rounded py-2 px-3"
                                    value={formData.author}
                                    disabled
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="content" className="block text-gray-600 font-bold mb-2">Content</label>
                                <textarea
                                    id="content"
                                    className="block w-full border rounded py-2 px-3"
                                    rows={4}
                                    value={formData.content}
                                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                                ></textarea>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="category" className="block text-gray-600 font-bold mb-2">Category</label>
                                <select
                                    id="category"
                                    className="block w-full border rounded py-2 px-3"
                                    value={category}
                                    onChange={(e) => {setCategory(getSelectValues(e.target))}}
                                    multiple
                                >
                                    {
                                        data?.map((item: any, index: any) =>(
                                            <option key={index} value={item.name}>{item.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer py-4 px-6 flex justify-end">
                            <button
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full mr-2"
                                onClick={() => {
                                    onHide();
                                    resetForm();
                                }}
                            >
                                Close
                            </button>
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                                onClick={handleSave}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
