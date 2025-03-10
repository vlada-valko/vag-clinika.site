document.querySelectorAll('slider').forEach(slider => {
    let imgs = [...slider.querySelectorAll('img')];
    imgs[0].classList.add('visible');
    slider.addEventListener('click', e => {
      let r = slider.getBoundingClientRect();
      let dir = Math.sign(e.x-r.x-r.width/2);
      let index = imgs.indexOf(document.querySelector('.visible'));
      imgs[index].classList.remove('visible');
      imgs[(index + dir + imgs.length) % imgs.length].classList.add('visible');  
    })
  });