<template>
  <div id="app">
    <HelloWorld :msg='helloMessage'/>
  </div>
</template>

<script lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import {Component, Vue} from 'vue-property-decorator'

@Component({
  components: {
    HelloWorld
  }
})
export default class App extends Vue {
  name: string = 'App';
  helloMessage: string = 'Phonegap + Vue.js Template App';
}
</script>

<style lang="scss">
/* Portrait layout (default) */
#app {
  height: 100%;                   /* text area height */
  width: 100%;                   /* text area width */
}

</style>
