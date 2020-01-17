<template>
    <div :class="isDark ? 'dark' : 'light'" class="layout">
        <aside :class="isCollapse ? 'is-collapse' : 'not-collapse'" class="menu">
            <el-menu
                @open="handleOpen"
                @close="handleClose"
                @select="handleSelect"
                :collapse="isCollapse"
                :collapse-transition="true"
                :default-active="defaultActive"
                :router="true"
                :unique-opened="true"
                :active-text-color="themeColor.activeTextColor"
                :background-color="themeColor.backgroundColor"
                :text-color="themeColor.textColor"
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
            <div class="operations">
                <i @click="menuCollapseChange" class="material-icons">{{ isCollapse ? 'last_page' : 'first_page' }}</i>
                <i @click="isDark = !isDark" class="material-icons">{{ isDark ? 'brightness_4' : 'brightness_7' }}</i>
            </div>
        </aside>
        <div class="main">
            <header></header>
            <section>
                <router-view></router-view>
            </section>
        </div>
    </div>
</template>

<script>
    import { constantMenuRouterMap } from '../../router';

    export default {
        name: 'Layout',
        data() {
            return {
                isCollapse: localStorage.getItem('menuIsCollapse') === '1' || false,
                routerMap: constantMenuRouterMap,
                defaultActive: '/',
                isDark: false
            };
        },
        computed: {
            themeColor() {
                if (this.isDark) {
                    return {
                        activeTextColor: '#ffd04b',
                        backgroundColor: '#545c64',
                        textColor: '#ffffff'
                    };
                } else {
                    return {
                        activeTextColor: '#409eff',
                        backgroundColor: '#ffffff',
                        textColor: '#303133'
                    };
                }
            }
        },
        mounted() {
            let _this = this;
            let indexPath = '/index/home';
            if (this.$router.currentRoute.path !== indexPath) {
                _this.defaultActive = this.$router.currentRoute.path;
            }
            this.$router.beforeEach(function(to, from, next) {
                _this.defaultActive = to.path;
                if (to.path === indexPath) {
                    _this.defaultActive = '/';
                }
                next();
            });
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
            },
            menuCollapseChange() {
                this.isCollapse = !this.isCollapse;
                localStorage.setItem('menuIsCollapse', this.isCollapse ? '1' : '0');
            }
        }
    };
</script>

<style lang="scss" scoped>
    @mixin menu($isCollapse) {
    }
    @mixin layout($theme) {
        $menuBackgroundColor: null;
        $darkThemeColor: #545c64;
        $lightThemeColor: #ffffff;
        @if ($theme== 'dark') {
            $menuBackgroundColor: $darkThemeColor;
        } @else {
            $menuBackgroundColor: $lightThemeColor;
        }
        height: 100%;
        display: flex;
        flex-direction: row;
        .menu {
            $menuCollapseWidth: 65px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            background-color: $menuBackgroundColor;
            border-right: $darkThemeColor solid 1px;
            &.is-collapse {
                width: $menuCollapseWidth;
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
            .operations {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                flex-wrap: wrap;
                $height: 50px;
                @if ($theme== 'dark') {
                    background-color: lighten($menuBackgroundColor, 10%);
                } @else {
                    background-color: darken($menuBackgroundColor, 10%);
                }
                height: $height;
                line-height: $height;
                i {
                    height: $height;
                    line-height: $height;
                    vertical-align: middle;
                    text-align: center;
                    width: $menuCollapseWidth - 1px;
                }
            }
        }
        .main {
            width: 100%;
            header {
                $headerHeight: 40px;
                height: $headerHeight;
                line-height: $headerHeight;
                @if ($theme== 'dark') {
                    background-color: lighten($menuBackgroundColor, 50%);
                }
            }
        }
    }
    .layout {
        &.light {
            @include layout('light');
        }
        &.dark {
            @include layout('dark');
        }
    }
</style>
