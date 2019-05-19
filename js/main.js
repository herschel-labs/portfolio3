(function($) {

    "use strict";
    
    var cfg = {
        scrollDuration : 800, // smoothscroll duration
    },

    $WIN = $(window);

    // Add the User Agent to the <html>
    // will be used for IE10 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0))
    var doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);



    /* OffCanvas Menu
    * ------------------------------------------------------ */
   var clOffCanvas = function() {

    var menuTrigger     = $('.header-menu-toggle'),
        nav             = $('.header-nav'),
        closeButton     = nav.find('.header-nav__close'),
        siteBody        = $('body'),
        mainContents    = $('section, footer');

    // open-close menu by clicking on the menu icon
    menuTrigger.on('click', function(e){
        e.preventDefault();
        // menuTrigger.toggleClass('is-clicked');
        siteBody.toggleClass('menu-is-open');
    });

    // close menu by clicking the close button
    closeButton.on('click', function(e){
        e.preventDefault();
        menuTrigger.trigger('click');	
    });

    // close menu clicking outside the menu itself
    siteBody.on('click', function(e){
        if( !$(e.target).is('.header-nav, .header-nav__content, .header-menu-toggle, .header-menu-toggle span') ) {
            // menuTrigger.removeClass('is-clicked');
            siteBody.removeClass('menu-is-open');
        }
    });

};


/* Smooth Scrolling
    * ------------------------------------------------------ */
   var clSmoothScroll = function() {
        
    $('.smoothscroll').on('click', function (e) {
        var target = this.hash,
        $target    = $(target);
        
            e.preventDefault();
            e.stopPropagation();

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, cfg.scrollDuration, 'swing').promise().done(function () {

            // check if menu is open
            if ($('body').hasClass('menu-is-open')) {
                $('.header-menu-toggle').trigger('click');
            }

            window.location.hash = target;
        });
    });

};

var TxtRotate = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  };
  
  TxtRotate.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];
  
    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
  
    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
  
    var that = this;
    var delta = 140 - Math.random() * 100; /* First value: speed */
  
    if (this.isDeleting) { delta /= 2; }
  
    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 200; /* Pause between cycles*/
    }
  
    setTimeout(function() {
      that.tick();
    }, delta);


  };
  
  window.onload = function() {
    var elements = document.getElementsByClassName('txt-rotate');
    for (var i=0; i<elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-rotate');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtRotate(elements[i], JSON.parse(toRotate), period);
      }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    // css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
    document.body.appendChild(css);
    
  };

  /* slick slider
    * ------------------------------------------------------ */
   var clSlickSlider = function() {

    $('.slick-skills').slick({
        arrows: true,
        dots: false,
        infinite: true,
        slidesToShow: 6,
        swipeToSlide: true,
        //autoplay: true,
        pauseOnFocus: false,
        autoplaySpeed: 1000,
        lazyLoad: 'ondemand',
        prevArrow: '<i class="fas fa-chevron-left fa-2x text-dark"></i>',
        nextArrow: '<i class="fas fa-chevron-right fa-2x text-dark"></i>',
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 5
                }
            },
            {
                breakpoint: 1000,
                settings: {
                slidesToShow: 4
                }
            },
            {
                breakpoint: 800,
                settings: {
                slidesToShow: 3,
                arrows: false,
                }
            },
           

        ]
    });

    $('.slick-past-works').slick({
        prevArrow: '<i class="fas fa-chevron-left fa-5x text-dark pwrks" id="pwrks-prev"></i>',
        nextArrow: '<i class="fas fa-chevron-right fa-5x text-dark pwrks" id="pwrks-next"></i>',
        arrows: true,
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false, 
        pauseOnFocus: true,
        autoplaySpeed: 5000,
        fade: true,
        responsive: [
            {
                breakpoint: 800,
                settings: {
                    arrows: false,
                }
            }
        ]
    });

    $('.slick-inner').slick({
        arrows: false,
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true, 
        pauseOnFocus: true,
        pauseOnHover: true,
        autoplaySpeed: 2500,
        ceterMode: true,
        ltr: true,
        responsive: [
            {
                breakpoint: 800,
                settings: {
                    arrows: false,
                }
            }
        ]
    });
};


var clAOS = function() {
        
    AOS.init( {
        // offset: 200,
        duration: 300,
        easing: 'ease-in-sine',
        delay: 300,
        once: true,
        // disable: 'mobile'
    });

};


 /* Back to Top Square
    * ------------------------------------------------------ */
   var clBackToTop = function() {
        
    var pxShow  = 500,         // height on which the button will show
    fadeInTime  = 400,         // how slow/fast you want the button to show
    fadeOutTime = 400,         // how slow/fast you want the button to hide
    scrollSpeed = 300,         // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'
    goTopButton = $(".go-top")
    
    // Show or hide the sticky footer button
    $(window).on('scroll', function() {
        if ($(window).scrollTop() >= pxShow) {
            goTopButton.fadeIn(fadeInTime);
        } else {
            goTopButton.fadeOut(fadeOutTime);
        }
    });
};


/* Placeholder Plugin Settings
    * ------------------------------------------------------ */
   var clPlaceholder = function() {
    $('input, textarea, select').placeholder();  
};


/* Alert Boxes
* ------------------------------------------------------ */
var clAlertBoxes = function() {

    $('.alert-box').on('click', '.alert-box__close', function() {
        $(this).parent().fadeOut(500);
    }); 

};


/* Contact Form
* ------------------------------------------------------ */
var clContactForm = function() {
    
    /* local validation */
    $('#contactForm').validate({
    
       

        // document.getElementById("submit-button").onclick = doFunction;


    });
};

// Footer Year
$('#year').text(new Date().getFullYear());


(function ssInit() {
        
    
    AOS.init();
    clOffCanvas();
    clSmoothScroll();
    clSlickSlider();
    clAOS();
    clBackToTop();
    clPlaceholder();
    clAlertBoxes();
    clContactForm();

})();
    
    
})(jQuery);