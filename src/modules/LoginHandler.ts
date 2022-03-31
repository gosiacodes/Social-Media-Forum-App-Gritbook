import { fetchUsersData } from "../main";
export class Loginhandler {
  private signInForm: HTMLFormElement;
  private signUpForm: HTMLFormElement;
  private username: HTMLInputElement;
  private password: HTMLInputElement;

  constructor(
  ) {
    this.signInForm = document.querySelector("#login-form");
    this.signUpForm = document.querySelector("#signup-form");
    this.username = document.querySelector("#username");
    this.password = document.querySelector("#password");
   

    document.querySelector("#signin-btn").addEventListener("click", this.validator.bind(this));
    document.querySelector("#btn-signup-ui").addEventListener("click", this.hideUI.bind(this));

  }

  validator(e) {
    e.preventDefault();
    console.log("validator invoked");
    console.log(this.username.value);
    console.log(this.password.value);
        
    // valid input
    if ((this.username.value.length >= 4) && (this.password.value.length >= 4)){
      const usersData = fetchUsersData();
      if(usersData){
        for (const key in usersData) {
          if (this.username.value == usersData[key].username && this.password.value == usersData[key].password) {
            console.log("login success");
            this.clearForm();
            return;
          }
        }
        console.log("login failed");
        this.clearForm();
      }
    } else {
      console.log('username/password length is less than 4 characters');
      this.clearForm();
    }
  }
  
  hideUI(e) {
    e.preventDefault();
    this.clearForm();
    this.signInForm.style.display = "none";
    this.signUpForm.style.display = "block";
  }

  clearForm() {
    this.signInForm.reset();
  }
}
