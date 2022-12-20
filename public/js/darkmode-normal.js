let darkMode = localStorage.getItem('darkMode');
let dmDarkContainer = document.getElementsByClassName('dm-dark-container');
let dmContainer = document.getElementsByClassName('dm-container');
const darkModeToggle = document.querySelector('#dark-mode-toggle');

const enableDarkMode = () => {
    document.body.classList.add('darkmode');
    [].forEach.call(dmDarkContainer, function(mySingleDiv) {
        mySingleDiv.classList.add('darkmode-dark');
        mySingleDiv.classList.add('dm-dark-border');
    }); 
    [].forEach.call(dmContainer, function(mySingleDiv) {
        mySingleDiv.classList.add('dm-dark-border');
        mySingleDiv.classList.add('darkmode');
    }); 
    localStorage.setItem('darkMode', 'enabled');
    darkModeToggle.classList.remove('fa-moon');
    darkModeToggle.classList.add('fa-sun');
}

const disableDarkMode = () => {
    document.body.classList.remove('darkmode');
    [].forEach.call(dmDarkContainer, function(mySingleDiv) {
        mySingleDiv.classList.remove('darkmode-dark');
        mySingleDiv.classList.remove('dm-dark-border');
    }); 
    [].forEach.call(dmContainer, function(mySingleDiv) {
        mySingleDiv.classList.remove('dm-dark-border');
        mySingleDiv.classList.remove('darkmode');
    }); 
    darkModeToggle.classList.add('fa-moon');
    darkModeToggle.classList.remove('fa-sun');
    localStorage.setItem('darkMode', null);
}

if(darkMode === 'enabled'){
    enableDarkMode();
}

darkModeToggle.addEventListener('click', () => {
    darkMode = localStorage.getItem('darkMode');
    if(darkMode !== 'enabled'){
        enableDarkMode();
    } else {
        disableDarkMode();
    }
})
