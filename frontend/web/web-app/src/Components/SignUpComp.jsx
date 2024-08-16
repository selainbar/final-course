import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import Closer from './Closer'
function SignUpComp() {
    return (
        <>
    <div className='container'>
        <Header isUserLoggedIn={true}/>
        SignUpComp
        </div>
        <Closer/>
        </>
  )
}

export default SignUpComp

//q: i forgot how to upload this entire project to github
//a: no problem. here are the steps:
//1. Open a terminal window.
//2. Navigate to the root directory of your project.
//3. Run the following commands:
//git init
//git add .
//git commit -m "Initial commit"
//git remote add origin <repository-url>
//git push -u origin master
//Replace <repository-url> with the URL of your GitHub repository.
//4. Your project should now be uploaded to GitHub.
//q: i dont have a repository opened yet. how do i create one?
//a: you can create a new repository on GitHub by following these steps:
//1. Open GitHub in your web browser.
//2. Log in to your account.
//3. Click on the "+" icon in the top right corner of the page.
//4. Select "New repository" from the dropdown menu.
//5. Enter a name for your repository.
//6. Optionally, add a description.
//7. Choose whether the repository should be public or private.
//8. Click on the "Create repository" button.
//9. Your new repository should now be created.
//10. Follow the instructions on the repository page to add your code.
//q: can i open a repository from the terminal?
//a: yes, you can create a new repository from the terminal using the following steps:
//1. Open a terminal window.
//2. Navigate to the root directory of your project.
//3. Run the following commands:
//git init
//git add .
//git commit -m "Initial commit"
//4. Create a new repository on GitHub.
