//selectpicker
function selectpicker_call(){ $('.selectpicker').selectpicker(); };

$(document).ready(function(){
    //get current url
    var SITE_URL_CURRENT = window.location.href;

    //autoplay video html5, support on chrome, safari, firefox
    //document.getElementById('video_banner_homepage').play();

    //get height of screen
    var getHeightScreen = screen.height;

    //call selectpicker
    selectpicker_call();

    //overlay video homepage ajax
    $(".overlayVideo").magnificPopup({
        type: 'ajax',
        mainClass: 'mfp-fade',
        closeOnContentClick: false,
        closeOnBgClick: false,
        removalDelay: 10,
        callbacks: {
            open: function() {
                $.magnificPopup.instance.close = function () {
                    $.magnificPopup.proto.close.call(this);	
                }

                //add animate loading
                $('.mfp-preloader').html('<span class="spinner-grow spinner-grow-lg"></span>');
            },
            change: function() { },
            beforeClose: function() { },
            close: function() { },
            ajaxContentAdded: function(){ }
        }
    });

    //overlay contact
    $(".overlayContact").magnificPopup({
        type:'ajax',
        mainClass: 'mfp-fade',
        closeOnContentClick: false,
        closeOnBgClick: false,
        removalDelay: 10,
        callbacks: {
            open: function() {
                $.magnificPopup.instance.close = function () {
                    $.magnificPopup.proto.close.call(this);	
                }

                //add class overlay
                $('.mfp-content').addClass('in-overlay');
            },
            change: function() { },
            beforeClose: function() { },
            close: function() {
                //remove class overlay
                $('.mfp-content').removeClass('in-overlay');
            },
            ajaxContentAdded: function(){ }
        }
    });
    
    //overlay close mfp
    $(document.body).on("keydown", this, function(event) {
		/* f5 */
		if (event.keyCode == 116) {
            $.magnificPopup.close();
		}
    });
    $(document).on('click','#closeContact, .closeVideoOverlay',function(e){
        e.preventDefault();

        //close MFP
        $.magnificPopup.close();
    });

    //video hide control, Firefox
    var vids = $("#video_banner_homepage"); 
    $.each(vids, function(){
        this.controls = false; 
    });
});

//function set ration video and title + lead banner
function ratioVideoHomepage(){
    //get width browser
    var getWidthBrowser = $(window).width();

    if(getWidthBrowser >= 980){
        //banner hemepage
        $("#bannerHomepage .bannerHomepage").css({
            'display': '', 
            'height': 777,
        });
    } else{
        //banner homepage
        $("#bannerHomepage .bannerHomepage").css({
            'display': 'table', 
            'height': 'auto',
        });
    }

    //gap video in banner
    if(getWidthBrowser >= 1201){
        var gapVideoBanner = (getWidthBrowser - 1200) / 2;
    } else{
        var gapVideoBanner = 0;
    }
    if(getWidthBrowser >= 1366){
        $('.bannerHomepage .contentMedia').css( "right", '-83px' );
    } else{
        $('.bannerHomepage .contentMedia').css( "right", -gapVideoBanner );
    }

    //ratio video homepage
    var defaultWidthContentInfo = '';
    if(getWidthBrowser <= 979){
        var setWidthVideo = 685;
    } else if(getWidthBrowser <= 1180){
        defaultWidthContentInfo = 524;
        var setWidthVideo = getWidthBrowser - defaultWidthContentInfo;
    } else{
        defaultWidthContentInfo = 560;
        var setWidthVideo = (getWidthBrowser - defaultWidthContentInfo) - 128;
    }

    if(getWidthBrowser >= 1281){
        $(".bannerHomepage .contentMedia #video_banner_homepage").css({
            'max-width': 685,
        });
    } else{
        $(".bannerHomepage .contentMedia #video_banner_homepage").css({
            'max-width': setWidthVideo,
        });
    }

    //contentInfo
    var getHeightContentMedia = $('.contentMedia').height();
    if(getWidthBrowser <= 979){
        $(".bannerHomepage .contentInfo").css({
            'width': '',
            'margin-top': 80 + getHeightContentMedia + 60,
        });
    } else if(getWidthBrowser <= 1180){
        $(".bannerHomepage .contentInfo").css({
            'width': 504,
            'margin-top': '',
        });
    } else if(getWidthBrowser <= 1365){
        $(".bannerHomepage .contentInfo").css({
            'width': 560,
            'margin-top': '',
        });
    } else{
        $(".bannerHomepage .contentInfo").css({
            'width': '',
            'margin-top': '',
        });
    }
};
$(document).ready(function() {
    ratioVideoHomepage();
});
$(function(){ 
    $(window).resize(function(event) {
        ratioVideoHomepage();
    }); 
});

//scroll intisari
function intisariScroll(){
    //get width browser
    var getWidthBrowser = $(window).width();

    if(getWidthBrowser <= 1200){
        $(".contentIntisari .boxsIntisari").css({
            'width': getWidthBrowser - 20,
        });
    } else{
        $(".contentIntisari .boxsIntisari").css({
            'width': '',
        });
    }
};
$(document).ready(function() {
    intisariScroll();
});
$(function(){ 
    $(window).resize(function(event) {
        intisariScroll();
    }); 
});

