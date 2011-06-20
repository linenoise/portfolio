
// EDITABLE AREA
// ==============================================================

$(document).ready(function() {
  
  
    
  // Superfish
  // ------------------------------------------------------------
  
  if($.isFunction($.fn.superfish)) {
    var options = {
      delay:       500,               // delay on mouseout in milliseconds
      animation:   {opacity: 'show'}, // fade-in and slide-down animation 
      speed:       'fast',            // faster animation speed 
      autoArrows:  false,             // disable generation of arrow mark-up 
      dropShadows: false              // disable drop shadows 
    }
    
    $('nav.main ul').superfish(options);
    options.autoArrows = true;
    $('nav.main ul ul').superfish(options);
  }
  
  
  
  // Auto Lightbox
  // ------------------------------------------------------------
  
  auto_lightbox();
  
  
  
  
  // prettyPhoto
  // ------------------------------------------------------------
  
  if($.isFunction($.fn.prettyPhoto)) {
    $("a[class^='lightbox']").prettyPhoto({
    	theme:           'pp_default', // light_rounded / dark_rounded / light_square / dark_square / facebook / pp_default
			overlay_gallery: false       // If set to true, a gallery will overlay the fullscreen image on mouse over
		});
  }
  
  
  
  // Lightbox Overlay
  // ------------------------------------------------------------
  
  $("a[class^='lightbox'] img").lightbox_overlay();
  
  
  
  // Sliding Links
  // ------------------------------------------------------------
  
  if(!$("body").hasClass("no-sliding-links")) {
    $('.list-widget ul li a, .social-widget ul li a').sliding_links({ offset: 3 });
    $('.double-list-widget ul li a').sliding_links({ offset: 2 });
  }
  
  
  
  // Nivo Slider
  // ------------------------------------------------------------
  
  if($.isFunction($.fn.nivoSlider)) {
    $(window).load(function() {
      $('#nivo-slider').nivoSlider({
        effect: 'random', //Specify sets like: 'fold,fade,sliceDown'
        slices: 15,
        animSpeed: 500, //Slide transition speed
        pauseTime: 3000,
        startSlide: 0, //Set starting Slide (0 index)
        directionNav: true, //Next & Prev
        directionNavHide: true, //Only show on hover
        controlNav: false, //1,2,3...
        controlNavThumbs: false, //Use thumbnails for Control Nav
        controlNavThumbsFromRel: false, //Use image rel for thumbs
        controlNavThumbsSearch: '.jpg', //Replace this with...
        controlNavThumbsReplace: '_thumb.jpg', //...this in thumb Image src
        keyboardNav: true, //Use left & right arrows
        pauseOnHover: true, //Stop animation while hovering
        manualAdvance: false, //Force manual transitions
        captionOpacity: 0.65 //Universal caption opacity
      });
    });
  }
  
  
  
  // Piecemaker Slider
  // ------------------------------------------------------------
  
  var flashvars = {};
  flashvars.xmlSource = "plugins/piecemaker/piecemaker.xml";
  flashvars.cssSource = "plugins/piecemaker/piecemaker.css";

  var params = {};
  params.play  = "true";
  params.menu  = "false";
  params.scale = "showall";
  params.wmode = "transparent";
  params.allowfullscreen   = "true";
  params.allowscriptaccess = "always";
  params.allownetworking   = "all";
  
  swfobject.embedSWF('plugins/piecemaker/piecemaker.swf', 'piecemaker-slider', '1060', '500', '10', null, flashvars, params, null);
  
  
  
  // Slides Slider
  // ------------------------------------------------------------
  
  if($.isFunction($.fn.slides)) {
    $("#slides-slider").slides({
      preload: true,
      preloadImage: 'images/spinner.gif',
      play: 3000, // Time between transitions
      pause: 2500, // Slide transition speed
      hoverPause: true,
      effect: 'fade'
    });
  }
  
  
  
  // Content Toggler
  // ------------------------------------------------------------
  
  $(".toggler").toggler();
  
  
  
  // Mark Right Navigation Elements
  // ------------------------------------------------------------
  
  mark_right_nav_elements('nav.main > ul > li', 2);
  
  
  
  // Image Captions
  // ------------------------------------------------------------
  
  $(".wp-caption").image_caption_auto_width();
  
  
  
  // Contact Form
  // ------------------------------------------------------------
  
  if($.isFunction($.fn.validate)) {
    $("#contactform").validate({
  	  errorClass: "invalid",
  	  errorPlacement: function(error, element) { error.hide(); }
  	});
  }
  
  if($.isFunction($.fn.ajaxForm)) {
    function init_ajax_form(form) {
      $(form).ajaxForm({
        target: "form .message",
        beforeSubmit: before_submit,
        success: success
      });
      function before_submit() {
        $(form).find(".spinner").fadeIn();
        $(form).find(".message").animate({ opacity: 0 }).slideUp();
      }
      function success() {
        $(form).find(".spinner").fadeOut();
        $(form).find(".message").slideDown().animate({ opacity: 1 });
      }
    }
    
    init_ajax_form("#contactform");
  }

});










