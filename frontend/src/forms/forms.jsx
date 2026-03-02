import { useState } from 'react';
import axios from 'axios';
import './styles.css';
import { useNavigate } from 'react-router-dom';

const SketchyForm = ({ mode = 'login' }) => {
  const isRegister = mode === 'register';
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [backendMessage, setBackendMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isRegister
      ? 'http://localhost:8080/api/v1/auth/register'
      : 'http://localhost:8080/api/v1/auth/login';

    try {
      const response = await axios.post(endpoint, formData, {
        withCredentials: true
      });

      console.log('Backend replied with:', response.data); 

      setBackendMessage('It worked perfectly!');

      if(!isRegister) navigate("/");

    } catch (error) {
      if (error.response) {
        setBackendMessage(`Oops! 💔 ${error.response.data.message || 'Something went wrong.'}`);
      } else {
        setBackendMessage('Error');
      }
    }
  };

  return (
    <div className="notebook-paper">
      <div className="sketchy-form-container">

        <div className="form-header">
          <h2>{isRegister ? 'Sign Up' : 'Sign In'}</h2>
        </div>

        <div className="form-body">
          <form onSubmit={handleSubmit}>

            {isRegister && (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="sketchy-input"
              />
            )}

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="sketchy-input"
              required
            />

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="sketchy-input"
              required
            />

            <button type="submit" className="sketchy-button">
              {isRegister ? 'Sign Up' : 'Sign In'}
            </button>

          </form>

          {backendMessage && (
            <div style={{ marginTop: '15px', color: '#555', textAlign: 'center' }}>
              {backendMessage}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default SketchyForm;