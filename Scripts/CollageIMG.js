class CollageIMG{
    constructor(parent, img_src, height, width, initialTop, initialLeft, finalTop, finalLeft, transLen){
        this.img = img_src.indexOf(".mp4") < 0; //TEST IF IMG OR VIDEO - .end
       var outer = document.createElement("div");
        outer.style.position = "absolute";
        outer.style.height = height;
        outer.style.width = width;
        outer.style.top = initialTop;
        outer.style.left = initialLeft;
        outer.style.transition = "top " + transLen + "s , left " + transLen + "s";
//        outer.style.border = "1px solid black";
         outer.style.top = initialTop;
        outer.style.left = initialLeft;
        outer.style.willChange = "top, left";
        var inner;
        
        if(this.img) {
        inner = document.createElement("img");
        }
        else {
            inner = document.createElement("video");
            inner.controls = false;
            inner.autoplay = true;
            inner.loop = true;
            inner.muted = true;
        }
//        console.log("IMG:: " + this.img + "\nSRC:: " + img_src);
        
        inner.src = img_src;
        inner.id = "ColIMG_" + img_src;
        inner.style.objectFit = "cover";
        inner.style.height = "100%"; //width
        inner.style.width = "100%"; //height
        
        
        outer.appendChild(inner);
        parent.appendChild(outer);
        console.log(document.getElementById("ColIMG_" + img_src).src);
        this.html_elm_img = outer;
        this.finalTop = finalTop;
        this.finalLeft = finalLeft;
        this.initialTop = initialTop;
        this.initialLeft = initialLeft;
    }
    
    place(delayS){
        var loc_this = this;
        var elm = this.html_elm_img;

        window.setTimeout(function() {
            console.log("here");
            elm.style.top = loc_this.finalTop;
            elm.style.left = loc_this.finalLeft;
        }, delayS * 1000);
    }
    
}