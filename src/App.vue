<template>
  <div id="app">
    <Header></Header>
    <router-view />
    <Footer></Footer>
  </div>
</template>

<script>
// import Login from "./components/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: 'App',
  components: {
    Footer,
    Header
  },
  created: function() {
    if (!this.$store.getters.isAuthenticated) {

      const path = '/login';
      if (this.$route.path !== path) this.$router.push(path);
      //this.$store.dispatch(USER_REQUEST);
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  padding: 0;
  margin: 0;
}

#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
