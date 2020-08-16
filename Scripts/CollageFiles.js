

var collage_file_src = [];
window.onload = function() {

    var path = "/Media/Collage/";
    var file_names = [
        "Circles_L.JPG",
        "Cones_L.JPG",
        "Core_L.JPG",
        "Fence_L.mp4",
        "FenceResist_L.JPG",
        "Group_L.JPG",
        "HighKnee_L.mp4",
        "Lunge_P.JPG",
        "NoArms_L.JPG",
        "Planks_P.JPG",
        "Reach_P.JPG",
        "Review_P.JPG",
        "Scoop_L.JPG",
        "SmGroup_L.JPG",
        "SwitchDemo_P.mp4"
    ];

    file_names.forEach(function(item){
        collage_file_src.push(path + item);
    });
    console.log(collage_file_src);
//    window.alert("COLLAGE FILES");
    console.log(files_loaded_event);
   window.dispatchEvent(files_loaded_event);

};
