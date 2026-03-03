import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="flex justify-between items-center">
            <Link href="/">Home</Link>

            <div className="flex gap-6 items-center">
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/login">Login</Link>
            </div>
        </nav>
    )
}