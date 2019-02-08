
L.mapbox.accessToken = 'pk.eyJ1IjoiZ2lzc29pbCIsImEiOiJjamFoa2N2YmMyZmZ0MzRyMWw1c2U0aWZiIn0.4b8EwRGlLETPzFB9dHLKOg';
var map = L.map('map',{ zoomControl: false, minZoom: 10}).setView(ll, zoom);
L.control.zoom({
     position:'bottomright'
}).addTo(map);

map.attributionControl.addAttribution('<a href="https://www.mapbox.com/about/maps/">Mapbox</a> | <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>')
L.mapbox.styleLayer('mapbox://styles/gissoil/cjjoshntg0paf2smf3dlfo8gw').addTo(map);


var geojsonOptions = {
    fillColor: "#657EFF",
    color: "rgb(101,126,255)",
    weight: 2,
    opacity: 1,
    fillOpacity: 0.24
};

function onEachFeature(feature, layer) {
    if (feature) {
           layer.on('preclick',function(e){new_popup(feature);})
           layer.bindPopup(popup,{minWidth: 370, maxWidth: 370});
       }
   };

function onEachAreaFeature(feature, layer){
    if (feature) {
            layer.on('click',function(e){load_area(feature);});
        }
}

var polylayer = L.geoJSON(poly_json,{onEachFeature: onEachAreaFeature,style: geojsonOptions})
polylayer.addTo(map);

showtemplatedata({'Date1':share_date_1,'Date2':share_date_2, 'Pog': share_pog,'Desc': share_desc, 'K_Uch': share_kuch});
$('#Date,#Date2').val(share_date_1);
$('#Dateend,#Dateend2').val(share_date_2);
if (share_pog > 0){$('#Postr').attr('checked',true); $('#Pog').val(share_pog);}
if (share_desc > 0){$('#Desc').attr('checked',true); $('#K_Uch').val(share_desc)}
if (share_kuch > 0){$('#K_Uch').val(share_kuch)}
if (share_ran > 0){$('#Ran').val(share_ran)}


var searchSubmitButton = document.getElementById("searchSubmitButton");
searchSubmitButton.onclick = function(){
    var param1 = '?Date1='+$('#Date').val()
    var param2 = '&Date2='+$('#Dateend').val()
    var param3 = '&Pog='+($('#Postr').prop('checked') ? 1 : 0)
    var param4 = '&Desc='+($("#Desc").prop('checked') ? 1 : 0)
    var param7 = parseInt($('#Ran').val())>0 ? '&Ran='+$('#Ran').val() : ''
    var param8 = parseInt($('#K_Uch').val())>0 ? '&K_Uch='+$('#K_Uch').val() : ''
    var param5 = '&zoom='+map.getZoom()
    var param6 = '&ll='+map.getCenter().lat.toFixed(3)+', '+map.getCenter().lng.toFixed(3)
    history.pushState("",document.title, param1+param2+param3+param4+param7+param8+param5+param6)
    };
var searchMoreSubmitButton = document.getElementById("searchMoreSubmitButton");
searchMoreSubmitButton.onclick = function(){
    var param1 = '?Date1='+$('#Date').val()
    var param2 = '&Date2='+$('#Dateend').val()
    var param3 = '&Pog='+($('#Postr').prop('checked') ? 1 : 0)
    var param4 = '&Desc='+($("#Desc").prop('checked') ? 1 : 0)
    var param7 = parseInt($('#Ran').val())>0 ? '&Ran='+$('#Ran').val() : ''
    var param8 = parseInt($('#K_Uch').val())>0 ? '&K_Uch='+$('#K_Uch').val() : ''
    var param5 = '&zoom='+map.getZoom()
    var param6 = '&ll='+map.getCenter().lat.toFixed(3)+', '+map.getCenter().lng.toFixed(3)
    history.pushState("",document.title, param1+param2+param3+param4+param7+param8+param5+param6)
    };

var pointLayerCheckbox = document.getElementById("point_layer_checkbox");


pointLayerCheckbox.onchange = function(){
    if (pointLayerCheckbox.checked){
        if (!map.hasLayer(pointlayer) && map.getZoom()>14){pointlayer.addTo(map);};
    }
    else {
        if (map.hasLayer(pointlayer)){map.removeLayer(pointlayer);};
    }

};
map.on('zoomend', function(){
    if (pointLayerCheckbox.checked && !map.hasLayer(pointlayer) && map.getZoom()>14){
        pointlayer.addTo(map);
    }
    else {
        if (map.hasLayer(pointlayer) && map.getZoom()<15){map.removeLayer(pointlayer);};
    }

});



var polygonLayerCheckbox = document.getElementById("polygon_layer_checkbox");

polygonLayerCheckbox.onchange = function(){
    if (polygonLayerCheckbox.checked){
        if (!map.hasLayer(polylayer)){polylayer.addTo(map);};
    }
    else {
        if (map.hasLayer(polylayer)){map.removeLayer(polylayer);};
    }

};

var cfg = {
  "radius": 0.001,
  "maxOpacity": .9,
  "minOpacity": 0,
  "scaleRadius": true,
  "useLocalExtrema": false,
  gradient: {
    '.25': '#eb8d8d',
    '.75': '#eb5757',
    '.95': '#b20000',
  },
  latField: 'lat',
  lngField: 'lng',
  valueField: 'value'
};
var heatmapLayer = new HeatmapOverlay(cfg);

map.on("moveend",function(){
    var param1 = '?Date1='+$('#Date').val()
    var param2 = '&Date2='+$('#Dateend').val()
    var param3 = '&Pog='+($('#Postr').prop('checked') ? 1 : 0)
    var param4 = '&Desc='+($("#Desc").prop('checked') ? 1 : 0)
    var param7 = parseInt($('#Ran').val())>0 ? '&Ran='+$('#Ran').val() : ''
    var param8 = parseInt($('#K_Uch').val())>0 ? '&K_Uch='+$('#K_Uch').val() : ''
    var param5 = '&zoom='+map.getZoom()
    var param6 = '&ll='+map.getCenter().lat.toFixed(3)+', '+map.getCenter().lng.toFixed(3)
    history.pushState("",document.title, param1+param2+param3+param4+param7+param8+param5+param6)
})


