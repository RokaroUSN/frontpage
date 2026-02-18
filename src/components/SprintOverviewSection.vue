<script setup lang="ts">
import { computed } from 'vue'
import { sprints, getSprintStatus, type Sprint } from '../data/sprints'

const activeSprint = computed<Sprint | undefined>(() =>
  sprints.find(s => getSprintStatus(s) === 'active')
)

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
</script>

<template>
  <section v-if="activeSprint" class="sprint-overview">
    <div class="container">
      <div class="section-header">
        <span class="section-number mono">// CURRENT SPRINT</span>
      </div>

      <div class="sprint-card">
        <div class="left-border">
          <p>
            SPRINT {{activeSprint.number}}
          </p>
        </div>
        <div class="card-content">
          <div class="sprint-top">
            <div class="sprint-meta">
              <span class="sprint-badge active mono">Active</span>
              <span class="sprint-dates mono">{{ formatDate(activeSprint.startDate) }} → {{ formatDate(activeSprint.endDate) }}</span>
            </div>
            <h3>{{ activeSprint.title }}</h3>
          </div>
          <p class="sprint-description">{{ activeSprint.description }}</p>
        </div>
      </div>
      <router-link :to="{ name: 'sprints' }" class="view-all">
        View all sprints
        <span class="arrow">→</span>
      </router-link>
    </div>
  </section>
</template>

<style scoped lang="scss">
.sprint-overview {
  background: var(--color-bg-light);
  padding-top: 3rem;
  padding-bottom: 3rem;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.section-number {
  font-size: 0.75rem;
  color: var(--color-text-light);
  letter-spacing: 0.1em;
}

.sprint-card {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  max-width: 700px;
  display: flex;
  flex-direction: row;
  clip-path: polygon( 0 12px, 12px 0, 100% 0, 100% 100%, 0 100%);
  .left-border {
    background-color: var(--color-primary);
    width: 64px;
    position: relative;
    p {
      transform: rotate(90deg) translateY(-100%);
      transform-origin: 0 0;
      position: absolute;
      margin: 0;
      padding-left: 0.6rem;
      width: max-content;
      top: 0;
      left: 0;
      color: white;
      font-size: 22px;
      font-family: var(--font-display);
    }
  }
  .card-content {
    padding: 2rem;
  }
}

.sprint-top {
  margin-bottom: 1rem;
}

.sprint-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.sprint-badge {
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  padding: 0.2rem 0.6rem;
  text-transform: uppercase;

  &.active {
    background: rgba(220, 78, 78, 0.1);
    color: var(--color-primary);
    border: 1px solid var(--color-primary);
  }
}

.sprint-dates {
  font-size: 0.75rem;
  color: var(--color-text-light);
}

.sprint-description {
  font-size: 1rem;
  line-height: 1.8;
  color: var(--color-text);
}

.view-all {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 1.3rem;
  color: var(--color-primary);
  transition: gap 0.2s ease;
  margin-top: 2rem;

  &:hover {
    gap: 0.75rem;
    color: var(--color-primary-dark);
  }

  .arrow {
    transition: transform 0.2s ease;
  }

  &:hover .arrow {
    transform: translateX(2px);
  }
}

@media (max-width: 768px) {
  .sprint-card {
    .left-border {
      width: 32px;
      p {
        transform: rotate(90deg) translateY(-100%);
        transform-origin: 0 0;
        position: absolute;
        margin: 0;
        padding-left: 0.6rem;
        width: max-content;
        top: 0;
        left: 0;
        color: white;
        font-size: 20px;
        font-family: var(--font-display);
      }
    }
  }

  .section-header {
    margin-bottom: 2rem;
  }
}
</style>
