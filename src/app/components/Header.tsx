import { app } from '@/config/app'
import Link from 'next/link';

export default function Header() {
    return (
        <header className='text-white items-center bg-gray-800 h-13 shadow-md p-4 sticky top-0 w-full flex flex-row justify-between'>
            <div>
                <h1><Link href={"/"}>{app.name}</Link></h1>
            </div>
            <nav>
                <ul className='pr-5 flex flex-row justify-end gap-2'>
                    <li><Link href={"/"}>Homepage</Link></li>
                    <li><Link href={"/movies"}>Movies</Link></li>
                    <li><Link href={"/about-us"}>about-us</Link></li>
                </ul>
            </nav>
        </header>
    );
} 