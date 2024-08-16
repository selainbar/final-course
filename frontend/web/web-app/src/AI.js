//q: how to differ  using props wether  display on a functional component  a 'log in' or 'log out' button and if the user is loged in display log out and if the user is logged out the log in page display sign up (because you navigated to the log in page on defult) and and if you in the sign up page display log in
//a: you can use the isUserLoggedIn prop to determine which button to display. If isUserLoggedIn is true, display the log out button. If isUserLoggedIn is false, display the log in button. You can also use the useNavigate hook to navigate to the appropriate page when the button is clicked.
//q: can you show me an example of how to implement this?
//a: Sure! Here's an example of how you can implement this in a functional component:
//
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
//
// const Header = ({ isUserLoggedIn }) => {
//     const navigate = useNavigate();
//
//     const handleClick = () => {
//         if (isUserLoggedIn) {
//             // Log out logic
//             console.log('Log out logic');
//         } else {
//             // Log in logic
//             console.log('Log in logic');
//             navigate('/LogIn');
//         }
//     };
//
//     return (
//         <header style={{ position: 'fixed', top: 0, width: '100%', height: '10vh', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//             <div>
//                 <button onClick={handleClick}>{isUserLoggedIn ? 'Log Out' : 'Log In'}</button>
//             </div>
//             <div>
//                 <h1>Welcome to Game on!</h1>
//             </div>
//             <div></div>
//         </header>
//     );
// };
//
// export default Header;
// In this example, the Header component takes a prop isUserLoggedIn which determines whether the user is logged in or not. The handleClick function checks the value of isUserLoggedIn and performs the appropriate action (log in or log out). The button text is dynamically set based on the value of isUserLoggedIn.
//q: now add on to that example to either render log in or sign up depending on the page
//a: Sure! Here's an updated example that also checks the current page and renders the appropriate button (log in or sign up):
//
// import React from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
//
// const Header = ({ isUserLoggedIn }) => {
//     const navigate = useNavigate();
//     const location = useLocation();
//
//     const handleClick = () => {
//         if (isUserLoggedIn) {
//             // Log out logic
//             console.log('Log out logic');
//         } else {
//             // Log in logic
//             console.log('Log in logic');
//             navigate('/LogIn');
//         }
//     };
//
//     return (
//         <header style={{ position: 'fixed', top: 0, width: '100%', height: '10vh', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//             <div>
//                 <button onClick={handleClick}>{isUserLoggedIn ? 'Log Out' : location.pathname === '/SignUp' ? 'Log In' : 'Sign Up'}</button>
//             </div>
//             <div>
//                 <h1>Welcome to Game on!</h1>
//             </div>
//             <div></div>
//         </header>
//     );
// };
//
// export default Header;
// In this updated example, the Header component now also uses the useLocation hook to get the current page path. The button text is dynamically set based on the value of isUserLoggedIn and the current page path. If the user is logged in, the button text is 'Log Out'. If the user is logged out and the current page is '/SignUp', the button text is 'Log In'. Otherwise, the button text is 'Sign Up'.
//q: what is that <div></div> for?
//a: The <div></div> is an empty div element that is used to create space between the buttons and the header text. It is a common practice to use empty div elements for spacing and layout purposes in HTML and CSS.

