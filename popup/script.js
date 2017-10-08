document.addEventListener('DOMContentLoaded', function() {
    let link = document.getElementById('sub_button');
    // onClick's logic below:
    link.addEventListener('click', function() {
        formLink();
    });
    // onkeypress's Logic Below
    let page_inp = document.getElementById('url_form');
    page_inp.addEventListener('keyup', function (event) {
        if (event.keyCode === 13) {
            formLink();
        }
    });
});

$(document).ready(function () {
    $("#sorryImage").hide();
    executeScript("http://www.geeksforgeeks.org/");
});
function executeScript(link) {
    let sorry_image = $("#sorryImage");
    $.ajax({
        url: link,
        type: "GET",
        beforeSend: function () {
          $("#preloader").show();
        },
        success: function (response) {
            $("#preloader").hide(10);
            sorry_image.hide(2000);
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
            $("#preloader").hide(10);
            $("#data").html("<p class='error'>Error: Unable to fetch data</p>");
            sorry_image.show();
            $("#content").html("");
        }
    });
}

function formLink() {
    let sorry_image = $("#sorryImage");
    sorry_image.hide();
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
        sorry_image.show();
        $("#content").html("");
    }
}