//set width container-articles
function articleWidth(){
    //get width browser
    var getWidthBrowser = $(window).width();

    if(getWidthBrowser >= 1201){
        var gapSlideArticle = ((getWidthBrowser - 1200) / 2);
        getWidthBrowser = getWidthBrowser;
    } else{
        var gapSlideArticle = 20;
        getWidthBrowser = getWidthBrowser;
    }
    $('.timeline-horizontal-article').css('width', getWidthBrowser);
    $('ul.list-articles li.articles.first-child a').css( "margin-left", gapSlideArticle );
    $('ul.list-articles li.articles.last-child a').css( "margin-right", gapSlideArticle );
};
$(document).ready(function() {
    articleWidth();
});
$(function(){ 
    $(window).resize(function(event) {
        articleWidth();
    }); 
});

//scroll custom article
$(function(){ 
    const psArticle = new PerfectScrollbar('#timeline-horizontal-article');

    $(window).resize(function(event) {
        psArticle.update();
    }); 
});

$(document).ready(function() {
    /* scrolling horizontal */
    var lastScrollLeft = 0;
    $(window).scroll(function() {
        var documentScrollLeft = $('#timeline-horizontal-article').scrollLeft();
        if (lastScrollLeft != documentScrollLeft) {
            lastScrollLeft = documentScrollLeft; //console.log('scroll x');
        }
    });

    /* control next/prev timeline card 7 */
    var scrollLeftAmount = 921;
    $("#slide-left-articles").click(function(){ 
        $('.timeline-horizontal-article').animate({
            scrollLeft:'-='+scrollLeftAmount
        }, 500);
    });
    $("#slide-right-articles").click(function(){ 
        $('.timeline-horizontal-article').animate({
            scrollLeft:'+='+scrollLeftAmount
        }, 500);
    });

    /* event scroll x / horizontal */
    $('.control-article-prev').css( "display", "none" );
    list = document.getElementsByClassName("timeline-horizontal-article");
    for (var i = 0; i < list.length; i++) {
        list[i].addEventListener('ps-x-reach-start', function () {
            $('.control-article-prev').css( "display", "none" );
        });
        list[i].addEventListener('ps-x-reach-end', function () {
            $('.control-article-next').css( "display", "none" );
        });
        list[i].addEventListener('ps-scroll-left', function () {
            $('.control-article-next').css( "display", "block" );
            $('.content-article .list-articles .articles').css( "opacity", "1" );
        });
        list[i].addEventListener('ps-scroll-right', function () {
            $('.control-article-prev').css( "display", "block" );
            $('.content-article .list-articles .articles').css( "opacity", "1" );
        });
    }

    /* get value left scroll position */
    var leftCol = document.querySelector('#timeline-horizontal-article .ps__rail-x .ps__thumb-x');
    var getStyle = getComputedStyle(leftCol);
    if( getStyle.left != '0px'){
        $('.content-article .list-articles .articles').css( "opacity", "1" );
    }

    /* count articles */
    if ($('.content-article .list-articles .articles').length > 4) {
        $("#slide-right-articles").css( "display", "block" );
    } else{
        $("#slide-right-articles").css( "display", "none" );
    }
});

//mengapa prims gambut dibutuhkan
function slidePrimsGambutDibutuhkan(){
    //get width browser
    var getWidthBrowser = window.innerWidth;

    if(getWidthBrowser >= 769){
        $('.contentPrimsGambutDibutuhkan').slick({
            slidesPerRow: 2,
            rows: 2,
            dots: false,
            arrows: false,
            infinite: false,
            slidesToShow: 4,
            slidesToScroll: 1,
            variableWidth: true
        });
    } else{
        $('.contentPrimsGambutDibutuhkan').slick({
            slidesPerRow: 1,
            rows: 1,
            dots: true,
            arrows: false,
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            variableWidth: true
        });
    }
};
$(document).ready(function() {
    slidePrimsGambutDibutuhkan();
});
$(function(){ 
    $(window).resize(function(event) {
        $('.contentPrimsGambutDibutuhkan').slick('unslick');
        slidePrimsGambutDibutuhkan();
    }); 
});

//fitur utama prims gambut
function slideFiturUtamaPrims(){
    //get width browser
    var getWidthBrowser = window.innerWidth;

    if(getWidthBrowser >= 769){
        $('.contentFiturUtamaPrimsGambut').slick({
            slidesPerRow: 3,
            rows: 2,
            dots: false,
            arrows: false,
            infinite: false,
            slidesToShow: 6,
            slidesToScroll: 1,
            variableWidth: true
        });
    } else{
        $('.contentFiturUtamaPrimsGambut').slick({
            slidesPerRow: 1,
            rows: 1,
            dots: true,
            arrows: false,
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            variableWidth: true
        });
    }
};
$(document).ready(function() {
    slideFiturUtamaPrims();
});
$(function(){ 
    $(window).resize(function(event) {
        $('.contentFiturUtamaPrimsGambut').slick('unslick');
        slideFiturUtamaPrims();
    }); 
});

//rekan prims
function slideRekanPrims(){
    $(".rekan_prims_slides").slick({
        dots: false,
        infinite: true,
        centerMode: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        variableWidth: true
    });
};
$(document).ready(function() {
    slideRekanPrims();
});
$(function(){ 
    $(window).resize(function(event) {
        $('.rekan_prims_slides').slick('unslick');
        slideRekanPrims();
    }); 
});