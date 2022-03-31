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
   

    document.querySelector("#signin-btn").addEventListener("submit", this.validator.bind(this));
    document.querySelector("#btn-signup-ui").addEventListener("click", this.hideUI.bind(this));

  }

  validator(e) {
    e.preventDefault();
    console.log("validator invoked");
    

    // if (this.username.value.length > 4 && this.password.value.length > 4) {
    //   // valid input
    // } else {
    //   // invlid input
    // }
  }
  
  hideUI(e) {
    e.preventDefault();
    console.log('hideUI invoked');

    this.signInForm.style.display = "none";
    this.signUpForm.style.display = "block";
  }
}
