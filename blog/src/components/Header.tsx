'use client';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/authContext';
import Link from 'next/link';
const Header = () => {
    const router = useRouter();

    const { isAuthenticated, setIsAuthenticated } = useAuth();

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
        setIsAuthenticated(false);
        router.push('/login');
    }

    return (
        <div className="bg-blue-500 p-4 text-white flex justify-between ml-64 fixed w-[calc(100%_-_256px)] top-0">
            <span className="ml-4">My Blog</span>
            <div>
                <Link href="/blog" className="text-white hover:text-blue-200 cursor-pointer pl-4">Blog Page</Link>
                <a
                    className="text-white hover:text-blue-200 cursor-pointer mr-16 pl-4"
                    onClick={handleLogout}
                >
                    Log out
                </a>
            </div>
        </div>
    )
}

export default Header;