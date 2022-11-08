<template>
    <div class="flex items-stretch gap-2">
        <pre
            class="p-4 font-mono text-gray-800 bg-gray-50 border border-gray-200 rounded-md overflow-x-auto relative"
        ><code class="flex-1" :class="languageClass">{{ content }}</code
        ></pre>
        <span
            v-if="showCopiedText"
            class="px-4 font-semibold text-emerald-500 text-sm font-sans inline-flex items-center flex-shrink-0"
            >Copied!</span
        >
        <button
            v-else
            @click="copyToClipboard"
            title="Copy to clipboard"
            class="bg-gray-50 text-gray-500 hover:text-blue-600 font-semibold text-sm px-3 focus:outline-none focus:ring focus:ring-blue-600 rounded-md border border-gray-200 inline-flex items-center flex-shrink-0"
        >
            <ClipboardIcon class="h-5 w-5 mr-1" /> Copy
        </button>
    </div>
</template>
<script>
import Prism from 'prismjs'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-markup'
import ClipboardIcon from './icons/Clipboard.vue'

import '../assets/prism.css'

export default {
    name: 'CodeContainer',
    components: {
        ClipboardIcon,
    },
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
    data() {
        return {
            showCopiedText: false,
        }
    },
    methods: {
        copyToClipboard() {
            navigator.clipboard.writeText(this.content).then(() => {
                this.flashCopied()
            })
        },
        flashCopied() {
            this.showCopiedText = true
            setTimeout(() => {
                this.showCopiedText = false
            }, 2000)
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
