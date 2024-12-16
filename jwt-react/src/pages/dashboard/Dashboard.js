import React, { useEffect, useState } from 'react';
import './dashboard.css'; 
import { useNavigate } from 'react-router-dom';
import { Table, Row, Col, Button } from 'react-bootstrap';

const Dashboard = () => {
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [cryptos, setCryptos] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (token) {
        try {
          const decodedToken = JSON.parse(atob(token.split('.')[1])); 
          setUserName(decodedToken.name || 'Guest'); 
          setUserRole(decodedToken.role || 'user'); 

          
          if (decodedToken.role === 'admin') {
            const response = await fetch("http://localhost:5000/api/users", {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            const result = await response.json();
            setUsers(result);
          }

          
          const cryptoResponse = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd");
          const cryptoData = await cryptoResponse.json();
          setCryptos(cryptoData);
        } catch (error) {
          console.error("Error decoding token or fetching user data:", error);
        } finally {
          setLoading(false); 
        }
      } else {
        navigate("/login"); 
      }
    };

    fetchUserData();
  }, [token, navigate]);

  
  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:5000/api/user/${userId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        const result = await response.json();
        if (response.ok) {
          alert(result.message);
          setUsers(users.filter((user) => user._id !== userId)); 
        } else {
          alert(result.message);
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user.");
      }
    }
  };

  // Handle changing user role (Admin)
  const handleChangeRole = async (userId, newRole) => {
    try {
      const response = await fetch("http://localhost:5000/api/user/role", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: userId, role: newRole }),
      });
      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        setUsers(
          users.map((user) =>
            user._id === userId ? { ...user, role: newRole } : user
          )
        );
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error changing user role:", error);
      alert("Failed to change role.");
    }
  };

  // Handle adding cryptocurrency to favorites (User)
  const handleAddFavorite = (crypto) => {
    if (!favorites.some((fav) => fav.id === crypto.id)) {
      setFavorites([...favorites, crypto]);
    }
  };

  // Handle removing cryptocurrency from favorites (User)
  const handleRemoveFavorite = (cryptoId) => {
    setFavorites(favorites.filter((fav) => fav.id !== cryptoId));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-5">
      <Row>
        <Col>
          <h1 className="text-center">
            {userRole === "admin" ? "Admin Dashboard" : `Welcome, ${userName}`}
          </h1>

          {/* Admin Section - Manage Users */}
          {userRole === "admin" ? (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(users) && users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={() => handleDeleteUser(user._id)}
                        >
                          Delete
                        </Button>
                        <Button
                          variant="warning"
                          onClick={() =>
                            handleChangeRole(user._id, user.role === "admin" ? "user" : "admin")
                          }
                        >
                          Change Role
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No users found</td>
                  </tr>
                )}
              </tbody>
            </Table>
          ) : (
            // Regular User Section - Show Crypto List
            <>
              <div className="user-info">
                <h2>My Favorite Cryptos</h2>
                {favorites.length === 0 ? (
                  <p>No favorite cryptocurrencies added.</p>
                ) : (
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Symbol</th>
                        <th>Price (USD)</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {favorites.map((fav) => (
                        <tr key={fav.id}>
                          <td>{fav.name}</td>
                          <td>{fav.symbol}</td>
                          <td>${fav.current_price.toLocaleString()}</td>
                          <td>
                            <Button variant="danger" onClick={() => handleRemoveFavorite(fav.id)}>
                              Remove from Favorites
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
                <h2 style={{ textAlign: 'center' }}>Cryptocurrency Prices</h2>

                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Symbol</th>
                      <th>Price (USD)</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cryptos.map((crypto) => (
                      <tr key={crypto.id}>
                        <td>{crypto.name}</td>
                        <td>{crypto.symbol}</td>
                        <td>${crypto.current_price.toLocaleString()}</td>
                        <td>
                          {!favorites.some((fav) => fav.id === crypto.id) ? (
                            <Button variant="success" onClick={() => handleAddFavorite(crypto)}>
                              Add to Favorites
                            </Button>
                          ) : (
                            <Button variant="danger" onClick={() => handleRemoveFavorite(crypto.id)}>
                              Remove from Favorites
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;

