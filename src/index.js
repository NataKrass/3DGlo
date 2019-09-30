'use strict';

import calc from './modules/calc';
import countTimer from './src/modules/countTimer';
import sendForm from './modules/sendForm';
import slider from './modules/slider';
import tabs from './modules/tabs';
import team from './modules/team';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import validation from './modules/validation';

    //timer
    countTimer('01 october 2019');
    
    //menu
    toggleMenu();

    //popup
    togglePopup();

    //tabs
    tabs();

    //slider
    slider();

    //team
    team();

    //calculator
    calc(100);
        
    //send ajax-form
    let formHeader = document.getElementById('form1'),
       formFooter = document.getElementById('form2'),
       formModal = document.getElementById('form3');
    sendForm(formHeader);
    sendForm(formFooter);
    sendForm(formModal);

    //validation
    validation();
    