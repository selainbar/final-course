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

//q:git@github.com: Permission denied (publickey).fatal: Could not read from remote repository.
//a:This error message indicates that you do not have the necessary permissions to access the remote repository. There are a few possible reasons for this error:
//1. You may not have the correct SSH key set up on your local machine. Make sure you have added the correct SSH key to your GitHub account.
//2. The repository may be private and you do not have access to it. Check the repository settings to ensure that you have the correct permissions.
//3. There may be an issue with the remote repository URL. Make sure you are using the correct URL and that it is formatted correctly.
//To resolve this issue, you can try the following steps:
//1. Check your SSH key settings and make sure you have added the correct key to your GitHub account.
//2. Verify that you have the correct permissions to access the repository.
//3. Double-check the remote repository URL and ensure it is formatted correctly.
//If you continue to experience issues, you may need to contact the repository owner or GitHub support for further assistance.
//q:how do i add an ssh key to my github account?
//a:To add an SSH key to your GitHub account, you can follow these steps:
//1. Open a terminal window.
//2. Generate a new SSH key using the following command:
//ssh-keygen -t rsa -b 4096 -C "
//3. Follow the prompts to generate the key.
//4. Add the SSH key to the SSH agent using the following command:
//eval "$(ssh-agent -s)"
//ssh-add ~/.ssh/id_rsa
//5. Copy the SSH key to your clipboard using the following command:
//pbcopy < ~/.ssh/id_rsa.pub
//6. Open GitHub in your web browser.
//7. Click on your profile icon in the top right corner of the page.
//8. Select "Settings" from the dropdown menu.
//9. Click on "SSH and GPG keys" in the left sidebar.
//10. Click on "New SSH key."
//11. Enter a title for the key.
//12. Paste the SSH key into the "Key" field.
//13. Click on "Add SSH key."
//Your SSH key should now be added to your GitHub account.
//q: i used ssh key instead of https and now i get the error ive send you i want to use https but it say there is already an origin exist
//a: If you want to switch from using SSH to HTTPS for your Git remote, you can follow these steps:
//1. Remove the existing remote URL:
//git remote remove origin
//2. Add the new HTTPS remote URL:
//git remote add origin <https-url>
//3. Push your changes to the remote repository:
//git push -u origin master
//Replace <https-url> with the HTTPS URL of your GitHub repository.
//This should update your remote URL to use HTTPS instead of SSH.
//q: ive done all of the is that it?
//a: Yes, that should be it! Your remote URL should now be updated to use HTTPS instead of SSH. You can verify this by running the following command: now when ever i  want to pull the project ( whenever wherever i am) i can just use the https url to pull the entire project and at the end to push it?
//git remote -v
//This will show you the current remote URL for your repository. You should see the new HTTPS URL that you added.
//You can now use the HTTPS URL to pull and push changes to your repository.
//q: thank you very much
//a: You're welcome! If you have any other questions, feel free to ask.
//q: ok i hvae another how do i pull the project from the terminal?
//a: To pull the project from the terminal, you can use the following command:
//git pull origin master
//This will fetch the changes from the remote repository and merge them into your local branch.
//If you are working on a different branch, you can specify the branch name in the command:
//git pull origin <branch-name>
//Replace <branch-name> with the name of the branch you want to pull from.
//q: thank you
//a: You're welcome! If you have any other questions, feel free to ask.




