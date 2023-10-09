// Меню еды

function openMenu(evt, menuItem) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    evt.preventDefault();
    /*window.scrollTo({
        top: 600,
        behavior: "smooth"
    });*/

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

//tabcontent.scrollIntoView({ block: "center", behavior: "smooth" });


// Переключение фонов

let arrowLeft = document.querySelector('.arrow-left');
let arrowRight = document.querySelector('.arrow-right');
let aboutUs = document.querySelector('.about-us');
// let count = 1;
// let countR = 1;

arrowLeft.onclick = function() {
  changeBackground();
//setInterval(changeBackground, 5000);
    // count++;
    // if (count<6) {
    //     return aboutUs.style.backgroundImage = 'url("pic/about/' + count +'.jpg")';
    // }
    // if (count==5) {
    //     count = 1;
    // }
}

arrowRight.onclick = function() {
  changeBackground();
//setInterval(changeBackground, 5000);
    // countR++;
    // if (countR<5) {
    //     return aboutUs.style.backgroundImage = 'url("pic/about/' + countR +'.jpg")';
    // }
    // if (countR==4) {
    //     countR = 1;
    // }
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
  // Увеличение индекса текущей фоновой картинки
  currentBackground = (currentBackground + 1) % backgrounds.length;
}

setInterval(changeBackground, 15000);



// Отлепляем меню до скролла

