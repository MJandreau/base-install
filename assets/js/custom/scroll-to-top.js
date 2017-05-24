
function scrollToTop(options) {
  this.options = options;
  this.button = null;
  this.stop = false;
}

scrollToTop.prototype.constructor = scrollToTop;

scrollToTop.prototype.createButton = function() {
  this.button = document.createElement('button');
  this.button.classList.add('scroll-to-top');
  this.button.classList.add('scroll-to-top--hidden');
  this.button.textContent = "Top";
  document.body.appendChild(this.button);
};
  
scrollToTop.prototype.init = function() {
  this.createButton();
  this.checkPosition();
  this.click();
  this.stopListener();
};

scrollToTop.prototype.scroll = function() {
  if (this.options.animate === false || this.options.animate === "false") {
    this.scrollNoAnimate();
    return;
  }
  if (this.options.animate == "normal") {
    this.scrollAnimate();
    return;
  }
  if (this.options.animate == "linear") {
    this.scrollAnimateLinear();
    return;
  }
};

scrollToTop.prototype.scrollNoAnimate = function() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};

scrollToTop.prototype.scrollAnimate = function() {
  if (this.scrollTop() > 0 && this.stop === false) {
    setTimeout(function() {
      this.scrollAnimate();
      window.scrollBy(0, (-Math.abs(this.scrollTop())/this.options.normal.steps));
    }.bind(this), (this.options.normal.ms));
  }
};

scrollToTop.prototype.scrollAnimateLinear = function() {
  if (this.scrollTop() > 0 && this.stop === false) {
    setTimeout(function() {
      this.scrollAnimateLinear();
      window.scrollBy(0, -Math.abs(this.options.linear.px));
    }.bind(this), this.options.linear.ms);
  }
};

scrollToTop.prototype.click = function() {
  
  this.button.addEventListener("click", function(e) {
    e.stopPropagation();
      this.scroll();
  }.bind(this), false);
  
  this.button.addEventListener("dblclick", function(e) {
    e.stopPropagation();
      this.scrollNoAnimate();
  }.bind(this), false);
  
};

scrollToTop.prototype.hide = function() {
  this.button.classList.add("scroll-to-top--hidden");
};

scrollToTop.prototype.show = function() {
  this.button.classList.remove("scroll-to-top--hidden");
};

scrollToTop.prototype.checkPosition = function() {
  window.addEventListener("scroll", function(e) {
    if (this.scrollTop() > this.options.showButtonAfter) {
      this.show();
    } else {
      this.hide();
    }
  }.bind(this), false);
};

scrollToTop.prototype.stopListener = function() {
  
  // stop animation on slider drag
  var position = this.scrollTop();
  window.addEventListener("scroll", function(e) {
    if (this.scrollTop() > position) {
      this.stopTimeout(200);
    } else {
      //...
    }
    position = this.scrollTop();
  }.bind(this, position), false);

  // stop animation on wheel scroll down
  window.addEventListener("wheel", function(e) {
    if(e.deltaY > 0) this.stopTimeout(200);
  }.bind(this), false);
};

scrollToTop.prototype.stopTimeout = function(ms){
   this.stop = true;
         // console.log(this.stop); //
   setTimeout(function() {
     this.stop = false;
           console.log(this.stop); //
   }.bind(this), ms);
};

scrollToTop.prototype.scrollTop = function(){
   var curentScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  return curentScrollTop;
};



// ------------------- USE EXAMPLE ---------------------
// *Set options
var options = {
  'showButtonAfter': 200, // show button after scroling down this amount of px
  'animate': "normal", // [false|normal|linear] - for false no aditional settings are needed
  // easy out effect
  'normal': { // applys only if [animate: normal] - set scroll loop "distanceLeft"/"steps"|"ms"
    'steps': 15, // more "steps" per loop => slower animation
    'ms': 1000/60 // less "ms" => quicker animation, more "ms" => snapy
  },
  // linear effect
  'linear': { // applys only if [animate: linear] - set scroll "px"|"ms"
    'px': 80, // more "px" => quicker your animation gets
    'ms': 1000/60 // Less "ms" => quicker your animation gets, More "ms" =>
  }, 
};
// *Create new scrollToTop and run it.
var scroll = new scrollToTop(options);
scroll.init();