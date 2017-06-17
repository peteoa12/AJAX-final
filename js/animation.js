
// var hiddenOnLoad = [
// 	".icon"
// ]

TweenMax.set("circle", {fill:"#fff" });
TweenMax.set("path", {stroke:"white", fill:"#fff"});

var tl = new TimelineMax();

tl.to("#circ1", 0.5, {drawSVG:0, fill:"#5DCFA6", ease:Power1.easeInOut})
  .to("#circ2", 0.5, {drawSVG:0, fill:"#5DCFA6", ease:Power1.easeInOut})
  .to("path", 1, {drawSVG:0, stroke:"black", fill:"#5DCFA6", ease:Power1.easeInOut})
