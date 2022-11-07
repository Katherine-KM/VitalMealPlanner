let darkMode = localStorage.getItem('darkMode');
let headerElement = document.getElementById('header');
const darkModeToggle = document.querySelector('#dark-mode-toggle');

const enableDarkMode = () => {
    document.body.classList.add('darkmode');
    headerElement.classList.add('darkmode-header'); 
    localStorage.setItem('darkMode', 'enabled');
}

const disableDarkMode = () => {
    document.body.classList.remove('darkmode');
    headerElement.classList.remove('darkmode-header'); 
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