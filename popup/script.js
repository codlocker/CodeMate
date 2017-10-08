document.addEventListener('DOMContentLoaded', function() {
    let link = document.getElementById('sub_button');
    // onClick's logic below:
    link.addEventListener('click', function() {
        formLink();
    });
});

$(document).ready(function () {
    executeScript("http://www.geeksforgeeks.org/");
});

function executeScript(link) {
    $.ajax({
        url: link,
        type: "GET",
        beforeSend: function () {
          $("#preloader").show();
        },
        success: function (response) {
            $("#preloader").hide(200);
            let dat = $("#data");
            dat.html("");
            let s = $.parseHTML(response);
            let context = $("#content");
            context.html(s);
            let entry_point;
            entry_point = context.find(".entry-title").removeClass();
            context.html("");
            let array = [];
            let ul_tag = document.createElement("ol");
            for(i = 0; i < entry_point.length; i++ )
            {
                let h1_nw = document.createElement("li");
                $(h1_nw).html($(entry_point).get(i));
                ul_tag.append(h1_nw);
            }
            dat.append(ul_tag);
        },
        error: function () {
            $("#data").html("<p class='error'>Error: Unable to fetch data</p>");
            $("#content").html("");
        }
    });
}

function formLink() {
    let data = $("[name='url_form']").val();
    let inp_data = parseInt(data);
    const url = "http://www.geeksforgeeks.org/";
    if (inp_data === 1)
    {
        executeScript(url);
    }
    else if(inp_data > 1)
    {
        let new_url = url + "page/" + String(inp_data);
        console.log(new_url);
        $("#data").html("");
        $("#content").html("");
        executeScript(new_url);
    }
    else {
        $("#data").html("<p class='error'>Error: Page Does Not Exist!</p>");
        $("#content").html("");
    }
}