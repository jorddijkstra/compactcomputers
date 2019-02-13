const images = [
    {
        "src": "img/1.jpg",
        "link": "project1.html"
    },
    {
        "src": "img/2.jpg",
        "link": "project2.html"
    },
    {
        "src": "img/3.jpg",
        "link": "project3.html"
    },
    {
        "src": "img/4.jpg",
        "link": "project4.html"
    },
    {
        "src": "img/5.jpg",
        "link": "project5.html"
    }
];

const IMG_COUNT = images.length;


// Step 1: Creating a simple slider
var container = document.getElementById('container');

for (var i = 1; i <= IMG_COUNT; i++) {
    var img = document.createElement('img');
    var src = `img/${i}.jpeg`;
    img.src = src;
    container.appendChild(img);
}

// Step 2: Preparing for infinite scroll
clones1 = [];
clones2 = [];
// get first image
var firstImg = document.images[0].cloneNode(false);
// loop over rest of images
for (let i = 1; i < IMG_COUNT - 1; i++) {
    clones1.push(document.images[i].cloneNode(false));
    clones2.push(document.images[i].cloneNode(false));
}
// and get last image
var lastImg = document.images[IMG_COUNT - 1].cloneNode(false);



// start inserting
container.insertBefore(lastImg, document.images[0]);
for (let i = clones1.length - 1; i >= 0; i--) {
    container.insertBefore(clones1[i], document.images[0]);
}

// and appending
container.appendChild(firstImg);
for (let i = 0; i < clones1.length; i++) {
    container.appendChild(clones2[i]);
}

// Step 3: Adding an infinite scroll effect
var sliderStartForward = document.images[IMG_COUNT - 1].getBoundingClientRect().left;
var sliderEndForward = document.images[2 * (IMG_COUNT - 1)].getBoundingClientRect().right - 10;
var sliderStartBackward = document.images[IMG_COUNT - 1].getBoundingClientRect().right;

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
