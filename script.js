
$(function () {
	var controller = new ScrollMagic.Controller();

	var tween = TweenMax.to("#label_1", 1, {className: "+=label"});
	var tween2 = new TimelineLite().from(".container_H2", 0.3, { scaleX: 0 })
					.from("#label_2", 0.65, { yPercent: 100, ease: Back.easeOut })
					.to(".border_bottom2", 0.2, { scaleX: 0 })
					.from(".container_H3", 0.3, { scaleX: 0 })
					.from("#label_3", 0.65, { yPercent: 100, ease: Back.easeOut })
					.to(".border_bottom3", 0.2, { scaleX: 0 });
	// var tween3 = new TimelineMax().from(".container_H3", 0.3, { scaleX: 0 })
	// 				.from("#label_3", 0.65, { yPercent: 100, ease: Back.easeOut })
	// 				.to(".border_bottom3", 0.2, { scaleX: 0 });

	// build scene
	var scene = new ScrollMagic.Scene({triggerElement: ".main_content1", duration: '35%', triggerHook: 'onLeave'})
					.setTween(tween)
					.addTo(controller);

	var scene2 = new ScrollMagic.Scene({triggerElement: ".container_H2", triggerHook: 0.5})
					.setTween(tween2)
					.addTo(controller);

	// var scene3 = new ScrollMagic.Scene({triggerElement: ".container_H3", triggerHook: 0.5})
	// 				.setTween(tween3)
	// 				.addTo(controller);
});


//==================== Parallax Mounts =====================

$(function () {
	var controller = new ScrollMagic.Controller();

	var tween = TweenMax.to(".paralax_mount1", 1, {x: '-6%', scale: 4});
	var tween2 = TweenMax.to(".paralax_mount2", 1, {x: '6%', scale: 4});
	var tween3 = TweenMax.to(".paralax_mount3", 1, {y: '80%', scale: 2});

	// build scene
	var scene = new ScrollMagic.Scene({triggerElement: ".main_content1", duration: '100%', triggerHook: 0})
					.setTween(tween)
					.addTo(controller);

	var scene2 = new ScrollMagic.Scene({triggerElement: ".main_content1", duration: '100%', triggerHook: 0})
					.setTween(tween2)
					.addTo(controller);

	var scene2 = new ScrollMagic.Scene({triggerElement: ".main_content1", duration: '100%', triggerHook: 0})
					.setTween(tween3)
					.addTo(controller);
});

// ======================СВАЙП СЛАЙДОВ СО СТОРОНЫ===========


//==================== СВАЙП СЛАЙДОВ V3 =======================

