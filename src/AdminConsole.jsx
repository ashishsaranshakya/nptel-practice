import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminConsole = ({setCount}) => {
	const [code, setCode] = useState('');
	const [message, setMessage] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

  	const handleResetStats = async () => {
		try {
		const response = await axios.post(`${import.meta.env.VITE_ANALYTIC_SERVER_URL}/reset-stats`, {
			password: code,
		});
		setMessage(response.data.message);
		setError('');
		setCount(null);
		} catch (err) {
		if (err.response && err.response.status === 401) {
			setError('Unauthorized: Incorrect code');
		} else {
			setError('Error resetting stats');
		}
		setMessage('');
		}
	};
	
	const goToHome = () => {
		navigate('/');
	  };

  	return (
	  	<div style={styles.container}>
			<button onClick={goToHome} className="back-to-home-button">
				Back to Home
			</button>
      		<h2>Admin Page: Reset Quiz Stats</h2>
      		<div style={styles.inputContainer}>
				<input
				id="admin-code"
				type="password"
				value={code}
				onChange={(e) => setCode(e.target.value)}
				placeholder="Enter admin code"
				style={styles.input}
				/>
      		</div>
			<button onClick={handleResetStats} style={styles.button}>
				Reset Stats
			</button>
			{message && <p style={styles.success}>{message}</p>}
			{error && <p style={styles.error}>{error}</p>}
    	</div>
  	);
};

const styles = {
	container: {
		maxWidth: '400px',
		margin: '50px auto',
		padding: '20px',
		textAlign: 'center',
		border: '1px solid #ccc',
		borderRadius: '10px',
		boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
	},
	inputContainer: {
		display: 'flex',
		flexDirection: 'column',
		marginBottom: '20px',
		textAlign: 'left',
	},
	input: {
		width: '100%',
		padding: '10px',
		fontSize: '16px',
		borderRadius: '5px',
		border: '1px solid #ccc',
		boxSizing: 'border-box',
	},
	button: {
		padding: '10px 20px',
		fontSize: '16px',
		backgroundColor: '#007bff',
		color: 'white',
		border: 'none',
		borderRadius: '5px',
		cursor: 'pointer',
	},
	success: {
		color: 'green',
		marginTop: '20px',
	},
	error: {
		color: 'red',
		marginTop: '20px',
	},
};

export default AdminConsole;