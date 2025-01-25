import Link from "next/link";

export default function Logo() {
    return (
        <div className="p-2">
            <Link href={'/'}>
                <h1 className="font-primary text-4xl sm:text-6xl lg:text-7xl text-primaryBlue">
                    Inkspire
                </h1>
            </Link>
        </div>
    );
}
