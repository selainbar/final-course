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

//q: how to upload to git hub
//a: To upload to GitHub, you need to follow these steps:
//1. Create a new repository on GitHub.
//2. Initialize a new Git repository on your local machine.
//3. Add your files to the Git repository.
//4. Commit your changes.
//5. Add the GitHub repository as a remote.
//6. Push your changes to the GitHub repository.
//Here's a
// step-by
// step guide on how to do this:
//1. Create a new repository on GitHub:
//Go to GitHub and log in to your account.
//Click on the "+" icon in the top right corner and select "New repository."
//Give your repository a name, description, and choose whether it should be public or private.
//Click on "Create repository."
//2. Initialize a new Git repository on your local machine:
//Open your terminal or command prompt.
//Navigate to the directory where your project is located.
//Run the following command to initialize a new Git repository:
//git init
//3. Add your files to the Git repository:
//Run the following command to add all files to the staging area:
//git add .
//4. Commit your changes:
//Run the following command to commit your changes with a message:
//git commit -m "Initial commit"
//5. Add the GitHub repository as a remote:
//Copy the URL of your GitHub repository.
//Run the following command to add the GitHub repository as a remote:
//git remote add origin <repository URL>
//6. Push your changes to the GitHub repository:
//Run the following command to push your changes to the GitHub repository:
//git push -u origin master
//Replace "master" with the name of the branch you want to push to (e.g., "main").
//After following these steps, your project should be uploaded to GitHub, and you can view it on your GitHub repository page.


//q: i have this git url that i want to upload to  git@github.com:selainbar/Game-on.git
//a: To upload your project to the GitHub repository with the URL
//q: can you walk me threw it?
//a: Sure! Here's how you can upload your project to the GitHub repository with the URL
//1. Initialize a new Git repository on your local machine:
//Open your terminal or command prompt.
//Navigate to the directory where your project is located.
//Run the following command to initialize a new Git repository:
//git init
//2. Add your files to the Git repository:
//Run the following command to add all files to the staging area:
//git add .
