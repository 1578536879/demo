<template>
  <div class="button">
    1111111111
  </div>
</template>

<script lang="ts">
/*
 * @Author: Liao.xiuli
 * @Date: 2021-09-18 11:18:59
 * @Last Modified by: Liao.xiuli
 * @Last Modified time: 2022-09-01 11:20:45
 */
export default {
  name: "WlButton",
};
</script>

<script setup lang="ts">
import { httpTest1 } from "../../../../test/mock";
// import { onDebounce } from "@packages/utils";
import { computed, getCurrentInstance } from "vue";
const { proxy: root } = getCurrentInstance();
httpTest1().then((res) => {
  if (root.$options.mocks) {
    console.log("wlbutton------", res, root.$options.mocks.$aaa);
    root.$options.mocks.$aaa.end();
  }
});
interface Props {
  text?: string;
  disabled?: boolean;
  type?: "default" | "primary" | "warning" | "danger";
  size?: "large" | "normal" | "small" | "mini";
  shape?: "default" | "circle" | "round";
  icon?: string;
  styleExtra?: object;
  plain?: boolean;
  color?: string;
}
const props = withDefaults(defineProps<Props>(), {
  text: "",
  disabled: false,
  type: "primary",
  size: "normal",
  shape: "default",
  icon: "",
  styleExtra: null,
  plain: false,
  color: "",
});

const emit = defineEmits<{
  (e: "onClick");
}>();

const btnClass = computed(() => {
  return {
    [`btn-plain-${props.type}`]: props.plain,
    [`btn-type-${props.type}`]: !props.plain,
    [`btn-shape-${props.shape}`]: true,
    [`btn-size-${props.size}`]: true,
    disabled: props.disabled,
  };
});

const btnStyle = computed(() => {
  let colorStyle = {};
  if (props.plain && props.color) {
    colorStyle = {
      "border-color": props.color,
      color: props.color,
    };
  } else if (!props.plain && props.color) {
    colorStyle = {
      "background-color": props.color,
      "border-color": props.color,
    };
  }
  return {
    ...props.styleExtra,
    ...colorStyle,
  };
});

const onButtonClick = () => {
  (root.$attrs as any).onClick();
  if (props.disabled) return;
  emit("onClick");
};
</script>

<style lang="scss" scoped>
.btn {
  color: #fff;
  padding: j(13) 0;
  font-size: j(16);
  font-weight: 500;
  font-size: j(14);
  cursor: pointer;
  border-radius: j(10);
  box-sizing: border-box;
  @extend %flex-middle-center;

  &.disabled {
    background-color: #e3e3e3 !important;
    pointer-events: none;
    cursor: not-allowed;
    opacity: 0.6;
    color: #989898;
    border: j(1px) solid #eeeeee;
  }

  &:not(.disabled) {
    @include btnClick();
  }

  &-size {
    &-large {
      padding: j(10) j(14);
      font-size: j(14px);
      border-radius: j(6);
    }

    &-default {
      padding: j(8) j(12);
      border-radius: j(4);
    }

    &-small {
      padding: j(6) j(10);
      font-size: j(12px);
      border-radius: j(4);
      display: inline-flex;
      align-items: center;
      align-content: center;
    }

    &-mini {
      padding: j(4) j(6);
      font-size: j(10px);
      border-radius: j(4);
      display: inline-flex;
      align-items: center;
      align-content: center;
    }
  }

  &-type {
    &-primary {
      background-color: #1c9fff;
    }

    &-warning {
      background-color: #e6a23c;
    }

    &-danger {
      background-color: #f56c6c;
    }

    &-success {
      background-color: #67c23a;
    }

    &-info {
      background-color: #909399;
    }

    &-default {
      background-color: white;
      border: j(1px) solid #dcdfe6;
      color: #606266;
    }

    &-link {
      color: #1c9fff;
    }

    &-text {
      color: #606266;
    }
  }

  &-plain {
    &-primary {
      color: #1c9fff;
      border: j(1px) solid #1c9fff;
    }

    &-warning {
      color: #e6a23c;
      border: j(1px) solid #e6a23c;
    }

    &-danger {
      color: #f56c6c;
      border: j(1px) solid #f56c6c;
    }

    &-success {
      color: #67c23a;
      border: j(1px) solid #67c23a;
    }

    &-info {
      color: #909399;
      border: j(1px) solid #909399;
    }

    &-default {
      background-color: white;
      border: j(1px) solid #dcdfe6;
      color: #dcdfe6;
    }
  }

  &-shape {
    &-default {
      border-radius: j(6);
    }

    &-circle {
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      align-content: center;
      width: j(36);
      height: j(36);
      padding: 0;
    }

    &-round {
      border-radius: j(100);
    }
  }
}

a {
  text-decoration: none;
  color: #1c9fff;

  &:link,
  &:visited,
  &:hover,
  &:active {
    color: #1c9fff;
  }
}
</style>
