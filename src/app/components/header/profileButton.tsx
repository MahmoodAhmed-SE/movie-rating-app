import Skeleton from "react-loading-skeleton";
import styles from './header.module.css';
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfileButton() {
    const router = useRouter();
    const [isOptionsShown, setOptionsShown] = useState(true)
    const showProfileOptions = () => {
        setOptionsShown(!isOptionsShown);
    }
    const logout = () => {
        const resp = fetch("/api/logout").then(resp => {
            return resp.json();
        }).then(data => {
            console.log(data);
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div className={styles.profile_button_container}>
            <div onClick={showProfileOptions}>
                <Skeleton circle={true} width={50} height={50} baseColor="#333333" highlightColor="#555555">

                </Skeleton>
            </div>

            <div hidden={isOptionsShown} className={styles.profile_options_container}>
                <div>Settings</div>
                <div onClick={logout}>Logout</div>
            </div>
        </div>
    );
}