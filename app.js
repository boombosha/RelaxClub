// Отправка формы
function sendData(formData) {
  const XHR = new XMLHttpRequest();
  XHR.responseType = 'json';

  //successful data submission
  XHR.addEventListener("load", function (event) {
    //console.log(XHR.response);
    // console.log(event);
    //alert("Отправлено!");
    feedbackField.value = '';
    feedbackUsernameField.value = '';
    // event = XHR.response;
    console.log(event);
    //
    const XHR = new XMLHttpRequest();

    XHR.addEventListener("load", function () {
      msgRequestHandler(XHR.response.response.messages);
    });
  
    XHR.responseType = 'json';
    XHR.open("POST", "http://localhost/api.php");
    XHR.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    XHR.send("method=messages&action=getList&offset=0&count=50");
    
  });

  //error
  XHR.addEventListener("error", function (event) {
    alert("Что-то пошло не так!");
    //console.log(event.)
  });

  XHR.open("POST", "http://localhost/api.php");
  XHR.send(formData);
}


let feedbackField = document.querySelector('.feedback-field');
let feedbackUsernameField = document.querySelector('.feedback-username-field');

function msgRequestHandler (feedbackArray) {
  
  console.log(feedbackArray);

  let container = document.querySelector('.feedback-container');
  let template = document.querySelector('#element-template').content;
 
  container.textContent = "";

  for (let i=0; i<feedbackArray.length; i++) {
    let element = template.querySelector('.feedback-items-container');
    let clonedElement = element.cloneNode(true);
    

    for (nodeClass in feedbackArray[i]) {
      let child = clonedElement.querySelector(`.${nodeClass}`);
        if (nodeClass != 'id') {
          child.textContent = feedbackArray[i][nodeClass];
        }
        else {
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

    // Кнопка "Загрузить ещё"
    let loadMoreButton = document.querySelector('.load-more');
    let numToShow = 3;
    let numInList = document.querySelectorAll('.feedback-items-container').length;
    let feedbacks = document.querySelectorAll('.feedback-items-container');

    for (let k = numToShow; k < numInList; k++) {
      feedbacks[k].style.display = "none";
    };

    loadMoreButton.onclick = function() {
      console.log('button load more');
      numToShow += 3;
      // let numInList = document.querySelectorAll('.feedback-items-container').length;
      if (numToShow <= numInList+2) {
        for (let j=0; j<numToShow; j++){
          feedbacks[j].style.display = "block";
        }
      }
    }
    
    
  
   


    
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
    }
    else {
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
  
}     
// });
// });



function addLike(id) {
  // Вешаем обработчик onLikeAdded на ответ запроса
  // Подставляем в запрос наш id
  const XHR3 = new XMLHttpRequest();
  XHR3.open("POST", "http://localhost/api.php");
  XHR3.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  XHR3.send(`method=messages&action=addLike&id=${id}`);
}

// // Дата отзывов

// let days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
// let months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", 
//             "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
// let msgTime = clonedElement.querySelector('.date').innerText;             
// let myDate = new Date(msgTime);
// let fullDate = myDate.getDate() + " " + months[myDate.getMonth()] + " " + myDate.getFullYear() + ", " + days[myDate.getDay()] + " " + myDate.getHours() + ":" + myDate.getMinutes();
// console.log(fullDate);


// Инициализация
window.addEventListener("load", function () {
  const form = document.querySelector('.feedback-form');
  form.addEventListener("submit", function (event) {
    event.preventDefault();    
    sendData(new FormData(form));
    
  });

  // Получаем список сообщений
  const XHR = new XMLHttpRequest();

  XHR.addEventListener("load", function () {
    msgRequestHandler(XHR.response.response.messages);
  
  });

  XHR.responseType = 'json';
  XHR.open("POST", "http://localhost/api.php");
  XHR.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  XHR.send("method=messages&action=getList&offset=0&count=50");
});