var $window = $(window);
  var $document = $(document);
  var $burger = $(".burger");
  var $slidesContainer = $(".pinContainer");
  var $allSlides = $(".content");
  var $currentSlide = $allSlides.first();
  // var slideControl = $("nav a")


  //Animating flag - is our app animating
  var isAnimating = false;

  //The height of the window
  var pageHeight = $window.innerHeight();
  // console.log(pageHeight);
  //Key codes for up and down arrows on keyboard. We'll be using this to navigate change slides using the keyboard
  var keyCodes = {
    UP  : 38,
    DOWN: 40
  };

  var currentIndex = 0;
  
  var timeline0 = new TimelineLite()

	.reverse();

  var timeline1 = new TimelineLite()

	.reverse();

  var timeline2 = new TimelineLite()
	.fromTo("#slide3", 0.5, {xPercent: 100}, {xPercent: 0, ease: Linear.easeNone})
	.from(".content3_neon1", 0.5, {x: 100, y: 100, scaleX: 0, rotation: 90, ease: Back.easeOut}, "-=0.2")
	.fromTo(".content3_neon1", 0.01, {x:-2}, {x:2, clearProps:"x", repeat:20})
	.fromTo(".content3_neon1", 0.01, {opacity: 1}, {opacity: 0.7, clearProps:"opacity", repeat:20}, "-=0.01")
	.from(".title_color1", 0.4, {opacity: 0, scaleX: 4, scaleY: 2, zPercent: 50, ease: Bounce.easeOut}, "-=0.5")
	.from("#content3 .txt_box p", 0.5, {skewX: -85, xPercent: 300, ease: Back.easeOut}, "-=0.4")
    .reverse();

	// $(".againPIN").on("click", function() {
	// 	timeline2.restart();
	// });	
	
  
  var timeline3 = new TimelineLite()//{repeat:-1, yoyo: true,  repeatDelay:0.5}
 	.fromTo("#slide4", 0.5, {xPercent: -100}, {xPercent: 0, ease: Linear.easeNone})
 	.from(".content4_neon2", 0.5, {xPercent: -100, rotation: -360, ease: Back.easeOut}, "-=0.2")
 	.fromTo(".content4_neon2", 0.01, {x:-2}, {x:2, clearProps:"x", repeat:20})
	.fromTo(".content4_neon2", 0.01, {opacity: 1}, {opacity: 0.7, clearProps:"opacity", repeat:20}, "-=0.01")
	.from(".title_color2", 0.5, {yPercent: -100, rotationX: 360, scale: 0.5, zPercent: 50, ease: Bounce.easeOut}, "-=0.5")
	.from("#content4 .txt_box_l p", 0.5, {skewX: 85, xPercent: -300, ease: Back.easeOut}, "-=0.4")
    .reverse();
	
	// $(".againME").on("click", function() {
	// 	timeline3.restart();
	// });	

	
	var timeline4 = new TimelineLite()
 	.fromTo("#slide5", 0.5, {xPercent:  100}, {xPercent: 0, ease: Linear.easeNone})
 	.from(".content5_neon", 0.5, {x: 100, y: 100, scaleX: 0, rotation: 90, ease: Back.easeOut}, "-=0.2")
 	.fromTo(".content5_neon", 0.01, {x:-2}, {x:2, clearProps:"x", repeat:20})
	.fromTo(".content5_neon", 0.01, {opacity: 1}, {opacity: 0.7, clearProps:"opacity", repeat:20}, "-=0.01")
	.from(".title_color3", 0.5, {yPercent: -100, scaleX: 2, scaleY: 0, zPercent: 50, ease: Bounce.easeOut}, "-=0.5")
	.from("#content5 .txt_box p", 0.5, {skewX: -85, xPercent: 300, ease: Back.easeOut}, "-=0.4")
    .reverse();

	// $(".againGreenAttack").on("click", function() {
	// 	timeline4.restart();
	// });	
	
  var timeline5 = new TimelineLite()
 	.fromTo("#slide6", 0.5, {xPercent:  -100}, {xPercent: 0, ease: Linear.easeNone})
 	.from(".content6_neon", 0.5, {xPercent: -100, rotation: -360, ease: Back.easeOut}, "-=0.2")
	.fromTo(".content6_neon", 0.01, {x:-2}, {x:2, clearProps:"x", repeat:20})
	.fromTo(".content6_neon", 0.01, {opacity: 1}, {opacity: 0.7, clearProps:"opacity", repeat:20}, "-=0.01")
	.from(".title_color4", 0.5, {yPercent: -100, rotationX: 360, scale: 0.5, zPercent: 50, ease: Bounce.easeOut}, "-=0.5")
	.from("#content6 .txt_box_l p", 0.5, {skewX: 85, xPercent: -300, ease: Back.easeOut}, "-=0.4")
    .reverse();

	// $(".againHELMUT").on("click", function() {
	// 	timeline5.restart();
	// });	 
  var timeline6 = new TimelineLite()
 	.fromTo("#slide7", 0.5, {xPercent:  100}, {xPercent: 0, ease: Linear.easeNone})
 	.from(".content7_neon", 0.5, {x: 100, y: 100, scaleX: 0, rotation: 90, ease: Back.easeOut}, "-=0.2")
 	.fromTo(".content7_neon", 0.01, {x:-2}, {x:2, clearProps:"x", repeat:20})
	.fromTo(".content7_neon", 0.01, {opacity: 1}, {opacity: 0.7, clearProps:"opacity", repeat:20}, "-=0.01")
	.from(".title_color5", 0.5, {yPercent: -100, scaleX: 2, scaleY: 0, zPercent: 50, ease: Bounce.easeOut}, "-=0.5")
	.from("#content7 .txt_box p", 0.5, {skewX: -85, xPercent: 300, ease: Back.easeOut}, "-=0.4")
    .reverse();

	
  var timelines = [timeline1, timeline1, timeline2, timeline3, timeline4, timeline5, timeline6];

  //Going to the first slide
  goToSlide($currentSlide);
  // console.log($currentSlide);
  //TweenLite.set($currentSlide, {className: "+=active"});

  /*
	*   Adding event listeners
	* */

	$window.on("resize", onResize).resize();
	$window.on("mousewheel DOMMouseScroll", onMouseWheel);
	$document.on("keydown", onKeyDown);
	$burger.on("click", onBurgerClick);
	// $navButtons.on("click", onNavButtonClick);
	// $navGoPrev.on("click", goToPrevSlide);
	// $navGoNext.on("click", goToNextSlide);
	$window.swipe( {
        //Generic swipe handler for all directions
        swipe:onSwipe,
        //Default is 75px, set to 0 for demo so any distance triggers swipe
         threshold:0
     	});
  
  /*
	*   Internal functions
	* */
	function onBurgerClick(event){
		console.log('click');
	    $('.burger-icon, .header__menu2').each(function(){
	    	$(this).toggleClass('active_burg')});
	    $('body').toggleClass('lock');
		}
		
	function onSwipe(event, direction){
          if (direction == "up"){
          	goToNextSlide();
          } else if(direction == "down"){
          	goToPrevSlide();
          }
        }

	function onKeyDown(event)
	{
		var PRESSED_KEY = event.keyCode;

		if(PRESSED_KEY == keyCodes.UP)
			{
			  goToPrevSlide();
			  event.preventDefault();
			}
		else if(PRESSED_KEY == keyCodes.DOWN)
			{
			  goToNextSlide();
			  event.preventDefault();
			}
																				
	}

	function onMouseWheel(event)
	{
	//Normalize event wheel delta
		var delta = event.originalEvent.wheelDelta / 30 || -event.originalEvent.detail;

	//If the user scrolled up, it goes to previous slide, otherwise - to next slide
		if(delta < -1)
			{
			  goToNextSlide();
			}
		else if(delta > 1)
			{
			  goToPrevSlide();
			}
		event.preventDefault();
	}

  /*
	*   If there's a previous slide, slide to it
	* */
	function goToPrevSlide()
	{
		if($currentSlide.prev().length)
			{
			  goToSlide($currentSlide.prev(), "prev");
			}
	}

  /*
	*   If there's a next slide, slide to it
	* */
  function goToNextSlide()
  {
    if($currentSlide.next().length)
    {
      goToSlide($currentSlide.next(), "next");
    }
  }


  /*
	*   Actual transition between slides
	* */
