import Link from 'next/link';
import styles from './header.module.css';
import Logo from './logo';
import ProfileButton from './profileButton';

export default function Header() {
    return (
        <header className={styles.header}>
            <img src="/header/menu_button.svg" alt="Menu button." />
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