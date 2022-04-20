<template>
    <div class="calendar_canter_title radius">
        <div class="calendar_week" v-for="week, id in getweek" :key="id">{{ week }}</div>
    </div>
    <div class="calendar radius" :class="{grid_tempkate: !weekend}">
        <div class="calendar_day" v-for="date in getcalandar" :key="date.id" @click.stop="showModal(date)">
            <p class="day" :class="{ day_font_mark: Date.parse(new Date(year, month, day)) === date.id}">{{ date.day }}</p>
            <ul class="todolist">
                <li class="matter" v-for="item in date.list" v-show="getworktype.indexOf(item.type) !== -1 && (item.status === getstatus || !item.status)" :key="item.id" :style="{'--bgcolor': item.color}" :class="{status_mark: item.status}" @click.stop="modifyModal(item, date.id)">
                    <p class="list">{{ item.start_time }}</p><p class="list">{{ item.title }}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

export default {
    name: 'CalendarCenter',
    data(){
        return{
            day: this.$store.state.day,
            month: this.$store.state.month,
            year: this.$store.state.year,
        }
    },
    computed: {
        getweek(){
            let data = this.$store.state.calendarweek;
            if(!this.$store.state.weekend){
                data = data.slice(1, 6);
            }
            return data;
        },
        getcalandar(){
            this.$store.commit('setType', '月');
            let data = [];
            if(this.$store.state.weekend){
                data = this.$store.state.calendar;
            }
            else if(!this.$store.state.weekend){
                data = this.$store.state.calendar.filter((element) => {
                    return element.date !== '日' && element.date !== '六'
                })
            }
            return data;
        },   
        getworktype(){
            return this.$store.state.worktype;
        },
        getstatus(){
            return this.$store.state.status;
        },
        weekend(){
            return this.$store.state.weekend;
        }
    },
    methods: {
        showModal(list){
            this.$store.dispatch('showModal', list);
        },
        modifyModal(list, dateid){
            this.$store.commit('modifyModal', {list, dateid});
        }
    },
}
</script>

<style scoped>
    span{
        display: inline-block;
    }
</style>