$('form').on('submit', (event) => {
    // prevent from reloading
    event.preventDefault();
    
    var input = $('input:first');
    if (input.val() === '1997') {
        window.location.replace('home.html')
    } else {
        input.val('');
    }
});