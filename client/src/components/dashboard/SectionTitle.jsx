function SectionTitle({ title, action }) {
    return (
        <div className="flex justify-between items-center mb-6">

            <h2 className="text-2xl font-bold">
                {title}
            </h2>

            {action && (
                <button className="text-blue-600 hover:underline">
                    {action}
                </button>
            )}

        </div>
    );
}

export default SectionTitle;