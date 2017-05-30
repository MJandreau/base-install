/**
* Mobile navigation scripts
* navigation.js still handles aria roles and accessibility,
* but toggling the visibility of the main/sub menus is controlled here.
*/

// Add toggles to menu items that have submenus and bind to click event
var subMenuItems = document.body.querySelectorAll('.page_item_has_children > a');
var index = 0;
for (index = 0; index < subMenuItems.length; index++) {
  var dropdownArrow = document.createElement('span');
  dropdownArrow.className = 'sub-nav-toggle';
  dropdownArrow.innerHTML = 'More';
  subMenuItems[index].parentNode.insertBefore(dropdownArrow, subMenuItems[index].nextSibling);
}

// Enables toggling all submenus rather than just one
var elements = document.querySelectorAll('.sub-nav-toggle');
for(var i in elements) {
  if(elements.hasOwnProperty(i)) {
    elements[i].onclick = function() {
      this.parentElement.querySelector('.children').classList.toggle("active");
      this.parentElement.querySelector('.sub-nav-toggle').classList.toggle("active");
    };
  }
}



// Mobile navigation controls, uses class-helpers.js 
// to enable jQuery-like controls over class manipulation
var menuToggle = document.querySelector('.menu-toggle');
    outsideMenu = document.querySelector('.site-main');
    menuContainer = document.querySelector('.main-navigation');

// Toggle main menu with hamburger button
menuToggle.onclick = function() {
  toggleClass(menuToggle, 'is-active');
  toggleClass(menuContainer, 'toggled');
};

// Close menu when area outside of menu is clicked
outsideMenu.onclick = function() {
  removeClass(menuContainer, 'toggled');
  removeClass(menuToggle, 'is-active');
};

// Reset mobile nav for laptop and desktop
window.addEventListener('resize', disableMobileNav);
function disableMobileNav() {
  if (window.innerWidth > 999) {
    removeClass(menuContainer, 'toggled');
    removeClass(menuToggle, 'is-active');
  }
}
