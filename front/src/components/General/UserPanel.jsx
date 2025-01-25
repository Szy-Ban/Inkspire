'use client';

import { useRouter, usePathname } from 'next/navigation';

export default function UserPanel() {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <div className="w-full md:w-1/4 bg-white p-6 shadow">
            <h2 className="text-lg font-semibold mb-6">User Panel</h2>
            <ul className="space-y-4">
                <li>
                    <button
                        className={`w-full text-left px-4 py-2 rounded ${
                            pathname === '/profile' ? 'bg-primaryBlue text-white' : 'hover:bg-gray-100'
                        }`}
                        onClick={() => router.push('/profile')}
                    >
                        Profile
                    </button>
                </li>
                <li>
                    <button
                        className={`w-full text-left px-4 py-2 rounded ${
                            pathname === '/profile/addresses' ? 'bg-primaryBlue text-white' : 'hover:bg-gray-100'
                        }`}
                        onClick={() => router.push('/profile/addresses')}
                    >
                        Addresses
                    </button>
                </li>
                <li>
                    <button
                        className={`w-full text-left px-4 py-2 rounded ${
                            pathname === '/profile/orders' ? 'bg-primaryBlue text-white' : 'hover:bg-gray-100'
                        }`}
                        onClick={() => router.push('/profile/orders')}
                    >
                        Orders
                    </button>
                </li>
            </ul>
        </div>
    );
}
