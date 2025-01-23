import { FaGithub, FaLinkedin, FaCode } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-darkBlue text-white py-8 px-6 border-t-4 border-goldAccent">
            <div className="container mx-auto flex flex-col md:flex-row justify-between space-y-6 md:space-y-0">

                <div className="flex flex-col space-y-4 w-1/3 md:justify-center">
                    <h1 className="font-primary text-4xl">Inkspire</h1>
                    <p className="text-sm text-gray-200">
                        Your go-to platform for books that inspire, entertain, and educate.
                    </p>
                </div>

                <div className="flex flex-col space-y-2 w-1/3 md:items-center">
                    <h2 className="font-secondary text-lg font-bold">Quick Links</h2>
                    <ul className="space-y-1">
                        <li><a href="/todo" className="hover:underline">TODO</a></li>
                        <li><a href="/todo" className="hover:underline">TODO</a></li>
                        <li><a href="/todo" className="hover:underline">TODO</a></li>
                        <li><a href="/todo" className="hover:underline">TODO</a></li>
                    </ul>
                </div>

                <div className="flex flex-col space-y-4 w-1/3 md:items-center md:justify-center">
                    <h2 className="font-secondary text-lg font-bold">Connect with me!</h2>
                    <div className="flex space-x-6 md:justify-center">
                        <a
                            href="https://github.com/szy-ban"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-gray-400 transition-colors"
                        >
                            <FaGithub className="w-6 h-6" />
                        </a>
                        <a
                            href="https://linkedin.com/in/szymon-baniewicz"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-gray-400 transition-colors"
                        >
                            <FaLinkedin className="w-6 h-6" />
                        </a>
                        <a
                            href="https://github.com/Szy-Ban/Specka-project"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-gray-400 transition-colors"
                        >
                            <FaCode className="w-6 h-6" />
                        </a>
                    </div>
                </div>
            </div>

            <div className="mt-8 border-t border-goldAccent pt-4 text-center text-sm text-gray-300">
                © {new Date().getFullYear()} Inkspire. All rights reserved.
            </div>
        </footer>
    );
}
