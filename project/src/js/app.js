(function() {
    if (!navigator.onLine) {
        // show you're offline feedback
        console.log('Youre offline');
        document.querySelector('.feedback').classList.add('show');
    }
})();