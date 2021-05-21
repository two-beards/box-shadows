<template>
    <Disclosure as="div" v-slot="{ open }" class="mt-2 p-2">
      <DisclosureButton class="py-2 flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 hover:bg-blue-100 hover:text-blue-700 focus:bg-blue-100 focus:text-blue-700 rounded-lg px-2 w-full">
        <span class="font-bold">{{ label }}</span>
        <ChevronIcon class="w-5 h-5" :class="open ? '' : 'transform -rotate-90'" />
      </DisclosureButton>
      <DisclosurePanel>
          <div class="px-4 mt-2 -mx-2 bg-gray-50 shadow-inner pt-6 border border-l-0 border-r-0 border-gray-300">
        <div class="flex items-center mb-4">
            <label class="mr-6 flex items-center h-5">
              <input type="checkbox" class="focus:ring-blue-600 h-4 w-4 text-blue-600 border-gray-300 rounded mr-2" v-model="localShadow.active" /> Active
            </label>

            <label class="flex items-center h-5">
              <input type="checkbox" class="focus:ring-blue-600 h-4 w-4 text-blue-600 border-gray-300 rounded mr-2" v-model="localShadow.inset" /> Inset
            </label>

            <button
              class="ml-auto text-sm bg-red-600 focus:outline-none focus:ring-red-600 focus:ring-opacity-50 focus:ring-offset-2 focus:ring-4 text-white hover:bg-red-700 py-1 px-3 rounded"
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
      </DisclosurePanel>
    </Disclosure>

</template>

<script>
import BaseInput from './BaseInput.vue'
import RangeInput from './RangeInput.vue'
import klona from 'klona'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/vue'
import ChevronIcon from './icons/Chevron.vue'

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
    ChevronIcon,
    RangeInput,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
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
