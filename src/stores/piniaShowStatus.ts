import { defineStore } from "pinia";

/** 
 * @module showStatus - The Managiment of params related to display conditions
 * 
 * @param {boolean} showHamburgerBtn - To show Hamburger Menu Button  // In use
 * @param {boolean} showHamburgerIcon - To show Open Menu Icon (hamburger) // In use
 * @param {boolean} showXCloseIcon - To show Close Menu Icon (x) // In use
 * @param {boolean} showChevronsRight - To show Open or Close Menu Icon (chevron>>) //unused
 * @param {boolean} showChevronsLeft - To show Close or Open Mwnu Icon(chevron<<) //unused
 * 
 * @param {boolean} showNav - To shhoow Navigation Menu //In use
 * 
 * @param {boolean} showAccountBtn - To show User Account Button // In use
 * @param {boolean} showAccountIcon - To show User Account Icon // Unused
 * @param {boolean} showAccountMenu - To show User Account Menu // In use
 * 
 * @param {boolean} showCmd - To show Cmd // In use
 * @param {boolean} showCmdIcon - To show MenuIcon in the Cmd // In use
 * @param {boolean} showCmdText - To show MenuText in the Cmd // In use
 * 
 * @param {boolean} langEn - To select the language(English)  //In use
 * @param {boolean} langJa - To select the language(Japanese)  //In use
 * 
*/

export const useStoreShowStatus = defineStore('showStatus',{
  state: () => ({
    
    /* Hamburger Menu Button Controll */
    showHamburgerBtn: true, // In use
    showHamburgerIcon: true, // In use
    showXCloseIcon: false, // In use
    showChevronsRight: true,  //unused
    showChevronsLeft: true, //unused
    
    /* Navigation Menu Controll */
    showNav: true, // In use

    /* Account Menu Controll */
    showAccountBtn: true, // In use
    showAccountIcon: true, // Unsed
    showAccountMenu: false, // In use
    
    /* Cmd Menu Controll */
    showCmd: true, // In use
    showCmdCont: false,  // Unsed
    showCmdIcon: true, // In use
    showCmdText: true, // In use

    /* Menu Controll */
    showMenu: true, // In use
    showMenuCont: false, // In use
    showMenuIcon: true,  // Unsed
    showMenuText: true,  // Unsed

    /* language */
    langEn: false, // In use
    langJa: true, // In use

    /* Responsive Layout */
    windowWidth: 480,     // In use
    fontSize: 10,         // In use
    editAreaWidth: 430,   // In use
    CmdWidth: 50,     // In use
    thresholdSmall: 480,  // In use
    thresholdLarge: 1024,
    dispSmall: true,      /* Mobile mainly */   // In use
    dispMiddle: false,    /* Tablet mainly */
    dispLarge: false,     /* PC mainly */

    /* Vue3-carusel Param */
    itemsToShow: 5,   // In use
    itemsWidth: 100,  // In use
    
  }),
  getters: {  
  },
  actions: {
    resetWithPageInSignIn() { // In Use
      this.showNav = true;
      this.showHamburgerBtn = true; 
      this.showAccountBtn = true;
    },
    resetWithPageInNotSignIn() { // In Use
      this.showNav = false;
      this.showHamburgerBtn = false; 
      this.showAccountBtn = false;
    },
    resetWithPageMEMO() {
      this.showHamburgerBtn = true;
      this.showAccountBtn = true;
      this.showCmd = true;
      this.showCmdIcon = true;
      this.showCmdText = false;
      this.showNav = true;
      this.showHamburgerIcon = !this.showCmdText;
      this.showXCloseIcon = this.showCmdText;
      this.showMenu = false;
    },
    resetWithPageAgree() {  
      this.showHamburgerBtn = false;
    },
    switchHambergerBtnShow() { // unused
      this.showHamburgerBtn = !this.showHamburgerBtn;
    },
    switchHamburgerIcon() { // In use
      this.showHamburgerIcon = !this.showHamburgerIcon;
      this.showXCloseIcon = !this.showXCloseIcon;
    },
    switchAccoutBtnShow() { // Unused
      this.showAccountBtn = !this.showAccountBtn;
    },
    switchAccoutIconShow() { // Unused
      this.showAccountIcon = !this.showAccountIcon;
    },
    switchAccountMenuShow() { // In use
      this.showAccountMenu = !this.showAccountMenu;
    },
    switchCmdShow() {
      this.showCmdCont = !this.showCmdCont;
    },
    switchCmdIconShow() {
      this.showCmdIcon = !this.showCmdIcon;
    },
    switchCmdTxtShow() { // In use
      this.showCmdText = !this.showCmdText;
    },
    switchMenuShow() {
      this.showMenu = !this.showMenu;
    },
    swithchNavShow(){
      this.showNav = !this.showNav;
    },
    switchLang() {
      this.langEn = !this.langEn;
      this.langJa = !this.langJa;
    },
    layoutBreakPoint() {
      if(this.windowWidth <= this.thresholdSmall) {
        this.dispSmall =  true; //
        this.dispMiddle = false;
        this.dispLarge =  false;
      } else if (this.windowWidth >= this.thresholdLarge) {
        this.dispSmall =  false;
        this.dispMiddle = false;
        this.dispLarge =  true; //
      } else {
        this.dispSmall =  false;
        this.dispMiddle = true; //
        this.dispLarge =  false;
      }
    },
  }
})
