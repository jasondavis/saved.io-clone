const mobileButton      = document.getElementById('mobile-menu__button'),
mobileMenu              = document.getElementById('mobile-menu__menu'),
deleteForms              = document.querySelectorAll('#deleteForm'),
notifications           = document.querySelectorAll('.notifications__notification'),

notificationDuration    = 5000;

// When DOM is loaded
window.addEventListener('DOMContentLoaded', (event) => {
    // toggle mobile menu
    if (mobileMenu) {
        mobileButton.addEventListener('click', () => mobileMenu.classList.toggle('flex'));
    }

    // loop every delete form node
    for (const deleteForm of deleteForms) {
        deleteForm.children.deleteBtn.addEventListener('click', (event) => {
            event.preventDefault();
            deleteForm.submit();
        });
    }

    // loop every notification node
    for (const notification of notifications) {
        // remove notification node after @notificationDuration amount of time
        setTimeout(() => { notification.remove() }, notificationDuration);

        // on click on the X icon, remove notification node
        notification.children[1].addEventListener('click', () => {
            notification.remove();
        });
    }
});