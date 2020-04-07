//mouse customization
gsap.set(".ball", {xPercent: -50, yPercent: -50});

var ball = document.querySelector(".ball");
var pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
var mouse = { x: pos.x, y: pos.y };
var speed = 0.1;

var xSet = gsap.quickSetter(ball, "x", "px");
var ySet = gsap.quickSetter(ball, "y", "px");

window.addEventListener("mousemove", e => {    
  mouse.x = e.x;
  mouse.y = e.y;  
});

gsap.ticker.add(() => {
  pos.x += (mouse.x - pos.x) * speed;
  pos.y += (mouse.y - pos.y) * speed;
  xSet(pos.x);
  ySet(pos.y);
});


//variables

var projects = document.getElementById('projects');
var project = $('.project');
var projectImgBefore = CSSRulePlugin.getRule('.project-image:before');
var projectImgAfter = CSSRulePlugin.getRule('.project-image:after');
var tlProject, tlProjects, tlProjectLoader, tlCircle;

tlProject = new gsap.timeline({repeat: -1,  repeatDelay: 2, paused: false});

project.each(function(index, element) {
    var projectClasses = $(this).attr('class').split(' '),
        projectClass = projectClasses[1],
        pixel = $(this).find('.pixel'),
        pixels = $(this).find('.project-pixels'),
        projectTitle = $(this).find('.project-title'),
        projectSubtitle = $(this).find('.project-subtitle'),
        projectImage = $(this).find('.project-image');
        
        //projects CTA
        var tlProjectsCTA = new gsap.timeline(),
            projectLink = $(this).find('.button-container'),
            projectLinkButton = $(this).find('.button'),
            projectLinkSpan = $(this).find('.bp'),
            projectLinkText = $(this).find('.bp-text');
        tlProjectsCTA
            .to(projectSubtitle, {duration: 0.3, autoAlpha: 0, yPercent: 100, ease: Back.easeOut})
            .from(projectLinkSpan, {duration: 0.3, stagger: .1, autoAlpha: 0, yPercent: -100, ease: Back.easeOut})
            .from(projectLinkText, {duration: 0.3, autoAlpha: 0, x: '-100%', ease: Power4.easeInOut}, '-=0.15');

        //project loader 
        tlProjectLoader = new gsap.timeline({paused: true});
        var loader = $(this).find('.loader');

        tlProjectLoader
        //.to([projectImgBefore, projectImgAfter], {duration: 0.7, cssRule: {opacity: '0'}})
        .fromTo(loader, {strokeDasharray: 547, strokeDashoffset: 547}, {duration: 5, strokeDasharray: 547, strokeDashoffset: 0, ease: Power0.easeNone})
        .to(loader, {duration: 0.4, autoAlpha: 0, onComplete: resumeProjects})
        //.to([projectImgBefore, projectImgAfter], {duration: 0.7, cssRule: {opacity: '1'}}, '-=0.4');

        //spin circles 
        tlCircle = new gsap.timeline({repeat: -1, yoyo: true});
        tlCircle
            .to(projectImgBefore, 0.8, {cssRule:{top:"5px"}, ease:Linear.easeNone})
            .to(projectImgBefore, 0.8, {cssRule:{left:"5px"}, ease:Linear.easeNone})
            .to(projectImgBefore, 0.8, {cssRule:{top:"-5px"}, ease:Linear.easeNone})
            .to(projectImgBefore, 0.8, {cssRule:{left:"-5px"}, ease:Linear.easeNone})
            .to(projectImgAfter, 0.7, {cssRule:{bottom:"6px"}, ease:Linear.easeNone}, '0')
            .to(projectImgAfter, 0.7, {cssRule:{right:"6px"}, ease:Linear.easeNone}, '0.7')
            .to(projectImgAfter, 0.7, {cssRule:{bottom:"-6px"}, ease:Linear.easeNone}, '1.1')
            .to(projectImgAfter, 0.7, {cssRule:{right:"-6px"}, ease:Linear.easeNone}, '1.5');
        
            //main project timline

        tlProjects = new gsap.timeline();
        tlProjects.set(projects, {autoAlpha: 1});


        //create project timeline
        tlProject
            .set($(this), {zIndex: 1})
            .set([projectTitle, projectSubtitle, pixel], {autoAlpha: 0})
            .fromTo(projectImage, {autoAlpha: 0, xPercent: -200}, {autoAlpha: 1, xPercent: '-10', ease: Power4.easeInOut, duration: 1.1})
            .add('imageIn')
            .fromTo(pixel, {autoAlpha: 0, x: '-=10'}, {autoAlpha: 1, x: 0, duration: .3, stagger: 0.06, onStart: updateClass, onStartParams: [projectClass]}, '-=.8')
            .add('pixelsIn')
            .fromTo(projectTitle, {duration: .7, autoAlpha: 0, xPercent: -50}, {autoAlpha: 1, xPercent: -5, ease: Power4.easeInOut}, '-=0.6')
            .fromTo(projectSubtitle, {duration: .7, autoAlpha: 0, xPercent: -50}, {autoAlpha: 1, xPercent: -2, ease: Power4.easeInOut}, '-=0.4')
            .add('titleIn')
            .add(tlProjectsCTA, '+=2') //add btn animation to the tlProject
            .to(projectTitle, {duration: 4.3, xPercent: '+=5', ease: Linear.easeNone}, 'titleIn')
            .to(projectSubtitle, {duration: 4.3, xPercent: '+=2', ease: Linear.easeNone}, 'titleIn')
            .add('titleOut')
            .to(projectImage, {duration: 5, xPercent: 0, ease: Linear.easeNone, onComplete: pauseProjects, onCompleteParams: [projectClass, tlProjectLoader]}, 'imageIn')
            .add('imageOut')
            .to(pixels, {duration: 4.1, x: -5, ease: Linear.easeNone}, 'pixelsIn')
            .to([projectTitle, projectSubtitle, projectLink], {duration: .5, autoAlpha: 0, xPercent: '+=10', ease: Power4.easeInOut}, 'titleOut')
            .to(projectImage, {duration: .4, autoAlpha: 0, xPercent: '+=80', ease: Power4.easeInOut}, 'titleOut+=.1');

            tlProjects.add(tlProject);
    });
    //create a function to update the body class
    function updateClass(projectClass) {
        $('body').attr('class', projectClass);
    }

    function pauseProjects(projectClass, tlProjectLoader) {
        tlProjects.pause();

        if(projectClass != 'project00') {
            tlProjectLoader.play();
            tlProjectLoader.seek(0);
        }
    }
    function resumeProjects() {
        tlProjects.play();
    }
    $('.project00 .button').click(function(e) {
        if(e.preventDefault) {
            e.preventDefault();
          } else {
            e.returnValue = false;
          }

          tlProjects.resume();
    });


 

