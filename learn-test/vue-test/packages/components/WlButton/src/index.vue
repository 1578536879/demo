<template>
  <div class="button">
    1111111111
  </div>
</template>

<script lang="ts">
export default {
  name: "Button",
};
</script>

<script setup lang="ts">
import { httpTest1 } from "../../../../test/mock";
import { computed, getCurrentInstance } from "vue";
const { proxy: root } = getCurrentInstance();
httpTest1().then((res) => {
  if (root.$options.mocks) {
    console.log("button------", res, root.$options.mocks.$aaa);
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

const onButtonClick = () => {
  (root.$attrs as any).onClick();
  if (props.disabled) return;
  emit("onClick");
};
</script>
