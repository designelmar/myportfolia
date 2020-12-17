
/********************DELETING WRITE********************** */

class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    // Current index of word
    const current = this.wordIndex % this.words.length;
    // Get full text of current word
    const fullTxt = this.words[current];

    // Check if deleting
    if (this.isDeleting) {
      // Remove char
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // Add char
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // Initial Type Speed
    let typeSpeed = 300;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    // If word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
      // Make pause at end
      typeSpeed = this.wait;
      // Set delete to true
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      // Move to next word
      this.wordIndex++;
      // Pause before start typing
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}


// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  // Init TypeWriter
  new TypeWriter(txtElement, words, wait);
}



$(function () {
  $(".btn1").mouseenter(function () {
    $('.angle-right1').hover().css({ "transform": "translateX(6px)" });


  });

  $(".btn1").mouseout(function () {
    $('.angle-right1').hover().css({ "transform": "translateX(0px)" }, { " transition": "0.8s" });
  });


  $(".btn2").mouseenter(function () {
    $('.angle-right2').hover().css({ "transform": "translateX(6px)" });


  });

  $(".btn2").mouseout(function () {
    $('.angle-right2').hover().css({ "transform": "translateX(0px)" }, { " transition": "0.8s" });
  });



});



/************cards********** */

$(function () {
  $(".cards1").hover(a, b);
  $(".cards2").hover(c, d);
  $(".cards3").hover(f, e);
  $(".cards4").hover(m, v);
  $(".cards5").hover(x, y);
  $(".cards6").hover(z, w);

  function a() {
    $(".cardtext1").css({ "color": "white" });
    $(".cardtitle1").css({ "color": "white" });
    $(".fas-icon1").css({ "color": "white" });


  }

  function b() {
    $(".cardtext1").css({ "color": "#8283a0" });
    $(".cardtitle1").css({ "color": "#135f61" });
    $(".fas-icon1").css({ "color": "#135f61" });
  }

  /*******card2*******/

  function c() {
    $(".cardtext2").css({ "color": "white" });
    $(".cardtitle2").css({ "color": "white" });
    $(".fas-icon2").css({ "color": "white" });



  }

  function d() {
    $(".cardtext2").css({ "color": "#8283a0" });
    $(".cardtitle2").css({ "color": "#135f61" });
    $(".fas-icon2").css({ "color": "#135f61" });
  }

  /*******card3*******/



  function f() {
    $(".cardtext3").css({ "color": "white" });
    $(".cardtitle3").css({ "color": "white" });
    $(".fas-icon3").css({ "color": "white" });

  }

  function e() {
    $(".cardtext3").css({ "color": "#8283a0" });
    $(".cardtitle3").css({ "color": "#135f61" });
    $(".fas-icon3").css({ "color": "#135f61" });
  }


  /*******card4*******/


  function m() {
    $(".cardtext4").css({ "color": "white" });
    $(".cardtitle4").css({ "color": "white" });
    $(".fas-icon4").css({ "color": "white" });

  }

  function v() {
    $(".cardtext4").css({ "color": "#8283a0" });
    $(".cardtitle4").css({ "color": "#135f61" });
    $(".fas-icon4").css({ "color": "#135f61" });
  }

  
  /*******card5*******/

  function x() {
    $(".cardtext5").css({ "color": "white" });
    $(".cardtitle5").css({ "color": "white" });
    $(".fas-icon5").css({ "color": "white" });

  }

  function y() {
    $(".cardtext5").css({ "color": "#8283a0" });
    $(".cardtitle5").css({ "color": "#135f61" });
    $(".fas-icon5").css({ "color": "#135f61" });
  }
  
  /*******card6*******/

  function z() {
    $(".cardtext6").css({ "color": "white" });
    $(".cardtitle6").css({ "color": "white" });
    $(".fas-icon6").css({ "color": "white" });

  }

  function w() {
    $(".cardtext6").css({ "color": "#8283a0" });
    $(".cardtitle6").css({ "color": "#135f61" });
    $(".fas-icon6").css({ "color": "#135f61" });
  }



});


/******************NUMBER COUNTER************************ */


(function ($) {
	$.fn.countTo = function (options) {
		options = options || {};
		
		return $(this).each(function () {
			// set options for current element
			var settings = $.extend({}, $.fn.countTo.defaults, {
				from:            $(this).data('from'),
				to:              $(this).data('to'),
				speed:           $(this).data('speed'),
				refreshInterval: $(this).data('refresh-interval'),
				decimals:        $(this).data('decimals')
			}, options);
			
			// how many times to update the value, and how much to increment the value on each update
			var loops = Math.ceil(settings.speed / settings.refreshInterval),
				increment = (settings.to - settings.from) / loops;
			
			// references & variables that will change with each update
			var self = this,
				$self = $(this),
				loopCount = 0,
				value = settings.from,
				data = $self.data('countTo') || {};
			
			$self.data('countTo', data);
			
			// if an existing interval can be found, clear it first
			if (data.interval) {
				clearInterval(data.interval);
			}
			data.interval = setInterval(updateTimer, settings.refreshInterval);
			
			// initialize the element with the starting value
			render(value);
			
			function updateTimer() {
				value += increment;
				loopCount++;
				
				render(value);
				
				if (typeof(settings.onUpdate) == 'function') {
					settings.onUpdate.call(self, value);
				}
				
				if (loopCount >= loops) {
					// remove the interval
					$self.removeData('countTo');
					clearInterval(data.interval);
					value = settings.to;
					
					if (typeof(settings.onComplete) == 'function') {
						settings.onComplete.call(self, value);
					}
				}
			}
			
			function render(value) {
				var formattedValue = settings.formatter.call(self, value, settings);
				$self.html(formattedValue);
			}
		});
	};
	
	$.fn.countTo.defaults = {
		from: 0,               // the number the element should start at
		to: 0,                 // the number the element should end at
		speed: 1000,           // how long it should take to count between the target numbers
		refreshInterval: 100,  // how often the element should be updated
		decimals: 0,           // the number of decimal places to show
		formatter: formatter,  // handler for formatting the value before rendering
		onUpdate: null,        // callback method for every time the element is updated
		onComplete: null       // callback method for when the element finishes updating
	};
	
	function formatter(value, settings) {
		return value.toFixed(settings.decimals);
	}
}(jQuery));

jQuery(function ($) {
  // custom formatting example
  $('.count-number').data('countToOptions', {
	formatter: function (value, options) {
	  return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
	}
  });
  
  // start all the timers
  $('.timer').each(count);  
  
  function count(options) {
	var $this = $(this);
	options = $.extend({}, options || {}, $this.data('countToOptions') || {});
	$this.countTo(options);
  }
});



// Initialize and add the map
function initMap() {
  // The location of Uluru
  const uluru = { lat: -25.344, lng: 131.036 };
  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: uluru,
  });
  // The marker, positioned at Uluru
  const marker = new google.maps.Marker({
    position: uluru,
    map: map,
  });
}
