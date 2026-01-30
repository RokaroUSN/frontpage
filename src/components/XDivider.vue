<script setup lang="ts">

</script>

<template>
  <div class="decoration">
    <span></span>
    <span></span>
  </div>
</template>

<style scoped lang="scss">
.decoration {
  position: relative;
  width: 30px;
  height: 30px;

  span {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 2px;

    &:first-child {
      background: var(--color-primary);
      transform: translateY(-50%) rotate(45deg);
    }

    &:last-child {
      background: rgba(255,255,255,0.3);
      transform: translateY(-50%) rotate(-45deg);
    }
  }
}
</style>