function goToSlide($slide, pn="next")
  {
    //If the slides are not changing and there's such a slide
    if(!isAnimating && $slide.length)
    {
      //setting animating flag to true
      isAnimating = true;
      $currentSlide = $slide;
      currentID = $currentSlide.attr('id');
      NextSlide = $currentSlide.next();    
      // console.log("print");
      console.log(pn);
      //Sliding to current slide
      // if (pn == "next"){
      new TimelineLite()
      .to($slidesContainer, 0.65, {onStart: onSlideChangeStart})
      .to($slidesContainer, 0.7, {scrollTo: {y: pageHeight * $currentSlide.index() }, onComplete: onSlideChangeEnd, onCompleteScope: this});
      // } else if (pn == "prev"){
      // 	TweenLite.to($slidesContainer, 0.7, {scrollTo: {y: pageHeight * $currentSlide.index() }, onStart: onSlideChangeEnd, onCompleteScope: this});
      // }

      //Definig slide status
      TweenLite.to($allSlides.filter(".active"), 0.1, {className: "-=active"});
      TweenLite.to($allSlides.filter($currentSlide), 0.1, {className: "+=active"});

      //Animating menu items
      // TweenLite.to($navButtons.filter(".active"), 0.5, {className: "-=active"});
      // TweenLite.to($navButtons.filter("." + currentID), 0.5, {className: "+=active"});

    }
  }

  function onSlideChangeStart() {
  	console.log(timelines[currentIndex].time());
    timelines[currentIndex].reversed(true).timeScale(2);
  }
  /*
	*   Once the sliding is finished, we need to restore "isAnimating" flag.
	*   You can also do other things in this function, such as changing page title
	* */
  function onSlideChangeEnd() {
    isAnimating = false;
    
    // Reverse the timeline for the previous slide
    // timelines[currentIndex].reversed(true).progress(0);
    
    // Change the index
    currentIndex = $currentSlide.index();
      	console.log("end-" + currentIndex);
    // Play the timeline for the current slide
    timelines[currentIndex].reversed(false);
  }


  /*
	*   When user resize it's browser we need to know the new height, so we can properly align the current slide
	* */
  function onResize(event)
  {

    //This will give us the new height of the window
    var newPageHeight = $window.innerHeight();

    /*
		*   If the new height is different from the old height ( the browser is resized vertically ), the slides are resized
		* */
    if(pageHeight !== newPageHeight)
    {
      pageHeight = newPageHeight;

      //This can be done via CSS only, but fails into some old browsers, so I prefer to set height via JS
      TweenLite.set([$slidesContainer, $allSlides], {height: pageHeight + "px"});

      //The current slide should be always on the top
      TweenLite.set($slidesContainer, {scrollTo: {y: pageHeight * $currentSlide.index() }});
    }

  }