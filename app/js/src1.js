document.addEventListener('DOMContentLoaded', function(){
  var iconContactOpen = document.querySelectorAll('.contact__icon')[0];
  if(iconContactOpen != undefined){
    iconContactOpen.addEventListener('click', function(){
        let className = document.querySelectorAll('.contact-info')[0]
        console.log(className);
        className.classList.toggle('active')
    })
  }
});
var slider = document.querySelector('.slider');
  if(slider!=undefined){
    var hammertime = new Hammer(slider);
    var slides = document.querySelectorAll('.slide');
    function goToSlide(index){
      [].forEach.call(slides, function(item){
        item.classList.remove('is-active')
        item.classList.remove('is-next')
        item.classList.remove('is-prev')
      });
      if(!slides[index]){
        return false
      }
      if (index+1 >= slides.length){
        slides[0].classList.add('is-next')
      }else{
        slides[index+1].classList.add('is-next')
      }
      if (index-1 < 0){
        slides[slides.length-1].classList.add('is-prev')
      }else{
        slides[index-1].classList.add('is-prev')
      }
      slides[index].classList.add('is-active')
      slider.style.height = slides[index].clientHeight+'px'
      let allPins = document.querySelectorAll('.slider-pins div');
      [].forEach.call(allPins, function(item){
        item.classList.remove('active');
      });
      allPins[index].classList.add('active');
    }
    function sliderInit(){
      var num = 0;
      var pins = document.createElement('div');
      pins.classList.add('slider-pins');
      [].forEach.call(slides, function(item){
        var pin = document.createElement('div');
        pin.innerText = num;
        pin.dataset.num = num;
        num++;
        pin.addEventListener('click', function(){
          console.log(this.innerText, this.dataset.num)
          goToSlide(+this.innerText);
        })
        pins.appendChild(pin)
      })
      slider.appendChild(pins)
      goToSlide(0);
    }
    sliderInit();
    hammertime.on('swipeleft', function(ev) {
      let current = document.querySelector('.slide.is-active');
      var index = Array.prototype.indexOf.call( slides,current);
      index++;
      if (index >= slides.length){
        index = 0;
      }
      goToSlide(index);
    });
    hammertime.on('swiperight', function(ev) {
      let current = document.querySelector('.slide.is-active');
      var index = Array.prototype.indexOf.call( slides,current);
      index--;
      if (index < 0){
        index = slides.length-1;
      }
      goToSlide(index);
    });
    hammertime.on('swiperight', function(ev) {
    });
  }

var slideIndex = 1;
function plusDivs(n, element) {
  showDivs(slideIndex += n, element);

}
function showDivs(n, element) {
  var i;
  var x = element.parentElement.getElementsByClassName("mySlides");
  if (n > x.length) {slideIndex = 1} 
  if (n < 1) {slideIndex = x.length} ;
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none"; 
  }
  x[slideIndex-1].style.display = "block"; 
  console.log(x)
}


