<template>
  <footer class="flex items-center justify-center border-t border-gray-300">
    <a
      href="https://twobeards.dev"
      target="_blank"
      rel="noopener noreferrer"
      title="A project by Two Beards"
      class="inline-block cursor-pointer opacity-75 hover:opacity-100">
      <TwoBeardsLogo />
    </a>
  </footer>
</template>

<script>
import TwoBeardsLogo from './icons/TwoBeards.vue'

export default {
  name: 'AppFooter',
  components: {
    TwoBeardsLogo,
  },
}
</script>
