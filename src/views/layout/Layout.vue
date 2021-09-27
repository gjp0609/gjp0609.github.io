<template>
    <div :class="isDark ? 'dark' : 'light'" class="layout">
        <aside :class="isCollapse ? 'is-collapse' : 'not-collapse'" class="menu">
            <el-menu
                :mode="isMobile ? 'horizontal' : 'vertical'"
                :collapse="isCollapse"
                :collapse-transition="true"
                :default-active="defaultActive"
                :router="true"
                :unique-opened="true"
                :active-text-color="themeColor.activeTextColor"
                :background-color="themeColor.backgroundColor"
                :text-color="themeColor.textColor"
            >
                <template v-for="router in routerMap">
                    <template v-if="!router.meta.hidden">
                        <el-submenu v-if="router.children" :index="router.realPath">
                            <template #title>
                                <template v-if="router.meta.icon">
                                    <i v-if="router.meta.icon.type === 'material-icons'" class="material-icons">{{ router.meta.icon.name }}</i>
                                    <i v-if="router.meta.icon.type === 'element-ui'" :class="router.meta.icon.name"></i>
                                    <component :is="router.meta.icon.name" v-if="router.meta.icon.type === 'element-plus'" />
                                </template>
                                <span>{{ router.meta.name }}</span>
                            </template>
                            <el-menu-item
                                v-for="subRouter in router.children"
                                :key="subRouter.realPath"
                                :index="router.realPath + '/' + subRouter.realPath"
                            >
                                <template v-if="!subRouter.meta.hidden">
                                    <template v-if="subRouter.meta.icon">
                                        <i v-if="subRouter.meta.icon.type === 'material-icons'" class="material-icons">
                                            {{ subRouter.meta.icon.name }}
                                        </i>
                                        <i v-if="subRouter.meta.icon.type === 'element-ui'" :class="subRouter.meta.icon.name"></i>
                                        <component :is="subRouter.meta.icon.name" v-if="subRouter.meta.icon.type === 'element-plus'" />
                                    </template>
                                    <span> {{ subRouter.meta.name }}</span>
                                </template>
                            </el-menu-item>
                        </el-submenu>
                        <el-menu-item v-else :index="router.realPath">
                            <template v-if="router.meta.icon">
                                <i v-if="router.meta.icon.type === 'material-icons'" class="material-icons">{{ router.meta.icon.name }}</i>
                                <i v-if="router.meta.icon.type === 'element-ui'" :class="router.meta.icon.name"></i>
                                <component :is="router.meta.icon.name" v-if="router.meta.icon.type === 'element-plus'" />
                            </template>
                            <span>{{ router.meta.name }}</span>
                        </el-menu-item>
                    </template>
                </template>
            </el-menu>
            <div v-if="!isMobile" class="operations">
                <i class="material-icons" @click="menuCollapseChange">{{ isCollapse ? 'last_page' : 'first_page' }}</i>
                <i class="material-icons" @click="handleThemeChange">{{ isDark ? 'brightness_4' : 'brightness_7' }}</i>
            </div>
        </aside>
        <div class="main">
            <header v-if="!isMobile">
                <span>OnySakura.fun</span>
                <pre class="time" @click="copy">{{ time }}</pre>
            </header>
            <section>
                <router-view></router-view>
            </section>
        </div>
    </div>
</template>

