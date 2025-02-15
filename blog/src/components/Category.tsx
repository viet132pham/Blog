'use client'

import useSWR from "swr";
import { useRouter } from 'next/navigation';
import { BASE_URL } from "@/contains/config";

const Category = () => {

  const router = useRouter();
  const fetcher = (url: any) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    `${BASE_URL}/categories`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const handleCategory = (category: string) => {
    router.push(`/blog/sort?type=category&name=${category}`);
  }


  return (
    <div className="sidebar bg-gray-50 w-full p-4 h-fit">
        <h2 className="sidebar-title text-xl font-semibold mb-4">Categories</h2>
        <ul className="category-list">
            {isLoading ? (
            <div>Loading...</div>
            ) : error ? (
            <div>Error loading categories</div>
            ) : (
            data?.map((item: any) => (
                <li key={item.id} className="category-item">
                <a
                    onClick={() => handleCategory(item.name)}
                    className="category-link text-blue-500 hover:text-blue-700 transition duration-300 cursor-pointer"
                >
                    {item.name}
                </a>
                </li>
            ))
            )}
        </ul>
    </div>
  );
};

export default Category;
