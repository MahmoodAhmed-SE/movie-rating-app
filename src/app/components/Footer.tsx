export default function Footer() {
    return (
        <footer className="flex justify-center items-center p-2 text-white bg-gray-800">
            &copy; {new Date().getFullYear()} All rights reserved.
        </footer>
    );
}