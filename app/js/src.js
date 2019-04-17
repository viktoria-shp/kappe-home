Scrollbar.init(document.querySelector('.my-scrollbar'));
$('.filter a').on('click', function(e){
  e.preventDefault();
  var hash = $(this).attr('href');
  filterByHash(hash);
})

$(document).ready(function() {
  var hash = window.location.hash
  filterByHash(hash);
});
function removeHash () { 
    history.pushState("", document.title, window.location.pathname
                                                       + window.location.search);
}
function filterByHash(hash) {
  if(!hash)return
  window.location.hash = hash
  $('[data-anchor]').addClass('is-hidden')
  hash = hash.substring(1);
  if(hash == 'allworks'){
    $('[data-anchor]').removeClass('is-hidden')
    removeHash();
  }else{
    $('[data-anchor="'+hash+'"]').removeClass('is-hidden')
  }
  $('.filter a').parent().removeClass('is-active')
  $('.filter a[href="#' + hash + '"]').parent().addClass('is-active')
}

Scrollbar.init($('.my-scrollbar').get(0), {
  damping: 0.2
});
var content = Scrollbar.init($('.my-scrollbar').get(1), {
  damping: 0.2
});
$('.sidebar .logo, .scroll-up').on('click', function(){
  content.scrollTo(0, 0, 1000)
})

content.addListener(function(status) {
  console.log(status);
  if(status.limit.y == status.offset.y){
    setTimeout(function(){
      alert('End of page')
    }, 100) 
  }
  if(status.offset.y/status.limit.y > 0.2){
    $('.scroll-up').removeClass('hide')
    console.log('scroll-up')
  }else{
    $('.scroll-up').addClass('hide')
  }
});

var $grid = $('.grid').imagesLoaded( function() {
  $grid.masonry({
    itemSelector: '.grid-item',
    percentPosition: true,
    columnWidth: '.grid-sizer',
    gutter: 0
  }); 
});

function renderPosts(posts){
  console.log(posts);
  if (posts != undefined) {
    posts.forEach( function(item) {

      let post = '<div class="grid-item ' + item.type + '">'
      switch (item.type) {
        case 'img':
          post += '<img src="' + item.img + '">'
          break;
        case 'quote':
          post += '<blockquote class="quote__text">' + item.hreff + '</blockquote><div class="quote__autor">' + item.author + '</div>'
          break;
        case 'link':
          post += '<div class="link__title">' + item.title + '</div>'+'<div class="link__hreff">'+'<a href="' + item.hreff + '">'+item.hrefftext+'</a></div>'
          break;
        case 'aside':
          post += '<div class="aside__title">' + item.title + '</div>'+'<div class="aside__text">' + item.text + '</div>'
          break;
        case 'standard':
          post += '<div class="standard__img">'+'<img src="' + item.img + '">'+'</div>'+'<div class="standard__title">' + item.title + '</div>'+'<div class="standard__text">' + item.text + '</div>'+'<div class="blog-icons">' + '<div class="blog-icons__comment">' + '<i class="fas fa-comment"></i>' + item.comment + '</i>'+'</div>' + '<div class="blog-icons__comment">' + '<i class="fas fa-calendar-alt"></i>' + item.calendar + '</div>'+'</div>'
          break;
        case 'video':
          post += '<div class="video__img">'+'<iframe width="294" height="381" src="https://www.youtube.com/embed/YNY_pb4b22k" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>'+'</iframe>'+'</div>'+'<div class="video__title">' + item.title + '</div>'+'<div class="video__text">' + item.text + '</div>'+'<div class="blog-icons">' + '<div class="blog-icons__comment">' + '<i class="fas fa-comment"></i>' + item.comment + '</i>'+'</div>' + '<div class="blog-icons__comment">' + '<i class="fas fa-calendar-alt"></i>' + item.calendar + '</div>'+'</div>'
          break;
        case 'gallery':
          post += '<div class="w3-content w3-display-container">'
          item.imgs.forEach( function(img, index) {
              post += '<img class="mySlides" src="' + img + '" ' + (index==0 ? 'style="display: block;"' : '')+ '>'
          });
          post += '<button class="w3-button w3-black w3-display-left" onclick="plusDivs(-1, this)"><i class="fas fa-chevron-left"></i></button>'
          post += '<button class="w3-button w3-black w3-display-right" onclick="plusDivs(1, this)"><i class="fas fa-chevron-right"></i></button>'
          post += '<div class="gallery__title">' + item.title + '</div>'+'<div class="gallery__text">' + item.text + '</div>'+'<div class="blog-icons">' + '<div class="blog-icons__comment">' + '<i class="fas fa-comment"></i>' + item.comment + '</i>'+'</div>' + '<div class="blog-icons__comment">' + '<i class="fas fa-calendar-alt"></i>' + item.calendar + '</div>'+'</div>'
          post += '</div>'
          break;
        default:
          break;
      }
      post += '</div>'
      $('.grid').append(post)
    });
    $('.grid').imagesLoaded( function() {        
        $grid.masonry().masonry('reloadItems')        
    })    
  }
}
function getPosts(page){
  let posts = []
  fetch('http://localhost:3000/?page='+page)
    .then(function(response) {
      //alert(response.headers.get('Content-Type')); // application/json; charset=utf-8
      //alert(response.status); // 200

    return response.json();
   })
  .then(function(posts) {
    console.log(posts)
    renderPosts(posts)
  })
  .catch(alert);
  return(posts)
}
//getPosts()


$(document).ready(function() {
    $('.sidebar-opener').click(function() {
        $('.sidebar').toggleClass('open');
    });
    $('.older-post').click(function() {
      var page = parseInt($(this).data('page'));
      getPosts(page)        
      $(this).data('page', (page+1));
    });
});


