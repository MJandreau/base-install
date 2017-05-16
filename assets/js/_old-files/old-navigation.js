/**
 * Navigation and scrolling
 */

 $(document).ready(function() {

  // Variables
  var $nav = $('.navbar'),
      $body = $('body'),
      $window = $(window),
      $navToggle = $('.navbar-toggle'),
      $navMenu = $('.navbar-menu'),
      $scrollUp = $('.scrollup'),
      navOffsetTop = $nav.offset().top,
      $document = $(document),
      entityMap = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': '&quot;',
        "'": '&#39;',
        "/": '&#x2F;'
      };

  function init() {
    $('a[href^="#"]').on('click', smoothScroll);
  }

  function smoothScroll(e) {
    e.preventDefault();
    $document.off("scroll");
    var target = this.hash,
        menu = target;
        $target = $(target);
    $('html, body').stop().animate({
      'scrollTop': $target.offset().top-40
    }, 500, 'swing');
  }

  function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
      return entityMap[s];
    });
  }


  
  // add scrollup button for the long pages
  $window.scroll(function () {
    if ($(this).scrollTop() > 100) {
      $scrollUp.fadeIn();
    } else {
      $scrollUp.fadeOut();
    }
  });

  // toggle the hamburger open and closed states
  var removeClass = true;
  $navToggle.click(function () {
    $navToggle.toggleClass('is-active');
    $navMenu.toggleClass('active-menu');
    removeClass = false;
  });

  // $navMenu.click(function() {
  //   removeClass = false;
  // });

  // close the hamburger open and closed states
  $("html, .navbar-link").click(function () {
    if (removeClass) {
      $navToggle.removeClass('is-active');
      $navMenu.removeClass('active-menu');
    }
    removeClass = true;
  });

  // disable mobile nav for laptop and desktop
  $window.resize(function() {
    if( $(this).width() > 1000 ) {
      $navToggle.removeClass('is-active');
      $navMenu.removeClass('active-menu');
    }
  });
  
  init();

});



