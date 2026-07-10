import { Link } from "react-router-dom";

function QuickAccessCard({ title, description, icon: Icon, path }) {
    return (
        <Link
            to={path}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition duration-300"
        >
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 mb-4">
                <Icon size={22} />
            </div>

            <h3 className="font-bold text-lg">{title}</h3>

            <p className="text-gray-500 text-sm mt-2">
                {description}
            </p>
        </Link>
    );
}

export default QuickAccessCard;