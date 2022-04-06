import { User } from "./User";
import { db, fetchUsersData } from "./firebaseApp";
import { push, ref, update } from "firebase/database";
import { showForum } from "./displayHandler";

export class SignupHandler {
    private signInForm: HTMLFormElement;
    private signUpform: HTMLFormElement;
    private profileForm: HTMLFormElement;
    private usernameInField: HTMLInputElement;
    private passwordInField: HTMLInputElement;
    private repeatPasswordInField: HTMLInputElement;
    private profileDesc: HTMLInputElement;

    constructor(){
        this.usernameInField = document.querySelector('#new_username');
        this.passwordInField = document.querySelector('#new_password');
        this.repeatPasswordInField = document.querySelector('#repeat_password');
        this.signUpform = document.querySelector("#signup-form");
        this.signInForm = document.querySelector("#login-form");
        this.profileForm = document.querySelector("#profile-form");
        this.profileDesc = document.querySelector("#profil-desc");

        document.querySelector('#signup-btn').addEventListener('click', this.validateForm.bind(this));
        document.querySelector('#btn-display-signin').addEventListener('click', this.hideUI.bind(this));
        document.querySelector('#update-btn').addEventListener('click', this.update.bind(this));
        document.querySelector('#img-container').addEventListener('click', this.updateProfilePic.bind(this));

        //init profile pic
        const img = document.querySelector('.selected-profile-img');
        const defaultImg = document.querySelector('#default-profile-img');
        img.setAttribute('src', defaultImg.getAttribute('src'));

    }

    //validate form 
    validateForm(e): void {
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
            this.signUpform.style.display = "none";
            this.profileForm.style.display = "flex";
        }
    }

    hideUI(e): void {
        e.preventDefault()
        this.signUpform.style.display = "none";
        this.signInForm.style.display = "flex";
    }

    signupUser(user: User) {
        // Create new user-object
        const userToAdd = {
            username: user.getUsername(),
            password: user.getPassword(),
            desc: user.getDesc(),
            image: user.getImage()
        }

        // Update database with new user
        const dbRefUsers = ref(db, '/users');
        const key:string = push(dbRefUsers).key;
        const newUser = {};
        newUser[key] = userToAdd;

        update(dbRefUsers, newUser);
        this.login(user.getUsername(), key);
        this.clearForm();
        alert('Welcome to Gritbook!')
        this.profileForm.style.display = "none";
    }

    login(username: string, key: string) {
        const profileDiv: HTMLDivElement = document.querySelector('.profile');
        const forumSection: HTMLDivElement = document.querySelector('#forums-section');
        const signUpForm: HTMLDivElement = document.querySelector('#signup-form');
        const logoutBtn: HTMLDivElement = document.querySelector('#logout-btn');
        const headerData:HTMLDivElement = document.querySelector('#header-data');
        
        const userItem = document.querySelector('.user');
        userItem.textContent = username;
        userItem.setAttribute('id', key);
        this.clearForm();
        showForum('travel-forum');
    
        headerData.style.justifyContent = 'space-between';
        profileDiv.style.display = "flex";
        forumSection.style.display = "flex";
        signUpForm.style.display = "none";
        logoutBtn.style.display = "inline-block";
      }

    update(e): void {
        e.preventDefault();
        console.log('update');
        const imageEl = document.querySelector('.selected-profile-img');
        const imgSrc = imageEl.getAttribute('src').substring(22);
          this.signupUser(
                new User(this.usernameInField.value, 
                    this.passwordInField.value, 
                    this.profileDesc.value, 
                    imgSrc));
    }

    updateProfilePic(e): void {
        e.preventDefault();
        if (e.target.src === undefined) return
        const img = document.querySelector('.selected-profile-img');
        img.setAttribute('src', e.target.src);
    }

    clearForm(): void {
        this.signUpform.reset();
    }
}