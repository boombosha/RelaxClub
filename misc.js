// Меню еды

function openMenu(evt, menuItem) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    evt.preventDefault();

    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace("current", "");
    }
    document.getElementById(menuItem).style.display = "block";
    evt.currentTarget.className += " current";
}


// Переключение фонов

let arrowLeft = document.querySelector('.arrow-left');
let arrowRight = document.querySelector('.arrow-right');
let aboutUs = document.querySelector('.about-us');


arrowLeft.onclick = function() {
  changeBackground();
}

arrowRight.onclick = function() {
  changeBackground();
}

let backgrounds = [
  "url('pic/about/1.jpg')",
  "url('pic/about/2.jpg')",
  "url('pic/about/3.jpg')",
  "url('pic/about/4.jpg')"
];

let currentBackground = 0; // Текущий индекс фоновой картинки

function changeBackground() {
  
  aboutUs.style.transition = "background 0.5s ease-in-out";
  aboutUs.style.background = backgrounds[currentBackground];
  currentBackground = (currentBackground + 1) % backgrounds.length;
}

setInterval(changeBackground, 15000);


// Отлепляем меню до скролла

function toggleSticky() {
  let element = document.querySelector(".menu-main");
  let target = document.getElementById("About");
  let targetTop = target.offsetTop;

  if (window.scrollY >= targetTop) {
    element.style.position = "";
  } else {
    element.style.position = "sticky";
  }
}

window.addEventListener("scroll", toggleSticky);



// Плавный скролл по стрелочке
let arrow = document.querySelector(".arrow");
let target = document.getElementById("food-container-id");
let targetTop = target.offsetTop;

arrow.onclick = function () {
  window.scrollTo({
    top: targetTop,
    behavior: "smooth"
  });
};