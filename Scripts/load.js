//CREATE EVENT FOR COLLAGE IMG FILES LOADED
var files_loaded_event = new CustomEvent("collageFilesLoaded");

//ADD SCRIPTS
var path = "Scripts/";
var scripts = ["runFlyer.js","FlyerIntroClass.js", "LogoElement.js", "IMGPositionClass.js", "CollageIMG.js", "CollageBuildClass.js", "CollageFiles.js"];

scripts.forEach(function(item, index) {
    var newScript = document.createElement("script");
    newScript.src = path + item;
    document.head.appendChild(newScript);
});

//ADD STYLE SHEETS
var head = document.head;
path = "Styles/";
var styles = ["animista.css", "FlyerStyles.css"];
styles.forEach(function(item) {
    var newStyle = document.createElement("link");
    newStyle.rel = "stylesheet";
    newStyle.type = "text/css";
    newStyle.href = path + item;
    
    head.appendChild(newStyle);
});
