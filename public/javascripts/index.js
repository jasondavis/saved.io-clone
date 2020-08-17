const mobileButton      = document.getElementById('mobile-menu__button'),
mobileMenu              = document.getElementById('mobile-menu__menu'),
deleteForm              = document.getElementById('deleteForm'),
deleteBtns              = document.querySelectorAll('#deleteBtn'),
notifications           = document.querySelectorAll('.notifications__notification'),

notificationDuration    = 5000;

// When DOM is loaded
window.addEventListener('DOMContentLoaded', (event) => {
    // toggle mobile menu
    mobileButton.addEventListener('click', () => mobileMenu.classList.toggle('flex'));

    // event listener for every delete button of every item
    for (const btn of deleteBtns) {
        btn.addEventListener('click', (event) => {
            event.preventDefault();
            deleteForm.submit();
        });
    }

    // remove notification after @notificationDuration amount of time
    for (const notification of notifications) {
        setTimeout(() => { notification.remove() }, notificationDuration);
    }
});