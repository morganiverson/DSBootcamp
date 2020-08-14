class IMGPosition{
    constructor(top, left, width, height){
        this.top = top;
        this.left = left;
        this.width = width;
        this.height = height;
    }

    print(){
        return "(" + this.top + ", " + this.left + " :: " + width + ")";
    }
}