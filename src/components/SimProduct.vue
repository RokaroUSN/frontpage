<script setup lang="ts">
import {type Product, Shape} from "../Product.ts";

const props = defineProps<{
  product: Product;
  animSpeed: string;

}>()
</script>

<template>
<div class="product-box" :class="{circle: product.shape == Shape.Circle, square: product.shape == Shape.Square, 'shift-right': product.animatingRight}" :style="{borderColor: product.color, background: product.background}">
  <div class="label">
    {{ product.label }}
  </div>
</div>
</template>

<style scoped lang="scss">
.product-box {
  height: 2rem;
  width: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 2px white;

  .label {
    margin: 0;
    color: #000000 !important;
    text-align: center;

  }

  &.square {
    border-radius: 0.2rem;
  }
  &.circle {
    border-radius: 50%;
  }
}

@keyframes shift-right-anim {
  0% {
    transform: translateX(-2.5rem);
  }
  100% {
    transform: translateX(0);
  }
}

.shift-right {
  animation: shift-right-anim ease-in-out v-bind(animSpeed);
}

@media (max-width: 640px) {
  .product-box {
    height: 1.25rem;
    width: 1.25rem;
    border-width: 1.5px;

    .label {
      font-size: 0.7rem;
    }
  }

  @keyframes shift-right-anim {
    0% {
      transform: translateX(-1.5rem);
    }
    100% {
      transform: translateX(0);
    }
  }
}
</style>