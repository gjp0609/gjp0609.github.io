<template>
    <div class="value">
        <template v-if="computedObj">
            <template v-if="isObject(obj)">
                <template v-if="isNotEmpty(obj)">
                    <div v-for="(value, key) in obj" :class="getType(key) ? shows[key].type : ''" class="wrapper">
                        <div :class="(isOpen(key) ? 'open' : 'close') + ` index-${index} ` + (isArray(obj) ? 'index' : 'key')">
                            <span class="button-wrapper" @click="switchShow(key)">
                                <span class="button">
                                    {{ getType(key) === 'text' ? '&#160;' : isOpen(key) ? '-' : '+' }}
                                </span>
                                <span>{{ key }}:</span>
                            </span>
                        </div>
                        <json-display v-if="isOpen(key)" :obj="value" :index="index + 1" :expand="expand"></json-display>
                    </div>
                </template>
                <template v-else>
                    <div class="text" style="color: red">{{ isArray(obj) ? '[]' : '{}' }}</div>
                </template>
            </template>
            <template v-else>
                <div class="text">{{ obj }}</div>
            </template>
        </template>
        <template v-else>
            <div class="text" style="color: red; text-decoration: underline">NULL</div>
        </template>
    </div>
</template>

<script>
    export default {
        name: 'JsonDisplay',
        props: {
            obj: undefined,
            index: undefined,
            expand: undefined
        },
        data() {
            return {
                shows: {},
                props: {}
            };
        },
        computed: {
            computedObj: function () {
                console.log('computed obj, ', this.obj);
                if (this.obj && this.obj instanceof Object) {
                    for (const key in this.obj) {
                        let value = this.obj[key];
                        let type = 'text';
                        if (value instanceof Object) {
                            if (JSON.stringify(value) === '{}') {
                                type = 'text';
                            } else {
                                if (JSON.stringify(value) === '[]') {
                                    type = 'text';
                                } else {
                                    if (value instanceof Array) {
                                        type = 'array';
                                    } else {
                                        type = 'object';
                                    }
                                }
                            }
                        }
                        this.shows[key] = { isOpen: this.expand || type === 'text', type: type };
                    }
                }
                return this.obj;
            }
        },
        methods: {
            isNotEmpty(obj) {
                return JSON.stringify(obj) !== '{}' && JSON.stringify(obj) !== '[]';
            },
            isObject(obj) {
                return obj instanceof Object;
            },
            isArray(obj) {
                return obj instanceof Array;
            },
            isOpen(key) {
                return this.shows[key] && this.shows[key].isOpen;
            },
            getType(key) {
                return this.shows[key] && this.shows[key].type;
            },
            switchShow(key) {
                if (this.shows[key] && this.shows[key].type !== 'text') {
                    this.shows[key].isOpen = !this.shows[key].isOpen;
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    $colors: #fc895b #36b109 #07c4ba #45a6e7 #e175e9 #fc895b #36b109 #07c4ba #45a6e7 #e175e9 #fc895b #36b109 #07c4ba #45a6e7 #e175e9;

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
            flex-shrink: 0;
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
            min-height: 30px;
            line-height: 30px;
        }
        .text {
            display: flex;
            flex-direction: row;
        }
    }
</style>
