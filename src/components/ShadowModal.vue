<template>
  <Dialog :open="isOpen" @close="close" class="fixed w-screen h-screen z-50">
    <DialogOverlay class="h-screen w-screen fixed top-0 left-0 bg-gray-600 bg-opacity-50 z-10" />
    <div class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-2xl p-8 bg-white rounded-lg shadow-lg z-20">
        <DialogTitle class="text-3xl mb-6 font-bold">Generated Styles</DialogTitle>
        <DialogDescription class="mb-4">
        This is the CSS needed to generate the box shadows you see in the app.
        </DialogDescription>

        <CodeContainer v-if="shadows.length" :content="shadowCode" lang="css" />
        <p v-else>Please apply at least one active shadow</p>
        <footer class="flex justify-end mt-12">
            <button class="bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-offset-2 rounded px-4 py-2" @click="close">Close</button>
        </footer>
    </div>
  </Dialog>
</template>

<script>
import getShadowStyles from "../getShadowStyles";
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  DialogDescription,
} from "@headlessui/vue";
import CodeContainer from "./CodeContainer.vue";

export default {
  name: "ShadowModal",
  components: {
    CodeContainer,
    Dialog,
    DialogOverlay,
    DialogTitle,
    DialogDescription,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    shadows: {
      type: Array,
      required: true,
    },
  },
  computed: {
    shadowCode() {
      if (this.shadows.length === 0) return "";
      return getShadowStyles(this.shadows);
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>
