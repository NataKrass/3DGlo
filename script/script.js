window.addEventListener('DOMContentLoaded', function(){
    'use strict';

    //timer
    const countTimer = (deadline) =>{
        let timerDays = document.querySelector('#timer-days'),
            timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');
        function checkTime(i) {
                if (i < 10) {
                  i = "0" + i;
                }
                return i;
               }
        const getTimeRemaining = () => {
            let dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000, 
                seconds = Math.floor(timeRemaining % 60),
                secondsZero = checkTime(seconds),
                minutes = Math.floor((timeRemaining / 60) % 60),
                minutesZero = checkTime(minutes),
                hours = Math.floor(timeRemaining / 60 / 60),
                hoursZero = checkTime(hours);
               //days = Math.floor(timeRemaining / 60 / 60 / 24);
                return {timeRemaining, hoursZero, minutesZero, secondsZero};
        }
        
        const updateCLock = () => {
           let timer = getTimeRemaining();
           
           timerHours.textContent = timer.hoursZero;
          
           timerMinutes.textContent = timer.minutesZero;
           timerSeconds.textContent = timer.secondsZero;
           
           if(timer.timeRemaining > 0){
            setInterval(updateCLock, 1000)
           } else {
            timerDays.textContent = '0';
            timerHours.textContent = '00';
            timerMinutes.textContent = '00';
            timerSeconds.textContent = '00';
           }   
        }
        updateCLock();
    }
    countTimer('01 october 2019');
    
    //menu
    const toggleMenu = () =>{
        const btnMenu = document.querySelector('.menu'),
              closeBtn = document.querySelector('.close-btn'),
              menu = document.querySelector('menu'),
              body = document.querySelector('body'),
              menuItems = menu.querySelectorAll('ul>li'),
              offset = menu.offsetLeft;
             
        const handlerMenu = () => {
            menu.classList.add('active-menu');
        };
        const closeMenu = () => {
            menu.classList.remove('active-menu');
        };
        body.addEventListener('click', (e)=> {
            let target = e.target;
            target = target.closest('.menu');
            if(target == btnMenu){
                handlerMenu();
            } else {
                closeMenu();
            } 
         })
    };
    toggleMenu();

    //popup
    const togglePopup = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupContent = document.querySelector('.popup-content'),
            popupClose = document.querySelector('.popup-close');
        
        popupContent.style.transition = '1s';
        popupContent.style.left = '-100%';

        function animation(){
            popupContent.style.left = '38%';
        };
     
        popupBtn.forEach((elem) => {
            elem.addEventListener('click', () => {
                popup.style.display = 'block';
                if(document.documentElement.clientWidth > 576) {
                    setInterval(animation, 100);
                } else {
                    popupContent.style.left = '14%';
                }
             
            });
        });

        popupClose.addEventListener('click', () => {
            popup.style.display = 'none';
            popupContent.style.left = '-100%';
        });

        popup.addEventListener('click', (event) => {
            let target = event.target;
            if(target.classList.contains('popup-close')){
                popup.style.display = 'none';
                popupContent.style.left = '-100%';
            } else {
                target = target.closest('.popup-content');
                if(!target){
                    popup.style.display = 'none';
                    popupContent.style.left = '-100%';
                 }
            }
           
        })
    }
    togglePopup();

    //tabs
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = (index) => {
            for(let i = 0; i < tabContent.length; i++){
                if(index === i){
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };
            tabHeader.addEventListener('click', (event) => {
                let target = event.target;
                    target = target.closest('.service-header-tab');
                    if(target){
                        tab.forEach((item, i) => {
                            if(item === target){
                               toggleTabContent(i); 
                            }
                        });
                    }
            });
    }
    tabs();
});