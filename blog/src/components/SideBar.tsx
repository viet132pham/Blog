import Link from "next/link";
const SideBar = () => {
    return (
        <div className="bg-gray-800 text-white w-64 p-4 h-full fixed top-0">
            <h2 className="text-2xl font-semibold mb-4">Sidebar</h2>
            <ul>
                <li className="mb-2">
                <Link
                    href="/admin/blog"
                    className="block text-blue-200 hover:text-white transition"
                >
                    Blog
                </Link>
                </li>
                <li className="mb-2">
                <Link
                    href="/admin/category"
                    className="block text-blue-200 hover:text-white transition"
                >
                    Categories
                </Link>
                </li>
                <li className="mb-2">
                <Link
                    href="#"
                    className="block text-blue-200 hover:text-white transition"
                >
                    Settings
                </Link>
                </li>
            </ul>
        </div>
    )
}

export default SideBar;