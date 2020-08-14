class FlyerIntro{
    constructor(parent, flick_dur, fade_dur, logo_src){
            var flyer_base = document.createElement("div");
        flyer_base.style.backgroundColor = "rgb(0, 0, 0, 0)";

        flyer_base.style.width = .8 * parseInt(window.getComputedStyle(parent).width);
        flyer_base.style.height = .8 * parseInt(window.getComputedStyle(parent).height);
        
        flyer_base.style.position = "absolute";
        
         flyer_base.style.left = .1 * parseInt(window.getComputedStyle(parent).width);
        flyer_base.style.top = .1 * parseInt(window.getComputedStyle(parent).height);
        flyer_base.style.position = "relative";

        
        var flick_fade_elm = document.createElement("div");
        flick_fade_elm.id = "FlickFadeElm";
        flick_fade_elm.style.width = flyer_base.style.width;
        flick_fade_elm.style.height = flyer_base.style.height;
        
        flick_fade_elm.style.position = "absolute";
        flick_fade_elm.style.backgroundColor = "black";
        
         var logo_img = document.createElement("img");
        logo_img.src = logo_src;
        
        
        logo_img.style.width = .8 * parseInt(flick_fade_elm.style.width);
        logo_img.style.height = .45 * 
        parseInt(flick_fade_elm.style.width);
        
        logo_img.style.objectFit = "cover";
        
        logo_img.style.position = "absolute";
        logo_img.style.top = (parseInt(flick_fade_elm.style.height) / 2) - (parseInt(logo_img.style.height) / 2);
        logo_img.style.left = (parseInt(flick_fade_elm.style.width) / 2) - (parseInt(logo_img.style.width) / 2);
        
        
        flick_fade_elm.appendChild(logo_img);
        flyer_base.appendChild(flick_fade_elm);
        parent.appendChild(flyer_base);
        
        this.html_elm = flick_fade_elm;
        this.parent = flyer_base;
        this.flick_dur = flick_dur;
        this.fade_dur = fade_dur;
    }
    
    flickerIn(){
        //ADD ANIMATION
        this.html_elm.className = "flicker-in-1";
        this.html_elm.style.animationDuration = this.flick_dur + "s";
        this.html_elm.style.animationTimingFunction = "esse-in";
        
//        this.flicker_elm.style.animationIterationCount = 1;
        var local = this;
        //REMOVE ANIMATION
        setTimeout(function() {
            local.html_elm.classList.remove( "flicker-in-1");
        }, this.flick_dur * 1000);
    }
    
    fadeOut(){
        this.parent.style.backgroundColor = "black";
        //ADD ANIMATION
        this.html_elm.className = "fade-out";
        this.html_elm.style.animationDuration = this.fade_dur + "s";
        this.html_elm.style.animationTimingFunction = "ease-in";
        
//        this.flicker_elm.style.animationIterationCount = 1;
        var local = this;
        //REMOVE ANIMATION
        setTimeout(function() {
            local.html_elm.style.opacity = 0;
            local.html_elm.classList.remove("fade-out");
        }, this.flick_dur * 1000);
//        
    }
    
}