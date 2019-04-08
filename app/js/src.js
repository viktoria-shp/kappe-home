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
$('.my-scrollbar').each(function(){
})
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
