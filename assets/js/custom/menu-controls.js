/**
* MOBILE NAVIGATION
* Plain JavaScript functions to toggle the mobile navigation, no jQuery required
*
* navigation.js still handles aria roles and accessibility,
* but user-triggered events are controlled here.
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
    outsideMenu = document.querySelector('.site-content');
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




  /**
   * forEach implementation for Objects/NodeLists/Arrays, automatic type loops and context options
   *
   * @private
   * @author Todd Motto
   * @link https://github.com/toddmotto/foreach
   * @param {Array|Object|NodeList} collection - Collection of items to iterate, could be an Array, Object or NodeList
   * @callback requestCallback      callback   - Callback function for each iteration.
   * @param {Array|Object|NodeList} scope=null - Object/NodeList/Array that forEach is iterating over, to use as the this value when executing callback.
   * @returns {}
   */
// var forEach = function forEach(t, o, r) {
//   if ("[object Object]" === Object.prototype.toString.call(t)) for (var c in t) {
//     Object.prototype.hasOwnProperty.call(t, c) && o.call(r, t[c], c, t);
//   } else for (var e = 0, l = t.length; l > e; e++) {
//     o.call(r, t[e], e, t);
//   }
// };


// var forEach = function forEach(collection, callback, scope) {
//   if (Object.prototype.toString.call(collection) === '[object Object]') {
//     for (var prop in collection) {
//       if (Object.prototype.hasOwnProperty.call(collection, prop)) {
//         callback.call(scope, collection[prop], prop, collection);
//       }
//     }
//   } else {
//     for (var i = 0, len = collection.length; i < len; i++) {
//       callback.call(scope, collection[i], i, collection);
//     }
//   }
// };

// var hamburgers = document.querySelectorAll(".hamburger");
// if (hamburgers.length > 0) {
//   forEach(hamburgers, function (hamburger) {
//     hamburger.addEventListener("click", function () {
//       this.classList.toggle("is-active");
//     }, false);
//   });
// }

