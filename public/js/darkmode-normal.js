let darkMode = localStorage.getItem('darkMode');
let dmDarkContainer = document.getElementsByClassName('dm-dark-container');
let dmContainer = document.getElementsByClassName('dm-container');
const darkModeToggle = document.querySelector('#dark-mode-toggle');

const enableDarkMode = () => {
    document.body.classList.add('darkmode');
    [].forEach.call(dmDarkContainer, function(mySingleDiv) {
        mySingleDiv.classList.add('darkmode-dark');
    }); 
    localStorage.setItem('darkMode', 'enabled');
    darkModeToggle.classList.remove('fa-moon');
    darkModeToggle.classList.add('fa-sun');
    console.log('test')
}

const disableDarkMode = () => {
    document.body.classList.remove('darkmode');
    [].forEach.call(dmDarkContainer, function(mySingleDiv) {
        mySingleDiv.classList.remove('darkmode-dark');
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
