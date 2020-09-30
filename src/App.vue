<template>
  <div id="app">
    <header class="header">
      <div class="container">
        <router-link
                to="/"
                class="header__goBackBtn"
                title="Contacts Book"
        ></router-link>
        <h2 class="header__caption">{{ this.$route.name }}</h2>
      </div>
    </header>
    <router-view/>
  </div>
</template>

<style lang="scss">

  * {
    font-family: Arial, sans-serif;
    box-sizing: border-box;
  }

  body {
    background: $mainBodyBackground;
    margin: 0 20px;
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

  .container {
    @include contentBox;
    position: relative;
  }

  .header {
    position: relative;
    margin: 0 0 20px;
    background: $headerBackground;
    border-radius: 0 0 20px 20px;

    &__goBackBtn {
      @include btnIconsStyle;
      position: absolute;
      left: 10px;
      transform: translateY(-15%);
      background-image: url("assets/book.svg");

      &:hover {
        transform: translateY(-15%);
      }
    }

    &__caption {
      cursor: default;
      display: flex;
      margin: -5px auto;
      padding: 10px 25px;
      border-radius: 16px;
      width: fit-content;
      background: #EAEAEA;
      color: $mainBlueColor;
    }
  }
</style>