function toggleSticky() {
  let element = document.querySelector(".menu-main");
  let target = document.getElementById("About");
  //let targetTop = target.getBoundingClientRect().bottom;
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
//let target = document.querySelector(".food-container");
let target = document.getElementById("food-container-id");
let targetTop = target.offsetTop;

arrow.onclick = function () {
  // evt.preventDefault();
  window.scrollTo({
    top: targetTop,
    behavior: "smooth"
  });

};



// Отправка формы

let feedbackField = document.querySelector('.feedback-field');
let feedbackUsernameField = document.querySelector('.feedback-username-field');

window.addEventListener("load", function () {
    const form = document.querySelector('.feedback-form');

    function sendData() {
      const XHR = new XMLHttpRequest();
      XHR.responseType = 'json';
      const FD = new FormData(form);
  
      //successful data submission
      XHR.addEventListener("load", function (event) {
        alert("Отправлено!");
        feedbackField.value = '';
        feedbackUsernameField.value = '';

      });
  
      //error
      XHR.addEventListener("error", function (event) {
        alert("Что-то пошло не так!");
        //console.log(event.)
      });
  
      XHR.open("POST", "http://localhost/api.php");
      XHR.send(FD);
    }
  
      form.addEventListener("submit", function (event) {
        event.preventDefault();
    
        sendData();
      });
  });




// Обновляем список сообщений
const XHR2 = new XMLHttpRequest();
XHR2.responseType = 'json';


XHR2.addEventListener("load", function () {
    let feedbackArray = XHR2.response.response.messages;
    console.log(feedbackArray);

    
    for (let i=0; i<feedbackArray.length; i++) {
      let container = document.querySelector('.feedback-container');
      let template = document.querySelector('#element-template').content;
      let element = template.querySelector('.feedback-items-container');
      let clonedElement = element.cloneNode(true);
     

      for (nodeClass in feedbackArray[i]) {
        let child = clonedElement.querySelector(`.${nodeClass}`);
          if (nodeClass != 'id') {
          child.textContent = feedbackArray[i][nodeClass];
        } else {
          element.dataset.msgId = feedbackArray[i].id;
          console.log('element-id:' + element.dataset.msgId);
          // Likes
          let heart = clonedElement.querySelector('.heart');
          let like = clonedElement.querySelector('.likes');
          heart.onclick = function() {
            addLike(element.dataset.msgId);       
            heart.classList.toggle('added');
            like.textContent++;
          //   if (heart.classList.contains('added')) {
          //     like.textContent++;
          //   } else {
          //     like.textContent--;
          // }

          }
        }
     }
      container.appendChild(clonedElement);
      
      
      // Дата отзывов

      let months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", 
                  "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
      let msgTime = clonedElement.querySelector('.date').innerText;             
      let myDate = new Date(msgTime);
      let currentDate = new Date();
      let newMsgTime = document.querySelectorAll('.date');
      const MS_IN_24HOURS = 86400000;
      //let hoursMinutes = myDate.getHours() + ":" + myDate.getMinutes();
      const shortTime = new Intl.DateTimeFormat("ru", {
        timeStyle: "short",
      });
      let hoursMinutes = shortTime.format(myDate);

      if (currentDate-myDate < MS_IN_24HOURS) {
        newMsgTime[i].innerText = "сегодня" + ", " + hoursMinutes;
      }
      else if (currentDate-myDate < MS_IN_24HOURS*2) {
        newMsgTime[i].innerText = "вчера" + ", " + hoursMinutes;
      } else {
        newMsgTime[i].innerText = myDate.getDate() + " " + months[myDate.getMonth()] + " " + myDate.getFullYear() + ", " + hoursMinutes;
      }

      // if (myDate.getDate() == currentDate.getDate() && 
      //     myDate.getMonth() == currentDate.getMonth() && 
      //     myDate.getFullYear() == currentDate.getFullYear()) {
      //   newMsgTime[i].innerText = "сегодня" + ", " + myDate.getHours() + ":" + myDate.getMinutes();
      // } 
      // else if (myDate.getDate() == currentDate.getDate()-1 && 
      //     myDate.getMonth() == currentDate.getMonth() && 
      //     myDate.getFullYear() == currentDate.getFullYear()) {
      // newMsgTime[i].innerText = "вчера" + ", " + myDate.getHours() + ":" + myDate.getMinutes();
      // }    
      // else {
      // newMsgTime[i].innerText = fullDate;
      // console.log(myDate.getDate());
      //}
   }  
    
});

XHR2.open("POST", "http://localhost/api.php");
XHR2.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
XHR2.send("method=messages&action=getList&offset=0&count=50");



function addLike(id) {
  // Вешаем обработчик onLikeAdded на ответ запроса
  // Подставляем в запрос наш id
  const XHR3 = new XMLHttpRequest();
  XHR3.open("POST", "http://localhost/api.php");
  XHR3.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  XHR3.send(`method=messages&action=addLike&id=${id}`);
}


// Корзинка
// let cardButtons = document.querySelectorAll('.btn');
// let click = 0;
// let basket = document.querySelector('.basket');
// let goodsNumber = basket.querySelector('.goods-number');
// //let cardPrice = document.querySelector('.card-price-value');
// let amount = basket.querySelector('.amount');
// let buttonGoodsNumber = document.querySelector('.cart__num')

// for (let cardButton of cardButtons) {
//   cardButton.onclick = function() {
//     click++;
//     goodsNumber.textContent = click;
//     //buttonGoodsNumber.textContent = click;
//     let priceElement = cardButton.querySelector('.card-price-value');
//     let price = Number(priceElement.textContent);
//     //let price = parseInt(cardPrice.textContent);
//     amount.textContent = Number(amount.textContent) + price;
//     let amountNum = Number(amount.textContent);
    
//   }

// }

// Считываем все элементы корзины:
const cardAddArr = Array.from(document.querySelectorAll(".btn"));
const cartNum = document.querySelector("#cart_num");
const cart = document.querySelector("#cart");

// Считываем все элементы попапа:
const popup = document.querySelector(".popup");
const popupClose = document.querySelector("#popup_close");
const body = document.body;
const popupContainer = document.querySelector("#popup_container");
const popupProductList = document.querySelector("#popup_product_list");
const popupCost = document.querySelector("#popup_cost");
// const popupDiscount = document.querySelector("#popup_discount");
// const popupCostDiscount = document.querySelector("#popup_cost_discount");

// Кнопки открытия и закрытия корзины
cart.addEventListener("click", (e) => {
  e.preventDefault();
  popup.classList.add("popup--open");
  body.classList.add("lock");
  popupContainerFill();
});

popupClose.addEventListener("click", (e) => {
  e.preventDefault();
  popup.classList.remove("popup--open");
  body.classList.remove("lock");
});


// Класс для товара
class Product {
  imageSrc;
  name;
  price;
  constructor(card) {
    this.imageSrc = card.querySelector(".card-img").src;
    this.name = card.querySelector(".card-title").innerText;
    this.price = card.querySelector(".card-price-value").innerText;
  }
}

// Класс для описания корзины покупок

class Cart {
  products;
  constructor() {
    this.products = [];
  }
  get count() {
    return this.products.length;
  }
  addProduct(product) {
    this.products.push(product);
  }
  removeProduct(index) {
    this.products.splice(index, 1);
  }
  get cost() {
    const prices = this.products.map((product) => {
      // return toNum(product.price);
      return Number(product.price);
    });
    const sum = prices.reduce((acc, num) => {
      return acc + num;
    }, 0);
    return sum;
  }
}

// Создаем объект корзины и сохраняем его в localStorage
const myCart = new Cart();

if (localStorage.getItem("cart") == null) {
  localStorage.setItem("cart", JSON.stringify(myCart));
}

const savedCart = JSON.parse(localStorage.getItem("cart"));
myCart.products = savedCart.products;
cartNum.textContent = myCart.count;


// Добавляем товар в корзину
myCart.products = cardAddArr.forEach((cardAdd) => {
  cardAdd.addEventListener("click", (e) => {
    e.preventDefault();
    const card = e.target.closest(".card");
    const product = new Product(card);
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    myCart.products = savedCart.products;
    myCart.addProduct(product);
    localStorage.setItem("cart", JSON.stringify(myCart));
    cartNum.textContent = myCart.count;
    console.log('cartadd');
  });
});


// Заполнение корзины

function popupContainerFill() {
  popupProductList.innerHTML = null;
  console.log('popuptest');
  const savedCart = JSON.parse(localStorage.getItem("cart"));
  myCart.products = savedCart.products;
  const productsHTML = myCart.products.map((product) => {
    const productItem = document.createElement("div");
    productItem.classList.add("popup__product");

    const productWrap1 = document.createElement("div");
    productWrap1.classList.add("popup__product-wrap");
    const productWrap2 = document.createElement("div");
    productWrap2.classList.add("popup__product-wrap");

    const productImage = document.createElement("img");
    productImage.classList.add("popup__product-image");
    productImage.setAttribute("src", product.imageSrc);

    const productTitle = document.createElement("h2");
    productTitle.classList.add("popup__product-title");
    productTitle.innerHTML = product.name;

    const productPrice = document.createElement("div");
    productPrice.classList.add("popup__product-price");
    // productPrice.innerHTML = toNum(product.price);
    productPrice.innerHTML = Number(product.price) + ' ₽';

    const productDelete = document.createElement("button");
    productDelete.classList.add("popup__product-delete");
    productDelete.innerHTML = "✖";

    productDelete.addEventListener("click", () => {
      myCart.removeProduct(product);
      localStorage.setItem("cart", JSON.stringify(myCart));
      popupContainerFill();
    });

    productWrap1.appendChild(productImage);
    productWrap1.appendChild(productTitle);
    productWrap2.appendChild(productPrice);
    productWrap2.appendChild(productDelete);
    productItem.appendChild(productWrap1);
    productItem.appendChild(productWrap2);

    return productItem;
  });

  productsHTML.forEach((productHTML) => {
    popupProductList.appendChild(productHTML);
  });

  popupCost.value = myCart.cost + '₽';

}

// // Дата отзывов

// let days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
// let months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", 
//             "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
// let msgTime = clonedElement.querySelector('.date').innerText;             
// let myDate = new Date(msgTime);
// let fullDate = myDate.getDate() + " " + months[myDate.getMonth()] + " " + myDate.getFullYear() + ", " + days[myDate.getDay()] + " " + myDate.getHours() + ":" + myDate.getMinutes();
// console.log(fullDate);