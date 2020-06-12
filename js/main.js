$(document).ready(function() {

  const scrollEvent = 'mousewheel DOMMouseScroll MozMousePixelScroll';
  const yearsLength = $("#scroll>li").length;
  const scrollBlock = $('#scroll');

  //////////////
  $(".burger-btn").click(function() {
    $(this).toggleClass("active");
    $(".sidebar-menu").fadeToggle(300);
  });

  //////////////
  $("#scroll>li").each( function() {
      let rotateStart = -62.5;
      let id = $(this).index() + 1;
      let deg = (12.5 * id) + rotateStart;
      $(this).attr("rotate-index", `${id - 5}`)
              .css({"transform": `rotate(${deg}deg)`})
              .addClass(`item item-${id}`);
  });

  //scroll for desktop
  if($(window).width() >= '1000') {
    function scrolling(event) {
      let rotateState = scrollBlock.attr("data-rotate");
      delta = parseInt(event.originalEvent.wheelDelta || -event.originalEvent.detail);
      if (delta < 0) {
        if (rotateState < yearsLength) {
          $(".item.active").removeClass("active");
          $(".rectangle").addClass("animation");
          ++rotateState
          scrollBlock.css({'transform': `rotate(${-(rotateState - 5) * 12.5}deg)`})
                      .attr("data-rotate", rotateState)
                      .off(scrollEvent);

          setTimeout(function(){ 
            $(".rectangle").removeClass("animation");
            $(".item").eq(rotateState - 1).addClass("active");
            $(".block").hide()
                      .eq(rotateState - 1).show();
            scrollBlock.bind(scrollEvent, scrolling);
          }, 1000);
        }
        //////////////
      } else {
        if (rotateState > 1) {
          $(".item.active").removeClass("active");
          $(".rectangle").addClass("animation")
          --rotateState
            scrollBlock.css({'transform': `rotate(${-(rotateState - 5) * 12.5}deg)`})
                      .attr("data-rotate", rotateState)
                      .off(scrollEvent);
            setTimeout(function(){ 
              $(".rectangle").removeClass("animation")
              $(".item").eq(rotateState - 1).addClass("active");
              $(".block").hide()
                        .eq(rotateState - 1).show();
              scrollBlock.bind(scrollEvent, scrolling);
            }, 1000);
        }
      }
    }

    scrollBlock.bind(scrollEvent, scrolling);

    scrollBlock.mouseover(function() {
        $("body").addClass("noscroll");
    })

    scrollBlock.mouseout(function() {
      $("body").removeClass("noscroll");
    });
  }

  //click for timeline
  if ($(window).width() >= '500'){
    $(".item").click(function() {
      $(".rectangle").addClass("animation")
      indexOfThis = $(this).index() + 1;
      rotateIndex = $(this).attr("rotate-index");
      scrollBlock.css({'transform': `rotate(${-rotateIndex * 12.5}deg)`});
      scrollBlock.attr("data-rotate", indexOfThis);
      let rotateState = scrollBlock.attr("data-rotate");
      $(".item").removeClass("active");
      scrollBlock.attr("data-rotate", indexOfThis);   
      setTimeout(function(){
        $(".item").eq(indexOfThis - 1).addClass("active"); 
        $(".rectangle").removeClass("animation");
        $(".block").hide();
        $(".block").eq(rotateState - 1).show();
      }, 1000);
    });
  }

  //mobile 
  if ($(window).width() <= '767') {

    let rotateState = scrollBlock.attr("data-rotate");
    //////////////
    $( "#scroll" ).on( "swipeleft", function(){
      if (rotateState < yearsLength) {
        $(".item.active").removeClass("active");
        $(".some-rectangle").addClass("animation");
        ++rotateState
        scrollBlock.css({'transform': `rotate(${-(rotateState - 5) * 12.5}deg)`})
                    .attr("data-rotate", rotateState)
                    .off(scrollEvent);

        setTimeout(function(){ 
          $(".some-rectangle").removeClass("animation");
          $(".item").eq(rotateState - 1).addClass("active");
          $(".block").hide()
                    .eq(rotateState - 1).show();
          scrollBlock.bind(scrollEvent, scrolling);
        }, 1000);
      }
    });
    //////////////
    $("#scroll").on("swiperight", function() {
      if (rotateState > 1) {
        $(".item.active").removeClass("active");
        $(".some-rectangle").addClass("animation")
        --rotateState
          scrollBlock.css({'transform': `rotate(${-(rotateState - 5) * 12.5}deg)`})
                    .attr("data-rotate", rotateState)
                    .off(scrollEvent);
          setTimeout(function(){ 
            $(".some-rectangle").removeClass("animation")
            $(".item").eq(rotateState - 1).addClass("active");
            $(".block").hide()
                      .eq(rotateState - 1).show();
            scrollBlock.bind(scrollEvent, scrolling);
          }, 1000);
      }
    })
  };
})