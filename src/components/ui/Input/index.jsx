export default function Input({ type = "text", className = "", ...props }) {
    return (
        <input
            type={type}
            className={`h-10 w-full rounded-md border px-3 py-2 text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
            {...props}
        />
    );
}