<script>
    import { constantMenuRouterMap } from '../../router/index';
    import moment from 'moment';

    export default {
        name: 'Layout',
        data() {
            return {
                screenWidth: document.body.clientWidth,
                isCollapse: localStorage.getItem('menuIsCollapse') === '1' || false,
                routerMap: constantMenuRouterMap,
                defaultActive: '/',
                isDark: localStorage.getItem('themeIsDark') === '1' || false,
                time: ''
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
                        activeTextColor: '#3685d6',
                        backgroundColor: '#dddddd',
                        textColor: '#000000'
                    };
                }
            },
            isMobile() {
                return this.screenWidth < 1024;
            }
        },
        mounted() {
            let _this = this;
            let indexPath = '/index/home';
            console.log(this.$router.currentRoute.value.fullPath);
            if (this.$router.currentRoute.value.fullPath !== indexPath) {
                _this.defaultActive = this.$router.currentRoute.value.fullPath;
            }
            this.$router.beforeEach((to, from, next) => {
                _this.defaultActive = to.path;
                if (to.path === indexPath) {
                    _this.defaultActive = '/';
                }
                next();
            });
            setInterval(() => {
                _this.time = moment().format('YYYY-MM-DD HH:mm:ss');
            }, 500);
            window.onresize = () => {
                return (() => {
                    window.screenWidth = document.body.clientWidth;
                    _this.screenWidth = window.screenWidth;
                    console.log(_this.screenWidth);
                })();
            };
        },
        methods: {
            menuCollapseChange() {
                this.isCollapse = !this.isCollapse;
                localStorage.setItem('menuIsCollapse', this.isCollapse ? '1' : '0');
            },
            handleThemeChange() {
                this.isDark = !this.isDark;
                localStorage.setItem('themeIsDark', this.isDark ? '1' : '0');
            },
            async copy() {
                let blob = new Blob([this.time], { type: 'text/plain' });
                let item = new ClipboardItem({ 'text/plain': blob });
                navigator.clipboard.write([item]);
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '../../styles/menu-colors.scss';
    @mixin operations($isCollapse, $theme) {
        @if ($isCollapse == 'isCollapse') {
            .operations {
                i {
                    display: none;
                    &:first-child {
                        @if ($theme == 'dark') {
                            color: $dark-active-text-color;
                        } @else {
                            color: $light-active-text-color;
                        }
                        display: block;
                    }
                }
            }
        }
    }
    @mixin layout($theme) {
        $menuBackgroundColor: null;
        @if ($theme == 'dark') {
            $menuBackgroundColor: $dark-background-color;
        } @else {
            $menuBackgroundColor: $light-background-color;
        }
        .menu {
            background-color: lighten($menuBackgroundColor, 5%);
            &.is-collapse {
                @include operations('isCollapse', $theme);
            }
            &.not-collapse {
                @include operations('notCollapse', $theme);
            }
            .operations {
                @if ($theme == 'dark') {
                    color: $dark-text-color;
                    background-color: darken($menuBackgroundColor, 10%);
                } @else {
                    color: $light-text-color;
                    background-color: darken($menuBackgroundColor, 10%);
                }
            }
        }
        .main {
            header {
                @if ($theme == 'dark') {
                    color: $dark-text-color;
                    background-color: lighten($menuBackgroundColor, 10%);
                } @else {
                    color: $light-text-color;
                    background-color: lighten($menuBackgroundColor, 10%);
                }
            }
        }
    }
    .el-menu {
        .el-menu-item,
        .el-submenu,
        .el-menu--popup {
            i,
            svg {
                color: #909399;
                vertical-align: middle;
                width: 1.2rem;
                font-size: 1.2rem;
                text-align: center;
                margin-right: 5px;
            }
        }
    }
    .layout {
        height: 100vh;
        display: flex;
        overflow: hidden;
        @media screen and (min-width: 1024px) {
            flex-direction: row;
        }
        @media screen and (max-width: 1024px) {
            flex-direction: column;
        }
        &.light {
            @include layout('light');
        }
        &.dark {
            @include layout('dark');
        }
        .menu {
            display: flex;
            @media screen and (min-width: 1024px) {
                $menuCollapseWidth: 65px;
                flex-direction: column;
                justify-content: space-between;
                .el-menu {
                    border: none;
                }
                &.is-collapse {
                    width: $menuCollapseWidth;
                    transition-duration: 300ms;
                }
                &.not-collapse {
                    width: 300px;
                    transition-duration: 300ms;
                }
                .operations {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    $height: 50px;
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
            @media screen and (max-width: 1024px) {
                $menuHeight: 2.5rem;
                .el-menu {
                    width: 100vh;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-around;
                    height: $menuHeight;
                }
                :deep(.el-menu) {
                    &.el-menu--horizontal > .el-menu-item,
                    &.el-menu--horizontal > .el-submenu .el-submenu__title {
                        height: $menuHeight;
                        line-height: $menuHeight;
                    }
                }
            }
        }
        .main {
            flex: 1;
            display: flex;
            flex-direction: column;
            section {
                flex: 1;
                display: flex;
                flex-direction: column;
                padding: 1rem;
                @media screen and (max-width: 1024px) {
                    padding: 0.5rem;
                }
            }
            @media screen and (min-width: 1024px) {
                header {
                    $headerHeight: 2.4rem;
                    height: $headerHeight;
                    line-height: $headerHeight;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    padding: 0 0.5rem;
                    .time {
                        margin: 0;
                    }
                }
            }
        }
    }
</style>
