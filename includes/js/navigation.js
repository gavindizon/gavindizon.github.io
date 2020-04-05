

function myFunction() {
    var x = document.getElementById("nav-list-mobile");
    if (x.style.display === "block") {
    x.style.display = "none";
    console.log("HELLO");
} else {
    x.style.display = "block";
  }
};


window.onresize = displayWindowSize;
window.onload = displayWindowSize;

    function displayWindowSize() {
        myWidth = window.innerWidth;
        myHeight = window.innerHeight;
        var y = document.getElementById("nav-list-mobile");
        
        if(myWidth > 767){
            y.style.display = "none";
        }
    };