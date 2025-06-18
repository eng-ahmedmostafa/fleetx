import React, { useState } from 'react';
import axios from 'axios';

type Props = {
  onLogin: (token: string) => void;
};

const LoginForm: React.FC<Props> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/token/', {
        username,
        password,
      });
      const token = res.data.access;
      onLogin(token);
    } catch (err) {
      alert("Login failed ❌");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleLogin} className="p-4 bg-white shadow rounded w-full max-w-sm">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input
        className="w-full mb-2 p-2 border rounded"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="w-full mb-4 p-2 border rounded"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Login</button>
    </form>
  );
};

export default LoginForm;
