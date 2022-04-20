import { createStore } from 'vuex'
// import axios from 'axios';

export default createStore({
  state: {
    // api: 'https://urlcalendar.herokuapp.com/calendar',
    calendarweek: ['日', '一', '二', '三', '四', '五', '六'],
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    day: new Date().getDate(),
    calendar: [],
    currentweek:[],
    show: false,
    modifyModal: false,
    list: {}, // 暫存用
    thing: {}, // 修改暫存用
    dateid: 0, // 當前點擊日期id
    todolist: [], // 全事件存放區
    time: '',
    calendartype: '',
    worktype: ['1','2'],
    status: true,
    weekend: true,
  },
  getters: {
    getcalender: (state) => (num) => {
      let fistday = new Date(state.year, state.month, 1);
      let weekday = fistday.getDay();
      let startday = fistday - weekday * 24 * 3600 * 1000;
      state.calendar = [];
      for(let i = 0; i < num; i++){
        let date = new Date(startday + i * 24 * 3600 * 1000)
        let day = '';
        switch(date.getDay()){
          case 0:
            day = '日';
            break;
          case 1:
            day = '一';
            break;
          case 2:
            day = '二';
            break;
          case 3:
            day = '三';
            break;
          case 4:
            day = '四';
            break;
          case 5:
            day = '五';
            break;
          case 6:
            day = '六';
            break;
        }
        state.calendar.push({
          'day': date.getDate(),
          'month': date.getMonth(),
          'year': date.getFullYear(),
          'date': day,
          'id': Date.parse(date),
          'list': [],
        });
      }
      if(state.todolist){
        state.calendar.forEach((item) => {
          state.todolist.forEach((thing) => {
            if(item.id === thing.id){
              item.list.push(thing.list)
            }
          })
        })
      }
      return state.calendar
    },
    getcurrentweek(state){
      let currentdate = new Date(state.year, state.month, state.day);
      let currentday = currentdate.getDay();
      let startday = currentdate - currentday * 24 * 3600 * 1000;
      let num = state.calendar.map((item) => {
        return item.id
      }).indexOf(startday);
      state.currentweek = state.calendar.slice(num, num + 7);
      let data = [];
      if(!state.weekend){
        data = state.currentweek.filter((element) => {
          return element.date !== '日' && element.date !== '六'
        })
      }else{
        data = state.currentweek;
      }
      return data;
    },
  },
  mutations: {
    beforeMonth(state){
      if (state.month <= 0){
        state.month = 11;
        state.year--;
      } else {
        state.month--;
      }
    },
    afterMonth(state){
      if (state.month >= 11){
        state.month = 0;
        state.year++;
      } else {
        state.month++;
      }
    },
    closeModal(state){
      state.show = !state.show; 
    },
    closemodifyModal(state){
      state.modifyModal = !state.modifyModal; 
    },
    showModal(state, data){
      state.list = data;
      state.show = !state.show;
      state.time = new Date(state.list.id).toLocaleDateString('en-CA');
    },
    settodolist(state, data){
      let id = (ite) => { return new Date(ite.year, ite.month, ite.day).toLocaleDateString('en-CA') };
      let num = state.calendar.map((item) => {
        return id(item)
      }).indexOf(data.start_date)
      state.list = state.calendar[num]
      state.list.list = data;
      state.todolist.push(state.list);
    },
    modifyModal(state, data){
      state.modifyModal = !state.modifyModal;
      state.dateid = data.dateid;
      state.thing = data.list;
    },
    changeThing(state, thing){
      if(thing){
        let index = state.todolist.map((data) => {
          return data.list.id
        }).indexOf(thing.id)
        state.todolist.splice(index, 1);
      }
    },
    setType(state, type){
      state.calendartype = type;
    },
    setwortype(state, value){
      state.worktype = value;
    },
    changestatus(state){
      state.status = !state.status;
    },
    weekend(state){
      state.weekend = !state.weekend;
    },
    // getodolist(state, data){
    //   state.todolist = data;
    // }
  },
  actions: {
    beforeMonth({ commit }){
      commit('beforeMonth');
    },
    afterMonth({ commit }){
      commit('afterMonth');
    },
    showModal({ commit }, data){
      commit('showModal', data);
    },
    closeModal({ commit }){
      commit('closeModal');
    },
    async settodolist(context, thing){
    context.commit('settodolist', thing);
    // await axios.post(context.state.api, context.state.list)
    // .then((response) => console.log(response))
    // .catch((error) => console.log(error))
    },
    async changeThing(context, data){
      context.commit('changeThing', data);
      context.commit('settodolist', data);
      context.commit('closemodifyModal');
      // await axios.put(`${context.state.api}/${data.id}`, context.state.list)
      // .then((response) => console.log(response))
      // .catch((error) => console.log(error))
    },
    async deleteThing(context, data){
      context.commit('changeThing', data)
      context.commit('closemodifyModal');
      // await axios.delete(`${context.state.api}/${data.id}`)
      // .then((response) => console.log(response))
      // .catch((error) => console.log(error))
    },
    // gettodolist(context){
    //   axios.get(context.state.api)
    //   .then(({data}) => context.commit('getodolist' ,data.data))
    //   .catch((error) => console.log(error))
    // }
  },
})
