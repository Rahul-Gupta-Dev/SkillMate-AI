import { FaSearch } from "react-icons/fa";

function SearchBar() {
    return (
        <div className="flex items-center bg-gray-100 rounded-xl px-4 py-3 w-[420px]">
            <FaSearch className="text-gray-400 mr-3" />

            <input
                type="text"
                placeholder="Search for topics, courses..."
                className="bg-transparent outline-none w-full text-sm"
            />
        </div>
    );
}

export default SearchBar;