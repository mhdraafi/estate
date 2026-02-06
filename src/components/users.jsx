import React, { useEffect, useState } from 'react';
import { Table, Container, Spinner, Alert } from 'react-bootstrap';
import API from "../api/first";


export default function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await API.get('register/'); 
                setUsers(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Fetch error:", err);
                setError("Could not fetch data from Django backend.");
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return (
        <Container className="mt-5">
            <h2 className="mb-4">Registered Community Members</h2>

            {loading && <Spinner animation="border" variant="primary" />}
            
            {error && <Alert variant="danger">{error}</Alert>}

            {!loading && !error && (
                <Table striped bordered hover responsive>
                    <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Full Name</th>
                            <th>Email Address</th>
                            <th>Mobile Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user.id || index}>
                                <td>{index + 1}</td>
                                <td>{user.fname}</td>
                                <td>{user.email}</td>
                                <td>{user.mobile}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
}
