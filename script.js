
const IMG_COUNT = homePageImages.length;


// Step 1: Creating a simple slider
var container = $('#container');

// create img elements and load source
for (var img of homePageImages) {
    var imgDiv = $(`<div class="image"><a href="${img.href}"></a></div>`);
    imgDiv.css('background-image', `url(${img.src})`);
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
var sliderStartForward = $('.image').eq(IMG_COUNT - 1).getBoundingClientRect().left;
var sliderEndForward = $('.image').eq(2 * (IMG_COUNT - 1)).getBoundingClientRect().right - 10;
var sliderStartBackward = $('.image').eq(IMG_COUNT - 1).getBoundingClientRect().right;

// We're repositionning our slider to our first true image
// as currently the first image we're seing is a clone
container.scrollLeft = sliderStartForward;

container.addEventListener('scroll', scrolling);

function scrolling() {
    // We're sliding backwards and reached the end
    if (container.scrollLeft < 1) {
        container.scrollLeft = sliderStartBackward;
    }

    // We're sliding forwards and reached the end
    if (container.scrollLeft > sliderEndForward) {
        container.scrollLeft = sliderStartForward;
    }
}
