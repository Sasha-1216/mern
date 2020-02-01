"use strict";

var name = 'SASHA WANG';
var element = React.createElement("div", {
  title: "Outer div"
}, React.createElement("div", {
  className: "container"
}, React.createElement("div", {
  className: "wave"
}), React.createElement("img", {
  id: "selfie",
  src: "img/headshot.png"
}), React.createElement("h2", null, name), React.createElement("p", null, "Hello there, I am Sasha and a senior student in San Diego State Univeristy. Currently I am pursuing my bachelor degree of art, emphise in Graphic Design; a minor in Computer Science. Meanwhile, I also work as a student assistant at LARC in SDSU, where I am responsible for front-end design as well as the organization of language materials. During the last 3 years in the U.S., I had learned a variety of skills in my major and minor fields, such as Typography Design, Graphic Design, Branding, Photography and art history; softwares including Illustrator, InDesign, Photoshop, Sketch, XD, After Effect, , computer programming (Java), Web Design (HTML, CSS and Javascript)."), React.createElement("a", {
  href: "https://github.com/Sasha-1216"
}, React.createElement("button", {
  type: "button"
}, "View my Github"))));
ReactDOM.render(element, document.getElementById('contents'));