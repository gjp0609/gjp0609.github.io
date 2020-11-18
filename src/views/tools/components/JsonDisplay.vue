<template>
    <div class="value">
        <template v-if="obj">
            <template v-if="isObject(obj)">
                <template v-if="isArray(obj)">
                    <div v-for="(value, key) in obj" :class="shows[key] && shows[key].type ? shows[key].type : ''" class="wrapper">
                        <div :class="(shows[key] && shows[key].isOpen ? 'open' : 'close') + ' ' + 'index-' + index" class="index">
                            <span @click="switchShow(key, value)" class="button-wrapper">
                                <span class="button">
                                    {{ shows[key] && shows[key].type === 'text' ? '&#160;' : shows[key] && shows[key].isOpen ? '-' : '+' }}
                                </span>
                                <span>{{ key }}:</span>
                            </span>
                        </div>
                        <json-display v-if="shows[key] && shows[key].isOpen" :obj="value" :index="index + 1"></json-display>
                    </div>
                </template>
                <template v-else>
                    <div v-for="(value, key) in obj" :class="shows[key] && shows[key].type ? shows[key].type : ''" class="wrapper">
                        <div :class="(shows[key] && shows[key].isOpen ? 'open' : 'close') + ' ' + 'index-' + index" class="key">
                            <span @click="switchShow(key, value)" class="button-wrapper">
                                <span class="button">
                                    {{ shows[key] && shows[key].type === 'text' ? '&#160;' : shows[key] && shows[key].isOpen ? '-' : '+' }}
                                </span>
                                <span>{{ key }}:</span>
                            </span>
                        </div>
                        <json-display v-if="shows[key] && shows[key].isOpen" :obj="value" :index="index + 1"></json-display>
                    </div>
                </template>
            </template>
            <template v-else>
                <div class="text">{{ obj }}</div>
            </template>
        </template>
    </div>
</template>

<script>
    export default {
        name: 'JsonDisplay',
        props: {
            obj: undefined,
            index: undefined
        },
        data() {
            return {
                shows: {},
                props: {}
            };
        },
        mounted() {
            console.log('>>>>>>>>', this.obj);
            console.log(this.index);
            if (this.obj && this.obj instanceof Object) {
                for (const key in this.obj) {
                    let value = this.obj[key];
                    let type = 'text';
                    if (value instanceof Object) {
                        if (value instanceof Array) {
                            type = 'array';
                        } else {
                            type = 'object';
                        }
                    }
                    this.$set(this.shows, key, { isOpen: type === 'text', type: type });
                }
            }
            console.log(this.shows);
        },
        methods: {
            isObject(obj) {
                return obj instanceof Object;
            },
            isArray(obj) {
                return obj instanceof Array;
            },
            switchShow(key, value) {
                this.shows[key].isOpen = !this.shows[key].isOpen;
            }
        }
    };
</script>

<style type="scss" scoped>
    $colors: #fc895b #45a6e7 lightseagreen #e175e9 orange;

    .value {
        display: flex;
        flex-direction: column;
        margin-left: 1rem;
        .button-wrapper {
            cursor: default;
            .button {
                width: 0.5rem;
                margin: 0 0 0 1rem;
            }
        }
        .index,
        .key {
            @for $i from 1 through length($colors) {
                &.index-#{$i} {
                    color: nth($colors, $i);
                }
            }
        }
        .key,
        .index,
        .text {
            height: 30px;
            line-height: 30px;
        }
        .text {
            display: flex;
            flex-direction: row;
        }
    }
</style>
