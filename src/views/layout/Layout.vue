<template>
    <div class="layout">
        <aside :class="isCollapse ? 'is-collapse' : 'not-collapse'" class="menu">
            <el-menu
                @open="handleOpen"
                @close="handleClose"
                @select="handleSelect"
                :collapse="isCollapse"
                :unique-opened="true"
                :router="true"
                default-active="/"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
            >
                <template v-for="router in routerMap" v-if="!router.meta.hidden">
                    <el-submenu v-if="router.children" :index="router.path">
                        <template slot="title">
                            <template v-if="router.meta.icon">
                                <i v-if="router.meta.icon.type === 'material-icons'" class="material-icons">{{ router.meta.icon.name }}</i>
                                <i v-if="router.meta.icon.type === 'element-ui'" :class="router.meta.icon.name"></i>
                            </template>
                            <span slot="title">{{ router.meta.name }}</span>
                        </template>
                        <el-menu-item
                            v-for="subRouter in router.children"
                            v-if="!subRouter.meta.hidden"
                            :key="subRouter.path"
                            :index="router.path + '/' + subRouter.path"
                        >
                            <template v-if="subRouter.meta.icon">
                                <i v-if="subRouter.meta.icon.type === 'material-icons'" class="material-icons">{{ subRouter.meta.icon.name }}</i>
                                <i v-if="subRouter.meta.icon.type === 'element-ui'" :class="subRouter.meta.icon.name"></i>
                            </template>
                            <span> {{ subRouter.meta.name }}</span>
                        </el-menu-item>
                    </el-submenu>
                    <el-menu-item v-else :index="router.path">
                        <template v-if="router.meta.icon">
                            <i v-if="router.meta.icon.type === 'material-icons'" class="material-icons">{{ router.meta.icon.name }}</i>
                            <i v-if="router.meta.icon.type === 'element-ui'" :class="router.meta.icon.name"></i>
                        </template>
                        <span>{{ router.meta.name }}</span>
                    </el-menu-item>
                </template>
            </el-menu>
        </aside>
        <div class="main">
            <header>
                <i @click="isCollapse = !isCollapse" class="material-icons">dehaze</i>
                <!--                <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">-->
                <!--                    <el-radio-button :label="false">展开</el-radio-button>-->
                <!--                    <el-radio-button :label="true">收起</el-radio-button>-->
                <!--                </el-radio-group>-->
            </header>
            <section>
                <router-view></router-view>
            </section>
        </div>
    </div>
</template>

<script>
    import { constantRouterMap } from '../../router';

    export default {
        name: 'Layout',
        data() {
            return {
                isCollapse: false,
                routerMap: constantRouterMap
            };
        },
        mounted() {
            console.log(this.$router.currentRoute);
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            handleSelect(index, indexPath) {
                console.log(index, indexPath);
            }
        }
    };
</script>

<style lang="scss" scoped>
    .layout {
        display: flex;
        flex-direction: row;
        .menu {
            &.is-collapse {
                width: 65px;
                /*transition-duration: 100ms;*/
            }
            &.not-collapse {
                width: 300px;
                /*transition-duration: 100ms;*/
            }
            i {
                font-size: 18px;
                text-align: center;
                width: 20px;
                &[class^='el-icon-'] {
                    margin-right: 0;
                }
            }
        }
        .main {
            width: 100%;
            header {
                height: 40px;
                line-height: 40px;
                background-color: lightgrey;
            }
        }
    }
</style>
