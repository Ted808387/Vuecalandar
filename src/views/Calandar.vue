<template>
    <div class="calandar_canter_title radius">
        <div class="canlandar_week" v-for="week, id in getweek" :key="id">{{ week }}</div>
    </div>
    <div class="calandar radius">
        <div class="calandar_day" v-for="date in getcalandar" :key="date.id" @click.stop="showModal(date)">
            <p class="day" :class="{ day_font_mark: Date.parse(new Date(year, month, day)) === date.id}">{{ date.day }}</p>
            <ul class="todolist">
                <li class="matter" v-for="item in date.list" :key="item.id" :style="{'--bgcolor': item.color}" @click.stop="modifyModal(item)">
                    <p class="list">{{ item.start_time }}</p><p class="list">{{ item.title }}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>


export default {
    name: 'CalandarContent',
    data(){
        return{
            day: this.$store.state.day,
            month: this.$store.state.month,
            year: this.$store.state.year,
        }
    },
    computed: {
        getweek(){
            return this.$store.state.canlandarweek;
        },
        getcalandar(){
            this.$store.getters.getcalander(35);
            this.$store.commit('setType', '月');
            return this.$store.state.calandar;
        },
    },
    methods: {
        showModal(list){
            this.$store.dispatch('showModal', list);
        },
        modifyModal(list){
            this.$store.commit('modifyModal', list);
        }
    },
}
</script>

<style scoped>
    span{
        display: inline-block;
    }
</style>