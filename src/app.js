/**
 * UltraTV
 */

var UI = require('ui');
var remote;
var quotes;
var Accel = require('ui/accel');
var ajax = require('ajax');
var id=1;
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
var play_bool=true;
function play_click() {
        var powerXML;
        if(play_bool){
            powerXML = new XMLHttpRequest();
            powerXML.open("GET", "http://192.168.1.138:8080/remote/processKey?key=pause&hold=keyPress", true);
            powerXML.send();
            play_bool=false;
        }
        else{
            powerXML = new XMLHttpRequest();
            powerXML.open("GET", "http://192.168.1.138:8080/remote/processKey?key=play&hold=keyPress", true);
            powerXML.send();
            play_bool=true;
        }
}
function up_click() {
        var powerXML = new XMLHttpRequest();
        id++;
        powerXML.open("GET", "http://192.168.1.138:8080/dvr/play?uniqueId="+id, true);
        powerXML.send();
}
function down_click() {
        var powerXML = new XMLHttpRequest();
        id--;
        powerXML.open("GET", "http://192.168.1.138:8080/dvr/play?uniqueId="+id, true);
        powerXML.send();
}
function more_click() {
        var powerXML = new XMLHttpRequest();
        powerXML.open("GET", "http://192.168.1.138:8080/remote/processKey?key=rew&hold=keyDown", true);
        powerXML.send();
}
function less_click() {
        var powerXML = new XMLHttpRequest();
        powerXML.open("GET", "http://192.168.1.138:8080/remote/processKey?key=ffwd&hold=keyDown", true);
        powerXML.send();
}
menu.on('select',function(e){
  switch(e.itemIndex){
  case 0:
    remote=new UI.Card({
       title:'Remote',
       subtitle:'Fetching...',
       body: ' '
    });
    remote.show();
    ajax(
      {
      url:'http://192.168.1.138:8080/tv/getTunedPrivate',
      type:'json'
      },
    function(data){
      console.log('Success');
      console.log(data.callsign);
      console.log(data.title);
      //Show to user
      remote.subtitle(data.title);
      remote.body(data.callsign);
      },
    function(error){
      console.log('failed'+error);
      }
    );
    remote.on('click',function(e){
      console.log('wazza');
      console.log('Button ' + e.button + ' pressed.');
      switch(e.button){
        case 'up':
          console.log('1');
          up_click();
          break;
        case 'down':
          console.log('2');
          down_click();
          break;
        case 'select':
          console.log('3');
          play_click();
          break;
      }
      ajax(
      {
        url:'http://192.168.1.138:8080/tv/getTunedPrivate',
        type:'json'
      },
      function(data){
        console.log('Success2');
        console.log(data.callsign);
        console.log(data.title);
        //Show to user
        remote.subtitle(data.title);
        remote.body(data.callsign);
        },
      function(error){
        console.log('failed'+error);
        }
      );
    });
    remote.on('accelTap',function(e){
       if(e.direction>0){
         console.log('4');
         more_click();
       }
       else{
         console.log('5');
         less_click();
       }
    });
    break;
  case 1:
    quotes=new UI.Card({
       title:'ULTRAFACT',
       body: 'The average life span of an MLB baseball is five to seven pitches.'
    });
    quotes.show();
    break;
  }
});
menu.show();
Accel.init();