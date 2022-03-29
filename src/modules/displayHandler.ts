const travelForum:HTMLDivElement = document.querySelector('#travel-div');
const sportForum:HTMLDivElement = document.querySelector('#sport-div');
const gamingForum:HTMLDivElement = document.querySelector('#gaming-div');
let travelB:boolean = true;
let sportB:boolean = false;
let gamingB:boolean = false;
 
// Function to show discussion forum depending on the topic selected
const showForum = (forum:string) => {
    if (forum == 'travel-forum'){
        travelForum.style.display = 'flex';
        sportForum.style.display = 'none';
        gamingForum.style.display = 'none';
        travelB = true;
        sportB = false;
        gamingB = false;
    }
    else if (forum == 'sport-forum'){
        travelForum.style.display = 'none';
        sportForum.style.display = 'flex';
        gamingForum.style.display = 'none';
        travelB = false;
        sportB = true;
        gamingB = false;
    }
    else if (forum == 'gaming-forum'){
        travelForum.style.display = 'none';
        sportForum.style.display = 'none';
        gamingForum.style.display = 'flex';
        travelB = false;
        sportB = false;
        gamingB = true;
    }
}

export { showForum, travelB, sportB, gamingB };

