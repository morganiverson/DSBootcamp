////window.addEventListener("load", function(){
//    createDiv(500,800);
//});



function createDiv(width, height){
    var par = document.createElement("div");
    par.id = "parent";
    par.style.width = width;
    par.style.height = height;
    par.style.position = "relative";
    par.style.backgroundColor = "pink";
    par.style.margin = "auto";
    par.style.border = "1px solid black";


    par.onclick = function() {
        var build = new CollageBuild(par, collage_imgs);
    }
    document.body.appendChild(par);

}

function center(rand_col, num_col) {
    return (rand_col!= 0) && rand_col != (num_col - 1);
}
function getArrayPosFrom(current_row, offset, num_col) {
    return (num_col * current_row) + offset;
}
function round(n, dec_places) {
    var factor = Math.pow(10, dec_places)
    return parseInt(n * factor) / factor;
}


class CollageBuild{
    constructor(parent, img_arr) {
        this.parent = parent;
        
        this.img_arr = img_arr;
        this.col_img_arr = [];//CollageIMG Objects
        this.initialPositions = this.getInitialPositions(); 
        console.log(this.initialPositions); //IMGPosition Objects
        
        this.num_imgs = img_arr.length;
        this.num_portraits = this.getNumPortraitImages();

        var rowcol = this.getRowCol(this.num_imgs);
        this.rows = rowcol.top;
        this.columns = rowcol.left;

        this.par_height = parseInt(window.getComputedStyle(parent).height);
        this.par_width = parseInt(window.getComputedStyle(parent).width);

        this.def_img_height = round(this.par_height / this.rows, 2);
        this.def_img_width = round(this.par_width / this.columns, 2);
        console.log(this);


        this.land_img_pos = this.fillDefaultLandscapePositions();
        console.log(this.land_img_pos);

        this.port_img_pos = [];

        this.populatePortraitPositions();
        this.showArrays();
        //        console.log(this.land_img_pos);
        //        console.log(this.port_img_pos);

        //ANIMATE
        //TEST - PLACE 
//        this.addIMG(); //onclick();
    }

    //UNTESTED
    getRowCol(loc_num_img) {
        var hi_factor = this.loc_num_img;
        var lo_factor = 1;
        var low = 1;

        for(var i= loc_num_img; i >= low; i--){
            for(var j = low; j <=i; j++) {
                if(i * j > loc_num_img) {
                    //                    console.log(i + " * " + j + " = " + (i * j));
                    break;
                }
                else if (i * j ==  loc_num_img) {
                    //IF I AND J ARE FACTORS - STORE
                    //SET LOWEST LO_FACTOR
                    hi_factor = i;
                    lo_factor = j;
                    low = j + 1;
                    continue;
                }
            }
        }

        console.log(hi_factor + " x " + lo_factor);

        //PRIME
        if(lo_factor == 1)
            return this.getRowCol(loc_num_img + 1);
        else 
            return new IMGPosition(hi_factor, lo_factor, 0, 0);
    }

