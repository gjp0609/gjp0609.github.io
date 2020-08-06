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
                                <!-- <i v-if="router.meta.icon.type === 'font-awesome-icons'" :class="router.meta.icon.name" class="fas"></i>-->
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
                                <!-- <i v-if="subRouter.meta.icon.type === 'font-awesome-icons'" :class="subRouter.meta.icon.name" class="fas"></i>-->
                            </template>
                            <span> {{ subRouter.meta.name }}</span>
                        </el-menu-item>
                    </el-submenu>
                    <el-menu-item v-else :index="router.path">
                        <template v-if="router.meta.icon">
                            <i v-if="router.meta.icon.type === 'material-icons'" class="material-icons">{{ router.meta.icon.name }}</i>
                            <i v-if="router.meta.icon.type === 'element-ui'" :class="router.meta.icon.name"></i>
                            <!-- <i v-if="router.meta.icon.type === 'font-awesome-icons'" :class="router.meta.icon.name" class="fas"></i>-->
                        </template>
                        <span>{{ router.meta.name }}</span>
                    </el-menu-item>
                </template>
            </el-menu>
            <div class="operations">
                <i @click="menuCollapseChange" class="material-icons">{{ isCollapse ? 'last_page' : 'first_page' }}</i>
                <i @click="handleThemeChange" class="material-icons">{{ isDark ? 'brightness_4' : 'brightness_7' }}</i>
            </div>
        </aside>
        <div class="main">
            <header>
                <span>OnySakura.xyz</span>
                <code class="time">{{ time }}</code>
            </header>
            <section>
                <router-view></router-view>
            </section>
        </div>
    </div>
</template>

<script>
    import { constantMenuRouterMap } from '../../router';
    import cssConstants from '../../styles/menu-colors.scss';

    export default {
        name: 'Layout',
        data() {
            return {
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
                        activeTextColor: cssConstants.darkActiveTextColor,
                        backgroundColor: cssConstants.darkBackgroundColor,
                        textColor: cssConstants.darkTextColor
                    };
                } else {
                    return {
                        activeTextColor: cssConstants.lightActiveTextColor,
                        backgroundColor: cssConstants.lightBackgroundColor,
                        textColor: cssConstants.lightTextColor
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
            setInterval((_) => {
                let now = new Date();
                _this.time =
                    now.getFullYear() +
                    '-' +
                    ('0' + (now.getMonth() + 1)).substring(-1) +
                    '-' +
                    (now.getDate() < 10 ? '0' : '') +
                    now.getDate() +
                    ' ' +
                    (now.getHours() < 10 ? '0' : '') +
                    now.getHours() +
                    ':' +
                    (now.getMinutes() < 10 ? '0' : '') +
                    now.getMinutes() +
                    ':' +
                    (now.getSeconds() < 10 ? '0' : '') +
                    now.getSeconds();
            }, 1000);
        },
        methods: {
            handleOpen(key, keyPath) {
                // console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                // console.log(key, keyPath);
            },
            handleSelect(index, indexPath) {
                // console.log(index, indexPath);
            },
            menuCollapseChange() {
                this.isCollapse = !this.isCollapse;
                localStorage.setItem('menuIsCollapse', this.isCollapse ? '1' : '0');
            },
            handleThemeChange() {
                this.isDark = !this.isDark;
                localStorage.setItem('themeIsDark', this.isDark ? '1' : '0');
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
    .layout {
        height: 100vh;
        display: flex;
        flex-direction: row;
        overflow: hidden;
        &.light {
            @include layout('light');
        }
        &.dark {
            @include layout('dark');
        }
        .menu {
            $menuCollapseWidth: 65px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
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
                //svg {
                //    &.svg-inline--fa {
                //        color: #909399;
                //        vertical-align: middle;
                //        margin-right: 5px;
                //        width: 24px;
                //        text-align: center;
                //        font-size: 14px;
                //    }
                //}
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
        .main {
            width: 100%;
            header {
                $headerHeight: 40px;
                height: $headerHeight;
                line-height: $headerHeight;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                padding: 0 10px;
            }
            section {
                padding: 20px;
            }
        }
    }
</style>
