

var collage_file_src = [];
window.onload = function() {

    var path = "Media/Collage/";
    /* THES SRC OF IMG IS IN index.html
    WHICH IS AT THE ROOT. ITS NOT FROM HERE! SO THERES NO NEED TO GO BACKWARDS */
    var file_names = ["BenchUp_P.mp4",
                      "Circles_L.JPG",
                      "Cones_L.JPG",
                      "Core_L.JPG",
                      "FenceResist_L.JPG",
                      "Group_L.JPG",
                      "Lunge_P.JPG",
                      "NoArms_L.JPG",
                      "Planks_L.JPG",
                      "Reach_P.JPG", 
                      "ResistSquat_P.mp4",
                      "Review_P.JPG",
                      "Scoop_L.JPG",
//                      "SidePlank_L.png", 
                      "SmGroup_L.JPG",
//                      "SquatGM_L.mp4",
                      "Stadiums_L.mp4",
//                      "SwitchDemo_P.mp4"
                     ];

    file_names.forEach(function(item){
        collage_file_src.push(path + item);
        console.log(path);
    });
    console.log(collage_file_src);

    window.dispatchEvent(files_loaded_event);

};
