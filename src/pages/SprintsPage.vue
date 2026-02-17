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
                <svg xmlns="http://www.w3.org/2000/svg" class="milestone-icon" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M838.09-131v-640H121.91v281.91q0 19.16-13.17 32.33-13.17 13.17-32.33 13.17-19.15 0-32.32-13.17-13.18-13.17-13.18-32.33V-771q0-37.54 26.73-64.27Q84.38-862 121.91-862h716.18q37.53 0 64.27 26.73 26.73 26.73 26.73 64.27v554.5q0 35.27-26.73 60.38Q875.62-131 838.09-131ZM240.07-447.84q-49.16-49.27-49.16-118.86 0-69.58 49.16-118.74 49.15-49.15 118.73-49.15 69.59 0 118.86 49.15 49.27 49.16 49.27 118.74 0 69.59-49.27 118.86-49.27 49.27-118.86 49.27-69.58 0-118.73-49.27Zm173.21-64.38q22.65-22.65 22.65-54.47 0-31.81-22.65-54.35-22.65-22.55-54.47-22.55-31.81 0-54.35 22.55-22.55 22.54-22.55 54.35 0 31.82 22.55 54.47 22.54 22.65 54.35 22.65 31.82 0 54.47-22.65ZM121.91-62.3q-37.78 0-64.39-26.61T30.91-153.3v-29.61q0-36.24 18.58-66.61 18.58-30.37 49.73-46.33 62.71-31.24 127.66-46.98 64.95-15.74 131.92-15.74 67.44 0 132.52 15.62 65.07 15.62 127.31 46.86 31.15 15.96 49.73 46.25 18.57 30.3 18.57 66.93v29.61q0 37.78-26.6 64.39-26.61 26.61-64.4 26.61H121.91Zm0-91h474.02v-28.42q0-10.77-5.5-19.58-5.5-8.81-14.5-13.7-52.56-26.04-106.84-39.3-54.29-13.26-110.29-13.26-55.59 0-110.2 13.26Q194-241.04 141.91-215q-9 4.89-14.5 13.7-5.5 8.81-5.5 19.58v28.42ZM358.8-566.7Zm0 413.4Z"/></svg>
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
  margin-left: 2rem;

  &:last-child {
    margin-bottom: 0;
  }
}

.sprint-marker {
  position: absolute;
  left: -4rem;
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

// ===== MILESTONE =====
.milestone-entry {
  position: absolute;
  left: -4rem;
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
