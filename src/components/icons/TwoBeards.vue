<template>
    <svg
        id="logo"
        :height="size"
        viewBox="0 0 55 79"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g clip-path="url(#prefix__clip0)" fill="#42484C">
            <path
                d="M28.278 18.804h21.698l4.267-4.303V4.303L49.976 0h-9.573v6.892h6.581l1.436 1.434v2.152l-1.436 1.434H31.43l-1.436-1.434V4.303L25.726 0H0v38.126l4.268 4.302h18.865l4.108-4.143-.438-.398.438.398.16-.16 4.268 4.303h18.307l4.267-4.302V22.19H5.863V6.852h16.712l1.436 1.434v6.175l4.267 4.343zm2.154 10.278H48.58v5.02l-1.436 1.434H31.828l-1.436-1.434v-5.02h.04zm-5.743 5.02l-1.436 1.434H7.299l-1.436-1.434v-5.02H24.73v5.02h-.04zM6.302 22.19h.279-.28z"
            />
            <path
                d="M30.83 44.58l-3.43-3.427-3.39 3.387H3.43L0 41.114C.08 47.328.359 54.1.359 54.1l6.102 11.473 1.995-1.035c2.911 3.625 8.535 10.159 8.535 10.159l.997-1.714s8.655 5.657 9.293 6.016c.638-.359 9.293-6.016 9.293-6.016l.997 1.714s5.624-6.534 8.536-10.16l1.994 1.036 6.102-11.473s.16-6.773.2-12.987l-3.43 3.466H30.83zm-13.36 8.206V49.36h19.902v3.426H17.47z"
            />
        </g>
        <path
            id="tb-tongue"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M37 52.25H17.834v6.391c0 5.383 4.29 9.747 9.583 9.747 5.292 0 9.583-4.364 9.583-9.747V52.25z"
            fill="url(#prefix__paint0_linear)"
        />
        <defs>
            <linearGradient
                id="prefix__paint0_linear"
                x1="27.428"
                y1="68.905"
                x2="27.454"
                y2="34.562"
                gradientUnits="userSpaceOnUse"
            >
                <stop stop-color="#C66AE7" />
                <stop offset=".424" stop-color="#2ECCC3" />
                <stop offset="1" stop-color="#6FCF97" />
            </linearGradient>
            <clipPath id="prefix__clip0">
                <path fill="#fff" d="M0 0h54.283v79H0z" />
            </clipPath>
        </defs>
    </svg>
</template>

<script>
export default {
    name: 'TwoBeards',
    props: {
        size: {
            type: Number,
            default: 32,
        },
    },
}
</script>

<style scoped>
#tb-tongue {
    transform: translateY(-13.5%) rotate3d(1, 0, 0, 90deg);
    transform-origin: center 80%;
    transition: transform 0.25s;
}
#logo:hover #tb-tongue {
    transform: translateY(0) rotate3d(1, 0, 0, 0deg);
}
</style>
