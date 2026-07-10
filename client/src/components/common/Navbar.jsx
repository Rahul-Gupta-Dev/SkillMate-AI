import SearchBar from "./SearchBar";
import NotificationBell from "./NotificationBell";
import UserProfile from "./UserProfile";

function Navbar() {
    return (
        <header className="h-20 bg-white border-b border-gray-200 px-8 flex items-center justify-between">

            <SearchBar />

            <div className="flex items-center gap-6">

                <NotificationBell />

                <UserProfile />

            </div>

        </header>
    );
}

export default Navbar;