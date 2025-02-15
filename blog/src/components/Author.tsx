'use client'

import useSWR from "swr";
import { useRouter } from 'next/navigation';
import { BASE_URL } from "@/contains/config";

const Author = () => {
    const router = useRouter();

    const fetcher = (url: any) => fetch(url).then((res) => res.json());

    const { data, error, isLoading } = useSWR(
        `${BASE_URL}/blogs`,
        fetcher,
        {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        }
    );

    const handleAuthorList = () => {
        const authors:string[] = [];
        data.forEach((item:any) => {
            if (!authors?.includes(item.author)) {
              authors?.push(item.author);
            }
        });
        return authors;
    }

    const handleAuthor = (author: string) => {
        router.push(`/blog/sort?type=author&name=${author}`);
    }

    return (
        <div className="sidebar bg-gray-50 w-full p-4 h-fit">
            <h2 className="sidebar-title text-xl font-semibold mb-4">Authors</h2>
            <ul className="author-list">
                {isLoading ? (
                <div>Loading...</div>
                ) : error ? (
                <div>Error loading authors</div>
                ) : (
                    handleAuthorList()?.map((item: any) => (
                    <li key={item.id} className="author-item">
                    <a
                        onClick={() => handleAuthor(item)}
                        className="author-link text-blue-500 hover:text-blue-700 transition duration-300 cursor-pointer"
                    >
                        {item}
                    </a>
                    </li>
                ))
                )}
            </ul>
        </div>
    );
};

export default Author;
