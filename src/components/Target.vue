<template>
    <div class="Target radius">
        <div class="target_title">日曆選項</div>
        <div class="target_content">
            <p>
                <input type="checkbox" id="work" value="1" v-model="worktype">
                <label for="work" data-name="工作"></label>
            </p>
            <p>
                <input type="checkbox" id="activity" value="2" v-model="worktype">
                <label for="activity" data-name="活動"></label>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TargetSelect',
    computed: {
        worktype: {
            set(value){
                this.$store.commit('setwortype', value)
            },
            get(){
                return this.$store.state.worktype;
            }
        },
    },
}
</script>

<style lang="scss">
.target_content{
    p{
        margin: 10px 0;
    }
}
</style>