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
