import { nextTick, ref } from "vue";

export function useRefresh(props, state, emit) {
  const { endLoading, resetLoading } = state;
  var refreshing = ref(false);
  function onRefresh(e) {
    if(refreshing.value) return;
    refreshing.value = true;
    emit('refresh', {
      ...e,
      complete,
      end,
    });
  }
  
  function end() {
    refreshing.value = false;
    endLoading();
  }
  
  function complete() {
    uni.stopPullDownRefresh();
    nextTick(() => {
      refreshing.value = false;
      resetLoading();
    })
  }

  return {
    onRefresh,
    complete,
    refreshing,
  }
}
