<template>
  <div class="calendarweek">
    <div class="calendarweekcontent">
      <div class="calendar_cantertitle radius" :class="{week_grid_template :!weekend}">
          <div class="GMT"></div>
          <div class="calendar_week" :class="{ day_font_mark: Date.parse(new Date(year, month, day)) === week.id }" v-for="week in getcurrentday" :key="week.id">
            {{ week.day }} - ({{ week.date }})
            <p class="thing_allday" v-for="thing in week.list" :key="thing.id" :class="{status_mark: thing.status}" v-show="thing.allday && getworktype.indexOf(thing.type) !== -1 && (thing.status === getstatus || !thing.status)" :style="{'--thingcolor': thing.color}" @click.stop="modifyModal(thing, week.id)">
              {{ thing.title }}
            </p>
          </div>
      </div>
      <div class="day_group" :class="{week_grid_template :!weekend}">
        <div class="calendar_time">
          <p v-for="clock in 24" :key="clock">{{ clock }}</p>
        </div>
        <div class="week_content radius" v-for="day in getcurrentday" :key="day.id">
          <div class="daytime" v-for="space in 24" :key="space">
            <div class="thing" v-for="item in day.list" :key="item.id" :style="{'--thingcolor': item.color}">
              <p class="thing_content" :class="{status_mark: item.status}" v-show="item.start_time.slice(0, 2) == space && !item.allday && getworktype.indexOf(item.type) !== -1 && (item.status === getstatus || !item.status)" @click.stop="modifyModal(item, day.id)">
                {{ item.start_time }} {{ item.title }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default ({
  name: 'CalendarWeek',
  data(){
    return{
      day: this.$store.state.day,
      month: this.$store.state.month,
      year: this.$store.state.year,
    }
  },
  computed: {
    getcurrentday(){
      return this.$store.getters.getcurrentweek;
    },
    getworktype(){
      return this.$store.state.worktype;
    },
    getstatus(){
      return this.$store.state.status;
    },
    weekend(){
      return this.$store.state.weekend;
    },
  },
  methods: {
    modifyModal(list, dateid){
      this.$store.commit('modifyModal', {list, dateid});
    }
  },
})
</script>

