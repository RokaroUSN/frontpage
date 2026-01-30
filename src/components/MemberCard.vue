<script setup lang="ts">

import type {TeamMember} from "../App.vue";

const props = defineProps<{
  member: TeamMember
}>()
</script>

<template>
  <div class="card-header">
    <span class="member-id mono">{{ member.id }}</span>
    <span class="member-discipline mono">{{ member.discipline }}</span>
  </div>
  <div class="card-body">
    <h3 class="member-name">{{ member.name }}</h3>
    <span class="member-role">{{ member.role }}</span>
  </div>
  <div class="card-decoration"></div>
</template>

<style scoped lang="scss">


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