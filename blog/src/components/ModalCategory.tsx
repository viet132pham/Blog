import { BASE_URL } from '@/contains/config';
import { useEffect, useState } from 'react';
import { mutate } from "swr";

const Modal = (props: ModalCategoryProps) => {
    const { show, onHide, isUpdate, category, setCategory } = props;
    const [id, setId] = useState<number>(0);
    const [name, setName] = useState<string>('');
    const [image, setImage] = useState<string>('');

    useEffect(() => {
        if (isUpdate && category && category.id) {
            setId(category.id);
            setName(category.name);
            setImage(category.image);  
        }
    }, [category])

    const resetForm = () => {
        setName('');
        setImage('');
        setCategory(null);
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
        if(!name) {
            return;
        }
        if(isUpdate) {
            fetch(`${BASE_URL}/categories/${id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name, image})
            }).then(res => res.json())
            .then(res => {
                mutate(`${BASE_URL}/categories`);
            });
        } else {
            fetch(`${BASE_URL}/categories`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, image})
            }).then(res => res.json())
            .then(res => {
                mutate(`${BASE_URL}/categories`);
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
                            <h2 className="text-xl font-semibold mb-4">Add Category</h2>
                            <div className="mb-4">
                                <label htmlFor="title" className="block text-gray-600 font-bold mb-2">Name</label>
                                <input
                                    type="text"
                                    id="title"
                                    className="block w-full border rounded py-2 px-3"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="author" className="block text-gray-600 font-bold mb-2">Image</label>
                                <input
                                    type="text"
                                    id="image"
                                    className="block w-full border rounded py-2 px-3"
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                />
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
