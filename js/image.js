let img_link = new URLSearchParams(window.location.search).get('i');

$('img').attr('src', img_link);
