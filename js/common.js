/**
 * Created by Administrator on 2016/1/8.
 */
window.pid = 0;
$(function() {
    session = sessionStorage;
    get_blob = function () {
        return Blob;
    };
    $("#btn_add").click(function () {
        var table = "";
        table += "<tr>";
        table += "<td><input class='i_id' type='text' /></td>";
        table += "<td><input class='i_name' type='text' /></td>";
        table += "<td><select class='sel_method'><option value='0'>GET</option><option value='1'>POST</option><</select> </td>";
        table += "<td><input class=\"i_url\" type=\"text\" /></td>";
        table += "<td class='rel'> <input type=\"button\" class=\"b_params\" value=\"接口参数\"><div class='ab' ><p>" +
        "<input type=\"button\" value=\"新增\" class=\"btn_add_\"> <input type=\"button\" value=\"保存\" class=\"btn_save\"></p></div>"+
        "<select class='sel_login'>" +
        "<option value='0'>不需要登陆后的参数</option>" +
        "<option value='1'>需要登陆后的参数</option>" +
        "</select>" +
        "</td>";

        table += "<td class='rel'> <input type='button' class='btn_cancel_sub' value='--'/> <input type='button' class='b_ex_params' value='接口参数'><div class='ab1'>" +
        "<input type='button' value='新增' class='btn_add_1'> <input type='button' value='新增嵌套层' class='btn_data'><input type='button' value='保存' class='btn_save_1'></div></td>";
        table += "</tr>";
        $("#i_list").parent().append(table);
    });
    $(document).on("click",".btn_cancel_sub",function(){
        $(this).parents("tr").remove();
    });
    $("#btn_save").click(function (e) {
        if (check()) {
            savexml(e);
        }
    });
    $(document).on("click", ".btn_del", function () {
        $(this).parents("tr").remove()
    });
    $(document).on("focus", "input[type='text']", function () {
        if ($(this).hasClass("border")) {
            $(this).removeClass("border");
        }
    });

    $(document).on("click",".b_params,.b_ex_params",function () {
        $(this).next().fadeToggle();
    });

    $(document).on('click',".btn_save",function(){
        if (check_son(this,".ab")){
            $(this).parents(".ab").hide();
        }
    });
    $(document).on('click',".btn_save_1",function(){
        if (check_son(this,".ab1")){
            $(this).parents(".ab1").hide();
        }
    });
    $(document).on("click",".ida_b_cance", function(){
        $(this).parent("p").remove()
    });
    $(document).on("click",".ida_b_cance1", function(){
        $(this).parent("p").remove();
        if($(this).next().length){
            $(this).next().remove();
        }
    });
    $(document).on("click",".btn_add_", function(){
        $(this).parent().prepend("<p><input class=\"i_add_params\" type=\"text\" placeholder=\"参数名\" /> " +
        "<input class=\"i_add_params_value\" type=\"text\" placeholder=\"参数值\" /><input class='ida_b_cance' type='button' value='取消' ></p")
    });

    $(document).on("click",".btn_add_1", function(){
        temp = "<p parId=\'"+pid+"\' subSon=\"sub\"><input class=\"i_add_params_1\" type=\"text\" placeholder=\"参数名\" /> " +
        "<input class=\"i_add_params_value_1\" type=\"text\" placeholder=\"参数值\" /><input class='ida_b_cance1' type='button' value='取消' ></p>";
        pid++;
        $(this).parent().prepend(temp)
    });
    $(document).on("click", ".btn_data", function(){
        temp = "<p parId=\'"+pid+"\' subSon='son' class='son_param'><input class='i_add_params_k_son' type='text' placeholder='参数名' /> " +
        "<input class='i_add_params_v_son' type='text' placeholder='参数值' /><input class='ida_b_cance1' type='button' value='取消' ></p>";
        pid++;
        $(this).parent().prepend(temp)
    });
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
        i_params = $(this).find(".i_add_params");
        i_params_value = $(this).find(".i_add_params_value");
        i_hope_key = $(this).find(".i_add_params_1");
        i_add_params_k_son = $(this).find(".i_add_params_k_son");
        i_add_params_v_son = $(this).find(".i_add_params_v_son");
        i_hope_val = $(this).find(".i_add_params_value_1");
        temp_son = "";
        temp_sub = "";
        temp= "";
        temp1= "";
        xml += "<InterfaceList>";
        xml += "<id>"+$(this).find(".i_id").val()+"</id>";
        xml += "<name>"+$(this).find(".i_name").val()+"</name>";
        xml += "<method>"+$(this).find(".sel_method").find("option:selected").text()+"</method>";
        xml += "<url>"+$(this).find(".i_url").val()+"</url>";
        if (i_hope_key.length && i_hope_val.length){
            i_hope_key.each(function(i,k){
                if(i_hope_key.eq(i).parent().attr("subSon")  == "sub") {
                      temp_sub +=  i_hope_key.eq(i).val() + ":" + i_hope_val.eq(i).val() + ","
                }
            });
        }
        if (i_add_params_k_son.length){
            i_add_params_k_son.each(function(i){
                temp_son +=  i_add_params_k_son.eq(i).val() + ":" + i_add_params_v_son.eq(i).val() + ","
            });
        }
        temp_sub ="{"+ temp_sub.substr(0,temp_sub.length-1) + "}";
        if (temp_son!= ""){
            temp_son = temp_son.substr(0,temp_son.length-1);
            temp_son = "{"+temp_son+"}";
            temp_son = "{data:["+temp_son+"],";
            temp1 = temp_son+temp_sub +"}";
        } else{
            temp1 = temp_sub;
        }
        xml += "<hope>"+temp1+"</hope>";
        if(i_params.length>1){
            i_params.each(function(i,k){
                temp += i_params.eq(i).val() +":"+ i_params_value.eq(i).val() + ","
            });
            temp = temp.substr(0,temp.length-1);
            temp = "{" +temp+ "}";
        } else  if(i_params.length && i_params_value.length) {
            temp ="{"+ i_params.val()+":"+i_params_value.val() +"}"
        } else{
            temp="{}"
        }
        xml += "<params>"+temp+"</params>";
        xml += "<login>"+$(this).find(".sel_login").find("option:selected").val()+"</login>";
        if($(this).find(".son_param")){
            xml +="<isList>1</isList>"
        } else {
            xml +="<isList>0</isList>"
        }
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
function check_son(t_this,cls){
    var flag = true;
    $(t_this).parents(cls).find("input[type='text']").each(function(i,k){
        if($(k).length && $(k).val()==""){
            $(k).addClass("border");
            flag = false;
        }
    });
    return flag;
}
function check() {
    var flag = true;
    $("input[type='text']").each(function(i,k){
        if($(k).attr("id")!="tb_No"){
           if($(k).val()==""){
               $(k).addClass("border");
               flag = false;
           }
        }
    });
    if (!flag){
        alert("请完善信息");
    }
    return flag;
}