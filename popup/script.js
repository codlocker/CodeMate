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
          $("#data").html("<img src='./../loader.gif' width='300px' height='300px'>");
        },
        success: function (response) {
            let dat = $("#data");
            dat.html("");
            let s = $.parseHTML(response);
            let context = $("#content");
            context.html(s);
            let entry_point;
            entry_point = context.find(".entry-title");
            let array = [];
            for(i = 0; i < entry_point.length; i++ )
            {
                let h1_nw = document.createElement("h3");
                let a_nw = document.createElement("a");
                $(h1_nw).append(a_nw);
                $(a_nw).html($(entry_point).get(i));
                $(h1_nw).addClass("content_data");
                dat.append(h1_nw);
            }
        },
        error: function () {
            $("#data").html("<p class='error'>Error: Could not fetch Data!</p>");
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