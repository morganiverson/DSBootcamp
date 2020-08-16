//IMAGES
var logo_src = "/Media/Animation/logo_d2s.PNG";
var flicker_len = 2;
var fade_len = 7;
window.addEventListener("collageFilesLoaded", function(){
    var collage_imgs = collage_file_src;
    
    //CREATE CONTROL BUTTON
    var b = document.createElement("button");
    b.innerHTML = "step";
//    b.style.position = "absolute";
    b.style.marginBottom = "20px";
    b.style.margin = "auto";
    
    document.body.appendChild(b);
    //CREATE DIV - FLYER BODY
    var d = document.createElement("div");
    d.style.height = 800;
    d.style.width = 600;
    d.style.backgroundColor = "black";
    d.style.border = "1px solid rgb(43, 43, 43)";// "1px solid white";
    d.style.margin = " 50 auto auto";
    d.style.position = "relative";
    var step = 1;

    //ADD TO DOCUMENT
    document.body.appendChild(d);
    document.body.style.backgroundColor = "black";

    //CLICK THROUGH ANIMATIONS
    b.onclick = function() {stepThrough();};

    //ANIMATIONS
    var collageBuild = function() {
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
    });