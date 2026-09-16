import { useEffect, useMemo, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { getInternships, seedInternships, toggleSavedInternship } from "../../services/internshipService";

function Internships() {
    const [internships, setInternships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [filters, setFilters] = useState({
        skill: "",
        domain: "",
        location: "",
        remoteOnly: false,
    });

    const fetchInternships = async () => {
        try {
            setLoading(true);
            const res = await getInternships();
            setInternships(res.data.internships || []);
        } catch (err) {
            setError(err.response?.data?.message || "Unable to load internships.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const bootstrap = async () => {
            try {
                await seedInternships();
            } catch (err) {
                console.error(err);
            } finally {
                fetchInternships();
            }
        };

        bootstrap();
    }, []);

    const visibleInternships = useMemo(() => {
        return internships.filter((internship) => {
            const skillMatch = !filters.skill || (internship.requiredSkills || []).some((skill) =>
                skill.toLowerCase().includes(filters.skill.toLowerCase())
            );

            const domainMatch = !filters.domain || internship.domain.toLowerCase().includes(filters.domain.toLowerCase());
            const locationMatch = !filters.location || internship.location.toLowerCase().includes(filters.location.toLowerCase());
            const remoteMatch = !filters.remoteOnly || internship.isRemote;

            return skillMatch && domainMatch && locationMatch && remoteMatch;
        });
    }, [internships, filters]);

    const handleSave = async (internshipId) => {
        try {
            await toggleSavedInternship(internshipId);
            fetchInternships();
        } catch (err) {
            setError(err.response?.data?.message || "Unable to update saved internship.");
        }
    };

    const handleFilterChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFilters((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    return (
        <MainLayout>
            <div className="space-y-8 max-w-7xl mx-auto">
                <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Internships</p>
                            <h1 className="text-4xl font-bold text-slate-900 mt-3">Career opportunities matching your skills</h1>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-5">
                    <div className="grid md:grid-cols-5 gap-4">
                        <input
                            name="skill"
                            value={filters.skill}
                            onChange={handleFilterChange}
                            placeholder="Skill"
                            className="border border-slate-300 rounded-xl px-4 py-3"
                        />
                        <input
                            name="domain"
                            value={filters.domain}
                            onChange={handleFilterChange}
                            placeholder="Domain"
                            className="border border-slate-300 rounded-xl px-4 py-3"
                        />
                        <input
                            name="location"
                            value={filters.location}
                            onChange={handleFilterChange}
                            placeholder="Location"
                            className="border border-slate-300 rounded-xl px-4 py-3"
                        />
                        <label className="flex items-center gap-3 border border-slate-300 rounded-xl px-4 py-3 text-sm font-medium text-slate-700">
                            <input
                                type="checkbox"
                                name="remoteOnly"
                                checked={filters.remoteOnly}
                                onChange={handleFilterChange}
                            />
                            Remote only
                        </label>
                        <button
                            onClick={() => setFilters({ skill: "", domain: "", location: "", remoteOnly: false })}
                            className="bg-slate-100 text-slate-700 rounded-xl px-4 py-3 font-medium hover:bg-slate-200"
                        >
                            Clear
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="rounded-xl border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm">{error}</div>
                )}

                {loading ? (
                    <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center text-slate-500">
                        Loading internships...
                    </div>
                ) : visibleInternships.length === 0 ? (
                    <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center text-slate-500">
                        No internships match your filters right now.
                    </div>
                ) : (
                    <div className="grid xl:grid-cols-2 gap-6">
                        {visibleInternships.map((internship) => (
                            <div key={internship._id} className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
                                <div className="flex justify-between items-start gap-4">
                                    <div>
                                        <p className="text-sm text-slate-500">{internship.company}</p>
                                        <h3 className="text-2xl font-bold text-slate-900 mt-2">{internship.role}</h3>
                                    </div>
                                    <span className="bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full">
                                        {internship.matchPercentage || 0}% match
                                    </span>
                                </div>

                                <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-600">
                                    <span className="bg-slate-100 px-2 py-1 rounded-full">{internship.location}</span>
                                    <span className="bg-slate-100 px-2 py-1 rounded-full">{internship.isRemote ? "Remote" : "On-site"}</span>
                                    <span className="bg-slate-100 px-2 py-1 rounded-full">{internship.domain}</span>
                                </div>

                                <div className="mt-5">
                                    <p className="text-sm font-semibold text-slate-700">Required skills</p>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {(internship.requiredSkills || []).map((skill) => (
                                            <span key={skill} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-5 grid sm:grid-cols-2 gap-4 text-sm text-slate-600">
                                    <p><span className="font-semibold text-slate-800">Eligibility:</span> {internship.eligibility}</p>
                                    <p><span className="font-semibold text-slate-800">Stipend:</span> {internship.stipend}</p>
                                    <p><span className="font-semibold text-slate-800">Deadline:</span> {new Date(internship.applicationDeadline).toLocaleDateString()}</p>
                                    <p><span className="font-semibold text-slate-800">Experience:</span> {internship.experience}</p>
                                </div>

                                <div className="mt-5 bg-slate-50 border border-slate-200 rounded-2xl p-4">
                                    <p className="font-semibold text-slate-800">Skill match</p>
                                    <p className="text-sm text-slate-600 mt-2">Why this internship matches you</p>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {(internship.matchedSkills || []).map((skill) => (
                                            <span key={skill} className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                                                ✓ {skill}
                                            </span>
                                        ))}
                                    </div>
                                    {internship.missingSkills && internship.missingSkills.length > 0 && (
                                        <div className="mt-3">
                                            <p className="text-xs text-slate-500">Missing:</p>
                                            <div className="flex flex-wrap gap-2 mt-1">
                                                {internship.missingSkills.map((skill) => (
                                                    <span key={skill} className="bg-amber-50 text-amber-700 px-2 py-1 rounded-full text-xs font-medium">
                                                        • {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-6 flex justify-between gap-3">
                                    <button className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-blue-700">
                                        Apply
                                    </button>
                                    <button
                                        onClick={() => handleSave(internship._id)}
                                        className="border border-slate-300 text-slate-700 px-4 py-3 rounded-xl font-semibold hover:bg-slate-100"
                                    >
                                        {internship.isSaved ? "Saved" : "Save"}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </MainLayout>
    );
}

export default Internships;
