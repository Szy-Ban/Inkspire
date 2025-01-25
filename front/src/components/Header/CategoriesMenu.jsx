export default function CategoriesMenu() {
    const categories = [
        'Gift Cards',
        'Special Offers',
        'New Books',
        'Refer A Friend',
        'Best Sellers',
        'Fiction',
        'Nonfiction',
        'YA',
        'Kids',
        'Games & Puzzles',
    ];

    return (
        <nav className="bg-white">
            <ul className="flex flex-wrap justify-center border-t border-gray-300 py-4">
                {categories.map((category, index) => (
                    <li
                        key={index}
                        className="px-4 py-2 text-primaryBlue font-secondary text-lg lg:text-xl hover:underline hover:text-secondaryBlue cursor-pointer border-gray-300 lg:border-r lg:last:border-none"
                    >
                        {category}
                    </li>
                ))}
            </ul>
        </nav>
    );
}
