<template>
  <div class="mb-4">
    <label class="block text-sm font-semibold text-gray-900" :for="fieldName">{{ label }}</label>
    <div class="mt-1">
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
  props: ['modelValue', 'label', 'inputClass'],
  computed: {
      fieldName() {
          return this.label.toLowerCase().split(' ').join('-')
      }
  },
}
</script>
