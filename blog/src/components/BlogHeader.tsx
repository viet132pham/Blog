import Link from "next/link";

const BlogHeader = () => {
    return (
        <div className="bg-blue-500 p-4 text-white">
            <div className="bg-blue-500 py-2 px-4 container mx-auto flex items-center justify-between">
                <div className="text-xl font-semibold">
                    <Link href="/blog">Home</Link>
                </div>
                <ul className="space-x-4 flex">
                    <li>
                        <Link href="/admin/blog">Admin Page</Link>
                    </li>
                    <li>
                        <Link href="/blog">Blog Page</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default BlogHeader;
