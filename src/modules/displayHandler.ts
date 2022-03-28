const travelForum:HTMLDivElement = document.querySelector('#travel-div');
const sportForum:HTMLDivElement = document.querySelector('#sport-div');
const gamingForum:HTMLDivElement = document.querySelector('#gaming-div');
 
// Function to show discussion forum depending on the topic selected
const showForum = (forum:string) => {
    if (forum == 'travel-forum'){
        travelForum.style.display = 'flex';
        sportForum.style.display = 'none';
        gamingForum.style.display = 'none';
    }
    else if (forum == 'sport-forum'){
        travelForum.style.display = 'none';
        sportForum.style.display = 'flex';
        gamingForum.style.display = 'none';
    }
    else if (forum == 'gaming-forum'){
        travelForum.style.display = 'none';
        sportForum.style.display = 'none';
        gamingForum.style.display = 'flex';
    }
}

export { showForum };

