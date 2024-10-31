import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import Closer from './Closer'
import axios from 'axios'
function SignUpComp() {
    const navigate = useNavigate();
    const [formData, setFormData] = React.useState({
        userName: '',
        password: '',
        confirmPassword: ''
    });
    const [isFormValid, setIsFormValid] = React.useState(false);

    React.useEffect(() => {
        axios.defaults.withCredentials = true;
    }, []);

    React.useEffect(() => {
        const { userName, password, confirmPassword } = formData;
        setIsFormValid(userName && password && confirmPassword && password === confirmPassword);
    }, [formData]);


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { userName, password } = formData;
            const response = await axios.post('http://localhost:5555/register', {
                userName,
                password
            });
            if (response.status === 200) {
                console.log('connected');
                navigate('/');
            }
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    return (
        <>
            <div className='container'>
                <Header isUserLoggedIn={true} />
                <form onSubmit={handleSubmit} className='form'>
                    <div className='form-row'>
                        <label htmlFor='UN'>USERNAME:</label>
                        <input
                            type='text'
                            name='userName'
                            id='UN'
                            value={formData.userName}
                            onChange={handleChange}
                            style={{ backgroundColor: 'white', color: 'black' }}
                        />
                    </div>
                    <div className='form-row'>
                        <label htmlFor='PW'>PASSWORD:</label>
                        <input
                            type='password'
                            name='password'
                            id='PW'
                            value={formData.password}
                            onChange={handleChange}
                            style={{ backgroundColor: 'white', color: 'black' }}
                        />
                    </div>
                    <div className='form-row'>
                        <label htmlFor='CPW'>CONFIRM PASSWORD:</label>
                        <input
                            type='password'
                            name='confirmPassword'
                            id='CPW'
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            style={{ backgroundColor: 'white', color: 'black' }}
                        />
                    </div>
                    <button type='submit' disabled={!isFormValid}>SIGN UP</button>
                </form>
            </div>
            <Closer />
        </>
    );
}

export default SignUpComp




