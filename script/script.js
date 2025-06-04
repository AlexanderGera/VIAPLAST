'use strict';

// -------------- slow scroll to anchor
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// -------------- hamburger menu

let headerMenu = document.getElementsByClassName('header-menu')[0];
let hamburgerMenu = document.getElementsByClassName('hamburger-menu')[0];

hamburgerMenu.addEventListener('click', mobileMenuToggle);

function mobileMenuToggle() {
    headerMenu.classList.toggle('active');
    hamburgerMenu.classList.toggle('active');
}

let menuLinks = document.getElementsByClassName('header-menu__link');
Array.from(menuLinks).forEach((element) => {
    element.addEventListener('click', closeMenuOnClick);
})

function closeMenuOnClick() {
    headerMenu.classList.remove('active');
    hamburgerMenu.classList.remove('active');
}

// ------------- language buttons styles changing

let pageLanguage = document.documentElement.lang;
let ukrLangButton = document.getElementById('ukr_lang');
let engLangButton = document.getElementById('eng_lang');

if (pageLanguage === 'uk') {
    ukrLangButton.classList.add('active');
    engLangButton.classList.remove('active');
} else {
    ukrLangButton.classList.remove('active');
    engLangButton.classList.add('active');
}

//---------- english page open

engLangButton.addEventListener('click', englishPageOpen);
ukrLangButton.addEventListener('click', ukrPageOpen);

function englishPageOpen(event) {
    event.preventDefault();
    let currentURL = window.location.href;
    window.location.href = pageLanguage === 'uk' ? currentURL.replace('viaplast.com.ua', 'viaplast.com.ua/en') : currentURL;
}

function ukrPageOpen(event) {
    event.preventDefault();
    let currentURL = window.location.href;
    window.location.href = pageLanguage === 'en' ? currentURL.replace('viaplast.com.ua/en', 'viaplast.com.ua') : currentURL;
}

//------ Gallery big image open

document.addEventListener('DOMContentLoaded', function () {
    let previewLinks = document.querySelectorAll('.product-card__product-preview-link');

    previewLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            let bigPicture = document.querySelector('.item_big-picture');
            let previewImageSrc = this.href;
            bigPicture.src = previewImageSrc;
        });
    });
});

// ---------- form sending

let contactForm = document.getElementById('contactForm');
let buttonSend = document.getElementById('buttonSend');
let listOfInputs = document.getElementsByClassName('contact-form__input');

//not send the form when key Enter pressed
enterShutDown();

function enterShutDown() {
    Array.from(listOfInputs).forEach((element) => {
        element.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
            }
        });
    });
}

function formValidation() {
    let isValid = true;
    Array.from(listOfInputs).forEach((element) => {
        element.classList.remove('_error');
        if (element.value.trim() === "") {
            element.classList.add('_error');
            isValid = false;
        } else if (element.type === 'email') {
            if (!emailChecking(element)) {
                element.classList.add('_error');
                isValid = false;
            }
        }
    });
    return isValid;
}

function emailChecking(element) {
    let stringForEmailTesting = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return stringForEmailTesting.test(element.value);
}

contactForm.addEventListener('submit', (event) => {
    if (!formValidation()) {
        event.preventDefault();
    } else {
        formSending(event, contactForm);
    }
});

//send information from Form to E-mail
function formSending(event, form) {
    event.preventDefault();

    // gather data from inputs of form
    let formData = new FormData(form);
    let xhr = new XMLHttpRequest();

    xhr.open("POST", "/mailer/smart.php", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // clear all inputs
            Array.from(listOfInputs).forEach(function (element) {
                element.value = "";
            });

            // reset form
            (form).reset();
        }
    };

    xhr.send(formData);
}

// --- iframe with Youtube-script insert

let divYouTubeHolder = document.getElementsByClassName('main-page-intro__video-holder')[0];
if (divYouTubeHolder) {
    divYouTubeHolder.innerHTML =
        `<iframe src="https://www.youtube.com/embed/Sf7uAlDO4p0?controls=0" title="YouTube video player" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen>
        </iframe>`;
}

// ---- scroll animation ----

let itemsForAnimation = document.querySelectorAll('.scroll_animation');
let newObserver = new IntersectionObserver(makeItemVisible, {
    threshold: 0.1,
    rootMargin: "35px",
});

function makeItemVisible(entries, newObserver) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}

itemsForAnimation.forEach(items => {
    newObserver.observe(items);
})

//-----products button click -----//

let productsItemHolder = document.querySelectorAll('.product-section-holder');

productsItemHolder.forEach(holder => {
    let productItemButton = holder.querySelector('.button-link-decoration');
    let productItemPicture = holder.querySelector('.product-section-holder__picture');
    productHolderMouseWatcher(productItemButton, productItemPicture);
    productHolderMouseWatcher(productItemPicture, productItemButton);

})

function productHolderMouseWatcher(elementActive, elementPassiv) {
    elementActive.addEventListener('mouseenter', (event) => {
        elementPassiv.classList.add('hover');
    });
    elementActive.addEventListener('mouseleave', (event) => {
        elementPassiv.classList.remove('hover');
    })
}
