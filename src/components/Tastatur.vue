<template>
  <div :class="keyboardClass"></div>
</template>

<script>
import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";

export default {
  name: "Tastatur",
  props: {
    keyboardClass: {
      default: "simple-keyboard",
      type: String,
    },
    input: {
      type: String,
    },
  },

  data: () => ({
    keyboard: null,
  }),
  mounted() {
    this.keyboard = new Keyboard({
      onChange: this.onChange,
      onKeyPress: this.onKeyPress,
      theme: "hg-theme-default hg-layout-default myTheme",
      layout: {
        default: [
          "a b c d e f g h 1 2 3 4 5 6 7 8",
          "i j k l m n o p 9 0 + - / * = %",
          "q r s t u v w x , ; . ? ! \u00A7 ( )",
          "y z {shift} {space} @ _ : {enter} [ ] \u00E4 \u00F6 \u00FC \u00DF {shift} {bksp}",
        ],
        shift: [
          "A B C D E F G H 1 2 3 4 5 6 7 8",
          "I J K L M N O P 9 0 + - / * = %",
          "Q R S T U V W X , ; . ? ! \u00A7 ( )",
          "Y Z {shift} {space} @ _ : {enter} [ ] \u00C4 \u00D6 \u00DC \u00DF {shift} {bksp}",
        ],
      },
      buttonTheme: [
        {
          class: "sameSize",
          buttons:
            "a b c d e f g h A B C D E F G H I J K L M N O P Q R S T U V W X Y Z 1 2 3 4 5 6 7 8 i j k l m n o p 9 0 + - / * = % q r s t u v w x , ; . ? ! @ ( ) y z {shift} {space} U+0040 _ : {enter} [ ] \u00E4 \u00F6 \u00FC \u00DF \u00C4 \u00D6 \u00DC \u00A7 {shift} {bksp}",
        },
        {
          class: "atButton",
          buttons: " @ ",
        },
      ],
    });
  },
  methods: {
    onChange(input) {
      this.$emit("onChange", input);
    },
    onKeyPress(button) {
      this.$emit("onKeyPress", button);
      /**
       * If you want to handle the shift and caps lock buttons
       */
      if (button === "{shift}" || button === "{lock}") this.handleShift();
    },
    handleShift() {
      let currentLayout = this.keyboard.options.layoutName;
      let shiftToggle = currentLayout === "default" ? "shift" : "default";
      this.keyboard.setOptions({
        layoutName: shiftToggle,
      });
    },
  },
  watch: {
    input(input) {
      this.keyboard.setInput(input);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.sameSize {
  width: 0.0625%;
}
.atButton {
  max-width: 800px;
  width: 0.0625%;
}
/* let keyboard = new Keyboard({
  onChange: input => onChange(input),
  onKeyPress: button => onKeyPress(button),
  theme: "hg-theme-default hg-layout-default myTheme",
  layout: {
    default: [
      "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
      "{tab} q w e r t y u i o p [ ] \\",
      "{lock} a s d f g h j k l ; ' {enter}",
      "{shift} z x c v b n m , . / {shift}",
      ".com @ {space}"
    ],
    shift: [
      "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
      "{tab} Q W E R T Y U I O P { } |",
      '{lock} A S D F G H J K L : " {enter}',
      "{shift} Z X C V B N M < > ? {shift}",
      ".com @ {space}"
    ]
  },
  buttonTheme: [
    {
      class: "hg-red",
      buttons: "Q W E R T Y q w e r t y"
    },
    {
      class: "hg-highlight",
      buttons: "Q q"
    }
  ]
});

https://hodgef.com/simple-keyboard/editor/?d=hodgef/simple-keyboard-npm-demos/tree/uc-customization
 
 */
</style>
