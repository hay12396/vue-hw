

<template>
  <div class="wrapper">
    <div id="content-editable" contenteditable="true" />
    <div id="suggestions" class="suggestions" ref="suggestionsDiv" />
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
import SuggestionService from "../service/SuggestionService";

export default {
  name: "Main",
  props: {},
  setup() {
    const suggestionsDiv = ref(null);

    const getEditableDiv = () => {
      return document.getElementById("content-editable");
    };

    const valueChanged = e => {
      const value = e.target.innerHTML;
      const suggestion = SuggestionService.getSuggestionsFor(value);
      if (suggestion) {
        suggestionsDiv.value.innerHTML = suggestion;
      } else {
        suggestionsDiv.value.innerHTML = "";
      }
    };

    const refocus = () => {
      const editable = getEditableDiv();
      editable.focus();
    };

    const buttonClicked = e => {
      if (e.key === "Tab") {
        e.preventDefault();
        const editable = getEditableDiv();
        editable.innerHTML = suggestionsDiv.value.innerHTML;
        placeCaretAtEnd(editable);
        suggestionsDiv.value.innerHTML = "";
      }
    };

    const placeCaretAtEnd = el => {
      el.focus();
      if (
        typeof window.getSelection != "undefined" &&
        typeof document.createRange != "undefined"
      ) {
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      } else if (typeof document.body.createTextRange != "undefined") {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
      }
    };

    onMounted(() => {
      suggestionsDiv.value.addEventListener("click", refocus);

      const editable = getEditableDiv();
      editable.addEventListener("input", valueChanged);
      editable.addEventListener("keydown", buttonClicked);

      const editableLocation = editable.getBoundingClientRect();
      suggestionsDiv.value.style.left = editableLocation.left + "px";
      suggestionsDiv.value.style.top = editableLocation.top + "px";
      suggestionsDiv.value.style.height = editableLocation.height + "px";
      suggestionsDiv.value.style.fontWeight = editable.style.fontWeight;
      suggestionsDiv.value.style.fontSize = editable.style.fontSize;
    });

    onBeforeUnmount(() => {
      suggestionsDiv.value.removeEventListener("click", refocus);
      const editable = getEditableDiv();
      editable.removeEventListener("input", valueChanged);
      editable.removeEventListener("keydown", buttonClicked);
    });

    return { suggestionsDiv };
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

.suggestions {
  opacity: 0.5;
  position: fixed;
  top: calc(var(--padding) + 0.4rem);
  left: var(--padding);
  user-select: none;
}
</style>
