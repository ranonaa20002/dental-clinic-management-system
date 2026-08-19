export default function PatientSearch({
    search,
    setSearch
}) {
    return (

        <input
            type="text"
            placeholder="Search by Name, Phone or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-xl p-3 mb-5"
        />

    );
}