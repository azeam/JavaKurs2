var pageTitle = "Calamaria of Borneo";
var xDown = null;                                                        
var yDown = null;

// show main content
function setPage(page) {  
    let capPage = page.charAt(0).toUpperCase() + page.slice(1); // set title with capital subtext since document is not reloaded
    document.title = pageTitle + " - " + capPage;    
    $("#footer").hide().fadeIn(500); // prevent flickering
    $("#main").hide().load(`/static/${page}.html`).fadeIn(500, function() {
        switch (page) {
            case "screenshots":
                initSwiper();
                break;
            case "contact":
                initFormListener();
                break;
            case "home":
                loadNews();
                break;
        }
    });
    $(".menu li a").removeClass("menuActiveColors");
    $(`.menu-${page} a`).addClass("menuActiveColors");
    $(window).scrollTop(0);
}

// start swiper for screenshots
function initSwiper() {
    var swiper = new Swiper('.swiper-container', {
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
}

// send mail with contact form
function initFormListener() {
    $("#contactForm").on("submit", function(e) {
        e.preventDefault();
        var formData = new FormData(this);
        formData.append("submit", true);
        $.ajax({
            url: "/php/mailer.php",
            data: formData,
            contentType: false, 
            cache: false,
            processData:false,
            beforeSend: function(){
                $("#formSpinner").show();
                $("#contactFormSubmit").attr("disabled", true);
            },
            type: "POST"
            }).done(function(response) {
                $("#formSpinner").hide();
                if (response.includes(".")) {
                    response.split(".").forEach(function(errorLine){
                        $("#formResponseContainer").append(errorLine + "<br>");
                    });
                }
                else {
                    $("#formResponseContainer").append(response + "<br><br>");
                    $("#contactForm").trigger('reset');
                }
                $("#contactFormSubmit").attr("disabled", false);
            });
    });
}

// show/hide slide in menu
function toggleMenu(menu) {
    $("#burgerIcon svg").toggle();
    menu.children().hide();
    menu.animate({
        width: "toggle" 
    }, 100, function() {
        menu.children().fadeIn(100);
    });
}

// load "news" (latest git releases)
function loadNews() {
    // TODO: change to calamaria when going public
    let gitData = "https://api.github.com/repos/azeam/SunnyMPC/releases";
    let year, day, month, date;
    $.getJSON(gitData, function(result){
        $.each(result, function(i, data){
            date = new Date(data.published_at);
            day = date.getDate();
            month = date.getMonth();
            month = month += 1;
            year = date.getFullYear();

            $("#releases").append("<li><article><a href='" + data.html_url + "' class='externalAlwaysDark' target='_blank'>" + 
            data.tag_name + 
            "</a><br><br><h3>" + data.name + "</h3><span class='smallText'>" + day + "." + month + "." + year + 
            "</span><br><br><p>" + data.body + "</p></article></li>").fadeIn(500);
            // max 5 releases?
            if (i === 5) {
                return false;
            }
        });
    });
}

// swipe left/right detection to hide burger menu
function getTouches(e) {
  return e.touches ||             // browser API
         e.originalEvent.touches; // jQuery
}                                                     

function handleTouchStart(e) {
    const firstTouch = getTouches(e)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};    

function handleTouchMove(e) {
    if (!xDown || !yDown) {
        return;
    }

    var xUp = e.touches[0].clientX;                                    
    var yUp = e.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
    if (Math.abs(xDiff) + Math.abs(yDiff)>50) {
        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (xDiff < 0) {
                // right swipe
                container = $('#burgerMenu');
                if (container.is(":visible")) {
                    toggleMenu(container);
                }
            }        
        } 
        // reset values
        xDown = null;
        yDown = null;  
    }                                           
};

// toggle color mode
$(".modeSwitch svg").click(function() {
    $(".modeSwitch svg").toggle();
    // TODO: not sure if I like the fade or not
 //       $("html").hide().toggleClass("lightMode").fadeIn(200);
    $("html").toggleClass("lightMode");
});

// hide menu (if hamburger) and load content when clicking link
$(".menu li a, .logoLink").click(function(e) {
    e.preventDefault(); // prevents showing pound sign in url and doesn't push it to history stack
                        // links are not followed but are there for seo purposes (same result when visiting url)
    let path = $(this).attr("href");
    let page;
    if ($("#burgerMenu").is(":visible")) {
        toggleMenu($("#burgerMenu"));
    }
    path == "/" ? page = "home" : page = path.split("/")[1];
    history.pushState({page}, page, `${path}`); // pushstate will also trigger the php get request and update the meta description
    setPage(page);
});

// show burger menu
$("#burgerIcon").click(function () {
    toggleMenu($("#burgerMenu"));
});

// load old content on back btn press
window.addEventListener('popstate', e => {
    if (e.state !== null) {
        setPage(e.state.page);
    }
});

// hide burger menu when clicking elsewhere
$(document).mousedown(function(e) {
    let container = $('#burgerMenu');
    let icon = $("#burgerIcon");
    if (!container.is(e.target) && container.has(e.target).length === 0 && !icon.is(e.target) && icon.has(e.target).length === 0 && container.is(":visible")) 
    {
        toggleMenu(container);
    }
});

// touch listeners
document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

// set current page
$('document').ready(function() {
    let curPage = window.location.pathname.toLowerCase();
    // hardcoded switch to prevent xss attempts
    switch (curPage) {
        case "/":
            setPage("home");
            break;
        case "/contact":
        case "/about":
        case "/screenshots":
            setPage(curPage.split("/")[1]);
            break;
        default:
            setPage("404");
            break;
    }
});
