<template>
  <div class="miaosha-predictor-container">
    <div class="title">京东秒杀</div>
    <div class="footer">
      <div class="timer-predictor">
        <span class="time"
          >{{
            state.startTime.hour
              ? state.startTime.hour.toString().padStart(2, "0")
              : "00"
          }}:{{
            state.startTime.min
              ? state.startTime.min.toString().padStart(2, "0")
              : "00"
          }}</span
        >
        点场,距结束
      </div>
      <div class="timer-left">
        <div class="hour">
          {{
            state.endTime.hour
              ? state.endTime.hour.toString().padStart(2, "0")
              : "00"
          }}
        </div>
        <span>:</span>
        <div class="min">
          {{
            state.endTime.min
              ? state.endTime.min.toString().padStart(2, "0")
              : "00"
          }}
        </div>
        <span>:</span>
        <div class="sec">
          {{
            state.endTime.sec
              ? state.endTime.sec.toString().padStart(2, "0")
              : "00"
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, watchEffect, onBeforeUnmount } from "vue";
import formatDate from "../../../../utils/formatDate";
import { Time } from "../../../../types/timeformat";
interface PropsType {
  startTime: number | string;
  endTime: number | string;
}

const props = defineProps<PropsType>();

const state = reactive({
  startTime: {} as Time,
  endTimeStamp: 0,
  endTime: {} as {
    hour: string | number;
    min: string | number;
    sec: string | number;
  },
  timer: null as null | NodeJS.Timer,
});

watchEffect(() => {
  state.startTime = formatDate(props.startTime, true) as unknown as Time;
  const now = Date.now();
  state.endTimeStamp = new Date(+props.endTime).getTime();
  const parseSeconds = Math.floor((state.endTimeStamp - now) / 1000);
  state.endTime.hour = Math.floor(parseSeconds / 60 / 60);
  state.endTime.min = Math.floor(parseSeconds / 60 - state.endTime.hour * 60);
  state.endTime.sec = Math.floor(
    parseSeconds - (state.endTime.hour * 60 * 60, state.endTime.min * 60)
  );
});

state.timer = setInterval(() => {
  state.endTimeStamp = state.endTimeStamp--;
}, 1000);

onBeforeUnmount(() => {
  clearInterval(state.timer as NodeJS.Timer);
});
</script>

<style lang="less" scopedd>
.miaosha-predictor-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .title {
    width: 100%;
    height: 30px;
    font-size: 25px;
    text-align: center;
    color: #fff;
  }
  .footer {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .timer-predictor {
      text-align: center;
      color: #fff;
      .time {
        color: inherit;
        font-size: 20px;
        font-weight: bold;
      }
    }
    .timer-left {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 20px;
      color: #fff;
      span {
        color: inherit;
        margin: 0 10px;
      }
      .hour,
      .min,
      .sec {
        color: inherit;
        width: 30px;
        height: 30px;
        font-size: 23px;
        background: #222121;
        text-align: center;
        line-height: 30px;
      }
    }
  }
}
</style>
