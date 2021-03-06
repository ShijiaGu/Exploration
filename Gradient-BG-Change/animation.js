var colours = [
    ['#8ee07c', '#3b88c7'],
    ['#3b88c7', '#8ee07c']
  ];
  
  function hex2rgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return 'rgb(' + parseInt(result[1], 16) + ',' + parseInt(result[2], 16) + ',' + parseInt(result[3], 16) + ')';
  }
  
  function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  
    function hex(x) {
      return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
  }
  
  function rgbArray(rgb) {
    return rgb.split('(')[1].split(')')[0].split(',');
  }
  
  //
  // finds transition colour based on mouse position
  function transitionColour(from, to, width, x) {
  
    var m = x / width;
    var r, g, b;
  
    r = Math.ceil(from[0] * m + to[0] * (1 - m));
    g = Math.ceil(from[1] * m + to[1] * (1 - m));
    b = Math.ceil(from[2] * m + to[2] * (1 - m));
  
    return rgb2hex('rgb(' + r + ', ' + g + ', ' + b + ')');
  
  }
  
  $(document).on("mousemove", function(e) {
  
    var xPos = e.pageX,
      width = window.innerWidth,
  
      //
      // convert hex to rgb
      topLeft = hex2rgb(colours[0][0]),
      topRight = hex2rgb(colours[1][0]),
  
      bottomLeft = hex2rgb(colours[0][1]),
      bottomRight = hex2rgb(colours[1][1]);
  
    //
    // get transition colour
    var bottomTransition = transitionColour(rgbArray(bottomRight), rgbArray(bottomLeft), width, xPos);
    var topTransition = transitionColour(rgbArray(topRight), rgbArray(topLeft), width, xPos);
  
    $('body').css({
      'background': 'linear-gradient(' + topTransition + ', ' + bottomTransition + ')'
    });
  
  });