<template>
  <div class="grid layout h-screen">
    <header class="border-b border-gray-300 py-4 text-xl px-6 font-semibold">
      Box Shadows
    </header>
    <section class="sidebar sidebar-left border-r border-gray-300 overflow-hidden">
      <div class="h-full p-4 overflow-auto">
        <h2 class="font-bold text-lg">Customize Shadows</h2>
        <ShadowForm
          v-for="(shadow, index) in shadows"
          :key="shadow.id"
          :label="`Shadow ${index + 1}`"
          :shadow="shadow"
          @update="updateShadow"
          @remove="removeShadow" />
        <button
          class="mt-6 py-2 text-center text-base w-1/2 block mx-auto rounded text-blue-500 focus:outline-none focus:shadow-outline focus:bg-blue-500 focus:text-white hover:bg-blue-500 hover:text-white"
          @click="addShadow">
          Add a shadow
        </button>
      </div>
    </section>
    <main class="flex justify-center items-center bg-gray-100 p-4">
      <div :style="boxStyles"></div>
    </main>
    <section class="sidebar sidebar-right border-l border-gray-300 p-4">
      <h2 class="font-bold text-lg mb-6">Box Properties</h2>
      <BaseInput v-model="backgroundColor" label="Background color" input-class="text-sm font-mono tracking-wide" />
      <RangeInput v-model="borderRadius" unit="rem" label="Border radius" min="0" max="50" />
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
import uuid from './uuid'

export default {
  name: 'App',
  components: {
    AppFooter,
    BaseInput,
    RangeInput,
    ShadowForm
  },
  data() {
    return {
      backgroundColor: '#fff',
      borderRadius: 2,
      shadows: [],
      boxHeight: 20,
      boxWidth: 20
    }
  },
  computed: {
    boxStyles() {
      let styles = `background-color: ${this.backgroundColor}; border-radius: ${this.borderRadius}rem; height: ${this.boxHeight}rem; width: ${this.boxWidth}rem`
      if (this.shadows.length) {
        let shadowStyles = this.shadows.filter(s => s.active).map(s => {
          let style = s.inset ? 'inset ' : ''
          style += `${s.offsetX}px ${s.offsetY}px ${s.blur}px ${s.spread}px ${s.color}`
          return style
        }).join(',')
  
        styles += `; box-shadow: ${shadowStyles}`
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
