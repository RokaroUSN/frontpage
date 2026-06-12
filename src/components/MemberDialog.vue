<script setup lang="ts">
import {ref, computed} from 'vue'
import type {TeamMember} from '../data/members.ts'
import BaseDialog from './BaseDialog.vue'

const baseUrl = import.meta.env.BASE_URL

const props = defineProps<{
  member: TeamMember | null
  anchor: DOMRect | null
}>()

const emit = defineEmits<{
  close: []
}>()

const baseDialogRef = ref<InstanceType<typeof BaseDialog> | null>(null)
const placedSide = computed(() => baseDialogRef.value?.placedSide ?? 'right')

defineExpose({ placedSide })
</script>

<template>
  <BaseDialog
    ref="baseDialogRef"
    :open="!!member"
    :anchor="anchor"
    @close="emit('close')"
  >
    <template #default="{ close, visible }">
      <div v-if="member" class="dialog-header">
        <span class="dialog-id mono">{{ member.id }}</span>
        <span class="dialog-discipline mono">{{ member.discipline }}</span>
        <button class="dialog-close" @click="close" aria-label="Close">&times;</button>
      </div>

      <div v-if="member" class="dialog-body">
        <div class="dialog-info">
          <h2 class="dialog-name">{{ member.name }}</h2>
          <div class="dialog-underline"></div>
          <span class="dialog-discipline-label">{{ member.discipline }}</span>

          <div class="dialog-details">
            <div class="detail-row" v-if="member.role">
              <span class="detail-label">Role:</span>
              <span class="detail-value">{{ member.role }}</span>
            </div>
            <div class="detail-row" v-if="member.email">
              <svg class="detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="M22 4L12 13L2 4"/>
              </svg>
              <span class="detail-label">E-post:</span>
              <a :href="`mailto:${member.email}`" class="detail-value detail-link">{{ member.email }}</a>
            </div>
            <div class="detail-row" v-if="member.description">
              <svg class="detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="16" x2="12" y2="12"/>
                <line x1="12" y1="8" x2="12.01" y2="8"/>
              </svg>
              <span class="detail-label">Beskrivelse:</span>
              <span class="detail-value">{{ member.description }}</span>
            </div>
          </div>

          <a v-if="member.linkedin" :href="member.linkedin" target="_blank" rel="noopener" class="linkedin-link" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
            </svg>
          </a>
        </div>

        <div class="dialog-photo" :class="{ visible }" :style="{ '--photo-scale': member.photoScale ? member.photoScale + 0.3 : 1 }">
          <img
            :src="`${baseUrl}member-photos/${member.name.split(' ')[0]}.webp`"
            :alt="member.name"
          />
        </div>
      </div>
    </template>
  </BaseDialog>
</template>

<style scoped lang="scss">
.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-bg-light);
}

.dialog-id {
  font-size: 0.7rem;
  color: var(--color-primary);
  letter-spacing: 0.05em;
}

.dialog-discipline {
  font-size: 0.65rem;
  color: var(--color-text-light);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  flex: 1;
  text-align: right;
  margin-right: 1rem;
}

.dialog-close {
  background: none;
  border: none;
  font-size: 1.4rem;
  color: var(--color-text-light);
  cursor: pointer;
  padding: 0 0.25rem;
  line-height: 1;
  transition: color 0.2s ease;

  &:hover {
    color: var(--color-primary);
  }
}

.dialog-body {
  display: flex;
  flex-direction: row;
  min-height: 260px;
}

.dialog-info {
  flex: 1;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
}

.dialog-name {
  font-size: 1.4rem;
  font-family: var(--font-display);
  margin-bottom: 0.25rem;
}

.dialog-underline {
  width: 40px;
  height: 2px;
  background: var(--color-primary);
  margin-bottom: 0.5rem;
}

.dialog-discipline-label {
  font-size: 0.85rem;
  color: var(--color-text-light);
  margin-bottom: 1.5rem;
}

.dialog-details {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  flex: 1;
}

.detail-row {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
}

.detail-icon {
  flex-shrink: 0;
  color: var(--color-text-light);
}

.detail-label {
  font-weight: 600;
  color: var(--color-text);
}

.detail-value {
  color: var(--color-text-light);
}

.detail-link {
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: var(--color-primary);
  }
}

.linkedin-link {
  margin-top: auto;
  align-self: flex-end;
  color: var(--color-text);
  transition: color 0.2s ease;

  &:hover {
    color: var(--color-primary);
  }
}

.dialog-photo {
  width: 180px;
  overflow: hidden;
  background-color: rgba(163, 163, 163, 0.27);
  position: relative;
  display: flex;
  justify-content: center;

  img {
    flex-shrink: 0;
    width: calc(100% * var(--photo-scale, 1));
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transform: translateX(30px);
    transition: opacity 0.3s step-start 0.15s, transform 0.2s ease-in;
  }

  &.visible img {
    opacity: 1;
    transform: translateX(0);
    transition: opacity 0.3s step-start 0.1s, transform 0.1s ease-out 0.1s;
  }
}

@media (max-width: 768px) {
  .dialog-body {
    flex-direction: column-reverse;
  }

  .dialog-photo {
    width: 100%;
    height: 250px;
  }
}
</style>