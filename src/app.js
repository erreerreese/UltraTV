/**
 * UltraTV
 */

var UI = require('ui');

var menu = new UI.Menu({
  sections: [{
    title: 'UltraTV',
     items: [{
         title:'TV remote: ',
         subtitle: 'Some subtitle',
         icon: 'images/ricks.png',
        }, 
        {
         title:'Ultra-Facts: ',
         subtitle: 'Some subtitle',
         icon: 'images/javs.png'
        }]
  }]
});
menu.show();