let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
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
  var pageWidth = $window.innerWidth();
  var orient = orientation();
  //Key codes for up and down arrows on keyboard. We'll be using this to navigate change slides using the keyboard
  var keyCodes = {
    UP  : 38,
    DOWN: 40
  };

  var currentIndex = 0;
  
  var timeline0 = new TimelineLite()
  	.from("#label_1", 1, {yPercent: -100, scale: 0.1})
  	.from(".paralax_mount1", 1, {x: '-10%', scale: 4}, "-=1")
  	.from(".paralax_mount2", 1, {x: '10%', scale: 4}, "-=1")
	.from(".paralax_mount3", 1, {y: '100%', scale: 2}, "-=1")
	.reverse();

  var timeline1 = new TimelineLite()
	.from(".container_H2", 0.3, { scaleX: 0 })
	.from("#label_2", 0.6, { yPercent: 100, ease: Back.easeOut })
	.to(".border_bottom2", 0.2, { scaleX: 0 })
	.from(".container_H3", 0.3, { scaleX: 0 }, "-=0.3")
	.from("#label_3", 0.6, { yPercent: 100, ease: Back.easeOut })
	.to(".border_bottom3", 0.2, { scaleX: 0 })
	.reverse();

  var timeline2 = new TimelineLite()
	.add(orientSlide("#slide3"))
	.from(".content3_neon1", 0.5, {x: 100, y: 100, scaleX: 0, rotation: 90, ease: Back.easeOut})
	.fromTo(".content3_neon1", 0.01, {x:-2}, {x:2, clearProps:"x", repeat:20})
	.fromTo(".content3_neon1", 0.01, {opacity: 1}, {opacity: 0.7, clearProps:"opacity", repeat:20}, "-=0.01")
	.from(".title_color1", 0.4, {opacity: 0, scaleX: 4, scaleY: 2, zPercent: 50, ease: Bounce.easeOut}, "-=0.5")
	.from("#slide3 .txt_box p", 0.5, {skewX: -85, xPercent: 300, ease: Back.easeOut}, "-=0.4")
    .reverse();

	
  
  var timeline3 = new TimelineLite()//{repeat:-1, yoyo: true,  repeatDelay:0.5}
 	.add(orientSlide("#slide4"))
 	.from(".content4_neon2", 0.5, {xPercent: -100, rotation: -360, ease: Back.easeOut})
 	.fromTo(".content4_neon2", 0.01, {x:-2}, {x:2, clearProps:"x", repeat:20})
	.fromTo(".content4_neon2", 0.01, {opacity: 1}, {opacity: 0.7, clearProps:"opacity", repeat:20}, "-=0.01")
	.from(".title_color2", 0.5, {opacity: 0, yPercent: -100, rotationX: 360, scale: 0.5, zPercent: 50, ease: Bounce.easeOut}, "-=0.5")
	.from("#slide4 .txt_box p", 0.5, {skewX: 85, xPercent: -300, ease: Back.easeOut}, "-=0.4")
    .reverse();
	

	
	var timeline4 = new TimelineLite()
 	.add(orientSlide("#slide5"))
 	.from(".content5_neon", 0.5, {x: 100, y: 100, scaleX: 0, rotation: 90, ease: Back.easeOut})
 	.fromTo(".content5_neon", 0.01, {x:-2}, {x:2, clearProps:"x", repeat:20})
	.fromTo(".content5_neon", 0.01, {opacity: 1}, {opacity: 0.7, clearProps:"opacity", repeat:20}, "-=0.01")
	.from(".title_color3", 0.5, {yPercent: -100, scaleX: 2, scaleY: 0, zPercent: 50, ease: Bounce.easeOut}, "-=0.5")
	.from("#slide5 .txt_box p", 0.5, {skewX: -85, xPercent: 300, ease: Back.easeOut}, "-=0.4")
    .reverse();
	
	
  var timeline5 = new TimelineLite()
 	.add(orientSlide("#slide6"))
 	.from(".content6_neon", 0.5, {xPercent: -100, rotation: -360, ease: Back.easeOut})
	.fromTo(".content6_neon", 0.01, {x:-2}, {x:2, clearProps:"x", repeat:20})
	.fromTo(".content6_neon", 0.01, {opacity: 1}, {opacity: 0.7, clearProps:"opacity", repeat:20}, "-=0.01")
	.from(".title_color4", 0.5, {opacity: 0, yPercent: -100, rotationX: 360, scale: 0.5, zPercent: 50, ease: Bounce.easeOut}, "-=0.5")
	.from("#slide6 .txt_box_l p", 0.5, {skewX: 85, xPercent: -300, ease: Back.easeOut}, "-=0.4")
    .reverse();

	 
  var timeline6 = new TimelineLite()
 	.add(orientSlide("#slide7"))
 	.from(".content7_neon", 0.5, {x: 100, y: 100, scaleX: 0, rotation: 90, ease: Back.easeOut})
 	.fromTo(".content7_neon", 0.01, {x:-2}, {x:2, clearProps:"x", repeat:20})
	.fromTo(".content7_neon", 0.01, {opacity: 1}, {opacity: 0.7, clearProps:"opacity", repeat:20}, "-=0.01")
	.from(".title_color5", 0.5, {yPercent: -100, scaleX: 2, scaleY: 0, zPercent: 50, ease: Bounce.easeOut}, "-=0.5")
	.from("#slide7 .txt_box p", 0.5, {skewX: -85, xPercent: 300, ease: Back.easeOut}, "-=0.4")
    .reverse();

	
  var timelines = [timeline0, timeline1, timeline2, timeline3, timeline4, timeline5, timeline6];

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
		if (isMobile()){
		$burger.swipe({
			tap:onBurgerClick  
    	});

		$window.swipe( {
        	swipe:onSwipe
     	});
	} else {
		$burger.on("click", onBurgerClick);
	}
  