    //UNTESTED - PORTRAIST > ROWS
    populatePortraitPositions() {
        //        console.log(this.num_portraits);
        //RANDOMLY SPREAD PORTRAIT POSITIONS
        var row = 0;
        for(var i = 0; i < this.num_portraits; i++) {
            var rand_col = parseInt(Math.random() * this.columns);
            var land_arr_pos = getArrayPosFrom(row, rand_col, this.columns);

            //PREVENT OVER
            while(this.land_img_pos[land_arr_pos] == null) {
                console.log("loop");
                //RANDOM COLUMN IN CURRNET ROW
                rand_col = parseInt(Math.random() * this.columns);

                land_arr_pos = getArrayPosFrom(row, rand_col, this.columns);
            }

            var new_port_pos = this.land_img_pos.splice(land_arr_pos, 1, null)[0]; 
            //REMOVE AND RETURN LANDSCAPE POSITION COORDS
            //ADJUST REST OF ROW
            if(center(rand_col, this.columns)){
                console.log("CENTER");
                //IF NOT END POSITION

                //ADJUST POSITIONS BEFORE
                //EXTEND WIDTH BY PORTION
                var num_before = rand_col;
                var add_width = (new_port_pos.width * .25) * (1/rand_col);
                //DIVIDE 1/4 OF WIDTH BETWEEN PREVIOUS POSITION(S)
                for(var cb = 0; cb < rand_col; cb++) {
                    var curr_pos = this.land_img_pos[getArrayPosFrom(row, cb, this.columns)];
                    if(curr_pos != null)
                        this.land_img_pos[getArrayPosFrom(row, cb, this.columns)].width+= add_width;
                }

                //ADJUST POSITIONS AFTER
                //REDUCE LEFT VALUE (MOVE BACK)
                var num_after = this.columns - (rand_col + 1);
                var shift_left = (new_port_pos.width * .25) * (1 / num_after);
                //DIVIDE OTHER 1/4 OF WIDTH WIDTH FOLLWOING POSITION(S)
                for(var ca = rand_col + 1; ca < this.columns; ca++) {
                    var curr_pos = this.land_img_pos[getArrayPosFrom(row, ca, this.columns)];
                    if(curr_pos != null) {
                        this.land_img_pos[getArrayPosFrom(row, ca, this.columns)].left-=shift_left; //MOVE LEFT
                        this.land_img_pos[getArrayPosFrom(row, ca, this.columns)].width+=shift_left;//ADJUST WIDTH
                    }
                }

                //SET LEFT AND WIDTH OF NEW PORTRAIT POSITION
                var prev_pos = this.land_img_pos[getArrayPosFrom(row, rand_col) - 1];
                new_port_pos.left = prev_pos.left + prev_pos.width;
                new_port_pos.width *=.5;
            }
            else if (rand_col == (this.columns - 1)){
                console.log("RIGHT");
                //RIGHT END
                //ADD PORTION 1/2 OF WIDTH TO EACH PREVIOUS POSITION
                var num_before = rand_col;
                var add_width = (new_port_pos.width * 1/2) * (1/rand_col);
                for(var r = 0; r < rand_col; r++) {
                    var curr_pos = this.land_img_pos[getArrayPosFrom(row, r, this.columns)];
                    if(curr_pos != null){
                        this.land_img_pos[getArrayPosFrom(row, r, this.columns)].width += add_width;
                        if(r > 0) {
                            this.land_img_pos[getArrayPosFrom(row, r)].left += r * add_width;  
                        }
                    }
                }

                new_port_pos.left+= (new_port_pos.width * .5); //INCREASE LKEFT BY HALF SIZE
                new_port_pos.width *= .5; //REDUCE WITHD BY HALF
            }
            else if(rand_col == 0) {
                console.log("LEFT");
                //LEFT END
                //SHIFT PORTION 1/2 OF WIDTH TO EACH PREVIOUS LEFT POSITION
                var num_after = this.columns - (rand_col + 1);
                var shift_left = (new_port_pos.width * 1/2) / num_after;

                for(var l = rand_col + 1; l < this.columns; l++) {
                    var curr_pos = this.land_img_pos[getArrayPosFrom(row, l, this.columns)];
                    if(curr_pos != null){
                        this.land_img_pos[getArrayPosFrom(row, l, this.columns)].width += shift_left;
                        this.land_img_pos[getArrayPosFrom(row, l, this.columns)].left -= (this.columns - l) * shift_left;
                    }
                }

                new_port_pos.width *= .5; //REDUCE WITHD BY HALF
            }

            this.port_img_pos.push(new_port_pos);


            row++;
            if(row == this.rows)
                row = 0;
        }
        this.stripLandIMGPos(); 


    }

    showArrays(){
        console.log("LANDSCAPE IMAGE POSITIONS >>");
        console.log(this.land_img_pos);
        console.log("PORTRAIT IMAGE POSITIONS >>");
        console.log(this.port_img_pos);
        console.log("IMAGES >>");
        console.log(this.img_arr);
    }

