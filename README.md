# i18n Automatic
Script to detect user language through [navigator language](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorLanguage/language) and automatically redirect page visitors to localized alternatives. A simple pattern and solution to solve a common use case and source of pain.

## Features
- Minimalistic
- Framework agnostic
- Zero dependencies
- Pure ES6 JS

## Use Cases
- Automatically select language for first time site visitors
- Alternative for Jekyll localization plugins on Github Pages
 
## How it Works
- A default and one or more localized languages to serve based on navigator language
- All routes are preffixed by language code (eg. 'https://site.com/en/about.html')

## Caveats
Automatic redirect will not work if JavaScript is disabled but visitors can manually select a language. 
