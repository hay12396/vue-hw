

<template>
  <div class="wrapper">
    <div contenteditable="true" @input="valueChanged" />
    <div class="suggestion" />
  </div>
</template>

<script>

export default {
  name: "Main",
  props: {},
  setup() {
    const valueChanged = v => {
      console.log(v.target.value);
    };

    return { valueChanged };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
  --padding: 1rem;
  position: relative;
  text-align: left;
  border: 1px solid black;
  padding: var(--padding);
}

textarea {
  padding: 0;
  line-height: 1;
  font-size: 1rem;
}

.suggestion {
  opacity: 0.5;
  position: absolute;
  top: calc(var(--padding) + 0.4rem);
  left: var(--padding);
  background-color: red;
  width: 100px;
  height: 10px;
}
</style>
