<script setup lang="ts">
import { sprints, getSprintStatus } from '../data/sprints'

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
</script>

<template>
  <div class="page-wrapper">
    <div class="container">
      <nav class="breadcrumb">
        <router-link :to="{ name: 'home' }">Home</router-link>
        <span class="separator mono">/</span>
        <span class="current">Sprints</span>
      </nav>

      <section class="sprints-page">
        <div class="section-header">
          <h2>Sprint Timeline</h2>
        </div>

        <div class="timeline">
          <div class="timeline-line"></div>

          <div
            v-for="sprint in sprints"
            :key="sprint.number"
            class="sprint-entry"
            :class="getSprintStatus(sprint)"
          >
            <div class="sprint-marker">
              <div class="marker-dot"></div>
            </div>

            <div class="sprint-card">
              <div class="sprint-top">
                <span class="sprint-number mono">Sprint {{ sprint.number }}</span>
                <span class="sprint-badge mono" :class="getSprintStatus(sprint)">{{ getSprintStatus(sprint) }}</span>
              </div>
              <h3>{{ sprint.title }}</h3>
              <div class="sprint-dates mono">
                {{ formatDate(sprint.startDate) }} → {{ formatDate(sprint.endDate) }}
              </div>
              <p class="sprint-description">{{ sprint.description }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page-wrapper {
  padding-top: var(--header-height);
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1.5rem 0 0;
  font-size: 0.85rem;

  a {
    color: var(--color-text-light);

    &:hover {
      color: var(--color-primary);
    }
  }

  .separator {
    color: var(--color-border);
    font-size: 0.75rem;
  }

  .current {
    color: var(--color-text);
    font-weight: 500;
  }
}

.sprints-page {
  padding: 3rem 0 6rem;
}

.section-header {
  margin-bottom: 3rem;
}

// ===== TIMELINE =====
.timeline {
  position: relative;
  padding-left: 2rem;
}

.timeline-line {
  position: absolute;
  left: 0.5rem;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--color-border);
}

.sprint-entry {
  position: relative;
  margin-bottom: 2.5rem;

  &:last-child {
    margin-bottom: 0;
  }
}

.sprint-marker {
  position: absolute;
  left: -2rem;
  top: 1.5rem;
  width: 1rem;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.marker-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid var(--color-border);
  background: var(--color-white);

  .completed & {
    background: var(--color-text-light);
    border-color: var(--color-text-light);
  }

  .active & {
    background: var(--color-primary);
    border-color: var(--color-primary);
    box-shadow: 0 0 0 4px rgba(220, 78, 78, 0.2);
  }

  .upcoming & {
    background: var(--color-white);
    border-color: var(--color-border);
  }
}

// ===== SPRINT CARD =====
.sprint-card {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  padding: 1.5rem 2rem;
  transition: border-color 0.2s ease;

  .active & {
    border-left: 4px solid var(--color-primary);
  }

  .completed & {
    border-left: 4px solid var(--color-text-light);
  }
}

.sprint-top {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.sprint-number {
  font-size: 0.75rem;
  color: var(--color-text-light);
  letter-spacing: 0.08em;
}

.sprint-badge {
  font-size: 0.65rem;
  letter-spacing: 0.08em;
  padding: 0.15rem 0.5rem;
  text-transform: uppercase;

  &.active {
    background: rgba(220, 78, 78, 0.1);
    color: var(--color-primary);
    border: 1px solid var(--color-primary);
  }

  &.completed {
    background: var(--color-bg-light);
    color: var(--color-text-light);
    border: 1px solid var(--color-border);
  }

  &.upcoming {
    background: var(--color-bg-light);
    color: var(--color-text-light);
    border: 1px dashed var(--color-border);
  }
}

.sprint-dates {
  font-size: 0.8rem;
  color: var(--color-text-light);
  margin-bottom: 1rem;
}

.sprint-description {
  font-size: 1rem;
  line-height: 1.8;
  color: var(--color-text);
  margin-bottom: 0;
}

// ===== RESPONSIVE =====
@media (max-width: 768px) {
  .timeline {
    padding-left: 1.5rem;
  }

  .sprint-marker {
    left: -1.5rem;
  }

  .sprint-card {
    padding: 1.25rem 1.5rem;
  }
}
</style>
