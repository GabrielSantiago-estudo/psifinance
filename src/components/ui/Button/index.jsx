export function Button({ children, className = "", ...props }) {
    return (
        <button
            className={
                `px-4 py-2 rounded-lg text-sm font-medium transition
         bg-blue-600 text-white hover:bg-blue-700
         focus:outline-none focus:ring-2 focus:ring-blue-400
         disabled:opacity-50 disabled:pointer-events-none
         ${className}`
            }
            {...props}
        >
            {children}
        </button>
    );
}
