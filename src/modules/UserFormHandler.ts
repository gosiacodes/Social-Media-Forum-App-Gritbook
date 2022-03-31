export class UserFormHandler {
    private signInForm: HTMLFormElement;
    private signUpform: HTMLFormElement;
    private usernameInField: HTMLInputElement;
    private passwordInField: HTMLInputElement;
    private repeatPasswordInField: HTMLInputElement;
    

    constructor(){
        this.usernameInField = document.querySelector('#new_username');
        this.passwordInField = document.querySelector('#new_password');
        this.repeatPasswordInField = document.querySelector('#repeat_password');
        this.signUpform = document.querySelector("#signup-form");
        this.signInForm = document.querySelector("#login-form");

        document.querySelector('#signup-btn').addEventListener('submit', this.validateSignForm.bind(this));
        document.querySelector('#btn-display-signin').addEventListener('click', this.hideUI.bind(this));

    }

    validateSignForm(e) {
        e.preventDefault();
        console.log('validateSignForm invoked');
        //validate form 
    }

    hideUI(e) {
        e.preventDefault()
        console.log('hideUI invoked');
        this.signUpform.style.display = "none";
        this.signInForm.style.display = "block";
    }
}