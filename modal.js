$(document).ready(function(){

  // MODAL
  var modalText = {
    roambi: {
      title: 'BrewBuddy',
      tag: 'CRAFT BEER LOCATOR.',
      detail: 'BrewBuddy is an interactive web app crafted for the beer enthusiast or average Joe looking for beer information or just simply a place to enjoy a brew.',
      link: 'http://www.roambi.com'
    },
    walker: {
      title: 'Whisk+Wander',
      tag: 'LIFESTYLE AND RECIPE WEBSITE.',
      detail: 'Whisk+Wander is a travel and lifestyle blog; it includes a recipe specific application, built using HTML, CSS and JavaScript.',
    },
    powur: {
      title: 'SpeedmintonUSA.com',
      tag: 'SPORTING GOODS WEBSITE.',
      detail: 'Program code for eCommerce portals, browsers and devices with necessary techniques. Implement procedures for development and support service with efficient architecture and scalability.',
      link: 'https://www.speedmintonusa.com/'
    },
    mystand: {
      title: 'Bamazon',
      tag: 'LIVE ECOMMERCE INVENTORY TRACKER.',
      detail: 'Bamazon is an Amazon-like storefront built using MySQL, MySQL NPM Package, and Inquirer/Prompt NPM Package. The node.js application receives orders from customers and provides live inventory.',
    },
    never: {
      title: 'NeverSurrender',
      tag: 'ALS AWARENESS.',
      detail: 'NeverSurrender is a platform for the new ALS foundation mobile app in hopes to raise awareness and research funding to fight ALS. Pure JavaScript marketing site to promote the new ALS NeverSurrender app.',
    },
    themall: {
      title: 'NPR News Scraper',
      tag: 'COLLECTS ALL THE STORIES YOU WANT TO READ.',
      detail: 'The NPR news scraper application scrapes news articles from the NPR news website and allows users to add and delete comments associated to each article.',
    }
  };

  $('#gallery .button').on('click', function(){
    fillModal(this.id);
    $('.modal-wrap').addClass('visible');
  });

  $('.close').on('click', function(){
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  $('.mask').on('click', function(){
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  var carousel = $('#carousel'),
      slideWidth = 700,
      threshold = slideWidth/3,
      dragStart, 
      dragEnd;

  setDimensions();

  $('#next').click(function(){ shiftSlide(-1) })
  $('#prev').click(function(){ shiftSlide(1) })

  carousel.on('mousedown', function(){
    if (carousel.hasClass('transition')) return;
    dragStart = event.pageX;
    $(this).on('mousemove', function(){
      dragEnd = event.pageX;
      $(this).css('transform','translateX('+ dragPos() +'px)');
    });
    $(document).on('mouseup', function(){
      if (dragPos() > threshold) { return shiftSlide(1) }
      if (dragPos() < -threshold) { return shiftSlide(-1) }
      shiftSlide(0);
    });
  });

  function setDimensions() {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
     slideWidth = $(window).innerWidth();
    }
    $('.carousel-wrap, .slide').css('width', slideWidth);
    $('.modal').css('max-width', slideWidth);
    $('#carousel').css('left', slideWidth * -1)
  }

  function dragPos() {
    return dragEnd - dragStart;
  }

  function shiftSlide(direction) {
    if (carousel.hasClass('transition')) return;
    dragEnd = dragStart;
    $(document).off('mouseup')
    carousel.off('mousemove')
            .addClass('transition')
            .css('transform','translateX(' + (direction * slideWidth) + 'px)'); 
    setTimeout(function(){
      if (direction === 1) {
        $('.slide:first').before($('.slide:last'));
      } else if (direction === -1) {
        $('.slide:last').after($('.slide:first'));
      }
      carousel.removeClass('transition')
      carousel.css('transform','translateX(0px)'); 
    },700)
  }

  function fillModal(id) {
    $('#modal .title').text(modalText[id].title);
    $('#modal .detail').text(modalText[id].detail);
    $('#modal .tag').text(modalText[id].tag);
    if (modalText[id].link) $('#modal .button').addClass('visible')
                                               .parent()
                                               .attr('href', modalText[id].link)

    $.each($('#modal li'), function(index, value ) {
      $(this).text(modalText[id].bullets[index]);
    });
    $.each($('#modal .slide'), function(index, value) {
      $(this).css({
        background: "url('img/slides/" + id + '-' + index + ".jpg') center center/cover",
        backgroundSize: 'cover'
      });
              
    });
  }
})
