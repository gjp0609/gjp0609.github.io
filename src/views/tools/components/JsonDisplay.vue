<template>
    <div class="value">
        <template v-if="computedObj">
            <template v-if="isObject(obj)">
                <template v-if="isArray(obj)">
                    <div v-for="(value, key) in obj" :class="shows[key] && shows[key].type ? shows[key].type : ''" class="wrapper">
                        <div :class="(shows[key] && shows[key].isOpen ? 'open' : 'close') + ' ' + 'index-' + index" class="index">
                            <span @click="switchShow(key)" class="button-wrapper">
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
                            <span @click="switchShow(key)" class="button-wrapper">
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
        computed: {
            computedObj: function() {
                console.log('computed obj, ', this.obj);
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
                return this.obj;
            }
        },
        methods: {
            isObject(obj) {
                return obj instanceof Object;
            },
            isArray(obj) {
                return obj instanceof Array;
            },
            switchShow(key) {
                console.log('%%%%%%%%%', this.shows);
                if (this.shows[key]) {
                    this.shows[key].isOpen = !this.shows[key].isOpen;
                }
            }
        }
    };
</script>

<style type="scss" scoped>
    $colors: #fc895b #36b109 #45a6e7 #07c4ba #e175e9 #ffdb2d;

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
        .index {
            font-style: italic;
        }
        .index,
        .key {
            font-weight: bold;
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
