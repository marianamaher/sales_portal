function display_sales_list(sales){

    $(".total_div").empty()
    $(".sales_class").empty()
    let salesperson= ("<span class='sales_class'><u>Mariana Maher</u></span>")
    $("#initial_sales_person").append(salesperson);

    $.each(sales, function(key, value){
        $(".name_client").append('<div class="row total_div">' +value.salesperson+ '</div>')
        $(".company").append('<div class="row total_div">' +value.client+ '</div>')
        $(".number_resmas").append('<div class="row total_div">' +value.reams+ '</div>')
        let delete_buttonSecond = $('<button id="input-button" class="btn del-button">X</button>')
        $(delete_buttonSecond).click(function(){
            delete_sale(value.id)
            display_sales_list(sales)
        })
        $(".delete_button").append($('<div class="total_div">').append(delete_buttonSecond))
    });
}



function save_sale(new_sale){

    $.ajax({
        type: "POST",
        url: "save_sale",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(new_sale),
        success: function(result){
            let all_data = result["sales"]
            sales = all_data
            display_sales_list(sales)
            clients = result["clients"]
            $("#user_input_textbox").autocomplete({
                minLength:1,
                source: clients
                   
            })
            console.log(clients)
            console.log(sales)
            $("#user_input_textbox").val("")
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
        
    });
    }

function delete_sale(id){
    let sales_id = {"id": id}   
    
        $.ajax({
            type: "POST",
            url: "delete_sale",                
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            data : JSON.stringify(id),
            success: function(result){
                let all_data = result["sales"]
                sales = all_data
                display_sales_list(sales)
                console.log(sales)
                $("#user_input_textbox").val("")
            },
            error: function(request, status, error){
                console.log("Error");
                console.log(request)
                console.log(status)
                console.log(error)
            }
        })
       
}




$(document).ready(function() {
         

                
                $("#user_input_textbox").autocomplete({
                        minLength:1,
                        source: clients
                           
                })

                $("#reams_box").keypress(function (e){
                     if(e.which == 13){
                        e.preventDefault();
                        $('#input_button').click()
           
                     }
                })
                
                    
                    display_sales_list(sales)
                    $('#input_button').click(function(){
                        
                        const fixed_client = "Mariana Maher";
                        let new_company = $("#user_input_textbox").val()
                        let new_num_reams =$("#reams_box").val()

                        if(new_num_reams.length==0){
                           $(".alert-danger").show();
                           $("#user_input_textbox").focus();
                        }
                        else if(new_company.length==0){
                            $(".alert").show();
                            $("#user_input_textbox").focus();
                        }
                        else if(!$.isNumeric(new_num_reams) && (new_num_reams.length!=0)){
                            $(".alert-secondary").show();
                            $("#reams_box").focus();
                        }
                        
                        else{
                            $("#user_input_textbox").focus();
                            $(".alert-secondary").hide();
                            $(".alert-danger").hide();
                            $(".alert").hide();
                            let updating_list = {salesperson:fixed_client, client:new_company, reams:new_num_reams}
                            $("#user_input_textbox").val("")
                            $("#reams_box").val("")
                            save_sale(updating_list) 
                            display_sales_list(sales);
                            console.log(sales)
                            console.log(updating_list);
                            
                        }
                        

                    })
                   

            })