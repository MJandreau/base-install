/**
* Add toggles to menu items that have submenus and bind to click event
*/
var x = document.body.querySelectorAll('.page_item_has_children > a');
var index = 0;
for (index = 0; index < x.length; index++) {
  var navArrow = document.createElement('span');
  navArrow.className = 'sub-nav-toggle';
  navArrow.innerHTML = 'More';
  x[index].parentNode.insertBefore(navArrow, x[index].nextSibling);
}

var elements = document.querySelectorAll('.sub-nav-toggle');

for(var i in elements) {
  if(elements.hasOwnProperty(i)) {
    elements[i].onclick = function() {
      this.parentElement.querySelector('.children').classList.toggle("active");
      this.parentElement.querySelector('.sub-nav-toggle').classList.toggle("active");
    };
  }
}




/**
* Close menu when clicked outside of navigation
*/
var outsideOfMenu = document.querySelector('.site-main');
var menuContainer = document.querySelector('.main-navigation ');
outsideOfMenu.onclick = function() {
    removeClass(menuContainer, 'toggled');
};





// Example of toggleClass usage
// document.getElementById('button').onclick = function() {
//     toggleClass(this, 'active');
// }

// Example of removeClass usage
// document.getElementById('button').onclick = function() {
//     removeClass(this, 'active');
//     this.innerHTML = 'Yellow is much nicer.';
// }





var menuToggle = document.querySelector('.menu-toggle');

// Example of toggleClass usage
menuToggle.onclick = function() {
    toggleClass(menuToggle, 'is-active');
};


  // // toggle the hamburger open and closed states
  // var removeClass = true;
  // $(".menu-toggle").click(function () {
  //   $(".menu-toggle").toggleClass('is-active');
  //   $(".menu-menu").toggleClass('active-menu');
  //   removeClass = false;
  // });

  // $(".menu-menu").click(function() {
  //   removeClass = false;
  // });

  // $("html").click(function () {
  //   if (removeClass) {
  //     $(".menu-toggle").removeClass('is-active');
  //     $(".menu-menu").removeClass('active-menu');
  //   }
  //   removeClass = true;
  // });

  // $(".menu-link").click(function () {
  //   if (removeClass) {
  //     $(".menu-toggle").removeClass('is-active');
  //     $(".menu-menu").removeClass('active-menu');
  //   }
  //   removeClass = true;
  // });

  // // disable side nav for laptop and desktop
  // $(window).resize(function() {
  //   if( $(this).width() > 1000 ) {
  //     $(".menu-toggle").removeClass('is-active');
  //     $(".menu-menu").removeClass('active-menu');
  //   }
  // });

