<script setup lang="ts">

import type {TeamMember} from "../pages/HomePage.vue";

const baseUrl = import.meta.env.BASE_URL

const props = defineProps<{
  member: TeamMember
  selected?: boolean
}>()
</script>

<template>
  <div class="member-card" :class="{ selected }" role="button" tabindex="0">
    <div class="card-header">
      <span class="member-id mono">{{ member.id }}</span>
      <span class="member-discipline mono">{{ member.discipline }}</span>
    </div>
    <div class="card-body">
      <div class="text-col">
        <h3 class="member-name">{{ member.name }}</h3>
        <span class="member-role">{{ member.role }}</span>
      </div>
      <div class="member-img">
        <img :src="`${baseUrl}member-photos/${member.name.split(' ')[0]}.webp`" :style="member.photoScale ? { transform: `scale(${member.photoScale + 0.7})` } : undefined" />
      </div>
    </div>
    <div class="card-decoration"></div>
  </div>
</template>

<style scoped lang="scss">
.member-card {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  padding: 0;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: border-color 0.3s ease, background 0.3s ease, filter 0.3s ease;

  &:hover {
    border-color: var(--color-primary);

    .card-decoration {
      background-position: 0 0;
    }
  }

  &.selected {
    border-color: var(--color-primary);
    background: var(--color-bg-light);
    filter: brightness(0.92);

    .card-decoration {
      background-position: 0 0;
    }
  }
}

.card {
  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid var(--color-border);
    background: var(--color-bg-light);
  }

  &-body {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .text-col {
      padding: 1.5rem 1rem;
    }
    .member-img {
      overflow: hidden;
    }
    img {
      width: 6rem;
      height: 100%;
      object-fit: cover;
      background-color: rgba(163, 163, 163, 0.27);
    }
  }

  &-decoration {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, var(--color-primary) 0%, var(--color-primary) 50%, transparent 50%);
    background-size: 200% 100%;
    background-position: 100% 0;
    transition: background-position 0.3s ease;
  }
}

.member {
  &-id {
    font-size: 0.7rem;
    color: var(--color-primary);
    letter-spacing: 0.05em;
  }

  &-discipline {
    font-size: 0.65rem;
    color: var(--color-text-light);
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  &-name {
    font-size: 1.1rem;
    margin-bottom: 0.25rem;
  }

  &-role {
    font-size: 0.9rem;
    color: var(--color-text-light);
  }
}
</style>