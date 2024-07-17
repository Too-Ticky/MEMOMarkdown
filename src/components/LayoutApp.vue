<script setup>

</script>


<template>
  <!--  One-Page Web-App template by using Named slot  -->
  <div class="container">
    <header class="web-app">
      <slot name="header" />
    </header>
    <main class="web-app">
      <slot name="main" />
    </main>
    <footer class="web-app">
      <slot name="footer" />
    </footer>
  </div>
</template>

<style lang="scss">
  /*  General Settings   */

  :root {
    --background: hsl(0, 0%, 95%);
    --background-preview: hsl(0, 0%, 80%);
    --background-rvs: hsl(0, 0%, 5%);
    --color: hsl(0, 0%, 13%);
    --color-rvs: hsl(0, 0%, 87%);
    --brand1: #28a44a;  
    --brand2: #fff200;
    --brand3: #0c4da2;
    --brand4: #faa61a;
    --brand-color: #fff200;
    --brand-color-rvs: #0c4da2;
    --brand-bg: #0c4da2;
    --line: #ff0000;

    @media (prefers-color-scheme: dark) {
      --background: hsl(0, 0%, 5%);
      --background-preview: hsl(0, 0%, 20%);
      --background-rvs: hsl(0, 0%, 95%);
      --color: hsl(0, 0%, 87%);
      --color-rvs: hsl(0, 0%, 13%);
      --brand1: #28a44a;  
      --brand3: #fff200;
      --brand2: #0c4da2;
      --brand4: #faa61a;
    }
    
    * {
      margin: 0;
      margin: 0;
      padding: 0;
      border: 0;
      outline: 0;
      &::before, &::after {
       box-sizing: border-box;
       text-decoration: inherit; /* Add text decoration inheritance in all browsers */
       vertical-align: inherit; /* Add vertical alignment inheritance in all browsers */
      }
    }

    html {
      font-size: 62.5%; /* In case of 1rem, It become 10px. */
      line-height: 1.5; /* Change the line height in all browsers */
      color: var(--color);
      scroll-behavior: smooth;
      background: var(--background);
      overflow-x: hidden;
      word-break: break-word;
      -webkit-font-smoothing: antialiased; /* Enable Font Smoothing in Webkit  */
      -moz-osx-font-smoothing: grayscale; /* Enable Font Smoothing in Mozilla  */ 
      -moz-tab-size: 4; tab-size: 4; /* Change the line height in all browsers */
      -webkit-tap-highlight-color: transparent; /* Remove the grey highlight on links in iOS */

      @media screen and (max-width: 767px) {
       font-size: 40%; 
      } 
    }
    body { font-size: 1.0rem;
      font-family: "Helvetica Neue",
        Arial,
        "Hiragino Kaku Gothic ProN",
        "Hiragino Sans",
        Meiryo,
        sans-serif;
      background: var(--background);
      margin: 0 1rem 0 1rem;  
    }
    h1   { font-size: 2.5rem; } 
    h2   { font-size: 2.0rem; } 
    h3   { font-size: 1.5rem; } 
    a {
      text-decoration: none;
    }
    a:hover,
    button:hover {
      cursor: pointer;
    } 
  }
</style>


<style scoped lang="scss">
/* Settings of this components */
  header.web-app {
    
    width:100%;
    height: 3rem;
    display: flex;
    align-items: center;
    vertical-align: middle;
    justify-content: space-between;
    box-sizing:content-box;
    border-bottom: solid 3px var(--line);
    margin-top:0;
    overflow: hidden;
  }
  main.web-app {
    background-color: var(--background);
    height: calc(100dvh - 7rem);
    overflow-x: hidden;
  }
  footer.web-app {
    background-color: var(--background);
    width: 100%;
    height: 3rem;
    display: flex;
    align-items: center;
    vertical-align: middle;
    justify-content: space-between;
    border-top: solid 3px var(--line);
    overflow:hidden;
  }
</style>