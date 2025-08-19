import Link from 'next/link';
import styles from './header.module.css';
import Logo from './logo';
import ProfileButton from './profileButton';
import { useEffect, useRef, useState } from 'react';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const menuButtonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseIsOutside = (e: MouseEvent) => {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(e.target as Node) &&
                menuButtonRef.current &&
                !menuButtonRef.current.contains(e.target as Node)
            ) {
                setIsMenuOpen(false)
            }
        }

        document.addEventListener('mousedown', handleMouseIsOutside);

        return () => {
            document.removeEventListener('mousedown', handleMouseIsOutside)
        }
    })
    return (
        <header className={styles.header}>
            <div
                ref={menuButtonRef}
                className={[styles.menu_button, isMenuOpen ? styles.open : ''].join(' ')}
                onClick={() => setIsMenuOpen((prevVal) => !prevVal)}
            >
                <img
                    src={isMenuOpen ? "/header/close_menu_button.svg" : "/header/menu_button.svg"}
                    alt="menu toggle"
                    className={styles.menu_icon}
                />
            </div>
            <div className={[styles.sidebar_container, isMenuOpen ? styles.open : ''].join(' ')} ref={sidebarRef}>
                
            </div>
        </header>
    );
}


/*
<nav>
    <ul className='pr-5 flex flex-row justify-end gap-2'>
        <li><Link href={"/"}>Homepage</Link></li>
        <li><Link href={"/movies"}>Movies</Link></li>
        <li><Link href={"/about-us"}>about-us</Link></li>
    </ul>
</nav>
*/