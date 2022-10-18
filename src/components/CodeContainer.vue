<template>
    <pre
        class="p-4 mb-6 font-mono text-gray-800 bg-gray-50 border border-gray-200 rounded-md overflow-x-scroll"
    ><code :class="languageClass">{{ content }}</code></pre>
</template>

<script>
import Prism from 'prismjs'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-markup'

import '../assets/prism.css'

export default {
    name: 'CodeContainer',
    props: {
        content: {
            type: String,
            required: true,
        },
        lang: {
            type: String,
            required: true,
        },
    },
    computed: {
        languageClass() {
            return `language-${this.lang.toLowerCase()}`
        },
    },
    mounted() {
        Prism.highlightAll()
    },
    watch: {
        content(newValue) {
            if (newValue) {
                this.$nextTick(() => {
                    Prism.highlightAll()
                })
            }
        },
    },
}
</script>
