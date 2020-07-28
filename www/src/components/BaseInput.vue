<template>
  <div class="mb-4">
    <label class="mb-2 text-sm font-semibold block">{{ label }}</label>
    <input
      v-bind="$attrs"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="w-full rounded text-base leading-6 px-2 h-10 placeholder-gray-500 border border-gray-400 hover:border-gray-500 focus:border-blue-400 focus:outline-none focus:shadow-outline" />
  </div>
</template>

<script>
export default {
  name: 'BaseInput',
  props: ['modelValue', 'label'],
}
</script>