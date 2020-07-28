<template>
  <div class="mt-6">
    <div class="flex items-center uppercase text-sm font-semibold mb-4">
      <span class="inline-block mr-2">{{ label }}</span>
      <span class="inline-block flex-1 h-px border-b border-gray-400"></span>
    </div>
    <div class="flex items-center mb-4">
      <label class="mr-6">
        <input type="checkbox" v-model="localShadow.active" /> Active
      </label>

      <label>
        <input type="checkbox" v-model="localShadow.inset" /> Inset
      </label>

      <button
        class="ml-auto text-sm text-red-600 focus:outline-none focus:shadow-outline focus:bg-red-600 focus:text-white hover:bg-red-600 hover:text-white py-1 px-3 rounded"
        @click="$emit('remove', localShadow.id)">
        Remove
      </button>
    </div>
    <RangeInput v-model="localShadow.offsetX" unit="px" label="Horizontal offset" min="-100" max="100" />
    <RangeInput v-model="localShadow.offsetY" unit="px" label="Vertical offset" min="-100" max="100" />
    <RangeInput v-model="localShadow.blur" unit="px" label="Blur radius" min="0" max="100" />
    <RangeInput v-model="localShadow.spread" unit="px" label="Spread radius" min="-100" max="100" />
    <BaseInput v-model="localShadow.color" label="Color" input-class="text-sm font-mono tracking-wide" />
  </div>
</template>

<script>
import BaseInput from './BaseInput.vue'
import RangeInput from './RangeInput.vue'
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
    RangeInput
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