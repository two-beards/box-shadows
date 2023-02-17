<template>
    <div class="mb-4">
        <div class="flex justify-between items-center mb-2">
            <label class="text-sm font-semibold block">{{ label }}</label>
            <div class="flex gap-1 items-center">
                <BaseInput
                    v-bind="$attrs"
                    v-model="modelValue"
                    type="number"
                    input-class="!w-14 text-center"
                    wrapper-class="!mb-0"
                />{{ unit }}
            </div>
        </div>
        <div class="relative range z-0">
            <input
                type="range"
                v-bind="$attrs"
                :max="max"
                :min="min"
                :value="modelValue"
                @input="$emit('update:modelValue', $event.target.value)"
                class="focus:outline-none"
                :list="id"
            />
        </div>
        <datalist :id="id">
            <option>{{ middle }}</option>
        </datalist>
    </div>
</template>

<script>
import BaseInput from './BaseInput.vue'
import uuid from '../uuid'

export default {
    name: 'RangeInput',
    props: ['modelValue', 'label', 'unit', 'min', 'max'],
    components: { BaseInput },
    data() {
        return {
            id: null,
        }
    },
    computed: {
        displayValue() {
            return `${this.modelValue}${this.unit}`
        },
        rangeMin() {
            return parseInt(this.min)
        },
        rangeMax() {
            return parseInt(this.max)
        },
        middle() {
            return (this.rangeMax + this.rangeMin) / 2
        },
    },
    created() {
        this.id = uuid()
    },
}
</script>

<style scoped>
/* generated using https://danielstern.ca/range.css */
.range {
    --track-bg: theme('colors.gray.200');
    --thumb-bg: theme('colors.blue.600');
}
input[type='range'] {
    width: 100%;
    margin: 6px 0;
    background-color: transparent;
    -webkit-appearance: none;
}
input[type='range']:focus {
    outline: none;
}
input[type='range']::-webkit-slider-runnable-track {
    background: var(--track-bg);
    border: 0;
    border-radius: 4px;
    width: 100%;
    height: 4.1px;
    cursor: pointer;
}
input[type='range']::-webkit-slider-thumb {
    margin-top: -5.95px;
    width: 16px;
    height: 16px;
    background: var(--thumb-bg);
    border: 1px solid var(--thumb-bg);
    border-radius: 16px;
    cursor: pointer;
    -webkit-appearance: none;
}
input[type='range']:focus::-webkit-slider-runnable-track {
    background: var(--track-bg);
}
input[type='range']::-moz-range-track {
    background: var(--track-bg);
    border: 0;
    border-radius: 4px;
    width: 100%;
    height: 4.1px;
    cursor: pointer;
}
input[type='range']::-moz-range-thumb {
    width: 16px;
    height: 16px;
    background: var(--thumb-bg);
    border: 1px solid var(--thumb-bg);
    border-radius: 16px;
    cursor: pointer;
}
input[type='range']::-ms-track {
    background: transparent;
    border-color: transparent;
    border-width: 6.95px 0;
    color: transparent;
    width: 100%;
    height: 4.1px;
    cursor: pointer;
}
input[type='range']::-ms-fill-lower {
    background: var(--track-bg);
    border: 0;
    border-radius: 8px;
}
input[type='range']::-ms-fill-upper {
    background: var(--track-bg);
    border: 0;
    border-radius: 8px;
}
input[type='range']::-ms-thumb {
    width: 16px;
    height: 16px;
    background: var(--thumb-bg);
    border: 1px solid var(--thumb-bg);
    border-radius: 16px;
    cursor: pointer;
    margin-top: 0px;
    /*Needed to keep the Edge thumb centred*/
}
input[type='range']:focus::-ms-fill-lower {
    background: var(--track-bg);
}
input[type='range']:focus::-ms-fill-upper {
    background: var(--track-bg);
}
/*TODO: Use one of the selectors from https://stackoverflow.com/a/20541859/7077589 and figure out
how to remove the virtical space around the range input in IE*/
@supports (-ms-ime-align: auto) {
    /* Pre-Chromium Edge only styles, selector taken from hhttps://stackoverflow.com/a/32202953/7077589 */
    input[type='range'] {
        margin: 0;
        /*Edge starts the margin from the thumb, not the track as other browsers do*/
    }
}
.range::after {
    background: var(--track-bg);
    content: '';
    height: 1.5rem;
    left: calc(50% - 1px);
    position: absolute;
    top: 0.3125rem;
    width: 2px;
    z-index: -1;
}
</style>
