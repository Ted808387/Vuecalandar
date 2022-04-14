<template>
  <div class="calandarweek">
    <div class="calandarweekcontent">
      <div class="calandar_cantertitle radius" :class="{week_grid_tempkate :!weekend}">
          <div class="GMT"></div>
          <div class="canlandar_week" :class="{ day_font_mark: Date.parse(new Date(year, month, day)) === week.id }" v-for="week in getcurrentday" :key="week.id">
            {{ week.day }} - ({{ week.date }})
            <p class="thing_allday" v-for="thing in week.list" :key="thing.id" :class="{status_mark: thing.status}" v-show="thing.allday && getworktype.indexOf(thing.type) !== -1 && (thing.status === getstatus || !thing.status)" :style="{'--thingcolor': thing.color}" @click.stop="modifyModal(thing, week.id)">
              {{ thing.title }}
            </p>
          </div>
      </div>
      <div class="day_group" :class="{week_grid_tempkate :!weekend}">
        <div class="calandar_time">
          <p v-for="clock in 24" :key="clock">{{ clock }}</p>
        </div>
        <div class="week_content radius" v-for="day in getcurrentday" :key="day.id">
          <div class="daytime" v-for="space in 24" :key="space">
            <div class="thing" v-for="thing in day.list" :key="thing.id" :style="{'--thingcolor': thing.color}">
              <p class="thing_content" :class="{status_mark: thing.status}" v-show="thing.start_time.slice(0, 2) == space && !thing.allday && getworktype.indexOf(thing.type) !== -1 && (thing.status === getstatus || !thing.status)" @click.stop="modifyModal(thing, day.id)">
                {{ thing.start_time }} {{ thing.title }}
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
  name: 'CalandarWeek',
  data(){
    return{
      day: this.$store.state.day,
      month: this.$store.state.month,
      year: this.$store.state.year,
    }
  },
  computed: {
    getcurrentday(){
      let data = [];
      if(this.$store.state.weekend){
          data = this.$store.getters.getcurrentweek;
      }
      else if(!this.$store.state.weekend){
        data = this.$store.getters.getcurrentweek.filter((element) => {
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
    },
  },
  methods: {
    modifyModal(list, dateid){
      this.$store.commit('modifyModal', {list, dateid});
    }
  },
})
</script>

