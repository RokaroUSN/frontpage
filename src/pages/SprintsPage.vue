<script setup lang="ts">
import { sprints, milestones, getSprintStatus, type Sprint, type Milestone } from '../data/sprints'

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function milestoneIsPast(milestone: Milestone): boolean {
  const now = new Date()
  const end = new Date(milestone.date)
  end.setHours(23, 59, 59, 999)
  return now > end
}

function getSprintMilestones(sprint: Sprint): Milestone[] {
  return milestones.filter(m => {
    const t = m.date.getTime()
    return t >= sprint.startDate.getTime() && t <= sprint.endDate.getTime()
  })
}

function getMilestonePercent(milestone: Milestone, sprint: Sprint): number {
  const duration = sprint.endDate.getTime() - sprint.startDate.getTime()
  const offset = milestone.date.getTime() - sprint.startDate.getTime()
  return (offset / duration) * 100
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

            <!-- Milestones within this sprint -->
            <div
              v-for="ms in getSprintMilestones(sprint)"
              :key="'ms' + ms.number"
              class="milestone-entry"
              :class="{ past: milestoneIsPast(ms) }"
              :style="{ top: getMilestonePercent(ms, sprint) + '%' }"
            >
              <div class="milestone-diamond"></div>
              <div class="milestone-pill">
                <svg xmlns="http://www.w3.org/2000/svg" class="milestone-icon" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M282.87-391.87v234.5q0 19.15-13.17 32.33-13.18 13.17-32.33 13.17t-32.33-13.17q-13.17-13.18-13.17-32.33v-605.26q0-19.15 13.17-32.33 13.18-13.17 32.33-13.17h291.78q16.15 0 28.59 10.31 12.43 10.32 15.91 26.23l9.05 43.46h179.93q19.15 0 32.33 13.17 13.17 13.18 13.17 32.33v325.26q0 19.15-13.17 32.33-13.18 13.17-32.33 13.17H550.85q-16.15 0-28.59-10.31-12.43-10.32-15.91-26.23l-9.05-43.46H282.87Zm305.76-11h128.5v-234.26H544.91q-16.15 0-28.58-10.32-12.44-10.31-15.92-26.22l-9.04-43.46h-208.5v234.26h252.22q16.15 0 28.58 10.32 12.44 10.31 15.92 26.22l9.04 43.46ZM500-560Z"/></svg>
                <span class="milestone-number mono">{{ ms.number }}</span>
                <div class="milestone-tooltip">
                  <span class="tooltip-title">{{ ms.title }}</span>
                  <span class="tooltip-date mono">
                    {{ ms.approximate ? '~' : '' }}{{ formatDate(ms.date) }}
                  </span>
                </div>
              </div>
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
  margin-left: 2.5rem;

  &:last-child {
    margin-bottom: 0;
  }
}

.sprint-marker {
  position: absolute;
  left: -4.5rem;
  top: 1.5rem;
  width: 1rem;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: '';
    position: absolute;
    left: calc(100% + 1px);
    top: 50%;
    width: calc(3.5rem - 1px);
    height: 1px;
    background: var(--color-border);
    opacity: 0.5;
  }
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

// ===== MILESTONE =====
.milestone-entry {
  position: absolute;
  left: -4.5rem;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  z-index: 5;
}

.milestone-diamond {
  width: 10px;
  height: 10px;
  background: var(--color-primary);
  border-radius: 2px;
  transform: rotate(45deg);
  flex-shrink: 0;
  margin-left: 3px;

  .past & {
    background: var(--color-text-light);
  }
}

.milestone-pill {
  display: flex;
  align-items: center;
  gap: 0.2rem;
  margin-left: 0.3rem;
  padding: 0.2rem 0.5rem 0.2rem 0.35rem;
  background: rgba(220, 78, 78, 0.08);
  border: 1px solid rgba(220, 78, 78, 0.25);
  border-radius: 999px;
  position: relative;
  cursor: default;

  .past & {
    background: var(--color-bg-light);
    border-color: var(--color-border);
  }

  &:hover .milestone-tooltip {
    opacity: 1;
    transform: translateY(-50%);
    pointer-events: auto;
  }
}

.milestone-icon {
  width: 16px;
  height: 16px;
  color: var(--color-primary);
  flex-shrink: 0;

  .past & {
    color: var(--color-text-light);
  }
}

.milestone-number {
  font-size: 0.9rem;
  line-height: 1.2;
  font-weight: 600;
  color: var(--color-primary);
  flex-shrink: 0;

  .past & {
    color: var(--color-text-light);
  }
}

.milestone-tooltip {
  position: absolute;
  left: calc(100% + 0.75rem);
  top: 50%;
  transform: translateY(-50%) translateX(4px);
  background: var(--color-white);
  border: 1px solid var(--color-border);
  padding: 0.5rem 0.75rem;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s ease, transform 0.15s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;

  &::before {
    content: '';
    position: absolute;
    left: -6px;
    top: 50%;
    transform: translateY(-50%) rotate(45deg);
    width: 10px;
    height: 10px;
    background: var(--color-white);
    border-left: 1px solid var(--color-border);
    border-bottom: 1px solid var(--color-border);
  }
}

.tooltip-title {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--color-text);
}

.tooltip-date {
  font-size: 0.7rem;
  color: var(--color-text-light);
}

// ===== RESPONSIVE =====
@media (max-width: 768px) {
  .timeline {
    padding-left: 1.5rem;
  }

  .sprint-marker {
    left: -1.5rem;
  }

  .milestone-entry {
    left: -1.5rem;
  }

  .sprint-card {
    padding: 1.25rem 1.5rem;
  }
}
</style>