    //RETURN DEFAULT POSITIONS, WIDTHS, HEIGHTS OF COLLAGE ELEMENTS
    fillDefaultLandscapePositions(){
        var temp_land_arr = [];
        for(var i = 0; i < this.rows; i++) {
            for(var j = 0; j < this.columns; j++) {
                temp_land_arr.push(new IMGPosition(i * this.def_img_height, j * this.def_img_width, this.def_img_width, this.def_img_height));
            }
        }

        return temp_land_arr;
    }

    //RETURN NUMBER OF PORTAIT ORIENTATION IMAGES
    getNumPortraitImages(){
        var n = 0;
        var loc_img_arr = this.img_arr;
        this.img_arr.forEach(function(item, index) {
            if(item.indexOf("_P") >=0) n++;
        });
        return n;
    }

    getInitialPositions(){
        console.log(this);
        var top = 0;
        var left = 0;
        var temp_initial = [];
        var par_hgt = parseInt(this.parent.style.height);
        var par_wid = parseInt(this.parent.style.width);
        var par_left = parseInt(window.getComputedStyle(this.parent).left);
        var par_top = parseInt(window.getComputedStyle(this.parent).top);
        console.log(par_hgt + " " + par_wid + " " + par_left + " " + par_top);
        
        for(var i = 0; i < 3; i++) {
            for(var j = 0; j < 3; j++) {
                if(i == 1 && j == 1) continue;
                else {
                    //SET TOPS
                    if(i == 0) top = par_top - (par_hgt);
                    
                    else if (i == 1) top = .5 * par_hgt;
                    
                    else if (i == 2) top = (1.5 * par_hgt);
                    
                    //SET LEFTS
                    if (j == 0) left = par_left - (par_wid);
                    
                    else if (j == 1) left = .5 * par_wid;
                    
                    else if (j == 2) left = 1.5 * par_wid;
                    
                    temp_initial.push(new IMGPosition(top, left, 0, 0));
                }
            }
        }
        return temp_initial;
    }
    
    getRandomInitialPosition(){
        var r = parseInt(Math.random() * this.initialPositions.length);
        return this.initialPositions[r];
    }
    
    stripLandIMGPos() {
        for(var i = this.land_img_pos.length - 1; i >= 0; i--) {
            if(this.land_img_pos[i] == null) {
                this.land_img_pos.splice(i, 1);
            }

        }

    }
    
    addIMG() {
        var loc_this = this;
        //CREATE COLLAGE IMG
        //REPLACE 
        var p = 0;
        var l = 0;
        var curr_img = 0;
        var overflow = false;
        for(var i = 0; i < this.rows * this.columns; i++) {
            
            var initialPosition = this.getRandomInitialPosition();
            
//            console.log(this.img_arr[curr_img]);
            if(this.img_arr[curr_img].indexOf("_P") >= 0){
                this.col_img_arr.push(new CollageIMG(this.parent, this.img_arr[curr_img], this.port_img_pos[p].height, this.port_img_pos[p].width, initialPosition.top, initialPosition.left, this.port_img_pos[p].top, this.port_img_pos[p].left, 1));
                p++;
            }
            else {
                //CREATE COLLAGE IMG
                this.col_img_arr.push(new CollageIMG(this.parent, this.img_arr[curr_img], this.land_img_pos[l].height, this.land_img_pos[l].width, initialPosition.top, initialPosition.left, this.land_img_pos[l].top, this.land_img_pos[l].left, 1));
                l++;
            }
            curr_img++;
            if(i == this.img_arr.length - 1) {
                curr_img = 0;
            }
           
        }
        var timeS = 0;
        this.col_img_arr.forEach(function(item, index) {
            
            //RANDOM DELAY 1-2 SEcs
            var delay = (Math.random() * 1.8) + .2;
            timeS+=delay;
            item.place(delay);
        });
        
        console.log(this.col_img_arr);
        return timeS;
    }
}