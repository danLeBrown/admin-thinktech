export default class ThemeChanger {
  /**
   * @constructor
   */
  //   constructor() {}

  _addDarkTheme() {
    document.getElementsByTagName('html')[0].setAttribute('theme', 'dark-mode')
    // const darkThemeLinkEl = document.createElement('link')
    // darkThemeLinkEl.setAttribute('rel', 'stylesheet')
    // darkThemeLinkEl.setAttribute('href', 'http://localhost:8080/assets/css/dark.css')
    // darkThemeLinkEl.setAttribute('id', 'dark-theme-style')
    // const docHead = document.querySelector('head')
    // docHead.append(darkThemeLinkEl)
  }

  _removeDarkTheme() {
    document.getElementsByTagName('html')[0].removeAtrribute('theme')

    // const darkThemeLinkEl = document.querySelector('#dark-theme-style')
    // const parentNode = darkThemeLinkEl.parentNode
    // parentNode.removeChild(darkThemeLinkEl)
  }

  _darkThemeSwitch() {
    const darkThemeLinkEl = document.querySelector('#dark-theme-style')
    if (!darkThemeLinkEl) {
      this._addDarkTheme()
    } else {
      this._removeDarkTheme()
    }
  }
}
