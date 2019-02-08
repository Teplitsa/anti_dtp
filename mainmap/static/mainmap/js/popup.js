var popup = document.createElement("div");
popup.className = "row popup";
var left_popup_menu = document.createElement("div");
left_popup_menu.className = "col-10 row";
    var button_menu = document.createElement("button");
    button_menu.className = "btn btn-blue btn-circle";
        var button_icon = document.createElement("i");
        button_icon.className = "material-icons white-fa";
        button_icon.innerHTML = "info_outline";
        button_menu.appendChild(button_icon);
    left_popup_menu.appendChild(button_menu);

    var date = document.createElement("p");
    date.className = "pl-3 my-auto card-title";
    left_popup_menu.appendChild(date);

var right_popup_menu = document.createElement("div");
right_popup_menu.className = "col-2 right-popup";
    var closebtn = document.createElement("button");
    closebtn.className = "btn btn-close float-right";
    closebtn.setAttribute("style","background-color: transparent; border-color: transparent;");
    closebtn.setAttribute("onclick","map.closePopup();");
    right_popup_menu.appendChild(closebtn);
        var button_icon = document.createElement("i");
        button_icon.className = "material-icons";
        button_icon.innerHTML = "clear";
        closebtn.appendChild(button_icon);
popup.appendChild(left_popup_menu);
popup.appendChild(right_popup_menu);

var content = document.createElement("ul");
content.className = "card-text pl-3 col-12"
content.setAttribute("style","padding-bottom: 24px;");
    var dtp_type = document.createElement("li");
    dtp_type.className="card-subtitle"
    var dtp_date = document.createElement("li");
    var dtp_osv = document.createElement("li");
    var dtp_ran = document.createElement("li");
    var dtp_pog = document.createElement("li");
    var dtp_ndu = document.createElement("li");
    content.appendChild(dtp_type);
    content.appendChild(dtp_date);
    content.appendChild(dtp_osv);
    content.appendChild(dtp_ran);
    content.appendChild(dtp_pog);
    content.appendChild(dtp_ndu);

popup.appendChild(content);

link = document.createElement("a");
link.setAttribute("target","_blank");
link.setAttribute("href","#");
link.setAttribute("style","text-transform: inherit");
link.innerHTML = 'Предотвратить здесь будущие аварии';
link.className = 'btn btn-blue text-white';
content.appendChild(link)

function new_popup(feature){
    console.log(feature.properties)
    date.innerHTML = 'ID:'+feature.properties.Kart_ID.toString();
    link.setAttribute("href","https://docs.google.com/forms/d/e/1FAIpQLSdtC0rhMILj0uMqJOrk8uXKi2U09DMrdktGMzLH_zOrVIsLRQ/viewform?usp=pp_url&entry.1038532235="+feature.properties.Kart_ID.toString());
    dtp_type.innerHTML = feature.properties.Dtp_V.toString();
    dtp_date.innerHTML = feature.properties.Date.toString().substring(0,10);
    dtp_osv.innerHTML = feature.properties.Osv.toString();
    dtp_ran.innerHTML = 'Пострадало: '+feature.properties.Ran.toString();
    dtp_pog.innerHTML = 'Погибло: '+feature.properties.Pog.toString();
    dtp_ndu.innerHTML = 'Нарушения: '+(feature.properties.Ndu.toString() || 'Не установлены');

    return popup
}


