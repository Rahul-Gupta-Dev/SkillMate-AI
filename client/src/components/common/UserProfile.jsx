function UserProfile() {
    return (
        <div className="flex items-center gap-3">

            <div className="text-right">

                <p className="text-sm text-gray-500">
                    Hello,
                </p>

                <h3 className="font-semibold">
                    Rahul 👋
                </h3>

            </div>

            <img
                src="https://i.pravatar.cc/100?img=12"
                alt="Profile"
                className="w-11 h-11 rounded-full"
            />

        </div>
    );
}

export default UserProfile;