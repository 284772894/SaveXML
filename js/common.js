/**
 * Created by Administrator on 2016/1/8.
 */
$(function(){
    session = sessionStorage;
    get_blob = function() {return Blob;};

    $("#btn_add").click(function() {
        var table = "";
        table += "<tr>";
        table += "<td><input class=\"i_id\" type=\"text\" /></td>";
        table += "<td><input class=\"i_name\" type=\"text\" /></td>";
        //table += "<td><input class=\"i_method\" type=\"text\" placeholder=\"GET,POST\"/></td>";
        table += "<td><select class='sel_method'><option value='0'>GET</option><option value='1'>POST</option><</select> </td>";
        table += "<td><input class=\"i_url\" type=\"text\" /></td>";
        table += "<td><input class=\"i_params\" type=\"text\" placeholder=\"没有则不填\" />" +
                    "<select class='sel_login'>" +
                        "<option value='0'>不需要登陆后的参数</option>" +
                        "<option value='1'>需要登陆后的参数</option>" +
                    "</select>" +
                "</td>";
        table += "<td><input class=\"i_hope_result\" type=\"text\" /></td>";
        table += "<td><input class=\"btn_del\" type=\"button\" value='删除' /></td>";
        table += "</tr>";
       $("#i_list").parent().append(table);
    });
    $("#btn_save").click(function(e){
        check();
        var flag = true;

        $(".i_id").each(function(){
            if($(this).val()==""){
                flag = false;
            }
        });
        $(".i_name").each(function(){
            if($(this).val()==""){
                flag = false;
            }
        });
        $(".i_method").each(function(){
            if($(this).val()==""){
                flag = false
            }
        });
        $(".i_url").each(function(){
            if($(this).val()==""){
                flag = false;
            }
        });
        $(".i_function").each(function(){
            if($(this).val()==""){
                flag = false;
            }
        });
       if($("#tb_title").val() == "" || $("#tb_port").val()==""||$("#tb_host").val()==""){
           flag = false;
       }
        if(flag){
            savexml(e);
        }
    });
    $(document).on("click",".btn_del",function(){
        $(this).parents("tr").remove()
    });
    $(document).on("focus",".i_id,.i_name,.i_method,.i_url,.i_function,#tb_host,#tb_prot,#tb_title",function(){
        if($(this).hasClass("border")){
            $(this).removeClass("border");
        }
    })
});
function savexml(e){
    var xml="";
    xml += "<?xml version=\"1.0\" encoding=\"utf-8\"?>";
    xml += "<root>";
    xml += "<title>"+$("#tb_title").val()+"</title>";
    xml += "<host>"+$("#tb_host").val()+"</host>";
    xml += "<port>"+$("#tb_port").val()+"</port>";
    if($("#tb_No").val()!=""){
        xml += "<No>["+$("#tb_No").val()+"]</No>";
    } else{
        xml += "<No>[]</No>";
    }
    $("tbody#t_body tr").each(function(){
            if($(this).attr("id")=="i_list"){
                xml += "<InterfaceList>";
                xml += "<id>"+$(this).find(".i_id").val()+"</id>";
                xml += "<name>"+$(this).find(".i_name").val()+"</name>";
                xml += "<method>"+$(".sel_method").find("option:selected").text()+"</method>";
                xml += "<url>/"+$(this).find(".i_url").val()+"?</url>";
                xml += "<hope>"+$("#sel_lg").find("option:selected").val()+"</hope>";
                if($(this).find(".i_params").val()!="") {
                    xml += "<params>{"+$(this).find(".i_params").val()+"}</params>";
                } else {
                    xml += "<params>{}</params>";

                }
                xml += "<login>0</login>";
                xml += "</InterfaceList>"
            } else{
                xml += "<InterfaceList>";
                xml += "<id>"+$(this).find(".i_id").val()+"</id>";
                xml += "<name>"+$(this).find(".i_name").val()+"</name>";
                xml += "<method>"+$(".sel_method").find("option:selected").text()+"</method>";
                xml += "<url>"+$(this).find(".i_url").val()+"</url>";
                xml += "<hope>"+$(this).find(".i_hope_result").val()+"</hope>";
                if($(this).find(".i_params").val()!="") {
                    xml += "<params>{"+$(this).find(".i_params").val()+"}</params>";
                } else {
                    xml += "<params>{}</params>";

                }
                xml += "<login>"+$(".sel_login").find("option:selected").val()+"</login>";
                xml += "</InterfaceList>"
            }

    });
    xml+= "</root>";
    console.log(xml);
    e.preventDefault();
    var BB = get_blob();
    saveAs(
        new BB(
            [xml],
            {type: "text/plain;charset=" + document.characterSet}
        )
        , ("test") + ".xml"
    );
}
function check(){
    $(".i_id,.i_name,.i_method,.i_url,.i_hope_result,#tb_host,#tb_prot,#tb_title").each(function(index,list){
        if($(this).val()==""){
            $(this).addClass("border");
        }
    });
}