/* @title   i18n Automatic
 * @version 0.1
 * @author  danisztls
 * @license ISC */
 
let userLang

function langDetect () {
  // get lang from localStorage
  userLang = localStorage.getItem('userLang')

  // if lang is not set
  if (!userLang) {
    // get locale from browser
    let browserLocale = navigator.language || navigator.userLanguage
    // TODO: refactor to work with multiple languages, currently it's hardcoded
    // derive lang from locale
    if (browserLocale.match(/es/)) {
      userLang = 'es'
    } else {
      userLang = 'en'
    }
  }
}

function langRedirect (redirectLang) {
  // set lang on localStorage
  localStorage.setItem('userLang', redirectLang)
  
  // compute path
  let pageURL = document.location.href
  let langRE = "$1/" + redirectLang + "/$2"
  let redirectURL = pageURL.replace(/(.*)\/[a-z]{2}\/(.*)/, langRE)

  // redirect if not the same
  if (pageURL != redirectURL) {
    window.location.replace(redirectURL)
  }
}

langDetect()
langRedirect(userLang)
