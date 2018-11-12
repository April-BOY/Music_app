<template>
    <!-- <div class="tab">
        <a href="#/recommend" class="tab-item">
            <span class="tab-link">推荐</span>
        </div>
        <a href="#/singer" class="tab-item">
            <span class="tab-link">歌手</span>
        </div>
        <a href="#/rank" class="tab-item">
            <span class="tab-link">排行</span>
        </div>
        <a href="#/search" class="tab-item">
            <span class="tab-link">搜索</span>
        </div>
    </div> -->
    <!-- 原本的结构如上，因为要做路由跳转，所以，使用 router-link 来实现 -->
    <div class="tab">
        <!-- 使用 router-link 进行页面的跳转，另一种方式是使用 router.push() 进行页面的跳转 -->
        <router-link to="/recommend" class="tab-item">
            <span class="tab-link">推荐</span>
        </router-link>
        <router-link to="/singer" class="tab-item">
            <span class="tab-link">歌手</span>
        </router-link>
        <router-link to="/rank" class="tab-item">
            <span class="tab-link">排行</span>
        </router-link>
        <router-link to="/search" class="tab-item">
            <span class="tab-link">搜索</span>
        </router-link>
    </div> 
</template>

<script>
export default {};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/variable';

.tab {
    display: flex;
    height: 44px;
    line-height: 44px;
    font-size: $font-size-medium;

    .tab-item {
        flex: 1;
        text-align: center;

        .tab-link {
            padding-bottom: 5px;
            color: $color-text-l;
        }

        &.router-link-active {
            .tab-link {
                color: $color-theme;
                border-bottom: 2px solid $color-theme;
            }
        }
    }
}
</style>

