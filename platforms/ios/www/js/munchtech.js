// Initialize your app
var munchtech = new Framework7({
    onAjaxStart: function (xhr) {
        munchtech.showIndicator();
    },
    onAjaxComplete: function (xhr) {
        munchtech.hideIndicator();
    },
    onPageInit: function(app, page){
        if(page.name === "main-feed"){
            loadMainFeed();
        }
    }

});

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = munchtech.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});


// Callbacks to run specific code for specific pages, for example for About page:
munchtech.onPageInit('home-1', function (page) {
    // run createContentPage func after link was clicked
    $$('.create-page').on('click', function () {
        createContentPage();
    });
});

$$('.create-page').on('click', function () {
    createContentPage();
});



// Generate dynamic page
var dynamicPageIndex = 0;
function createContentPage() {
	mainView.router.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
        '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-pages" class="page">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block">' +
        '        <div class="content-block-inner">' +
        '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
        '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );
	return;
}

var feedrefresh = $$('.pull-to-refresh-content');

// Add 'refresh' listener on it
feedrefresh.on('refresh', function (e) {
    $("#feed-list").empty();
    loadMainFeed();
    setTimeout(function(){
        munchtech.pullToRefreshDone();
    },1500);

});

function loadMainFeed(){
    var entriesToShow = 20;
    var url = "http://munchtech.tv/feed/";

    $.ajax({
        url: 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=' + entriesToShow + '&q=' +  encodeURI(url),
        dataType: 'json',
        beforeSend: function () {
        //    munchtech.showIndicator();
            // munchtech.showPreloader('Custom Title');
        },
        success: function (data){
            console.log(JSON.stringify(data));
            $list = $("#feed-list");
            $list.empty();
            var items = data.responseData.feed.entries;
            for (var i = 0; i < items.length; i++) {
                var listAppend = "";
                var title = items[i].title;
                var link = items[i].link;
                var author = items[i].author;
                var contentSnippet = items[i].contentSnippet;
                var content = items[i].content;
                var publishedDate = items[i].publishedDate;

                listAppend += "<div class='card episode'>";
                    listAppend += "<div class='card-header'>"+title+"</div>";
                    listAppend += "<div class='card-content'>";
                        listAppend += "<div class='card-content-inner'><p class='color-gray'>"+publishedDate+"</p>"+content+"</div>";
                    listAppend += "</div>";
                    listAppend += "<div class='card-footer'>";
                        listAppend += "<a href='"+link+"' class='openMore more link'>More</a>";
                        listAppend += "<a href='#' class='button right'>Play &nbsp;<i class='fa fa-play mt-blue'></i></a>";
                    listAppend += "</div>";
                listAppend += "</div>";

                $list.append(listAppend);
            }
            // $list.collapsibleset('refresh');
        },
        error: function (data){
            alert("Error: "+JSON.stringify(data));
        }
    });
}

function openURL(url){
    var ref = window.open(url, '_blank', 'location=no,closebuttoncaption=Close');
}

$(".openURL").on("click", function(e){
    e.preventDefault();
    var url = $(this).attr("href");
    if(url){
        openURL(url);
    }
});

$(".episodes").on("click touchstart", ".openMore", function(e){
    e.preventDefault();
    var url = $(this).attr("href");
    if(url){
        openURL(url);
    }
});
