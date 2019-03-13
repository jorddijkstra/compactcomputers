function getScaledWidth(image, height) {
    var img = new Image();
    img.src = image;

    // get the real sizes of the image
    var realWidth = img.naturalWidth;
    var realHeight = img.naturalHeight;

    // find the new scaled width
    return realWidth * height / realHeight;
}


function createSlider(images, IMG_COUNT, id) {
    // create slider elements
    var newContainer = $(`<div class="container" id="${id}"></div>`);
    $('<hr>').insertBefore('#desc');
    $(newContainer).insertBefore('#desc');
    $('<hr>').insertBefore('#desc');
    var container = $(`#${id}`);

    // create img elements and load source
    for (let i in images) {
        var imgDiv = $(`<div class="image"><a href="${images[i]}"></a></div>`);
        imgDiv.css('background-image', `url(${images[i]})`);
        imgDiv.width(getScaledWidth(images[i], 200));
        container.append(imgDiv);
    }

    // Step 2: Preparing for infinite scroll
    clones1 = [];
    clones2 = [];
    // get first image
    //var firstImg = document.images[0].cloneNode(false);
    var firstImg = $('.image').eq(0).clone();
    // loop over rest of images
    for (let i = 1; i < IMG_COUNT - 1; i++) {
        clones1.push($('.image').eq(i).clone());
        clones2.push($('.image').eq(i).clone());
    }
    // and get last image
    var lastImg = $('.image').eq(IMG_COUNT - 1).clone();


    // start inserting
    lastImg.insertBefore($('.image').eq(0));
    for (let i = clones1.length - 1; i >= 0; i--) {
        clones1[i].insertBefore($('.image').eq(0));
    }

    // and appending
    container.append(firstImg);
    for (let i = 0; i < clones1.length; i++) {
        container.append(clones2[i]);
    }
    
    // Step 3: Adding an infinite scroll effect
    var sliderStartForward = $('.image').eq(IMG_COUNT - 1).offset().left;
    var sliderEndForward = $('.image').eq(2 * (IMG_COUNT - 1)).offset().right - 10;
    var sliderStartBackward = $('.image').eq(IMG_COUNT - 1).offset().right;

    // We're repositionning our slider to our first true image
    // as currently the first image we're seing is a clone
    container.scrollLeft = sliderStartForward;


    container.on('scroll', function() {
        // We're sliding backwards and reached the end
        if (container.scrollLeft < 1) {
            container.scrollLeft = sliderStartBackward;
        }

        // We're sliding forwards and reached the end
        if (container.scrollLeft > sliderEndForward) {
            container.scrollLeft = sliderStartForward;
        }
    });
}

$.getJSON( "data/data.json", function(data) {
    // get parameters (project number)
    let page = new URLSearchParams(window.location.search).get('p');

    // change scores with spaces to look nice
    var pageFormat = page.replace(/-/g, ' ');
    // create page title
    document.title = `${pageFormat} - Compact Computers`;
    // create name of slider
    $('#project_name').text(pageFormat.toUpperCase());
    // add link to about page
    $('#project_name').append('<span><a href="about.html">ABOUT</a></span>');
    
    // add description
    $('#desc').text(data[page].description);
    
    // define images and count them
    images = data[page].images;
    const IMG_COUNT = Object.keys(images).length;

    // create the slider
    createSlider(images, IMG_COUNT, page);
}).fail(function() {
    alert('error loading data');
});
