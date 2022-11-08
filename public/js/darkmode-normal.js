let darkMode = localStorage.getItem('darkMode');
let headerElement = document.getElementById('header');
const darkModeToggle = document.querySelector('#dark-mode-toggle');

const enableDarkMode = () => {
    document.body.classList.add('darkmode');
    headerElement.classList.add('darkmode-dark'); 
    localStorage.setItem('darkMode', 'enabled');
    darkModeToggle.classList.remove('fa-moon');
    darkModeToggle.classList.add('fa-sun');
    console.log('test')
}

const disableDarkMode = () => {
    document.body.classList.remove('darkmode');
    headerElement.classList.remove('darkmode-dark'); 
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