function load_area(feature){
    $('#addButton').show();
    var AREA_NAME = feature.properties.Name.toString();
    
    var div = $("#areadata");
    div.empty();

    var header2 = document.createElement("p");
    header2.className = "subtitle pt-2"
    header2.innerHTML = feature.properties.Name.toString();
    header2.setAttribute("width","100%");
    header2.setAttribute("style","text-align: left");
    div.append(header2);

    var address = document.createElement("p");
    address.className = "text"
    address.innerHTML = (feature.properties.Description || "").toString();
    div.append(address);

    function createcollapse(div,id,text1,text2) {
    var hr = document.createElement("hr");
    hr.setAttribute("style","margin: 16px 24px 16px 0px;");
    div.append(hr);
    var newdiv = document.createElement("div");
    newdiv.className = "row text-option";
    newdiv.setAttribute("style","margin: 0;");
    div.append(newdiv);
        var newspan = document.createElement("span");
        newspan.setAttribute("href","#"+id);
        newspan.setAttribute("data-toggle","collapse");
        newspan.className = "my-auto";
        newdiv.append(newspan);
            var newi = document.createElement("i");
            newi.setAttribute("style","top: 2px;");
            newi.className = "more-less fa fa-plus";
            newspan.append(newi)
            var innerspan = document.createElement("span");
            innerspan.innerHTML = text1;
            newspan.append(innerspan)
    var collapsediv = document.createElement("div");
    collapsediv.setAttribute("id",id);
    collapsediv.setAttribute("style","padding-left:24px;padding-top: 22px;");
    collapsediv.className = "collapse pb-1 text"
    collapsediv.innerHTML = text2;
    div.append(collapsediv);}

    createcollapse(div,"info1","Предполагаемые решения",(feature.properties.Solutions || "").toString());
//    createcollapse(div,"info2","Основные виды ДТП на участке",(feature.properties.Main_types || "").toString());
//    createcollapse(div,"info3","Основные сопутствующие факторы",(feature.properties.Factors || "").toString());
    createcollapse(div,"info4","Нарушения схемы дорожного движения",(feature.properties.Nar || "").toString());
    createcollapse(div,"info5","История общения с властями",(feature.properties.Queries || "").toString());


    var hr = document.createElement("hr");
    hr.setAttribute("style","margin: 16px 24px 16px 0px;");
    div.append(hr);

    var div = $("#messages");
    div.empty();

    var comment_div = document.createElement("div");
    comment_div.className = "mb-2"
    div.append(comment_div);
    $.ajax({
            url:'ajax/getcomment/',
            data : {'Area_name':AREA_NAME},
            dataType:'json',
            success: function(data){
              var comments = eval(data.comments);
              for (i in comments){console.log(comments[i].fields)
                 new_div = document.createElement("div");
                 new_div.className = "mb-3 pl-2"
                 comment_div.append(new_div);

                 var header = document.createElement("p")
                 header.className = "mt-1 mb-1 pt-0 pb-0 text-comment-header"
                 header.innerHTML = comments[i].fields.user_name+':'
                 var text =document.createElement("p")
                 text.className = "mt-1 mb-1 pt-0 pl-2 pb-0 text-comment"
                 text.innerHTML = comments[i].fields.comment
                 new_div.appendChild(header);
                 new_div.appendChild(text);
              };

              
            },
            error: function(){}
        });
    

    
    


    if (DJANGO_USER === "true"){

    var form = document.createElement("form");
    form.setAttribute("id","addcomment");
    div.append(form)

    var formdiv = document.createElement("div");
    formdiv.className = "embed-submit-field";
    form.appendChild(formdiv);

    var input = document.createElement("input");
    input.setAttribute("type","text");
    input.setAttribute("placeholder","Написать комментарий...");
    input.setAttribute("id","textcomment");
    formdiv.appendChild(input);
    var button = document.createElement("button");
    button.className = "btn";
    button.setAttribute("id","addcommentButton");
    button.setAttribute("style","background-color: transparent;");
    button.innerHTML = "";
        var i = document.createElement("i");
        i.className = "fa menu-fa fa-long-arrow-right";
        button.append(i);
    formdiv.append(button);
    

    $("#addcomment").submit(function (event) {
        event.preventDefault();
        var date = new Date();
        var data = {'Area_name': AREA_NAME,
                    'User_name': DJANGO_USER_NAME,
                    'Date': date.toISOString().slice(0,19).replace('T',' '),
                    'Comment':$("#textcomment").val(),};
        console.log(data);
        $.ajax({
            url:'ajax/addcomment/',
            data : data,
            dataType:'json',
            success: function(data){console.log('comment was added');
                     load_area(feature);
                     $("#addcommentButton").scrollTo('#addcommentButton');
                     }

        });
     });
    } else {
    var a = document.createElement("a");
    a.innerHTML ='Чтобы оставить комментарии необходимо авторизоваться'
    a.setAttribute("href","#");
    a.setAttribute("style","border-top: 1px solid #E0E0E0;display: inline-block;width: 100%;text-align: center;padding-top: 9px;");
    a.setAttribute("onclick","showLoginForm()");
    a.classname = "mt-3 text-option"
    div.append(a)
    };

    showAddForm();

}
