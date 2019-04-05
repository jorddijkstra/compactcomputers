function createMenu(data) {

    var categorySet = [];
    $('<ul id="menu">HOME</ul>').insertBefore('#desc');

    for (var entry in data) {
        var category = data[entry].category;

        // only add to the set if it's not there yet
        if (!categorySet.includes(category)) {
            categorySet.push(category);
            var formattedCategory = category.replace(/-/g, ' ');
            $('#menu').append(`<li><a href="gallery.html?c=${category}">
                ${formattedCategory}</a></li>`);
        }
    }
}

$.getJSON("data/data.json", function(data) {
    createMenu(data);
}).fail(function(err) {
    alert('error loading data');
    console.log(err);
});
