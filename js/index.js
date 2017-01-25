var carouselIndex = 1;

function currentCarousel(n) {
    showCarousel(carouselIndex = n);
}

/*
 * change current view of carousel
 *
 * */

function showCarousel(n) {
    console.log('next');
    var i;
    var carousel = document.getElementsByClassName("carousel");
    var dots = document.getElementsByClassName("dot");
    if (n > carousel.length) {
        carouselIndex = 1;
    }
    if (n < 1) {
        carouselIndex = carousel.length;
    }
    for (i = 0; i < carousel.length; i++) {
        carousel[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    carousel[carouselIndex - 1].style.display = "block";
    dots[carouselIndex - 1].className += " active";
}


/***
 *
 * set up the carousel
 * after page load
 *
 * ***/
$(document).ready(function () {


    $.ajax({
        url: 'data.json',
        dataType: 'json',
        success: function (data) {
            console.log(data);
            var newContent = '';
            var newNav = '';
            for (var i = 0; i < data.carousel.length; i++) {
                newContent += constructUnit(data.carousel[i], i + 1, data.carousel.length);
                newNav += constructNavUnit(i + 1);
            }
            $('#inject-content').html(newContent);
            $('#navigation').html(newNav);
            showCarousel(1);
        }
    });


    setInterval(function () {
        showCarousel(carouselIndex += 1);
    }, 3000);


    showCarousel(carouselIndex);

    function constructUnit(carousel, index, total) {

        var shortDec = carousel.synopsis.length > 200 ? carousel.synopsis.substr(0, 200) + '...' : carousel.synopsis;
        var html = '';
        html += '<div class="carousel fade">';
        html += '<div class="numbertext">' + index + ' / ' + total + '</div>';
        html += '<a href="http://' + carousel.link + '" target="_blank"><img class="carousel-img" src="' + carousel.imageurl + '" ></a>';
        html += '<div class="title">' + carousel.title + '</div>';
        html += '<div class="describe">' + shortDec + '</div></div>';
        return html;

    }

    function constructNavUnit(index) {

        return '<span class="dot" onclick="currentCarousel(' + index + ')"></span>';

    }

});