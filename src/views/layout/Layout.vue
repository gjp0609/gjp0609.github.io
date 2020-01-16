<template>
    <div class="layout">
        <aside :class="isCollapse ? 'is-collapse' : 'not-collapse'" class="menu">
            <el-menu
                @open="handleOpen"
                @close="handleClose"
                @select="handleSelect"
                :collapse="isCollapse"
                :collapse-transition="true"
                :router="true"
                :unique-opened="true"
                active-text-color="#ffd04b"
                background-color="#545c64"
                text-color="#ffffff"
                default-active="/"
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
                <div class="collapse-button-wrapper">
                    <i @click="isCollapse = !isCollapse" class="material-icons">{{ isCollapse ? 'last_page' : 'first_page' }}</i>
                </div>
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
    $backgroundColor: #545c64;
    .layout {
        height: 100%;
        display: flex;
        flex-direction: row;
        .menu {
            background-color: $backgroundColor;
            &.is-collapse {
                width: 65px;
                transition-duration: 300ms;
            }
            &.not-collapse {
                width: 300px;
                transition-duration: 300ms;
            }
            .el-menu {
                border: none;
                i {
                    &.material-icons {
                        /* 与 el-icon 保持一致 */
                        vertical-align: middle;
                        margin-right: 5px;
                        width: 24px;
                        text-align: center;
                        font-size: 18px;
                    }
                }
            }
        }
        .main {
            width: 100%;
            header {
                $headerHeight: 40px;
                height: $headerHeight;
                line-height: $headerHeight;
                background-color: lighten($backgroundColor, 50%);
                .collapse-button-wrapper {
                    height: $headerHeight;
                    line-height: $headerHeight;
                    i {
                        vertical-align: middle;
                        margin-left: $headerHeight/4;
                    }
                }
            }
        }
    }
</style>
