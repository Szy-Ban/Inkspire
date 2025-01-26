export default function Button({ variant = "primary", size = "medium", children, disabled, ...props }) {
    const baseStyles = "font-medium rounded focus:outline-none transition-opacity duration-300";
    const variants = {
        primary: "bg-gradient-to-b from-primaryBlue to-secondaryBlue text-white hover:opacity-90 shadow",
        secondary: "bg-transparent text-primaryBlue border border-primaryBlue hover:bg-primaryBlue hover:text-white",
        secondaryRev: "bg-primaryBlue text-white border border-primaryBlue hover:bg-transparent hover:text-primaryBlue",
        danger: "bg-red-600 text-white hover:bg-red-700 shadow",
        submit: "w-full bg-gradient-to-b from-primaryBlue to-secondaryBlue text-white py-3 px-6 rounded shadow hover:opacity-90 transition-opacity",
    };
    const sizes = {
        small: "py-2 px-4 text-sm",
        medium: "py-3 px-6 text-md",
        large: "py-4 px-8 text-lg",
    };

    const isSubmitVariant = variant === "submit";

    return (
        <button
            type={isSubmitVariant ? "submit" : props.type || "button"}
            disabled={disabled}
            className={`${baseStyles} ${variants[variant]} ${!isSubmitVariant && sizes[size]} ${
                disabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            {...props}
        >
            {children}
        </button>
    );
}
