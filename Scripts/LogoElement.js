function movementTransition(len) {
        return "left " + len + "s, top " + len + "s, width " + len + "s, height " + len + "s";
    }

class LogoAnimation {
    constructor(flick_par, fade_par, img_src, trans_length, posA, posB){
        var e = document.createElement("img");
        e.id = "logo";
        e.src = img_src;
        e.style.position = "absolute";
        e.style.objectFit = "cover";
        
        e.style.top = posA.top;
        e.style.left = posA.left;
        e.style.width = posA.width;
        e.style.height = posA.height;
        e.style.transition = movementTransition(this.trans_len);
        
        flick_par.appendChild(e);
        e.style.zIndex = 3;
        this.fade_par = fade_par;//flick_par.parentNode;
        this.html_elm = e;
        this.posA = posA;
        this.posB = posB;
    }

   
}