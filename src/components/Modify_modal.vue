<template>
    <div>
        <vue-final-modal name="modify" v-model="this.$store.state.modifyModal" focus-retain click-to-close drag hide-overlay classes="modal-container" content-class="modal-content">
            <div class="modal__title">
                事件紀錄
                <button class="modal__close" @click="modify">
                    <div class="close">X</div>
                </button>
            </div>
            <div class="modal__content">
                <div class="modal_content">
                <input class="title_text ptb-5" type="text" placeholder="新增標題" v-model="this.$store.state.thing.title">
                <div class="modal_select js_c ptb-5">
                    <div class="select1">
                        <input  id="sele1" type="radio" name="select" value="work" v-model="this.$store.state.thing.type"><label for="sele1">工作</label>
                    </div>
                    <div class="select2">
                        <input  id="sele2" type="radio" name="select" value="activity" v-model="this.$store.state.thing.type"><label for="sele2">活動</label>
                    </div>
                </div>
                <div class="modal_time js_c ptb-5">
                    <div class="thing_date">
                        <input id="start_date" type="date" v-model="this.$store.state.thing.start_date"><span>~</span>
                        <input id="end_date" type="date" v-model="this.$store.state.thing.end_date" v-show="allday">
                    </div>
                    <div class="thing_time" v-show="!allday">
                        <input id="start_time" type="time" v-model="this.$store.state.thing.start_time"><span>~</span>
                        <input id="end_time" type="time" v-model="this.$store.state.thing.end_time">
                    </div>
                </div>
                <div class="modal_all_day js_c ptb-5">
                    <input id="all_day" type="checkbox" name="all_day" v-model="allday">
                    <label for="all_day">全天</label>
                </div>
                <div class="modal_detail js_c ptb-5">
                    <textarea id="textarea" placeholder="輸入內容" rows="3" cols="65" v-model="this.$store.state.thing.detail"></textarea>
                </div>
                <div class="modal_color js_c ptb-5">
                    <input class="thing_color" type="color" name="color" id="color" v-model="this.$store.state.thing.color">
                    <label for="color">設定活動顏色</label>
                </div>
                <div class="modal_btn">
                    <button class="entry" @click="modify">確認</button>
                    <button class="cancel" @click="modify">取消</button>
                </div>
                </div>
            </div>
        </vue-final-modal>
    </div>
</template>

<script>
import { VueFinalModal } from 'vue-final-modal';

export default {
    name: 'ModifyModal',
    components: {
        VueFinalModal,
    },
    data(){
        return{
            thing: {},
            allday: false,
        }
    },
    methods: {
        modify(){
            this.$store.commit('closeModifyModal')
        },
    },
}
</script>


<style scoped>
::v-deep .modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep .modal-content {
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  background: #fff;
}
.modal__title {
  font-size: 1.5rem;
  font-weight: 700;
  background-color: #b0e6c7;
}
.modal__close {
  position: absolute;
  padding: 3px;
  right: 0;
  font-size: 0.8em;
  background-color: inherit;
  border: none;
  cursor: pointer;
}
.modal__close:hover{
    color: white;
    transition: color .3s;
}
</style>

<style scoped>
.dark-mode div::v-deep .modal-content {
  border-color: #2d3748;
  background-color: #1a202c;
}
</style>