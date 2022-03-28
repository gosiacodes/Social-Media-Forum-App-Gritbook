export class Loginhandler {
  private form: HTMLFormElement;
  private username: HTMLInputElement;
  private password: HTMLInputElement;

  constructor() {
    this.form = document.querySelector("#login-form");
    this.username = document.querySelector("#username");
    this.password = document.querySelector("#password");

    this.form.addEventListener("submit", this.validator.bind(this));
  }

  validator(e) {
    e.preventDefault();
    console.log("validator invoked");

    if (this.username.value.length > 4 && this.password.value.length > 4) {
      // valid input
    } else {
      // invlid input
    }
  }
}
