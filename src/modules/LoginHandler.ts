import { showForum } from "./displayHandler";
import { fetchUsersData } from "./firebaseApp";

export class Loginhandler {

  constructor(
    private readonly signInForm: HTMLFormElement = document.querySelector("#login-form"),
    private readonly signUpForm : HTMLFormElement= document.querySelector("#signup-form"),
    private readonly username: HTMLInputElement = document.querySelector("#username"),
    private readonly password: HTMLInputElement = document.querySelector("#password"),
  ) {

    document.querySelector("#signin-btn").addEventListener("click", this.validator.bind(this));
    document.querySelector("#btn-signup-ui").addEventListener("click", this.hideUI.bind(this)); 
    document.querySelector("#logout-btn").addEventListener("click", this.logout.bind(this)); 
  }

  // On login show user data and hide login UI
  login(username: string, key: string): void {
    const profileDiv: HTMLDivElement = document.querySelector('.profile');
    const forumSection: HTMLDivElement = document.querySelector('#forums-section');
    const loginForm: HTMLDivElement = document.querySelector('#login-form');
    const logoutBtn: HTMLDivElement = document.querySelector('#logout-btn');
    const headerData:HTMLDivElement = document.querySelector('#header-data');
    
    alert(`You are logged in, welcome ${username}!`);

    const userItem = document.querySelector('.user');
    userItem.textContent = username;
    userItem.setAttribute('id', key);
    this.clearForm();
    showForum('travel-forum');

    headerData.style.justifyContent = 'space-between';
    profileDiv.style.display = "flex";
    forumSection.style.display = "flex";
    loginForm.style.display = "none";
    logoutBtn.style.display = "inline-block";
  }

  // On logout clear user data and show login UI
  logout(e): void {
    e.preventDefault();
    const profileDiv: HTMLDivElement = document.querySelector('.profile');
    const forumSection: HTMLDivElement = document.querySelector('#forums-section');
    const loginForm: HTMLDivElement = document.querySelector('#login-form');
    const logoutBtn: HTMLDivElement = document.querySelector('#logout-btn');
    const headerData:HTMLDivElement = document.querySelector('#header-data');

    headerData.style.justifyContent = 'center';
    profileDiv.style.display = "none";
    forumSection.style.display = "none";
    loginForm.style.display = "flex";
    logoutBtn.style.display = "none";

    const userItem = document.querySelector('.user');
    userItem.textContent = "";
  }

  validator(e): void {
    e.preventDefault();
        
    // valid input
    if ((this.username.value.length >= 4) && (this.password.value.length >= 4)){
      const usersData = fetchUsersData();
      if(usersData){
        for (const key in usersData) {
          if (this.username.value == usersData[key].username && this.password.value == usersData[key].password) {
            // login success
            this.login(usersData[key].username, key);
            return;
          }
        }
        alert("Invalid username or password");
        this.clearForm();
      }
    } else {
      alert("Username and password must be at least 4 characters long");
      this.clearForm();
    }
  }
  
  hideUI(e): void {
    e.preventDefault();
    this.clearForm();
    this.signInForm.style.display = "none";
    this.signUpForm.style.display = "flex";
  }

  clearForm(): void {
    this.signInForm.reset();
  }
}
