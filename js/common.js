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
        table += "<td><input class=\"i_method\" type=\"text\" placeholder=\"GET,POST\"/></td>";
        table += "<td><input class=\"i_url\" type=\"text\" /></td>";
        table += "<td><input class=\"i_params\" type=\"text\" /></td>";
        table += "<td><input class=\"i_function\" type=\"text\" /></td>";
        table += "<td><input class=\"btn_del\" type=\"button\" value='删除' /></td>";
        table += "</tr>";
       $("#i_list").parent().append(table);
    });
    $("#btn_save").click(function(e){
        check();
        var flag = true;

        $(".i_id").each(function(){
            if($(this).val()==""){
                flag = false
            }
        });
        $(".i_name").each(function(){
            if($(this).val()==""){
                flag = false
            }
        });
        $(".i_method").each(function(){
            if($(this).val()==""){
                flag = false
            }
        });
        $(".i_url").each(function(){
            if($(this).val()==""){
                flag = false
            }
        });
        $(".i_params").each(function(){
            if($(this).val()==""){
                flag = false
            }
        });
        $(".i_function").each(function(){
            if($(this).val()==""){
                flag = false
            }
        });
        if(flag){
            savexml(e);
        }
    });
    $(document).on("click",".btn_del",function(){
        $(this).parents("tr").remove()
    });
    $(document).on("focus",".i_id,.i_name,.i_method,.i_url,.i_params,.i_function",function(){
        if($(this).hasClass("border")){
            $(this).removeClass("border");
        }
    })
});
function savexml(e){
    var xml="";
    xml += "<?xml version=\"1.0\" encoding=\"utf-8\"?>";
    xml += "<root>";
    $("tbody tr").each(function(){
            xml += "<InterfaceList>";
            xml += "<id>"+$(this).find(".i_id").val()+"</id>";
            xml += "<name>"+$(this).find(".i_name").val()+"</name>";
            xml += "<method>"+$(this).find(".i_method").val()+"</method>";
            xml += "<url>"+$(this).find(".i_url").val()+"</url>";
            xml += "<Function>"+$(this).find(".i_function").val()+"</Function>";
            xml += "<params>"+$(this).find(".i_params").val()+"</params>";
            xml += "</InterfaceList>"
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
    $(".i_id,.i_name,.i_method,.i_url,.i_params,.i_function").each(function(index,list){
        if($(this).val()==""){
            $(this).addClass("border");
        }
    });
}