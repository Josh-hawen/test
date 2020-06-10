$(document).ready(function() {



    const scrollEvent = 'mousewheel DOMMouseScroll MozMousePixelScroll';

    function scrolling(event) {
      
        delta = parseInt(event.originalEvent.wheelDelta || -event.originalEvent.detail);
        var rotateState = $("#scroll").attr("data-rotate");
        $(".block").hide();
        if (delta < 0) {
          if (rotateState < 9) {
            ++rotateState
            $('#scroll').css({'transform': `rotate(${-(rotateState - 5) * 12.5}deg)`})
                        .attr("data-rotate", rotateState)
                        .off(scrollEvent);
  
            setTimeout(function(){ 
              $("#scroll").bind(scrollEvent , scrolling);
            }, 1000);
          }
        } else {
          if (rotateState > 1) {
            --rotateState
              $('#scroll').css({'transform': `rotate(${-(rotateState - 5) * 12.5}deg)`})
                          .attr("data-rotate", rotateState)
                          .off(scrollEvent);

              setTimeout(function(){ 
                $("#scroll").bind(scrollEvent, scrolling);
              }, 1000);
          }
        }
        $(".block").eq(rotateState - 1).show();
    }

    $("#scroll").bind(scrollEvent, scrolling);



    $("#scroll>li").each( function() {
        let rotateStart = -62.5;
        let id = $(this).index() + 1;
        let deg = (12.5 * id) + rotateStart;
        $(this).attr("rotate-index", `${id - 5}`)
               .css({"transform": `rotate(${deg}deg)`})
               .addClass(`item item-${id}`);
               
    })

    $(".item").on("click", function() {
      indexOfThis = $(this).index() + 1;
      rotateIndex = $(this).attr("rotate-index");
      $('#scroll').css({'transform': `rotate(${-rotateIndex * 12.5}deg)`});
      $("#scroll").attr("data-rotate", indexOfThis)
      $(".block").hide();
      $(".block").eq(indexOfThis - 1).show();
    })

})


// function onScroll() {
//   scroll_pos = $(window).scrollTop();     
//   win_height = $(window).height();        
//   doc_height = $(document).height();      

//   if(scroll_pos + win_height > doc_height - 100) {

//       $('#gifLoad').show();
//       $(window).unbind('scroll');

//       setTimeout(function(){    
//           $('#gifLoad').hide();
//           $(window).bind('scroll', onScroll);    
//       }, 2000);
//   }
// }
// $(window).scroll(onScroll);