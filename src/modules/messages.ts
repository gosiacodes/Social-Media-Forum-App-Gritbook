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
        const dateEl: HTMLHeadingElement = document.createElement('h5');
        const messageEl: HTMLParagraphElement = document.createElement('p');
        const delButton: HTMLButtonElement = document.createElement('button');
        const messContainer: HTMLDivElement = document.createElement('div');



    }
}