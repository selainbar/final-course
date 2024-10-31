import React from 'react';
import { useNavigate } from 'react-router-dom';
const Header = ({isUserLoggedIn}) => {

    const navigate = useNavigate();

    const handleClick = () => {

        console.log(`${window.location.pathname}clicked`);
        if (window.location.pathname === '/SignUp') {
            navigate('/');
        } else {
            navigate('/SignUp');
        }
    
    }
    return (
        <header style={{ position: 'fixed', top: 0, width: '100%', height: '10vh', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
                <button onClick={handleClick}>
                    {window.location.pathname === '/SignUp' ? 'Log In' : 'Sign Up'}
                </button>
            </div>
            <div>
                <h1>Welcome to Game on!</h1>
            </div>
            <div></div>
        </header>
    );
};

export default Header;