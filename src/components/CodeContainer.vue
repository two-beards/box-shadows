<template>
    <pre
      class="p-4 mb-6 font-mono text-gray-800 bg-gray-50 border border-gray-200 rounded-md overflow-x-scroll relative flex items-center"
    ><code class="flex-1" :class="languageClass">{{ content }}</code>
        <span v-if="showCopiedText" class="bg-gray-50 px-4 font-semibold text-emerald-500 text-sm font-sans absolute right-0">Copied!</span>
        <button v-else @click="copyToClipboard" title="Copy to clipboard" class="bg-gray-50 text-gray-500 hover:text-blue-600 p-2 focus:outline-none focus:ring focus:ring-blue-600 rounded absolute right-1 inline-flex">
          <ClipboardIcon class="h-5 w-5" /> copy
        </button
        ></pre>
</template>
<script>
import Prism from "prismjs";
import "prismjs/components/prism-css";
import "prismjs/components/prism-markup";
import ClipboardIcon from "./icons/Clipboard.vue";

import "../assets/prism.css";

export default {
  name: "CodeContainer",
  components: {
    ClipboardIcon
  },
  props: {
    content: {
      type: String,
      required: true,
    },
    lang: {
      type: String,
      required: true,
    },
  },
    data() {
        return {
            showCopiedText: false
        }
    },
  computed: {
    languageClass() {
      return `language-${this.lang.toLowerCase()}`;
    },
  },
  mounted() {
    Prism.highlightAll();
  },
  methods: {
    copyToClipboard() {
      navigator.clipboard.writeText(this.content).then(() => { this.flashCopied() });
    },
        flashCopied() {
            this.showCopiedText = true
            setTimeout(() => {
                this.showCopiedText = false
            }, 2000)
        }
  },
  watch: {
    content(newValue) {
      if (newValue) {
        this.$nextTick(() => {
          Prism.highlightAll();
        });
      }
    },
  },
};
</script>
