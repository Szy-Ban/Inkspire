import Logo from '@/components/Header/Logo';
import SearchBar from '@/components/Header/SearchBar';
import CartIcon from '@/components/Header/CartIcon';
import CategoriesMenu from '@/components/Header/CategoriesMenu';
import UserMenu from '@/components/Header/UserMenu';

export default function Header() {
    return (
        <div className="relative">

            <div className="absolute top-0 left-0 w-full h-[180px] z-0 overflow-hidden">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320"
                    className="w-full h-full"
                    preserveAspectRatio="none"
                >
                    <path
                        fill="#1B1F3B"
                        fillOpacity="1"
                        d="M0,80L120,96C240,112,480,160,720,144C960,128,1200,80,1320,64L1440,48L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"
                    ></path>
                </svg>
            </div>

            <header className="relative z-10 flex flex-row items-center justify-between px-6 pt-16 pb-6">
                <Logo />
                <SearchBar />
                <div className="flex flex-row items-center space-x-8">
                    <CartIcon />
                    <UserMenu />
                </div>
            </header>

            <CategoriesMenu />
        </div>
    );
}
