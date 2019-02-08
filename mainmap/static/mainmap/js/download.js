function download(filename, text) {
  var element = document.createElement('a');
  element.href = 'data:attachment/text,'+encodeURI(text);
  element.download = filename;
  element.target = '_blank';
  element.click();
}

$('#download_link, #download_link2').on('click',function(){
    var createObjectURL = (window.URL || window.webkitURL || {}).createObjectURL || function(){}; 
    var blob = null;
    var content = JSON.stringify(json);
    var mimeString = "application/octet-stream"; 
    window.BlobBuilder = window.BlobBuilder || 
                         window.WebKitBlobBuilder || 
                         window.MozBlobBuilder || 
                         window.MSBlobBuilder;  


    if(window.BlobBuilder){
       var bb = new BlobBuilder();
       bb.append(content);
       blob = bb.getBlob(mimeString);
    }else{
       blob = new Blob([content], {type : mimeString});
    }
    var url = createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url
    a.download = "dtp_points.geojson";
    a.target = '_blank';
    a.click();
});

//download('dtp_points.geojson',json)
