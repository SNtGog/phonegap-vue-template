<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import {Component, Vue, Watch} from 'vue-property-decorator'

@Component({
  components: {
    HelloWorld
  }
})
export default class App extends Vue {
  name: string = 'App';
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
