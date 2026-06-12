<script setup lang="ts">
import {ref, watch, nextTick, computed} from 'vue'

const props = defineProps<{
  open: boolean
  anchor: DOMRect | null
}>()

const emit = defineEmits<{
  close: []
}>()

const dialogRef = ref<HTMLDialogElement | null>(null)
const visible = ref(false)
const placedSide = ref<'right' | 'left'>('right')

const DIALOG_WIDTH = 520
const GAP = 12

// Measured after the dialog renders so we can clamp it within the viewport
// regardless of how tall its content is.
const dialogHeight = ref(320)

const dialogPosition = computed(() => {
  if (!props.anchor) return {}
  const vw = window.innerWidth
  const vh = window.innerHeight

  // Prefer right side of anchor, fall back to left if it would overflow
  let left: number
  if (props.anchor.right + GAP + DIALOG_WIDTH <= vw) {
    left = props.anchor.right + GAP
    placedSide.value = 'right'
  } else {
    left = props.anchor.left - GAP - DIALOG_WIDTH
    placedSide.value = 'left'
  }
  // Clamp horizontal so it never goes off-screen
  left = Math.max(GAP, Math.min(left, vw - DIALOG_WIDTH - GAP))

  // Vertical: align to anchor top, clamp so the full dialog stays on-screen
  const top = Math.max(GAP, Math.min(props.anchor.top, vh - dialogHeight.value - GAP))

  return {
    marginTop: `${top}px`,
    marginLeft: `${left}px`,
    marginRight: 'auto',
    marginBottom: 'auto',
  }
})

defineExpose({ placedSide })

watch(() => props.open, async (open) => {
  if (open) {
    await nextTick()
    dialogRef.value?.showModal()
    // Measure the rendered height so the vertical clamp accounts for the
    // actual content, then reveal.
    dialogHeight.value = dialogRef.value?.getBoundingClientRect().height ?? dialogHeight.value
    requestAnimationFrame(() => {
      visible.value = true
    })
  } else {
    visible.value = false
  }
})

function close() {
  visible.value = false
  setTimeout(() => {
    dialogRef.value?.close()
    emit('close')
  }, 300)
}

function onBackdropClick(e: MouseEvent) {
  if (e.target === dialogRef.value) {
    close()
  }
}
</script>

<template>
  <dialog
    v-if="open"
    ref="dialogRef"
    class="base-dialog"
    :class="{ visible }"
    :style="dialogPosition"
    @click="onBackdropClick"
    @cancel.prevent="close"
  >
    <div class="dialog-container">
      <slot :close="close" :visible="visible" />
    </div>
  </dialog>
</template>

<style scoped lang="scss">
.base-dialog {
  border: none;
  padding: 0;
  background: transparent;
  max-width: 520px;
  width: 90vw;
  overflow: visible;

  &::backdrop {
    background: rgba(0, 0, 0, 0);
    transition: background 0.3s ease;
  }

  &.visible::backdrop {
    background: rgba(0, 0, 0, 0.3);
  }
}

.dialog-container {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  position: relative;
  opacity: 1;
  transform: translateY(32px);
  transition: opacity 0.3s ease, transform 0.3s ease;

  .visible & {
    opacity: 1;
    transform: translateY(0);
  }
}

// Bottom decoration line matching the card style
.dialog-container::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, var(--color-primary) 0%, var(--color-primary) 50%, transparent 50%);
  background-size: 200% 100%;
  background-position: 100% 0;
  transition: background-position 0.4s ease 0.2s;

  .visible & {
    background-position: 0 0;
  }
}

@media (max-width: 768px) {
  .base-dialog {
    // Override all JS-computed margins to fully center on mobile
    margin: auto !important;
  }
}
</style>