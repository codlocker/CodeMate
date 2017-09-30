$(document).ready(function () {
    $.ajax({
        url: "http://www.geeksforgeeks.org/",
        type: "GET",
        success: function (response) {
            let s = $.parseHTML(response);
            let context = $("#content");
            context.html(s);
            let all_h2s = $("#content .entry-title").text().split(" \n\t");
            let array = [];
            for(i = 0; i < all_h2s.length; i++ )
            {
                let h1_nw = document.createElement("h3");
                let a_nw = document.createElement("a");
                let all_as = $("header a").attr("href").split(" \n\t");
                $(a_nw).attr("href", all_as);
                $(h1_nw).append(a_nw);
                $(a_nw).text(all_h2s[i]);
                $(h1_nw).addClass("content_data");
                console.log(h1_nw);
                $("#data").append(h1_nw);
            }
        },
        error: function () {
          alert("Error!!");
        }
    });
});