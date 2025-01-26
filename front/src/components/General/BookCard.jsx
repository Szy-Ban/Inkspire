'use client';

import Button from '@/components/General/Button';

export default function BookCard({ book }) {
    return (
        <div className="flex flex-col items-center p-3 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <img
                src={book.images[0]}
                alt={book.title}
                className="w-40 h-60 object-cover mb-3 rounded"
            />
            <h3 className="text-md font-bold text-center">{book.title}</h3>
            <p className="text-sm text-gray-600 text-center mb-2">{book.author}</p>
            <Button variant="primary" size="small">
                View Details
            </Button>
        </div>
    );
}
