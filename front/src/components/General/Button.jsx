export default function Button({ variant = "primary", size = "medium", children, ...props }) {

    const baseStyles = "font-medium rounded-button focus:outline-none transition-all duration-300";
    const variants = {
        primary: "bg-gradient-to-r from-primaryBlue to-secondaryBlue text-white hover:opacity-90",
        secondary: "bg-transparent text-primaryBlue border border-primaryBlue hover:bg-primaryBlue hover:text-white",
    };
    const sizes = {
        small: "py-2 px-4 text-sm",
        medium: "py-3 px-6 text-md",
        large: "py-4 px-8 text-lg",
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]}`}
            {...props}
        >
            {children}
        </button>
    );
}
