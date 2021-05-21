<template>
  <div class="grid layout h-screen">
    <header class="border-b border-gray-300 py-4 text-xl px-6 font-semibold flex items-center justify-between">
      <span>Box Shadows</span>
      <div class="flex items-center">
        <a
            href="https://github.com/two-beards/box-shadows/"
            target="_blank"
            rel="noreferrer noopener"
            title="View on GitHub"
            class="no-underline rounded text-gray-500 hover:text-gray-900 inline-block mr-4 w-6 h-6 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-blue-600 focus:ring-opacity-40">
            <GitHubIcon />
        </a>
        <button
        class="ml-4 px-3 py-1 text-base text-white bg-blue-600 rounded focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 focus:outline-none"
            @click="viewShadowCode = true">Show code</button>
      </div>
    </header>
    <section class="sidebar sidebar-left border-r border-gray-300 overflow-hidden">
      <div class="h-full overflow-auto">
          <div class="flex items-center justify-between p-4">
                <h2 class="font-bold text-lg">Customize Shadows</h2>
                <button
                  class="py-1 px-3 text-center text-sm rounded bg-blue-600 focus:outline-none focus:ring-4 focus:ring-offset-2 hover:bg-blue-700 text-white"
                  @click="addShadow">
                  Add a shadow
                </button>
          </div>
            <ShadowForm
                v-for="(shadow, index) in shadows"
                :key="shadow.id"
                :label="`Shadow ${index + 1}`"
                :shadow="shadow"
                @update="updateShadow"
                @remove="removeShadow" />
      </div>
    </section>
    <main class="flex justify-center items-center bg-gray-100 p-4">
      <div :style="boxStyles" class="p-4 border"></div>
      <ShadowModal
        :isOpen="viewShadowCode"
        :shadows="shadows"
        @close="viewShadowCode = false" />
    </main>
    <section class="sidebar sidebar-right border-l border-gray-300 p-4">
      <h2 class="font-bold text-lg mb-6">Box Properties</h2>
      <BaseInput v-model="backgroundColor" label="Background color" input-class="text-sm font-mono tracking-wide" />
      <BaseInput v-model="borderColor" label="Border color" input-class="text-sm font-mono tracking-wide" />
      <RangeInput v-model="borderRadius" unit="rem" label="Border radius" min="0" max="25" />
      <RangeInput v-model="boxHeight" unit="rem" label="Height" min="0" max="50" />
      <RangeInput v-model="boxWidth" unit="rem" label="Width" min="0" max="50" />
    </section>
    <AppFooter class="footer" />
  </div>
</template>

<script>
import AppFooter from './components/AppFooter.vue'
import BaseInput from './components/BaseInput.vue'
import RangeInput from './components/RangeInput.vue'
import ShadowForm from './components/ShadowForm.vue'
import ShadowModal from './components/ShadowModal.vue'
import uuid from './uuid'
import getShadowStyles from './getShadowStyles'
import GitHubIcon from './components/icons/GitHub.vue'

export default {
  name: 'App',
  components: {
    AppFooter,
    BaseInput,
    RangeInput,
    ShadowForm,
    ShadowModal,
    GitHubIcon,
  },
  data() {
    return {
      backgroundColor: '#fff',
      borderRadius: 2,
      borderColor: 'transparent',
      shadows: [],
      boxHeight: 20,
      boxWidth: 20,
      viewShadowCode: false
    }
  },
  computed: {
    boxStyles() {
      let styles = `background-color: ${this.backgroundColor}; border-color: ${this.borderColor}; border-radius: ${this.borderRadius}rem; height: ${this.boxHeight}rem; width: ${this.boxWidth}rem;`
      if (this.shadows.length) {
        styles += getShadowStyles(this.shadows)
      }

      return styles
    }
  },
  methods: {
    addShadow() {
      const shadow = {
        id: uuid(),
        active: true,
        inset: false,
        offsetX: 0,
        offsetY: 10,
        blur: 15,
        spread: -3,
        color: 'rgba(0,0,0,0.1)'
      }

      this.shadows = [...this.shadows, shadow]
    },
    updateShadow(updated) {
      this.shadows = this.shadows.map(s => {
        if (s.id === updated.id) {
          return updated
        }
        return s
      })
    },
    removeShadow(id) {
      this.shadows = this.shadows.filter(s => s.id !== id)
    }
  },
  created() {
    this.addShadow()
  },
  mounted() {
    const { timeZone, locale } = Intl.DateTimeFormat().resolvedOptions()
    fetch('/api/pageview', {
      method: 'POST',
      body: JSON.stringify({ timeZone, locale }),
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
</script>

<style scoped>
.layout {
  grid-template-columns: 25rem 1fr 25rem;
  grid-template-rows: 4rem 1fr 4rem;
}

header {
  grid-column: 1 / 4;
  grid-row: 1 / 2;
}

.sidebar {
  grid-column-end: span 1;
  grid-row: 2 / 3;
}

.sidebar-left {
  grid-column-start: 1;
}

.sidebar-right {
  grid-column-start: 3;
}

.footer {
  grid-column: 1 / 4;
  grid-row: 3 / 4;
}
</style>
