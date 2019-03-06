<template>
  <div class="helloworld">
    <div class="logo">
      <div class="hello">
        <h1>{{ msg }}</h1>
        <h2>Platform: {{ platform }}</h2>
        <h2>ENV: {{ env }}</h2>
      </div>
    </div>
    <div :class="`confetti-${number}`" v-for="number in 150"></div>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator';

@Component({

})

export default class App extends Vue {
  name: string = 'HelloWorld';
  @Prop() msg!: String;
  platform: string = cordova.platformId;
  env: string = process.env.NODE_ENV;
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.helloworld {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
}

.logo {
  background:url(/assets/logo.png) no-repeat center top; /* 170px x 200px */
  position:absolute;             /* position in the center of the screen */
  left:50%;
  top:50%;
  height:75px;                   /* text area height */
  width:260px;                   /* text area width */
  text-align:center;
  padding:180px 0px 0px 0px;     /* image height is 200px (bottom 20px are overlapped with text) */
  margin:-115px 0px 0px -112px;  /* offset vertical: half of image height and text area height */
                                   /* offset horizontal: half of text area width */

  /* Landscape layout (with min-width) */
  @media screen and (min-aspect-ratio: 1/1) and (min-width:400px) {
    background-position:left center;
    padding:75px 0px 75px 170px;  /* padding-top + padding-bottom + text area = image height */
    margin:-90px 0px 0px -198px;  /* offset vertical: half of image height */
                                  /* offset horizontal: half of image width and text area width */
  }
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

[class|="confetti"] {
  position: absolute;
}

$colors: (#d13447, #ffbf00, #263672);

@for $i from 0 through 150 {
  $w: random(8);
  $l: random(100);
  .confetti-#{$i} {
    width: #{$w}px;
    height:#{$w*0.4}px;
    background-color: nth($colors, random(3));
    top: -10%;
    left: unquote($l+"%");
    opacity: random() + 0.5;
    transform: rotate(#{random()*360}deg);
    animation: drop-#{$i} unquote(4+random()+"s") unquote(random()+"s") infinite;
  }

  @keyframes drop-#{$i} {
    100% {
      top: 110%;
      left: unquote($l+random(15)+"%");
    }
  }
}
</style>