//================= проверка мобильного устройства =================
function isMobile() {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
          return true; 
    }
    return false;
}

//===================================================================

// ================ Internal functions ==========================

	function orientSlide(element)
	{
		if (orientation() == "portrait") {
			var tlMoveY = TweenLite.fromTo(element, 0.5, {opacity: 0, yPercent: 100}, {opacity: 1, yPercent: 0, ease: Linear.easeNone});
			return tlMoveY;
		} else if(Number(element.split("")[6])%2){
			var tlMoveR = TweenLite.fromTo(element, 0.5, {xPercent: 100}, {xPercent: 0, ease: Linear.easeNone});
			return tlMoveR;
		} else {
			var tlMoveL = TweenLite.fromTo(element, 0.5, {xPercent: -100}, {xPercent: 0, ease: Linear.easeNone});
			return tlMoveL;
		}
	}

	function orientation()
	{
		if (pageHeight > pageWidth){
			return "portrait";
		} else {
			return "landscape";
		}
	}

	function onBurgerClick(event){
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
			  goToSlide($currentSlide.prev());
			}
	}

  /*
	*   If there's a next slide, slide to it
	* */
  function goToNextSlide()
  {
    if($currentSlide.next().length)
    {
      goToSlide($currentSlide.next());
    }
  }


  /*
	*   Actual transition between slides
	* */
function goToSlide($slide)
  {
    //If the slides are not changing and there's such a slide
    if(!isAnimating && $slide.length)
    {
      //setting animating flag to true
      isAnimating = true;
      $currentSlide = $slide;
      currentID = $currentSlide.attr('id');
      // NextSlide = $currentSlide.next();

      new TimelineLite()
      .to($slidesContainer, 0.7, {onStart: onSlideChangeStart})
      .to($slidesContainer, 0.5, {scrollTo: {y: pageHeight * $currentSlide.index() }, onComplete: onSlideChangeEnd, onCompleteScope: this});


      //Definig slide status
      TweenLite.to($allSlides.filter(".active"), 0.1, {className: "-=active"});
      TweenLite.to($allSlides.filter($currentSlide), 0.1, {className: "+=active"});

    }
  }

  function onSlideChangeStart() 
  {
	timelines[currentIndex].reversed(true).timeScale(2);
  }
  /*
	*   Once the sliding is finished, we need to restore "isAnimating" flag.
	*   You can also do other things in this function, such as changing page title
	* */
  function onSlideChangeEnd() {
    isAnimating = false;
    
    // Reverse the timeline for the previous slide
    
    // Change the index
    currentIndex = $currentSlide.index();
    // Play the timeline for the current slide
  		timelines[currentIndex].reversed(false);
  }


  /*
	*   When user resize it's browser we need to know the new height, so we can properly align the current slide
	* */
  function onResize(event)
  {
  	let vh = newPageHeight * 0.01;
    //This will give us the new height of the window
    var newPageHeight = $window.innerHeight();
    var newPageWidth = $window.innerWidth();
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    /*
		*   If the new height is different from the old height ( the browser is resized vertically ), the slides are resized
		* */
    if(pageHeight !== newPageHeight || pageWidth !== newPageWidth)
    {
		pageHeight = newPageHeight;
		pageWidth = newPageWidth;

		var newOrient = orientation();

		if (orient !== newOrient) {
	    	orient = newOrient;
	    	document.location.reload();
    	}
      //This can be done via CSS only, but fails into some old browsers, so I prefer to set height via JS
      // TweenLite.set([$slidesContainer, $allSlides], {height: pageHeight + "px"});

      //The current slide should be always on the top
      TweenLite.set($slidesContainer, {scrollTo: {y: pageHeight * $currentSlide.index() }});
    }

  }