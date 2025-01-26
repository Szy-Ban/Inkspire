'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import SearchBookCard from "@/components/General/SearchBookCard";

export default function SearchResults() {
    const [books, setBooks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const searchParams = useSearchParams();
    const router = useRouter();

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedAuthors, setSelectedAuthors] = useState([]);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [categoriesExpanded, setCategoriesExpanded] = useState(false);
    const [authorsExpanded, setAuthorsExpanded] = useState(false);


    const fetchBooks = async () => {
        const queryParams = new URLSearchParams();

        const title = searchParams.get('title');
        const categoriesParam = searchParams.get('categories');
        const authorsParam = searchParams.get('authors');
        const minPriceParam = searchParams.get('minPrice');
        const maxPriceParam = searchParams.get('maxPrice');

        if (title) queryParams.append('title', title);
        if (categoriesParam) queryParams.append('categories', categoriesParam);
        if (authorsParam) queryParams.append('authors', authorsParam);
        if (minPriceParam) queryParams.append('minPrice', minPriceParam);
        if (maxPriceParam) queryParams.append('maxPrice', maxPriceParam);

        const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
        try {
            const response = await fetch(`http://localhost:5000/api/books/search${queryString}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            setBooks(data);
            setError(null);
        } catch (err) {
            setError('Books not found or failed to fetch books. Please try again.');
            setBooks([]);
        } finally {
            setLoading(false);
        }
    };


    const fetchFilters = async () => {
        try {
            const [categoriesResponse, authorsResponse] = await Promise.all([
                fetch('http://localhost:5000/api/categories'),
                fetch('http://localhost:5000/api/books/authors'),
            ]);

            if (categoriesResponse.ok && authorsResponse.ok) {
                const categoriesData = await categoriesResponse.json();
                const authorsData = await authorsResponse.json();
                setCategories(categoriesData);
                setAuthors(authorsData);
            } else {
                throw new Error('Failed to fetch filters.');
            }
        } catch (err) {
            setError('Failed to fetch filters.');
        }
    };

    // selectedCategory -> params
    useEffect(() => {
        const categoriesParam = searchParams.get('categories');
        if (categoriesParam) {
            setSelectedCategories(categoriesParam.split(','));
        } else {
            setSelectedCategories([]);
        }
    }, [searchParams]);

    // url -> seleted category
    useEffect(() => {
        const queryParams = new URLSearchParams(searchParams.toString());
        if (selectedCategories.length > 0) {
            queryParams.set('categories', selectedCategories.join(','));
        } else {
            queryParams.delete('categories');
        }
        router.push(`/search?${queryParams.toString()}`);
    }, [selectedCategories, searchParams, router]);

    useEffect(() => {
        fetchFilters();
    }, []);

    useEffect(() => {
        fetchBooks();
    }, [selectedCategories, selectedAuthors, minPrice, maxPrice, searchParams]);

    const handleCategoryChange = (categoryId) => {
        setSelectedCategories((prev) =>
            prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
        );
    };

    const handleAuthorChange = (authorName) => {
        setSelectedAuthors((prev) =>
            prev.includes(authorName) ? prev.filter((name) => name !== authorName) : [...prev, authorName]
        );
    };

    const generateFilterSummary = () => {
        const title = searchParams.get('title') || null;
        const filters = [];

        if (title) filters.push(
            <span key="title">Title: <strong>&#34;{title}&#34;</strong></span>
        );
        if (selectedCategories.length > 0) {
            const selectedCategoryNames = categories
                .filter((category) => selectedCategories.includes(category._id))
                .map((category) => category.name)
                .join(', ');
            filters.push(
                <span key="categories">Categories: <strong>{selectedCategoryNames}</strong></span>
            );
        }
        if (selectedAuthors.length > 0) {
            const selectedAuthorNames = selectedAuthors.join(', ');
            filters.push(
                <span key="authors">Authors: <strong>{selectedAuthorNames}</strong></span>
            );
        }
        if (minPrice || maxPrice) {
            const priceRange = `${minPrice || '0'} - ${maxPrice || '∞'}`;
            filters.push(
                <span key="price">Price: <strong>{priceRange}</strong></span>
            );
        }

        return filters.length > 0 ? filters : 'Book Catalog';
    };

    return (
        <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">

            <aside className="md:w-1/4 bg-white p-4 shadow-md">
                <h2 className="text-lg font-bold mb-4">Filters</h2>

                <div className="mb-6">
                    <h3 className="font-semibold mb-2">Price</h3>
                    <div className="flex space-x-2">
                        <input
                            type="number"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            placeholder="Min"
                            className="w-1/2 border rounded px-2 py-1"
                        />
                        <input
                            type="number"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            placeholder="Max"
                            className="w-1/2 border rounded px-2 py-1"
                        />
                    </div>
                </div>

                <div className="mb-6">
                    <h3
                        className="font-semibold mb-2 cursor-pointer"
                        onClick={() => setCategoriesExpanded(!categoriesExpanded)}
                    >
                        Categories {categoriesExpanded ? '-' : '+'}
                    </h3>
                    {categoriesExpanded && (
                        <ul>
                            {categories.map((category) => (
                                <li key={category._id} className="mb-2">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={selectedCategories.includes(category._id)}
                                            onChange={() => handleCategoryChange(category._id)}
                                            className="mr-2"
                                        />
                                        {category.name}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="mb-6">
                    <h3
                        className="font-semibold mb-2 cursor-pointer"
                        onClick={() => setAuthorsExpanded(!authorsExpanded)}
                    >
                        Authors {authorsExpanded ? '-' : '+'}
                    </h3>
                    {authorsExpanded && (
                        <ul>
                            {authors.map((author, index) => (
                                <li key={index} className="mb-2">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={selectedAuthors.includes(author)}
                                            onChange={() => handleAuthorChange(author)}
                                            className="mr-2"
                                        />
                                        {author}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </aside>

            <main className="md:w-3/4 p-6">
                <h1 className="text-2xl font-bold mb-6">
                    {Array.isArray(generateFilterSummary())
                        ? generateFilterSummary().map((filter, index) => (
                            <div key={index} className="mb-1">
                                {filter}
                            </div>
                        ))
                        : generateFilterSummary()}
                </h1>
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {!loading && !error && books.length === 0 && <p>No books found.</p>}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {books.map((book) => (
                        <SearchBookCard key={book._id} book={book} />
                    ))}
                </div>
            </main>
        </div>
    );
}
