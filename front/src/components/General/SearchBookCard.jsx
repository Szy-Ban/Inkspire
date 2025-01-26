'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/General/Button';

export default function SearchBookCard({ book }) {
    const router = useRouter();

    const handleViewDetails = () => {
        router.push(`/book/${book._id}`);
    };

    return (
        <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <img
                src={book.images[0]}
                alt={book.title}
                className="w-40 h-60 object-cover mb-3 rounded"
            />
            <h3 className="text-md font-bold text-center">{book.title}</h3>
            <p className="text-sm text-gray-600 text-center mb-1">{book.author}</p>
            <p className="text-sm text-gray-500 text-center mb-2">
                Category: <span className="font-semibold">{book.categoryId?.name || 'Unknown'}</span>
            </p>
            <p className="text-lg font-semibold text-gray-800 text-center mb-4">${book.price.toFixed(2)}</p>
            <Button variant="primary" size="small" onClick={handleViewDetails}>
                View Details
            </Button>
        </div>
    );
}
