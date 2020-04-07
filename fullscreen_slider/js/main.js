var slide = $('.slide'),
    slideActive = $('.slide.active'),
    navLink = $('.nav a'),
    navLi = $('.nav li'),
    body = $('body');

function init() {
    gsap.set(body, {
        onComplete: toggleClass,
        onCompleteParams: [body, 'loading']
    });
    gsap.set(slideActive, { y: '0%' });
}
//init function
init();

//nav click
navLink.click(function (e) {
    if (e.preventDefault) {
        e.preventDefault();
    } else {
        e.returnValue = false;
    }
    if(!body.hasClass('is-animating')) {

        var sectionFrom = $('.slide.active'),
        sectionToId = $(e.target).attr('href')
        sectionTo = $('div' + sectionToId);

        if (sectionFrom.attr('id') !== sectionTo.attr('id')) {
            scrollToSection(sectionFrom, sectionTo);
        }
    }
    
});

function scrollToSection(sectionFrom, sectionTo) {
    var heading = sectionTo.find('h1'),
        subheading = sectionTo.find('p'),
        bcg = sectionTo.find('.bcg'),
        bcgFrom = sectionFrom.find('.bcg'),
        tlDown = new gsap.timeline({onComplete: setActiveSection(sectionFrom, sectionTo)}),
        tlUp = new gsap.timeline();

    if (sectionFrom.index() < sectionTo.index()) {
        tlDown
            .set(body, {
                onComplete: toggleClass,
                onCompleteParams: [body, 'is-animating']
            })
            .to(sectionFrom, {duration: 1.2, y: '-=100%', ease: Power4.easeInOut, clearProps: 'all'}, '0')
            .to(sectionTo, {duration: 1.2, y: '0%', ease: Power4.easeInOut}, '0')
            .to(bcgFrom, {duration: 1.2, y: '30%', ease: Power4.easeInOut, clearProps: 'all'}, '0')
            .from(bcg, {duration: 1.2, y: '-30%', ease: Power4.easeInOut, clearProps: 'all'}, '0')
            .from(heading, {duration: 0.7, autoAlpha: 0, y: 40, ease: Power4.easeInOut}, '-=1')
            .from(subheading, {duration: 0.7, autoAlpha: 0, y: 40, ease: Power4.easeInOut}, '-=0.6')
            .set(body, {
                onComplete: toggleClass,
                onCompleteParams: [body, 'is-animating']
            });

    } else {
        tlUp
            .set(body, {
                onComplete: toggleClass,
                onCompleteParams: [body, 'is-animating']
            })
            .set(sectionTo, {y: '-100%'})
            .to(sectionFrom, {duration: 1.2, y: '100%', ease: Power4.easeInOut, clearProps: 'all'}, '0')
            .to(sectionTo, {duration: 1.2, y: '0%', ease: Power4.easeInOut}, '0')
            .to(bcgFrom, {duration: 1.2, y: '-30%', ease: Power4.easeInOut, clearProps: 'all'}, '0')
            .from(bcg, {duration: 1.2, y: '30%', ease: Power4.easeInOut, clearProps: 'all'}, '0')
            .from(heading, {duration: 0.7, autoAlpha: 0, y: -40, ease: Power4.easeInOut}, '-=1')
            .from(subheading, {duration: 0.7, autoAlpha: 0, y: -40, ease: Power4.easeInOut}, '-=0.6')
            .set(body, {
                onComplete: toggleClass,
                onCompleteParams: [body, 'is-animating']
            });
    }
}

function setActiveSection(sectionFrom, sectionTo) {
    //add active class to the current slide 
    sectionFrom.removeClass('active');
    sectionTo.addClass('active');

    //add body class highlighting the current slide
    body.removeAttr('class').addClass($(sectionTo).attr('id') + '-active');

    //highlight current slide in the navigation
    var currentSlideIndex = parseInt($(sectionTo).attr('id').slice(-2)) -1;
    navLi.removeAttr('class');
    navLi.eq(currentSlideIndex).addClass('active');
}

// ?Custom Functions

function toggleClass(s, n) {
    s.toggleClass(n);
}
