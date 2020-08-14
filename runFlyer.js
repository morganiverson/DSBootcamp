//IMAGES
var collage_imgs = ["TestImages/bikers.jpeg", "TestImages/butterfly_P.jpeg", "TestImages/field.jpeg", "TestImages/flower_P.jpeg", "TestImages/fruit.jpeg", "TestImages/heart_P.jpeg"];

var logo_src = "TestImages/fruit.jpeg";
var flicker_len = 2.5;
var fade_len = 2;

window.onload = function(){
    //CREATE DIV - FLYER BODY
    var d = document.createElement("div");
    d.style.height = 800;
    d.style.width = 600;
    d.style.backgroundColor = "black";
    d.style.border = "1px solid darkgrey";
    d.style.margin = " 50 auto auto";
    d.style.position = "relative";
    var step = 1;

    //ADD TO DOCUMENT
    document.body.appendChild(d);
    document.body.style.backgroundColor = "black";

    //CLICK THROUGH ANIMATIONS
    d.onclick = function() {stepThrough();};

    //ANIMATIONS
    var collageBuild = function() {
        console.log(d.onclick);
        var c = new CollageBuild(d, collage_imgs); //ADD BUTTON TO BUILD
        c.addIMG();
    }
    var f;
    var flickerIn = function() {
        f = new FlyerIntro(d, flicker_len, fade_len, logo_src);
        f.flickerIn();
}
    var fadeOut = function() {
        f.fadeOut();
    }
    //FUNCTION TO FACILITATE CLICK THROUGH
    var stepThrough = function() {
        console.log("stepThrough");
        if(step == 1)
            collageBuild();
        else if(step == 2)
            flickerIn();
        else if(step == 3) 
            fadeOut();
        step++;
    }
    //BUTTON TO CREATE FLYRE INTRO OBJECT
    }