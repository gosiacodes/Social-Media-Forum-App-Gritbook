class UserFormHandler {
    private form: HTMLFormElement;
    private usernameInField: HTMLInputElement;
    private passwordInField: HTMLInputElement;
    private repeatPasswordInField: HTMLInputElement;
    

    constructor(){
        this.usernameInField = document.querySelector('new_username');
        this.passwordInField = document.querySelector('new_password');
        this.usernameInField = document.querySelector('repeat_password');
        this.form = document.querySelector('sign-form');;

        this.form.addEventListener('submit', this.validateSignForm.bind(this))

    }

    validateSignForm(e) {
        e.preventDefault();
        console.log('validateSignForm clicked');
    }
 


}