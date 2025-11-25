export default function StatCard({
    title,
    value,
    change,
    changeType = "neutral",
    icon: Icon,
    variant = "default",
}) {
    const variantClasses = {
        default: "bg-white dark:bg-neutral-800",
        primary: "bg-indigo-600 text-white",
        secondary: "bg-sky-500 text-white",
        success: "bg-green-500 text-white",
    };

    const iconVariantClasses = {
        default: "bg-gray-100 dark:bg-neutral-700 text-gray-600 dark:text-gray-200",
        primary: "bg-indigo-500 text-white",
        secondary: "bg-sky-400 text-white",
        success: "bg-green-400 text-white",
    };

    const changeTypeClasses = {
        positive: "text-green-500 dark:text-green-400",
        negative: "text-red-500 dark:text-red-400",
        neutral: "text-gray-500 dark:text-gray-400",
    };

    return (
        <div className={`rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 ${variantClasses[variant]} p-6`}>
            <div className="flex items-start justify-between">
                <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
                    <p className="text-3xl font-bold tracking-tight">{value}</p>
                    {change && (
                        <p className={`text-sm font-medium ${changeTypeClasses[changeType]}`}>
                            {change}
                        </p>
                    )}
                </div>
                <div className={`rounded-xl p-3 shadow-lg flex items-center justify-center ${iconVariantClasses[variant]}`}>
                    <Icon className="h-6 w-6" />
                </div>
            </div>
        </div>
    );
}
