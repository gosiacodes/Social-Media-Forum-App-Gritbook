import { User } from "./User";
import { fetchUsersData } from "../main";
import { db } from "../modules/firebaseApp";
import { DatabaseReference, onValue, push, ref, update } from "firebase/database";

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

        document.querySelector('#signup-btn').addEventListener('click', this.validateForm.bind(this));
        document.querySelector('#btn-display-signin').addEventListener('click', this.hideUI.bind(this));

    }

    //validate form 
    validateForm(e) {
        e.preventDefault();
        const usersData = fetchUsersData();
        let usersnames: string[] = [];
        for (const key in usersData) {
            usersnames.push(usersData[key].username);
        }

        if((this.usernameInField.value.length < 4) || 
            (this.passwordInField.value.length < 4) || 
            (this.repeatPasswordInField.value.length < 4)){
            alert('username/password length is less than 4 characters');
            return;
        } else if(usersnames.includes(this.usernameInField.value)){
            alert('username already exists');
            return;
        } else if(this.passwordInField.value != this.repeatPasswordInField.value){
            alert('password does not match');
            return;
        } else {
            alert('signup success');
            this.initNewUser(new User(this.usernameInField.value, this.passwordInField.value));
        }
    }

    hideUI(e) {
        e.preventDefault()
        console.log('hideUI invoked');
        this.signUpform.style.display = "none";
        this.signInForm.style.display = "block";
    }

    initNewUser(user: User) {
        console.log('initNewUser invoked');
        // Create new user-object
        const userToAdd = {
            username: user.getUsername(),
            password: user.getPassword()
        }

        // Update database with new user
        const dbRefUsers = ref(db, '/users');
        const key:string = push(dbRefUsers).key;
        const newUser = {};
        newUser[key] = userToAdd;

        update(dbRefUsers, newUser);
        this.clearForm();
    }

    clearForm() {
        this.signUpform.reset();
    }
}