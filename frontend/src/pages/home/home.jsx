import { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";

export default function Home() {

    const [documents, setDocuments] = useState([]);
    const [loading, setloading] = useState(true);
    const [recentcreate, setrecentcreate] = useState([]);

    useEffect(() => {
        async function fetchdocuments() {
            try {
                const response = await axios.get("http://localhost:8080/api/v1/documents/my-documents", {
                    withCredentials: true
                });

                const alldocs = response.data.documents;

                setrecentcreate([...alldocs].
                    sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 3)
                );

                setDocuments(alldocs);
                console.log(response.data)
            } catch (error) {
                console.error("Some kind of error is found while fetching");
            } finally {
                setloading(false);
            }
        }

        fetchdocuments();
    }, []);

    return (
        <div className="container">
            <div className="left">
                <div className="head">
                    <div className="head-left">
                        <img src="logo.png" alt="logo" className="logo" />
                        <div className="welcome-text">
                            <h1>Welcome</h1>
                            <h3>Satvik, What's Up</h3>
                        </div>
                    </div>

                    <input type="text" placeholder="🔎 Search" />
                </div>
                <div className="middle">
                    <div className="profile-card card">
                        <p>Profile</p>
                        <div className="profile">
                            <div className="profile-ring">
                                <div className="gap">
                                    <img src="https://images.unsplash.com/photo-1521146764736-56c929d59c83?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="profile-img" />
                                </div>
                            </div>
                            <h3>Satvik</h3>
                            <p>Dashboard Admin</p>
                        </div>
                    </div>
                    <div className="p-section">
                        <h1>Priorites</h1>
                        <div className="p-cards">
                            <div className="p-card first card empty-text">Nothing to show</div>
                            <div className="p-card second card empty-text">Nothing to show</div>
                        </div>
                    </div>
                </div>
                <div className="bottom">
                    <h3>All documents</h3>
                    <div className="dropdown">
                        <button>Select Time</button>
                        <div className="dropdown-content">
                            <a href="#">Last Day</a>
                            <a href="#">Last week</a>
                            <a href="#">Last Month</a>
                        </div>
                    </div>
                </div>
                <div className="recent-row">
                    {loading ? (
                        <p>Loading your masterpieces...</p>
                    ) : documents.length > 0 ? (
                        <div className="documents-grid">
                            {documents.map((doc) => (
                                <div key={doc.id} className="document-card">
                                    <h3 className="doc-title">{doc.title}</h3>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No documents yet. Create something beautiful.</p>
                    )}
                </div>
            </div>
            <div className="right">
                <div className="line"></div>
                <div className="cards">
                    {recentcreate[0] ? (
                        <div className="card r">{recentcreate[0].title}</div>                        
                    ) : (
                        <div className="empty-text">Nothing to Show</div>
                    )}
                    {recentcreate[1] ? (
                        <div className="card r">{recentcreate[1].title}</div>
                    ) : (
                        <div></div>
                    )}
                    {recentcreate[2] ? (
                        <div className="card r">{recentcreate[2].title}</div>                        
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>
        </div>
    )
}