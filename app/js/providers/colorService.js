'use strict';

angular.module('jsekoApp')
.factory('ColorService', function() {
  return {
    onColors: function(index) {
      var hexColors = {
        0:  '#FF0000',  //red
        1:  '#00ff00',  //bright green
        2:  '#0000ff',  //blue
        3:  '#ff0080',  //hot pink
        4:  '#00ffff',  //light blue
        5:  '#80ff00',  //light green
        6:  '#660000',  //maroon
        7:  '#0080ff',  //med blue
        8:  '#FF7722',  //light orange
        9:  '#808000',  //olive
        10: '#00ff80',  //Turquoise
        11: '#ff00ff',  //magenta
        12: '#EE4000',  //dark orange
        13: '#FFD700',  //yellow
        14: '#006600',  //michaels green
        15: '#8000ff',  //purple
        16: '#4B0082',  //indigo
        17: '#000000',  //black
        18: '#ffffff'   //white
      };
      return hexColors[index];
    },
    offColors: function(index) {
      var hexColors = {
        0:  '#FFCCCC',  //red
        1:  '#CCFFCC',  //bright green
        2:  '#CCCCFF',  //blue
        3:  '#FFCCFF',  //hot pink
        4:  '#CCFFFF',  //light blue
        5:  '#FFFFCC',  //light green
        6:  '#FF9999',  //maroon
        7:  '#CCFFFF',  //med blue
        8:  '#FFFFEE',  //light orange
        9:  '#FFFF99',  //olive
        10: '#99FFFF',  //Turquoise
        11: '#FF99FF',  //magenta
        12: '#FFD999',  //dark orange
        13: '#FFFF99',  //yellow
        14: '#99FF99',  //michaels green
        15: '#FF99FF',  //purple
        16: '#E499FF',  //indigo
        17: '#000000',  //black
        18: '#ffffff'   //white
      };
      return hexColors[index];
    }
  };
});