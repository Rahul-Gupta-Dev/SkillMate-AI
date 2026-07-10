import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";

function MainLayout({ children }) {
    return (
        <div className="flex h-screen bg-slate-100">

            <Sidebar />

            <div className="flex flex-col flex-1">

                <Navbar />

                <main className="flex-1 p-8 overflow-y-auto">
                    {children}
                </main>

            </div>

        </div>
    );
}

export default MainLayout;