function createContentPage(){mainView.router.loadContent('<!-- Top Navbar--><div class="navbar">  <div class="navbar-inner">    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>    <div class="center sliding">Dynamic Page '+ ++dynamicPageIndex+'</div>  </div></div><div class="pages">  <!-- Page, data-page contains page name-->  <div data-page="dynamic-pages" class="page">    <!-- Scrollable page content-->    <div class="page-content">      <div class="content-block">        <div class="content-block-inner">          <p>Here is a dynamic page created on '+new Date+' !</p>          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>        </div>      </div>    </div>  </div></div>')}function loadMainFeed(){var e=20,a="http://munchtech.tv/feed/";$.ajax({url:"https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num="+e+"&q="+encodeURI(a),dataType:"json",beforeSend:function(){},success:function(e){$list=$("#feed-list"),$list.empty();for(var a=e.responseData.feed.entries,n=0;n<a.length;n++){var c="",i=a[n].title,t=a[n].link,o=a[n].author,s=a[n].contentSnippet,d=a[n].content,r=a[n].publishedDate;c+="<div class='card'>",c+="<div class='card-header'>"+i+"</div>",c+="<div class='card-content'>",c+="<div class='card-content-inner'><p class='color-gray'>"+r+"</p>"+d+"</div>",c+="</div>",c+="<div class='card-footer'>",c+="<a href='#' class='link'>More</a>",c+="</div>",c+="</div>",$list.append(c)}},error:function(e){alert("Error: "+JSON.stringify(e))}})}var munchtech=new Framework7({onAjaxStart:function(e){munchtech.showIndicator()},onAjaxComplete:function(e){munchtech.hideIndicator()},onPageInit:function(e,a){"main-feed"===a.name&&loadMainFeed()}}),$$=Dom7,mainView=munchtech.addView(".view-main",{dynamicNavbar:!0});munchtech.onPageInit("home-1",function(e){$$(".create-page").on("click",function(){createContentPage()})}),$$(".create-page").on("click",function(){createContentPage()});var dynamicPageIndex=0,feedrefresh=$$(".pull-to-refresh-content");feedrefresh.on("refresh",function(e){setTimeout(function(){loadMainFeed(),munchtech.pullToRefreshDone()},1500)});