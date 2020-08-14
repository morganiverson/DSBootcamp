var path = "Scripts/";
var scripts = ["FlyerIntroClass.js", "LogoElement.js", "IMGPositionClass.js", "CollageIMG.js", 
               "CollageBuildClass.js"];
scripts.forEach(function(item, index) {
    var newScript = document.createElement("script");
    newScript.src = path + item;
    document.head.appendChild(newScript);
});

