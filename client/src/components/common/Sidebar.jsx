import sidebarData from "../../data/sidebarData";
import SidebarItem from "./SidebarItem";

function Sidebar() {
    return (
        <aside className="w-72 h-screen bg-white border-r border-gray-200 flex flex-col">

            <div className="p-8">

                <h1 className="text-3xl font-bold text-blue-600">
                    SkillMate AI
                </h1>

                <p className="text-gray-500 text-sm mt-2">
                    Learn Smarter
                </p>

            </div>

            <nav className="flex-1 px-4 space-y-3">

                {sidebarData.map((item) => (
                    <SidebarItem
                        key={item.id}
                        {...item}
                    />
                ))}

            </nav>

            <div className="p-6 text-center text-gray-400 text-sm">
                Version 1.0
            </div>

        </aside>
    );
}

export default Sidebar;