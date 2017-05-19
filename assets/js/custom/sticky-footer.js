// function stickyFooter() {
//     // header, footer, and content element declaration
//     var footerElement = document.querySelector('.site-footer'),
//         headerElement = document.querySelector('.site-header'),
//         contentElement = document.querySelector('.site-content'),
//         windowHeight = window.innerHeight;

//     var elementSize = function (el) {
//         // console.log(el); // this prints the header, contetn, and footer elements in the console
//         return el.scrollHeight;
//     };

//     var footerHeight = elementSize(footerElement),
//         headerHeight = elementSize(headerElement),
//         contentHeight = elementSize(contentElement);

//     if (windowHeight > footerHeight + headerHeight + contentHeight) {
//         footerElement.style.position = "absolute";
//         footerElement.style.bottom = 0;
//     }
// }

// document.addEventListener('DOMContentLoaded', function () {
//     //noinspection BadExpressionStatementJS
//     stickyFooter();
// });

// TODO:
// - Add a window resize function.
// - Add a element content watcher to check if the content size changes.
// - Change selectors to call the element from outside the JS file.
// - Only expect the footer element.
