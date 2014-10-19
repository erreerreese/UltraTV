/**
 * UltraTV
 */

var UI = require('ui');
var remote;
var quotes;
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
menu.on('select',function(e){
   switch(e.itemIndex){
  case 0:
    remote=new UI.Card({
       title:'Remote',
       subtitle:'nombre del programa',
       body: 'nombre del canal'
    });
    remote.show();
    break;
  case 1:
    quotes=new UI.Card({
       title:'Quotes',
       subtitle:'insert random quote',
       body: 'categoria del programa'
    });
    quotes.show();
    break;
  }
});
menu.show();