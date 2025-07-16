import Skeleton from "react-loading-skeleton";
import styles from './header.module.css';
import { useEffect, useRef, useState } from "react";

export default function ProfileButton() {
    const [isOptionsHidden, setOptionsShown] = useState(true)

    const showProfileOptions = () => {
        setOptionsShown(false);
    }
    const logout = () => {
        const resp = fetch("/api/logout").then(resp => {
            return resp.json();
        }).then(data => {
            console.log(data);
            setOptionsShown(true);
        }).catch(err => {
            console.log(err);
        })
    }

    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (
                !isOptionsHidden &&
                containerRef.current &&
                !containerRef.current.contains(event.target)
            ) {
                setOptionsShown(true);
            }
        };

        document.addEventListener("click", handleClickOutside);
        document.addEventListener("scroll", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside);
            document.removeEventListener("scroll", handleClickOutside, true);
        };
    }, [isOptionsHidden]);

    return (
        <div ref={containerRef} className={styles.profile_button_container}>
            <div onClick={showProfileOptions}>
                <Skeleton circle={true} width={50} height={50} baseColor="#333333" highlightColor="#555555">

                </Skeleton>
            </div>

            <div hidden={isOptionsHidden} className={styles.profile_options_container}>
                <div>Settings</div>
                <div onClick={logout}>Logout</div>
            </div>
        </div>
    );
}