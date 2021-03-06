/* @name    i18nRedirector
 * @desc    Redirect user on 1st visit to internationalized alternative of the page based on navigator language.
 * @version 1.0
 * @author  Daniel <danisztls@gmail.com>
 * @license MIT */

function i18nRedirect(siteLangs, defaultLang, baseURL) {
  // parameters
  if (typeof siteLangs === 'undefined') siteLangs = ["en"] // array of languages supported, order by preference
  if (typeof defaultLang === 'undefined') defaultLang = "en" // leave blank to redirect to root
  if (typeof baseURL === 'undefined') baseURL = "" // if site has a base URL (e.g. for 'https://mysite.com/doc/' use 'doc/')
  
  // noop if already redirected
  if (localStorage.getItem("isRedirected")) {
    return
  }

  // get lang from browser preferences
  let userLang = navigator.language || navigator.userLanguage

  // try regionalized first (e.g. en-us)
  let redirectLang = siteLangs.find((e) => e.match(userLang))

  // if lang not found try internationalized (e.g. en)
  if (!redirectLang) {
    userLang = userLang.replace(/^([a-z]{2}).*$/, "$1")
    redirectLang = siteLangs.find((e) => e.match(userLang))
  }

  // if still not found use default
  if (!redirectLang) {
    redirectLang = defaultLang
  }

  // get page path
  let pagePath = document.location.pathname

  // trim baseURL
  if (baseURL != "") {
    pagePath = pagePath.replace(baseURL, "")
  }

  // analyze path
  let isPathRegional = false // e.g. /en-US/introduction
  if (pagePath.match(/^\/[a-z]{2}-[A-Z]{2}\/.*$/)) {
    isPathRegional = true
  }

  let isPathInternational = false // e.g. /en/introduction
  if (pagePath.match(/^\/[a-z]{2}\/.*$/)) {
    isPathInternational = true
  }

  let isPathRoot = false // e.g. /introduction
  if (!isPathRegional && !isPathInternational) {
    isPathRoot = true
  }

  let replaceRE
  let replaceFormat = `/${redirectLang}/$1`

  if (isPathRoot) {
    replaceRE = /^\/(.*)$/
  } else if (isPathInternational) {
    replaceRE = /^\/[a-z]{2}\/(.*)$/
  } else {
    // isPathRegional
    replaceRE = /^\/[a-z]{2}-\w{2}\/(.*)$/
  }

  // compute redirect path
  let redirectPath = pagePath.replace(replaceRE, replaceFormat)

  // edge cases
  // redirect from alternate language to default at root
  if (redirectLang == "") {
    redirectPath = pagePath.replace(/\/.*\/(.*)/, `/$1`) // just trim the i18n section
  }

  // insert baseURL on path
  if (baseURL != "") {
    redirectPath = redirectPath.replace(/^\/(.*)$/, `/${baseURL}$1`)
  }

  // set redirect boolean on local storage
  localStorage.setItem("isRedirected", true)
  
  // redirect if different from current path
  if (pagePath != redirectPath) {
    window.location.replace(redirectPath)
  }
}
