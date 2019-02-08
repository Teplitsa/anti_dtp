function showtemplatedata(data) {

var myicon = L.icon({
 iconUrl: "static/mainmap/icn/curen.svg",
 iconSize: [24,24],
 iconAhchor: [12,12],
 popupAnchor: [-3,-30]
});
$(".searchform").css('cssText', "display: none!important")
$(".load").css('cssText', "display: block!important")
$.ajax({
        url: 'ajax/search/',
        data: data,
        dataType: 'json',
        success: function (data) {
            try{map.removeLayer(pointlayer);}
            catch(err){}
            try{map.removeLayer(heatmapLayer);}
            catch(err){}
            json = JSON.parse(data.photos);
            max = 0
            heatmap_data = [];
            pointlayer = L.geoJSON(json,{onEachFeature: onEachFeature,
                pointToLayer: function (feature, latlng) {
                heatmap_data.push({'lat':feature.geometry.coordinates[1],'lng':feature.geometry.coordinates[0],'value':feature.properties.K_Uch});
                max = Math.max(max, feature.properties.K_Uch);
                return L.marker(latlng, {icon: myicon })
                }
            });
            heatmapLayer.setData({max: 4, data: heatmap_data});
            map.addLayer(heatmapLayer);
            if ($("#point_layer_checkbox").is(':checked')){
                //pointlayer = L.markerClusterGroup({
                //    polygonOptions:geojsonOptions
                //});
                //pointlayer = new ZoomShowHide();
                //pointlayer_.min_zoom = 16;
            if (map.getZoom()>14){
            map.addLayer(pointlayer);}
            //pointlayer.addLayer(pointlayer_);
            $("#quntity, #quntity2").html("(Отобрано "+json.features.length+")");
            $(".load").css('cssText', "display: none!important")
            $(".searchform").css('cssText', "display: block!important");}
        }
      });
    }

$("#searchform").submit(function (event) {
      event.preventDefault();
      var data = {
          'Date1': $("#Date").val(),
          'Date2': $("#Dateend").val(),
          'Dtp_V': $("#Dtp_V").val(),
          'Pog': $('#Postr').prop('checked') ? 1 : 0,
          'Desc': $("#Desc").prop('checked') ? 1 : 0
        };
      console.log(data);
      showtemplatedata(data);
    });

$("#moresearchform").submit(function (event) {
      event.preventDefault();
      var data = {
          'Date1': $("#Date2").val(),
          'Date2': $("#Dateend2").val(),
          'Dtp_V': $("#Dtp_V2").val(),
          'Ran': $('#Ran').val(),
          'Pog': $('#Pog').val(),
          'K_Uch': $('#K_Uch').val(),
          'Osv': $("#Osv").val(),
          'Sdor': $("#Sdor").val(),
        };
      console.log(data);
      showtemplatedata(data);
    });


$("#logoutbtn").click(function (event) {
    var data = {}
    $.ajax({
        url:'ajax/logout/',
        data : data,
        dataType:'json',
        success: function(data){
           console.log('logout');
           location.reload();
        }
    });    
});

$("#auth").submit(function (event) {
    event.preventDefault();

    var data = {'username':$("#email").val(),
                'password':$("#password").val()}

    $.ajax({
        url:'ajax/login/',
        data : data,
        dataType:'json',
        success: function(data){
           console.log('login');
           location.reload();
        },
        error: function(data){
           console.log(data.responseJSON.error);
           $("#loginerror").html(data.responseJSON.error)
        }
    });
});

$("#fogot").submit(function (event) {
    event.preventDefault();
    $.ajax({
       url:'ajax/foget/',
       data: {'email':$("#fogotemail").val()},
       dataType:'json',
       success: function(data){ console.log(data)}
    });
});

$("#registr").submit(function (event) {
    event.preventDefault();

    var data = {'username':$("#new_email").val(),
                'password':$("#new_password").val(),
                'first_name':$("#name").val(),
                'last_name':$("#lastname").val(),}
    if ($("#new_password").val() === $("#new_password").val()){
    $.ajax({
        url:'ajax/registr/',
        data : data,
        dataType:'json',
        success: function(data){
           alert("Регистрация выполнена успешно"); 
           location.reload();
        },
        error: function(data){
           console.log('Данный email уже зарегистрирован');
           $("#regerror").html('Данный email уже зарегистрирован')
        }
    });}
    else {
           $("#regerror").html('Пароли не совпадают')
    };
});

