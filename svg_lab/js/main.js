	/*
	Colors before reset
    Green #73C996, Red - #F8876E, Yellow - #F8AD43

    Meter bcg -  #c6d7df to #5AB783,
    Meter stroke -  #7c99a2 to #448962

	Lights

	F8AD43 left
	F8876E mid
	5AB783 right
	*/

	var body = $('body'),
		h1 = $('h1'),
		coin = $('#Coin'),
		path = [{x: -90, y: 120}, {x: -45, y: -220}, {x: -25, y: -220}, {x: 0, y: 120}],
		bulbIdea = $('#BulbIdea'),
		light = $('#MainBulb2'),
		part1 = $('#Part1'),
		Petr = $('#Petr'),
		smile = $('#smile'),
		pointer = $('#pointer'),
		mainBulb = $('#MainBulb'),
		liquids = $('.liquid'),
		liquid01 = $('#Liquid1'),
		liquid02 = $('#Liquid2'),
		liquid03 = $('#Liquid3'),
		liquid04 = $('#Liquid4'),
		liquid05 = $('#Liquid5'),
		liquid06 = $('#Liquid6'),
		liquid07 = $('#Liquid7'),
		liquid08 = $('#Liquid8'),
		liquid09 = $('#Liquid9'),
		liquidInsideMask01 = $('#LiquidInside1Mask'),
		liquidInsideMask02 = $('#LiquidInside2Mask'),
		liquidInsideMask03 = $('#LiquidInside3Mask'),
		liquidInsideMask04 = $('#LiquidInside4Mask'),
		liquidInsideMask05 = $('#LiquidInside5Mask'),
		liquidInsideMask06 = $('#LiquidInside6Mask'),
		liquidInsideMask07 = $('#LiquidInside7Mask'),
		bulb1 = $('#Bulb1 .bulb'),
		bulb2 = $('#Bulb2 .bulb'),
		bulb3 = $('#Bulb3 .bulb'),
		meterBcg = $('#meterBcg'),
		meterStroke = $('#meterStroke'),
		part2light = $('#Part2 .light'),
		part2lightLeft = $('#Part2 .light.left'),
		part2lightMid = $('#Part2 .light.mid'),
		part2lightRight = $('#Part2 .light.right'),
		printerLightsTop = $('#PrinterLIghtTop, #PrinterLIghtTop_2_'),
		printerLightsBottom = $('#PrinterLIghtBottom, #PrinterLIghtBottom_1_'),
		mainLight = $('#MainLight'),
		paper = $('#Paper'),
		paperText = $('#PaperText text'),
		slider = $('#slider'),
		stage = $('#stage'),
		MainMask = $('#MainMask'),
		mainTl = new gsap.timeline();

	//gsap custom functions

	function toggleClass(s, n) {
		s.toggleClass(n);
	}

	//end custom functions

	function clearStage() {
		var clearTl = new gsap.timeline();

		clearTl
			.set(coin, {x: -90, y: 120, scale: 0.5, transformOrigin: 'center center'})
			.set(mainBulb, {fill: '#fff'})
			.set(liquids, {stroke: '#fff'})
			.set(Petr, {scale: 2.5, transformOrigin: 'bottom center', x: '120%', autoAlpha: 1})
			.set(stage, {autoAlpha: 0.5})
			.set(MainMask, {attr: {x: 932}})
			//clear liquid
			.set(liquidInsideMask01, {attr: {y: 492}}) /*y value will be y + height */
			.set(liquidInsideMask02, {attr: {y: 494}})
			.set(liquidInsideMask03, {attr: {y: 491}})
			.set(liquidInsideMask04, {attr: {y: 650}})
			.set(liquidInsideMask05, {attr: {y: 654}})
			.set(liquidInsideMask06, {attr: {y: 651}})
			.set(liquidInsideMask07, {attr: {y: 651}})
			.set(pointer, {rotation: -45, transformOrigin: 'bottom center'})
			.set(paper, {y: '+=55'});

		return clearTl;
	}

	function getIntroTl() {
		var introTl = new gsap.timeline();

		introTl
			.set(h1, {x: '-50%', y: '-=40'})
			.to(Petr, {duration: 0.8, x: '80%', ease: Power4.easeInOut})
			.fromTo(h1, {x: '-46%', autoAlpha: 0}, {x: '-50%', autoAlpha: 1}, '-=0.4')
			.fromTo(smile, {scale: 0.4, transformOrigin: 'center center'}, {duration: 0.4, scale: 1, ease: Power4.easeInOut}, '+=1.2')

			.add('zoom-out')

			.to(Petr, {scale: 1, x: '0%', duration: 1, ease: Power4.easeInOut}, 'zoom-out+=1')
			.to(h1, {autoAlpha: 0, duration: 0.5}, 'zoom-out+=1')
			.set(body, {onStart: toggleClass(body, 'is-active')}, 'zoom-out+=1')
			.to(MainMask, {attr: {x: 131}, duration: 1, ease: Power4.easeInOut}, 'zoom-out+=1.7')
			.set(h1, {y: '-=60', x: 0, text: 'and this is my Green Sock Lab!'})

			.add('text-in')

			.to(h1, {y: '+=20px', autoAlpha: 1, ease: Power4.easeInOut, duration: 0.3}, 'text-in')
			.to(h1, {y: '+=10px', autoAlpha: 0, ease: Power4.easeInOut, duration: 0.3}, '+=2.5')
			.set(h1, {y: '-=30', text: 'Let\'s have some fun...!'})
			.to(h1, {y: '+=20px', autoAlpha: 1, ease: Power4.easeInOut, duration: 0.3})
			.to(h1, {y: '+=10px', autoAlpha: 0, ease: Power4.easeInOut, duration: 0.3}, '+=2')
			.to(stage, {autoAlpha: 1, duration: 1}, '+=0.2');


		return introTl;
	}

	function getIdeaTl() {
		gsap.registerPlugin(MotionPathPlugin);
		var ideaTl = new gsap.timeline();
		ideaTl
			.set(bulbIdea, {autoAlpha: 1})
			.from(bulbIdea, {y: '+=40px', ease: Bounce.easeOut, duration: 0.5})
			.set(h1, {y: '-=30', text: 'You have a cool idea!'})
			.to(h1, {y: '+=20px', autoAlpha: 1, ease: Power4.easeInOut, duration: 0.3})
			.to(h1, {y: '+=10px', autoAlpha: 0, ease: Power4.easeInOut, duration: 0.3}, '+=2')
			.set(h1, {y: '-=30', text: 'And now what?'})
			.fromTo(light, {fill: 'fff'}, {fill: '#73C996', repeat: 3, yoyo: true, duration: 0.3})
			.fromTo(light, {fill: 'fff'}, {fill: '#F8876E', repeat: 3, yoyo: true, duration: 0.3})
			.fromTo(light, {fill: 'fff'}, {fill: '#F8AD43', duration: 0.8})
			.to(bulbIdea, {y: '-=20px', scale: 1.1, transformOrigin: 'center bottom', ease: Power4.easeOut, duration: 0.6})
			.to(bulbIdea, {y: '+=135px', ease: Back.easeIn, duration: 0.2})

			//idea out of the head
			.set(coin, {autoAlpha: 1}, '+=0.3')
			.to(coin, {
				rotation: 720,
				duration: 6,
				ease: "slow(0.9, 0.7, false)",
				motionPath: {
					path: path,
					curviness: 2
				}})
			.set(coin, {autoAlpha: 0})

			//coin In
			.to(h1, {y: '+=20px', autoAlpha: 1, ease: Power4.easeInOut, duration: 0.3}, '-=5.5')
			.to(h1, {y: '+=10px', autoAlpha: 0, ease: Power4.easeInOut, duration: 0.3}, '-=3.5')
			.set(h1, {y: '-=30', text: 'Let gsap do the rest!'}, '-=3.2')
			.to(h1, {y: '+=20px', autoAlpha: 1, ease: Power4.easeInOut, duration: 0.3}, '-=3.2')
			.to(h1, {y: '+=10px', autoAlpha: 0, ease: Power4.easeInOut, duration: 0.3}, '-=1.2')
			.to(part1, {duration: 0.08, rotation: 5, y: '+=5px', x: '+=5px', repeat: 5, yoyo: true, transformOrigin: 'bottom right'});

		return ideaTl;
	}

	function part2Tl() {
		var part2Tl = new gsap.timeline();

		part2Tl
			.add('part2-lights', 0)
			.to(part2light, {fill: '#F8AD43', stagger: 0.1, duration: 0.1}, 'part2-lights')
			.to(part2light, {fill: '#F8876E', stagger: 0.1, duration: 0.1}, 'part2-lights+=0.5')
			.to(part2light, {fill: '#73C996', stagger: 0.1, duration: 0.1}, 'part2-lights+=1')

			.to(pointer, {rotation: 20, duration: 0.5}, 'part2-lights+=1.2')
			.to(meterBcg, {duration: 0.2, fill: '#5AB783'}, 'part2-lights+=1.7')
			.to(meterStroke, {duration: 0.2, stroke: '#448962'}, 'part2-lights+=1.7')
			.to(slider, {duration: 1.2, x: '-=10px', ease: Power4.easeInOut}, 'part2-lights+=1.9')

			.add('set-bulbColor')
			.set(bulb1, {fill: '#5AB783'}, 'set-bulbColor')
			.set(bulb2, {fill: '#F8876E'}, 'set-bulbColor+=0.3')
			.set(bulb3, {fill: '#F8AD43'}, 'set-bulbColor+=0.6');

		return part2Tl;
	}

	function fillTubesTl() {
		var fillTubesTl = new gsap.timeline();

		//get path length

		var liquidLength = [0];

		for(let i = 1; i < 10; i++) {
			var path = document.querySelector('#Liquid' + i);
			var length = path.getTotalLength();

			gsap.set(path, {strokeDasharray: length, strokeDashoffset: length});

			liquidLength.push(length);
		}

		fillTubesTl
			.set(liquids, {stroke: '#f8876e'})
			.to(liquid01, {duration: 1.5, strokeDashoffset: 0, ease: Power0.easeNone})

			.add('flask01')
			.set(h1, {y: '-=30', text: 'crate a tween'})
			.to(h1, {duration: 0.3, y: '+=20px', autoAlpha: 1, ease: Power4.easeInOut})
			.to(h1, {duration: 0.2, y: '+=10px', autoAlpha: 0, ease: Power4.easeInOut}, '+=2')
			.set(h1, {y: '-=30', text: 'and another one'})

			//add another one
			.add('flask02')
			.to(liquid02, {duration: 0.5, strokeDashoffset: 0, ease: Power0.easeNone}, 'flask02')
			.to(h1, {duration: 0.3, y: '+=20px', autoAlpha: 1, ease: Power4.easeInOut})
			.to(h1, {duration: 0.2, y: '+=10px', autoAlpha: 0, ease: Power4.easeInOut}, '+=2')
			.set(h1, {y: '-=30', text: 'add them to timeline'})

			.add('flask03')
			.to(liquid03, {duration: 0.5, strokeDashoffset: 0, ease: Power0.easeNone}, 'flask03')
			.to(h1, {duration: 0.3, y: '+=20px', autoAlpha: 1, ease: Power4.easeInOut})
			.to(h1, {duration: 0.2, y: '+=10px', autoAlpha: 0, ease: Power4.easeInOut}, '+=2')
			.set(h1, {y: '-=30', text: 'create multiple timelines'})

			.add('flask04')
			.to(liquid04, {duration: 0.5, strokeDashoffset: 0, ease: Power0.easeNone})
			.to(liquid05, {duration: 0.6, strokeDashoffset: 0, ease: Power0.easeNone})
			.to(liquid06, {duration: 0.7, strokeDashoffset: 0, ease: Power0.easeNone})
			.to(h1, {duration: 0.3, y: '+=20px', autoAlpha: 1, ease: Power4.easeInOut})
			.to(h1, {duration: 0.2, y: '+=10px', autoAlpha: 0, ease: Power4.easeInOut}, '+=2')
			.set(h1, {y: '-=30', text: 'fine-tune easing'})

			.add('flask05')
			//don't fill main flask yet
			.to(liquid07, {duration: 1.4, strokeDashoffset: 0, ease: Power0.easeNone})
			.to(liquid08, {duration: 1.5, strokeDashoffset: 0, ease: Power0.easeNone})
			.to(h1, {duration: 0.3, y: '+=20px', autoAlpha: 1, ease: Power4.easeInOut})
			.to(h1, {duration: 0.2, y: '+=10px', autoAlpha: 0, ease: Power4.easeInOut}, '+=2')
			.set(h1, {scale: 0.9, y: '-=30', text: 'master GreenSock animation'})

			.add('flask06')
			.to(liquid09, {duration: 0.7, strokeDashoffset: 0, ease: Power0.easeNone})
			.to(h1, {duration: 0.3, y: '+=20px', autoAlpha: 1, ease: Power4.easeInOut})
			.to(h1, {duration: 0.2, y: '+=10px', autoAlpha: 0, ease: Power4.easeInOut}, '+=2')
			.set(h1, {y: '-=30', text: 'and most importantly'})

			//and most importantly + have fun
			.to(h1, {duration: 0.3, y: '+=20px', autoAlpha: 1, ease: Power4.easeInOut})
			.to(h1, {duration: 2, scale: 1, ease: "rough({ template: none.out, strength: 2, points: 60, taper: 'none', randomize: true, clamp: false})"})
			.to(h1, {duration: 0.3, scale: 1.1, autoAlpha: 0, ease: Power0.easeNone})
			.set(h1, {scale: 0.9, text: 'have some fun'})
			.to(h1, {duration: 0.3, autoAlpha: 1, ease: Power4.easeInOut}, '+=0.3')
			.to(h1, {duration: 0.2, autoAlpha: 0, ease: Power4.easeInOut}, '+=1')
			.set(h1, {y: '-=30', text: 'Want to learn green Sock from scratch?'})
			.add('main-flask')

			//fill in all flasks
			.to(liquidInsideMask01, {duration: 6, attr: {y: 415}, ease: Power0.easeInOut}, 'flask01')
			.to(liquidInsideMask02, {duration: 5, attr: {y: 451}, ease: Power0.easeInOut}, 'flask02')
			.to(liquidInsideMask03, {duration: 5, attr: {y: 452}, ease: Power0.easeInOut}, 'flask03+=0.5')
			.to(liquidInsideMask04, {duration: 6, attr: {y: 602}, ease: Power0.easeInOut}, 'flask04+=1.8')
			.to(liquidInsideMask06, {duration: 6, attr: {y: 608}, ease: Power0.easeInOut}, 'flask05+=2.9')
			.to(liquidInsideMask07, {duration: 6, attr: {y: 608}, ease: Power0.easeInOut}, 'flask06+=0.7')
			.to(liquidInsideMask05, {duration: 5, attr: {y: 563}, ease: Power0.easeInOut}, 'main-flask');

		return fillTubesTl;
	}

	function finalTl() {
		var finalTl = new gsap.timeline();
		var lightsBlink = new gsap.timeline({repeat: -1, yoyo: true, defaults: {duration: 0.1}});
		//var hideAndSeek = new gsap.timeline({repeat: -1, repeatDelay: 5, yoyo: false});

		lightsBlink
			.fromTo(printerLightsTop, {fill: '#5ab783'}, {immediateRender: false, fill: '#f8ad83'})
			.fromTo(printerLightsBottom, {fill: '#5ab783'}, {immediateRender: false, fill: '#f8ad83'}, '+=0.2')
			.fromTo(printerLightsTop, {fill: '#f8ad83'}, {immediateRender: false, fill: '#f88673'}, '-=0.2')
			.fromTo(printerLightsBottom, {fill: '#f8ad83'}, {immediateRender: false, fill: '#f88673'}, '+=0.2')
			.fromTo(printerLightsTop, {fill: '#f8876e'}, {immediateRender: false, fill: '#5ab783'}, '-=0.2')
			.fromTo(printerLightsBottom, {fill: '#f8876e'}, {immediateRender: false, fill: '#5ab783'}, '+=0.2');

		// hideAndSeek
		// 	.to(paper, {duration: 0.6, y: '+=55', ease: "steps(10)"})
		// 	.set(paperText, {text: 'YES SIR!', x: '+=25'})
		// 	.to(paper, {duration: 1, y: '-=55', ease: "steps(10)"})
		// 	.to(paper, {duration: 1, y: '+=55', ease: "steps(10)"}, '+=5')
		// 	.set(paperText, {text: 'SURE MAN!', x: '-=15'})
		// 	.to(paper, {duration: 1, y: '-=55', ease: "steps(10)"})
		// 	.to(paper, {duration: 1, y: '+=55', ease: "steps(10)"}, '+=5')
		// 	.to(paper, {duration: 0.6, y: '-=55', ease: "steps(10)"});

		finalTl
			.fromTo(mainBulb, {fill: 'fff'}, {fill: '#F8AD43', repeat: 10, yoyo: true, duration: 0.04})
			.to(h1, {duration: 0.3, y: '+=20px', autoAlpha: 1, ease: Power4.easeInOut}, '+=0.3')
			.add(lightsBlink, '2')
			.to(paper, {duration: 3, y: 0, ease: "steps(10)"}, '2.5');
			// .add(hideAndSeek, '10.5');

		return finalTl;
	}
	function init() {
		mainTl
			.add(clearStage())
			.add(getIntroTl(), 'scene-intro')
			.add(getIdeaTl(), 'scene-idea')
			.add(part2Tl(), 'part-two')
			.add(fillTubesTl(), 'fill-tubes')
			.add(finalTl(), 'final-scene');

		// mainTl
		// 	.seek('final-scene+=5');
	}


	init();
