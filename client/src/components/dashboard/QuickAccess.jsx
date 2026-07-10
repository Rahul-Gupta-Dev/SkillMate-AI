import quickAccessData from "../../data/quickAccessData";
import QuickAccessCard from "./QuickAccessCard";

function QuickAccess() {
    return (
        <section className="mt-10">

            <h2 className="text-2xl font-bold mb-6">
                Quick Access
            </h2>

            <div className="grid grid-cols-4 gap-6">

                {quickAccessData.map((item) => (
                    <QuickAccessCard
                        key={item.id}
                        {...item}
                    />
                ))}

            </div>

        </section>
    );
}

export default QuickAccess;