(()=>{"use strict";var t={baseUrl:"https://nomoreparties.co/v1/wff-cohort-12",headers:{authorization:"aefb9d6c-0be1-424f-9825-78d813242522","Content-Type":"application/json"}};function e(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}function n(t){t.classList.add("popup_is-opened"),document.addEventListener("click",r),document.addEventListener("keydown",c)}function o(t){t.classList.remove("popup_is-opened"),document.removeEventListener("click",r),document.removeEventListener("keydown",c)}function r(t){(t.target.classList.contains("popup__close")||t.target.classList.contains("popup"))&&o(document.querySelector(".popup_is-opened"))}function c(t){"Escape"===t.key&&o(document.querySelector(".popup_is-opened"))}function a(t,e,n,o,r,c,a,i,u,l,s){var d=document.querySelector("#card-template").content.cloneNode("#card-template"),p=d.querySelector(".card__like-button"),f=d.querySelector(".card__image"),m=d.querySelector(".card__title"),_=d.querySelector(".card__delete-button"),y=d.querySelector(".card__likes-quantity"),h=document.querySelector(".popup__button_delete-confirm"),v=document.querySelector(".popup_type_delete-confirm"),b=d.querySelector(".places__item"),g=i.some((function(t){return t._id===u})),S=u===c;return m.textContent=t,f.src=e,f.alt=t,b.setAttribute("id","".concat(a)),g&&p.classList.toggle("card__like-button_is-active"),r&&(y.textContent=r),S&&(_.style.display="inline-block",_.addEventListener("click",(function(){return s(v,h,l,a)}))),f.addEventListener("click",n),p.addEventListener("click",(function(t){o(t,a,y)})),d}function i(t,e,o,r){n(t),e.setAttribute("data-card-to-delete-id","".concat(r)),e.addEventListener("click",o)}function u(n){var r=n.target.getAttribute("data-card-to-delete-id"),c=document.getElementById("".concat(r)),a=document.querySelector(".popup_is-opened");(function(n){return fetch("".concat(t.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:t.headers}).then(e)})(r).then((function(){c.remove(),n.target.removeEventListener("click",u),o(a)})).catch((function(t){console.log(t)}))}function l(n,o,r){n.target.classList.contains("card__like-button_is-active")?function(n){return fetch("".concat(t.baseUrl,"/cards/likes/").concat(n),{method:"DELETE",headers:t.headers}).then(e)}(o).then((function(t){r.textContent=t.likes.length||"",n.target.classList.toggle("card__like-button_is-active")})).catch((function(t){console.log(t)})):function(n){return fetch("".concat(t.baseUrl,"/cards/likes/").concat(n),{method:"PUT",headers:t.headers}).then(e)}(o).then((function(t){r.textContent=t.likes.length,n.target.classList.toggle("card__like-button_is-active")})).catch((function(t){console.log(t)}))}function s(t,e,n){e.classList.remove(n),t.textContent=""}function d(t,e,n,o){var r=t.querySelector(".".concat(n));!function(t,e){return Array.from(t.querySelectorAll(".".concat(e))).some((function(t){if(!t.validity.valid)return!0}))}(t,o)?(r.classList.remove(e),r.removeAttribute("disabled","")):(r.classList.add(e),r.setAttribute("disabled",""))}function p(t,e){var n=t.querySelectorAll(".".concat(e.inputSelector));t.reset(),d(t,e.inactiveButtonClass,e.submitButtonSelector,e.inputSelector),n.forEach((function(n){s(t.querySelector(".".concat(n.id,"-error")),n,e.inputErrorClass)}))}function f(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,o=new Array(e);n<e;n++)o[n]=t[n];return o}var m,_,y=document.querySelector(".places__list"),h=document.forms["edit-profile"],v=document.forms["new-avatar"],b=v.link,g=h.name,S=h.description,k=document.querySelector(".profile__image"),E=document.querySelector(".profile__title"),q=document.querySelector(".profile__description"),L=document.forms["new-place"],C=L["place-name"],A=L.link,x=document.querySelector(".profile__edit-button"),T=document.querySelector(".profile__add-button"),w=document.querySelector(".popup_type_edit"),U=document.querySelector(".popup_type_new-card"),j=document.querySelector(".popup_type_image"),O=document.querySelector(".popup__caption"),B=document.querySelector(".popup__image"),P=document.querySelector(".popup_type_new-avatar"),D={formSelector:"popup__form",inputSelector:"popup__input",submitButtonSelector:"popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_invalid",errorClass:"popup__input-error"};function M(t){B.src=t.target.src,B.alt=t.target.alt,O.textContent=t.target.alt,n(j)}function I(t){var e=t.target.querySelector(".popup__button_loading-text"),n=t.target.querySelector(".popup__button_initial-text");e.classList.toggle("popup_button_text-is-visible"),n.classList.toggle("popup_button_text-is-visible")}y.addEventListener("click",(function(t){t.target.classList.contains("card__image")&&n(j)})),k.addEventListener("click",(function(){p(v,D),n(P)})),x.addEventListener("click",(function(){p(h,D),g.value=E.textContent,S.value=q.textContent,n(w)})),T.addEventListener("click",(function(){p(L,D),n(U)})),v.addEventListener("submit",(function(n){n.preventDefault(),I(n),function(t){return fetch(t,{method:"HEAD"})}(b.value).then((function(n){if(!n.ok||!n.headers.get("Content-Type").startsWith("image"))return Promise.reject({errorMessage:"Ошибка в isUrlExist ".concat(n.status),mimeType:n.headers.get("Content-Type")});(function(n){return fetch("".concat(t.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:t.headers,body:JSON.stringify({avatar:n})}).then(e)})(n.url).then((function(t){k.setAttribute("style","background-image: url('".concat(t.avatar,"')")),o(P)}))})).catch((function(t){console.log(t.errorMessage),t.mimeType.startsWith("image")||console.log("По указанному Url не изображение")})).finally((function(){return I(n)}))})),h.addEventListener("submit",(function(n){!function(n){var r,c;I(n),(r=g.value,c=S.value,fetch("".concat(t.baseUrl,"/users/me"),{method:"PATCH",headers:t.headers,body:JSON.stringify({name:r,about:c})}).then(e)).then((function(t){E.textContent=t.name,q.textContent=t.about})).catch((function(t){console.log(t)})).finally((function(){return I(n)})),n.preventDefault(),o(w)}(n)})),L.addEventListener("submit",(function(n){!function(n){var r,c;I(n),(r=C.value,c=A.value,fetch("".concat(t.baseUrl,"/cards"),{method:"POST",headers:t.headers,body:JSON.stringify({name:r,link:c})}).then(e)).then((function(t){var e=a(t.name,t.link,M,l,0,t.owner._id,t._id,t.likes,m,u,i);y.prepend(e)})).catch((function(t){console.log(t)})).finally((function(){return I(n)})),n.target.reset(),n.preventDefault(),o(U)}(n)})),_=D,document.querySelectorAll(".".concat(_.formSelector)).forEach((function(t){!function(t,e,n,o,r){t.querySelectorAll(".".concat(n)).forEach((function(c){return c.addEventListener("input",(function(){!function(t,e,n){var o=t.querySelector(".".concat(e.id,"-error"));e.validity.valid?s(o,e,n):function(t,e,n){e.classList.add(n),e.validity.patternMismatch?e.setCustomValidity(e.getAttribute("data-error-message")):e.setCustomValidity(""),t.textContent=e.validationMessage}(o,e,n)}(t,c,e),d(t,o,r,n)}))}))}(t,_.inputErrorClass,_.inputSelector,_.inactiveButtonClass,_.submitButtonSelector)})),Promise.all([fetch("".concat(t.baseUrl,"/users/me"),{method:"GET",headers:t.headers}).then(e),fetch("".concat(t.baseUrl,"/cards"),{method:"GET",headers:t.headers}).then(e)]).then((function(t){var e,n,o=(n=2,function(t){if(Array.isArray(t))return t}(e=t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var o,r,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(t)).next,0===e){if(Object(n)!==n)return;u=!1}else for(;!(u=(o=c.call(n)).done)&&(i.push(o.value),i.length!==e);u=!0);}catch(t){l=!0,r=t}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw r}}return i}}(e,n)||function(t,e){if(t){if("string"==typeof t)return f(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(t,e):void 0}}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),r=o[0],c=o[1];m=r._id,E.textContent=r.name,q.textContent=r.about,k.setAttribute("style","background-image: url('".concat(r.avatar,"')")),c.forEach((function(t){y.append(a(t.name,t.link,M,l,t.likes.length,t.owner._id,t._id,t.likes,m,u,i))}))})).catch((function(t){console.log(t)}))})();
//# sourceMappingURL=main.js.map