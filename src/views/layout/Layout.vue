<template>
    <div>
        <!--        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">-->
        <!--            <el-radio-button :label="false">展开</el-radio-button>-->
        <!--            <el-radio-button :label="true">收起</el-radio-button>-->
        <!--        </el-radio-group>-->
        <el-container>
            <el-aside class="menu">
                <el-menu
                    @open="handleOpen"
                    @close="handleClose"
                    @select="handleSelect"
                    :collapse="isCollapse"
                    :unique-opened="true"
                    :router="true"
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
            </el-aside>
            <el-container>
                <el-header>666666</el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
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
    .menu {
        width: 200px;
        i {
            font-size: 18px;
        }
    }
</style>
