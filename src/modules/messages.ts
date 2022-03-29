import { db } from "./firebaseApp";
import { ref, remove, update } from "firebase/database";

//posts class med constructor
class posts {
    constructor(
        public readonly id: string,
        public readonly username: string,
        public message: string,
        private readonly userId: string
    ) { }
    public displayChat(): void {

        const userDiv: HTMLDivElement = document.createElement('div');
        const messDiv: HTMLDivElement = document.createElement('div');
        const usernameEl: HTMLHeadingElement = document.createElement('h5');
        const messageEl: HTMLParagraphElement = document.createElement('p');
        const delButton: HTMLButtonElement = document.createElement('button');
        const messContainer: HTMLDivElement = document.createElement('div');

        usernameEl.innerText = this.username;
        messageEl.innerText = this.message;
        delButton.innerText = 'X';
        delButton.className = 'delete-btn';
        userDiv.className = 'user-div';
        messDiv.className = 'mess-div';
        messContainer.className = 'message-container';
        messContainer.id = this.id;

    }
}