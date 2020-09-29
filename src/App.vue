<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
  * {
    font-family: Arial, sans-serif;
    box-sizing: border-box;
  }

  body {
    background: #a6a6a4;
    margin: 0;
  }

  #app {
    margin: 0;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  ul {
    padding: 0 10px;
  }

  li {
    list-style: none;
  }

  .nav {
    background: #1aa6b7;
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>
