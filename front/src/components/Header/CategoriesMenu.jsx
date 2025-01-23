export default function CategoriesMenu() {
    const categories = [
        "Gift Cards",
        "Special Offers",
        "New Books",
        "Refer A Friend",
        "Best Sellers",
        "Fiction",
        "Nonfiction",
        "YA",
        "Kids",
        "Games & Puzzles",
    ];

    return (
        <nav className="bg-white border-t-2 border-gray-300">
            <ul className="flex justify-center space-x-8 py-3 text-primaryBlue font-secondary text-lg">
                {categories.map((category, index) => (
                    <li
                        key={index}
                        className="hover:underline hover:text-secondaryBlue cursor-pointer transition-all duration-300"
                    >
                        {category}
                    </li>
                ))}
            </ul>
        </nav>
    );
}
