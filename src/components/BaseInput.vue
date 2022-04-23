<template>
  <div class="mb-4" :class="wrapperClass">
    <label v-if="label" class="block text-sm font-semibold text-gray-900 mb-1" :for="fieldName">{{ label }}</label>
    <div>
        <input
            v-bind="$attrs"
            :name="fieldName"
            :id="fieldName"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            class="shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent block w-full sm:text-sm border border-gray-300 rounded-md appearance-none bg-white py-2 px-3"
            :class="inputClass" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseInput',
  props: ['modelValue', 'label', 'inputClass', 'wrapperClass'],
  inheritAttrs: false,
  computed: {
      fieldName() {
        if (this.label) {
          return this.label.toLowerCase().split(' ').join('-')
        }
      }
  },
}
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

input[type=number] {
    -moz-appearance:textfield; /* Firefox */
}
</style>
