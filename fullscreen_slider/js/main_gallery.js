var slide = $('.slide'),
    slideActive = $('.slide.active'),
    navbar = $('.nav'),
    navLink = $('.nav a'),
    navLi = $('.nav li'),
    body = $('body');

function init() {
    gsap.set(body, {
        onComplete: toggleClass,
        onCompleteParams: [body, 'loading']
    });
    gsap.set(slideActive, { x: '0%' });
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
        // tlDown.timeScale(0.1);
        // tlUp.timeScale(0.1);

    if (sectionFrom.index() < sectionTo.index()) {
        tlDown
            .set(body, {
                onComplete: toggleClass,
                onCompleteParams: [body, 'is-animating']
            })
            .to(sectionFrom, {duration: 0.2, scale: 0.85}, '0')
            .to(sectionTo, {duration: 0.2, scale: 0.85}, '0')
            .to(navbar, {duration: 0.6, y: 170, autoAlpha: 0}, '0')

            .to(sectionFrom, {duration: 1.2, x: '-=100%', ease: Power4.easeInOut, clearProps: 'all'}, '0')
            .to(sectionTo, {duration: 1.2, x: '0%', ease: Power4.easeInOut}, '0')
            .to(bcgFrom, {duration: 1.2, x: '30%', ease: Power4.easeInOut, clearProps: 'all'}, '0')
            .from(bcg, {duration: 1.2, x: '-30%', ease: Power4.easeInOut, clearProps: 'all'}, '0')

            .add('scaleNormal')
        
            .to(sectionFrom, {duration: 0.2, scale:1}, 'scaleNormal-=0.3')
            .to(sectionTo, {duration: 0.2, scale: 1}, 'scaleNormal-=0.3')
            .from(heading, {duration: 0.7, autoAlpha: 0, y: -40, ease: Power4.easeInOut}, 'scaleNormal')
            .from(subheading, {duration: 0.7, autoAlpha: 0, y: -40, ease: Power4.easeInOut}, 'scaleNormal+=0.2')
            .to(navbar, {duration: 0.4, y: 0, autoAlpha: 1}, 'scaleNormal')

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
            .set(sectionTo, {x: '-100%'})

            .to(sectionFrom, {duration: 0.2, scale: 0.85}, '0')
            .to(sectionTo, {duration: 0.2, scale: 0.85}, '0')
            .to(navbar, {duration: 0.6, y: 170, autoAlpha: 0}, '0')
        
            .to(sectionFrom, {duration: 1.2, x: '100%', ease: Power4.easeInOut, clearProps: 'all'}, '0')
            .to(sectionTo, {duration: 1.2, x: '0%', ease: Power4.easeInOut}, '0')
            .to(bcgFrom, {duration: 1.2, x: '-30%', ease: Power4.easeInOut, clearProps: 'all'}, '0')
            .from(bcg, {duration: 1.2, x: '30%', ease: Power4.easeInOut, clearProps: 'all'}, '0')

            .add('scaleNormal')
            .to(sectionFrom, {duration: 0.2, scale:1}, 'scaleNormal')
            .to(sectionTo, {duration: 0.2, scale: 1}, 'scaleNormal')
            .from(heading, {duration: 0.7, autoAlpha: 0, y: -40, ease: Power4.easeInOut}, 'scaleNormal')
            .from(subheading, {duration: 0.7, autoAlpha: 0, y: -40, ease: Power4.easeInOut}, 'scaleNormal+=0.2')
            .to(navbar, {duration: 0.4, y: 0, autoAlpha: 1}, 'scaleNormal')

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
