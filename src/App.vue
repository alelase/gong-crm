<template>
  <div id="app">
    <Header></Header>
    <router-view />
    <Footer></Footer>
  </div>
</template>

<script>
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

/*Chrome*/
.scrollable::-webkit-scrollbar-track {
  background-color: #efefef;
  width: 4px;
}

.scrollable::-webkit-scrollbar-thumb {
  background-color: silver;
  border: 1px solid transparent;
  background-clip: content-box;
}

.scrollable::-webkit-scrollbar {
  width: 8px;
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

.button-container button{
  background-color: blueviolet;
  color: white;
  transition: all linear .2s;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  padding: 4px 16px;
}

.button-container button:hover{
  background-color: darkseagreen;
  font-size: 18px;
  color: black;
}

</style>
