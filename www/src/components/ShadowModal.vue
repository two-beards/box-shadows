<template>
  <div class="fixed inset-0 z-10 flex justify-center items-center">
    <button class="absolute z-10 inset-0 h-screen w-screen bg-gray-800 opacity-25 focus:outline-none" @click="close"></button>
    <div class="modal bg-white rounded-lg shadow-lg px-12 py-8 z-20 flex flex-col">
      <h2 class="text-2xl font-bold">Generated styles</h2>
      <pre class="mt-6 flex-1 bg-gray-100 rounded p-6 text-lg font-mono leading-normal overflow-auto">{{ shadowCode }}</pre>
      <footer class="pt-4 flex justify-end">
        <button
          @click="close"
          class="px-4 py-2 text-base text-blue-600 bg-transparent rounded hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white focus:shadow-outline focus:outline-none">
          Close
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import getShadowStyles from '../getShadowStyles'

export default {
  name: 'ShadowModal',
  props: {
    shadows: {
      type: Array,
      required: true
    },
  },
  computed: {
    shadowCode() {
      if (this.shadows.length === 0) return 'Please apply at least one active shadow'
      return getShadowStyles(this.shadows)
    }
  },
  mounted() {
    window.addEventListener('keydown', this.handleKeydown)
  },
  destroyed() {
    window.removeEventListener('keydown', this.handleKeydown)
  },
  methods: {
    handleKeydown(e) {
      if (e.code === 'Escape') {
        this.close()
      }
    },
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.modal {
  width: 50vw;
  height: 50vh;
}
</style>
