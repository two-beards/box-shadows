<template>
  <div class="mt-6">
    <div class="flex items-center uppercase text-sm font-semibold mb-4">
      <span class="inline-block mr-2">{{ label }}</span>
      <span class="inline-block flex-1 h-px border-b border-gray-400"></span>
    </div>
    <label class="block mb-4">
      <input type="checkbox" v-model="localShadow.active" /> Active?
    </label>

    <label class="block mb-4">
      <input type="checkbox" v-model="localShadow.inset" /> Inset?
    </label>

    <BaseInput v-model="localShadow.offsetX" label="Horizontal offset" />
    <BaseInput v-model="localShadow.offsetY" label="Vertical offset" />
    <BaseInput v-model="localShadow.blur" label="Blur radius" />
    <BaseInput v-model="localShadow.spread" label="Spread radius" />
    <BaseInput v-model="localShadow.color" label="Color" />

    <div class="py-3 border-t border-b border-gray-200 flex justify-center items-center">
      <button
        class="text-red-600 focus:outline-none focus:shadow-outline focus:bg-red-600 focus:text-white hover:bg-red-600 hover:text-white py-2 px-6 rounded"
        @click="$emit('remove', localShadow.id)">
        Remove
      </button>
    </div>
  </div>
</template>

<script>
import BaseInput from './BaseInput.vue'
import klona from 'klona'

export default {
  name: 'ShadowForm',
  props: {
    label: {
      type: String,
      default: '',
    },
    shadow: {
      type: Object,
      required: true
    }
  },
  components: {
    BaseInput,
  },
  data() {
    return {
      localShadow: null
    }
  },
  created() {
    this.localShadow = klona(this.shadow)
    this.$watch('localShadow', (newValue, oldValue) => {
      if (oldValue !== null) {
        this.$emit('update', newValue)
      }
    }, { deep: true })
  },
}
</script>