// Functions
// ============================================================



// Mark Right Navigation Elements
// ------------------------------------------------------------

function mark_right_nav_elements(object, element_count) {
  var object     = $(object);
  var link_count = object.size();
  
  return object.each(function(i) {
    if((link_count - element_count) < i+1)
      $(this).addClass('right');
  });
};




// Auto Lightbox
// ------------------------------------------------------------

function auto_lightbox() {
  $('#content').find(
    'a[href$=jpg], '  + 
    'a[href$=jpeg], ' + 
    'a[href$=png], '  + 
    'a[href$=gif], '  +
    'a[href*="vimeo.com"], '   + 
    'a[href*="youtube.com"], ' +
    'a[href$=".swf"], ' +
    'a[href$=".mov"]').each(function()
  {
  	if(!jQuery(this).attr('rel') != undefined && !jQuery(this).attr('rel') != '' && !jQuery(this).hasClass('no-lightbox')) {
  		jQuery(this).attr('rel', 'lightbox[content]');
  	}
  });
}











// PLUGINS
// ============================================================




(function($)
{	
  
  
  
  // Lightbox Overlay
  // ------------------------------------------------------------
  
  $.fn.lightbox_overlay = function(options) {
    
    var defaults = {
      opacity: 0.5,
      animation_speed: 200,
      class_name: 'lightbox-image'
    };
    
    var options = $.extend(defaults, options);
    
    return this.each(function() {
      var img  = $(this);
      var link = $(this).parent();
      var bg   = $("<span class='"+ options.class_name +"'></span>").appendTo(link);
  		
  		link.bind('mouseenter', function() {
  		  var margin_top     = parseInt(img.css("margin-top"));
  		  var margin_bottom  = parseInt(img.css("margin-bottom"));
  		  var padding_left   = parseInt(img.css("padding-left"));
  		  var padding_top    = parseInt(img.css("padding-top"));
  		  var padding_right  = parseInt(img.css("padding-right"));
  		  var padding_bottom = parseInt(img.css("padding-bottom"));
  		  var border_left    = parseInt(img.css("border-left-width"));
  		  var border_top     = parseInt(img.css("border-top-width"));
  		  var border_right   = parseInt(img.css("border-right-width"));
  		  var border_bottom  = parseInt(img.css("border-bottom-width"));
  			var width    = img.width() + padding_left + padding_top + border_left + border_right;
  			var height   = img.height() + margin_top + margin_bottom + padding_top + padding_bottom + border_top + border_bottom;
  			var position = img.position();
  			bg.css({ width:width, height:height, top:position.top, left:position.left });
  		});
    
      link.hover(
        function() { img.stop().animate({ opacity: options.opacity }, options.animation_speed); },
    	  function() { img.stop().animate({ opacity: 1 }, options.animation_speed); }
      ); 
    });
    
  };
  
  
  
  // Content Toggler
  // ------------------------------------------------------------
  
  $.fn.toggler = function(options) {
  
    var defaults = {
      content: '.toggle-content'
    };
    
    var options = $.extend(defaults, options);
    
    var heading = $(this);
    var content = $(options.content);
    
    // Hide Toggle Content
    content.hide();
    
    return this.each(function() {
      // Activate is class "active" is given
      if($(this).is(".active")) {
        if($(this).next(content)) {
          $(this).next(content).show();
        }
      }
      
      $(this).bind('click', function() {
        if($(this).is(".active")) {
          if($(this).next(content)) {
            $(this).removeClass("active").next(content).slideUp();
          }
        }
        else {
          if($(this).is(".close-all")) {
            heading.removeClass("active");
            content.slideUp();
          }
          
          if($(this).next(content)) {
            $(this).addClass("active").next(content).slideDown();
          }
        }
      });
    });
    
  };
  
  
  
  // Image Captions
  // ------------------------------------------------------------
  
  $.fn.image_caption_auto_width = function() {
    return this.each(function() {
      var img = $(this).find("img");
		  var border_left    = parseInt(img.css("border-left-width"));
		  var border_right   = parseInt(img.css("border-right-width"));
      
      $(this).css('width', img.width() + border_left + border_right);
    });
  };
  
  
  
  // Sliding Links
  // ------------------------------------------------------------
  
  $.fn.sliding_links = function(options) {
    
    var defaults = {
      offset: 5,
      animation_speed: 120
    };
    
    var options = $.extend(defaults, options);
    
    return $(this).each(function() {
      var pl_def = $(this).css("padding-left");
      var pr_def = $(this).css("padding-right");
      
      $(this).hover(
        function() {
          $(this).animate({
            paddingLeft:  parseInt(pl_def) + options.offset + "px",
            paddingRight: parseInt(pr_def) - options.offset + "px"
          }, options.animation_speed);
        },
        function() {
          bc_hover = $(this).css("background-color");
          $(this).animate({
            paddingLeft: pl_def,
            paddingRight: pr_def
          }, options.animation_speed);
        }
      );
      
    });
    
  };
  
  
  
})(jQuery);