import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./Admin.css";
import API_URL from "../api";


function Admin() {
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [selectedEnquiry, setSelectedEnquiry] = useState(null);

    const handleLogout = () => {
        sessionStorage.removeItem("adminLoggedIn");
        navigate("/hidden-admin");
    };
    const handleContacted = async (id) => {
        try {
            const response = await fetch(
                `${API_URL}/api/enquiries/${id}/contacted`,
                {
                    method: "PUT",
                }
            );

            const updatedEnquiry = await response.json();

            if (response.ok) {
                setEnquiries(
                    enquiries.map((enquiry) =>
                        enquiry._id === id
                            ? updatedEnquiry
                            : enquiry
                    )
                );
            }
        } catch (error) {
            console.error(error);
            alert("Failed to update enquiry");
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this enquiry?"
        );

        if (!confirmDelete) return;

        try {
            const response = await fetch(
                `${API_URL}/api/enquiries/${id}`,
                {
                    method: "DELETE",
                }
            );

            if (response.ok) {
                setEnquiries(
                    enquiries.filter(
                        (enquiry) => enquiry._id !== id
                    )
                );
            }
        } catch (error) {
            console.error(error);
            alert("Failed to delete enquiry");
        }
    };

    const fetchEnquiries = async () => {
        try {
            setLoading(true);

            const response = await fetch(`${API_URL}/api/enquiries`);

            const data = await response.json();

            setEnquiries(data);
        } catch (error) {
            console.error(error);
            alert("Failed to fetch enquiries");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEnquiries();
    }, []);

    if (sessionStorage.getItem("adminLoggedIn") !== "true") {
        return <Navigate to="/hidden-admin" replace />;
    }
    const filteredEnquiries = enquiries.filter((enquiry) => {
        const searchText = search.toLowerCase();

        const matchesSearch =
            enquiry.name.toLowerCase().includes(searchText) ||
            enquiry.email.toLowerCase().includes(searchText) ||
            enquiry.phone.toLowerCase().includes(searchText);

        const matchesFilter =
            filter === "all" ||
            (filter === "contacted" && enquiry.contacted) ||
            (filter === "pending" && !enquiry.contacted);

        return matchesSearch && matchesFilter;
    });

    return (
        <div className="admin-page">
            <div className="admin-header">
                <div>
                    <p className="admin-label">TEXTILE WEBSITE</p>
                    <h1>Admin Dashboard</h1>
                    <p>Customer Enquiries</p>
                </div>

                <div className="enquiry-count">
                    <span>Total Enquiries</span>
                    <strong>{enquiries.length}</strong>
                </div>
                <button className="logout-btn" onClick={handleLogout}>
                    Logout
                </button>
                <button
                    className="refresh-btn"
                    onClick={fetchEnquiries}
                >
                    ↻ Refresh
                </button>
            </div>

            <div className="admin-content">
                <div className="admin-controls">
                    <input
                        type="text"
                        placeholder="Search by name, email or phone..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="search-input"
                    />

                    <div className="filter-buttons">
                        <button
                            className={filter === "all" ? "active-filter" : ""}
                            onClick={() => setFilter("all")}
                        >
                            All ({enquiries.length})
                        </button>

                        <button
                            className={filter === "pending" ? "active-filter" : ""}
                            onClick={() => setFilter("pending")}
                        >
                            Pending ({enquiries.filter((e) => !e.contacted).length})
                        </button>

                        <button
                            className={filter === "contacted" ? "active-filter" : ""}
                            onClick={() => setFilter("contacted")}
                        >
                            Contacted ({enquiries.filter((e) => e.contacted).length})
                        </button>
                    </div>
                </div>
                {loading ? (
                    <p className="status-message">Loading enquiries...</p>
                ) : filteredEnquiries.length === 0 ? (
                    <p className="status-message">No enquiries found.</p>
                ) : (
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Message</th>
                                    <th>Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredEnquiries.map((enquiry) => (
                                    <tr key={enquiry._id}>
                                        <td>{enquiry.name}</td>
                                        <td>{enquiry.email}</td>
                                        <td>{enquiry.phone}</td>
                                        <td className="message-cell">
                                            {enquiry.message}
                                        </td>
                                        <td>
                                            {enquiry.createdAt
                                                ? new Date(
                                                    enquiry.createdAt
                                                ).toLocaleString()
                                                : "N/A"}
                                        </td>
                                        <td className="action-cell">
                                            <button
                                                className="view-btn"
                                                onClick={() => setSelectedEnquiry(enquiry)}
                                            >
                                                View
                                            </button>
                                            <button
                                                className={
                                                    enquiry.contacted
                                                        ? "contacted-btn completed"
                                                        : "contacted-btn"
                                                }
                                                onClick={() => handleContacted(enquiry._id)}
                                                disabled={enquiry.contacted}
                                            >
                                                {enquiry.contacted ? "Contacted ✓" : "Mark Contacted"}
                                            </button>

                                            <button
                                                className="delete-btn"
                                                onClick={() => handleDelete(enquiry._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            {selectedEnquiry && (
                <div
                    className="details-overlay"
                    onClick={() => setSelectedEnquiry(null)}
                >
                    <div
                        className="details-modal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="details-close"
                            onClick={() => setSelectedEnquiry(null)}
                        >
                            ×
                        </button>

                        <p className="admin-label">ENQUIRY DETAILS</p>

                        <h2>{selectedEnquiry.name}</h2>

                        <div className="details-grid">
                            <div>
                                <span>Email</span>
                                <p>{selectedEnquiry.email}</p>
                            </div>

                            <div>
                                <span>Phone</span>
                                <p>{selectedEnquiry.phone}</p>
                            </div>

                            <div>
                                <span>Date</span>
                                <p>
                                    {selectedEnquiry.createdAt
                                        ? new Date(
                                            selectedEnquiry.createdAt
                                        ).toLocaleString()
                                        : "N/A"}
                                </p>
                            </div>

                            <div>
                                <span>Status</span>
                                <p>
                                    {selectedEnquiry.contacted
                                        ? "Contacted ✓"
                                        : "Pending"}
                                </p>
                            </div>
                        </div>

                        <div className="details-message">
                            <span>Message</span>
                            <p>{selectedEnquiry.message}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Admin;