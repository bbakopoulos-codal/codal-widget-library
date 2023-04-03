window.addEventListener("DOMContentLoaded", (e) => {
    const featuredCards = document.querySelectorAll('.featuredCards-list .featuredCards-item');
    if (featuredCards.length) {
        $('ul.featuredCards-list').slick({
            dots: false,
            infinite: true,
            autoplay: false,
            slidesToShow: 4,
            slidesToScroll: 4,
            responsive: [{
                    breakpoint: 801,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                },
                {
                    breakpoint: 500,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 350,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }
});