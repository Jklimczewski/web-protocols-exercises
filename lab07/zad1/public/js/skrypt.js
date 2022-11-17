import Cookies from './js-cookie/js.cookie.mjs'


window.addEventListener("load", function (event) {
 console.log("Ten napis pojawi się w konsoli interfejsu programistycznego (skrót F12 w przeglądarce)");
});

Cookies.set("Ciasteczko2", "xd", { expires: 7 })