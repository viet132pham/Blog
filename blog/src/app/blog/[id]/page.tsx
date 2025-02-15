'use client'
import { BASE_URL } from "@/contains/config";
import Link from "next/link";
import useSWR from "swr";

const ContentPage = ({ params }: { params: { id: string } }) => {
  const fetcher = (url: any) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    `${BASE_URL}/blogs/${params.id}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading the content.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="block bg-white rounded-md shadow-md p-4 m-4 hover:shadow-lg transition duration-300">
        <h2 className="text-xl font-semibold mb-2">{data.title}</h2>
        <p className="text-gray-600 mb-4">Author: {data.author}</p>
        <div className="mb-4">{data.content}</div>
      </div>
      <Link href="/blog" className="text-blue-500 hover:underline cursor-pointer inline-block mb-4">
        Back
      </Link>
    </div>
  );
};

export default ContentPage;
