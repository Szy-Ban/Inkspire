'use client';

import Logo from '@/components/Header/Logo';
import SearchBar from '@/components/Header/SearchBar';
import CartIcon from '@/components/Header/CartIcon';
import CategoriesMenu from '@/components/Header/CategoriesMenu';
import UserMenu from '@/components/Header/UserMenu';
import { FaBars } from "react-icons/fa";
import { useState } from 'react';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="relative bg-white shadow-md">
            <div className="container mx-auto flex flex-wrap items-center justify-between px-4 py-4">
                <Logo />
                    <div className="hidden w-[40%] lg:block">
                        <SearchBar />
                    </div>
                <div className="flex items-center space-x-8">
                    <CartIcon />
                    <UserMenu />
                </div>
                    <button
                        className="lg:hidden text-primaryBlue focus:outline-none"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <FaBars className="w-8 h-8" />
                    </button>
            </div>
            {isMenuOpen && (
                <div className="lg:hidden bg-white border-t border-gray-200">
                    <CategoriesMenu />
                </div>
            )}
            <div className="hidden lg:block">
                <CategoriesMenu />
            </div>
        </header>
    );
}
