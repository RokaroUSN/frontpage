<script setup lang="ts">
import { sprints, getSprintStatus } from '../data/sprints'

// Short label for the timeline: the subtitle after "Phase: Subtitle",
// falling back to the phase when there is no meaningful subtitle.
function shortTitle(title: string): string {
  const [phase, ...rest] = title.split(': ')
  const subtitle = rest.join(': ').trim()
  if (!subtitle || subtitle === '-') return phase
  return subtitle
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
</script>

<template>
  <section class="sprint-overview">
    <div class="container">
      <div class="section-header">
        <span class="section-number mono">// SPRINTS</span>
      </div>

      <div class="timeline">
        <div class="timeline-line"></div>
        <div
          v-for="(sprint, i) in sprints"
          :key="sprint.number"
          class="dot-wrap"
          :class="[getSprintStatus(sprint), i % 2 === 0 ? 'above' : 'below']"
          :title="`Sprint ${sprint.number} — ${sprint.title} (${formatDate(sprint.startDate)} → ${formatDate(sprint.endDate)})`"
        >
          <span class="dot"></span>
          <div class="dot-label">
            <span class="dot-num mono">{{ sprint.number }}</span>
            <span class="dot-title">{{ shortTitle(sprint.title) }}</span>
          </div>
        </div>
      </div>

      <router-link :to="{ name: 'sprints' }" class="view-all">
        View sprint details
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
  justify-content: space-between;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.section-number {
  font-size: 0.75rem;
  color: var(--color-text-light);
  letter-spacing: 0.1em;
}

.view-all {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1.5rem;
  font-weight: 600;
  font-size: 1.3rem;
  color: var(--color-primary);
  transition: gap 0.2s ease;

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

// ===== HORIZONTAL TIMELINE =====
$dot-radius: 7px;
$stem-height: 26px;

.timeline {
  position: relative;
  display: flex;
  align-items: center;
  height: 200px;
  padding: 0 0.25rem;
}

.timeline-line {
  position: absolute;
  left: 0.25rem;
  right: 0.25rem;
  top: 50%;
  transform: translateY(-50%);
  height: 2px;
  background: var(--color-border);
}

.dot-wrap {
  position: relative;
  flex: 1;
  min-width: 0;
  height: 100%;
  z-index: 1;
  cursor: default;
}

.dot {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 2 * $dot-radius;
  height: 2 * $dot-radius;
  border-radius: 50%;
  border: 2px solid var(--color-border);
  background: var(--color-white);
  transition: transform 0.15s ease;

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

.dot-wrap:hover .dot {
  transform: translate(-50%, -50%) scale(1.2);
}

// Connector stem between the dot and its label
.dot-wrap::after {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 1px;
  height: $stem-height;
  background: var(--color-border);
}

.dot-wrap.above::after {
  bottom: calc(50% + #{$dot-radius});
}

.dot-wrap.below::after {
  top: calc(50% + #{$dot-radius});
}

// ===== LABELS (alternating above / below) =====
.dot-label {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  padding: 0 0.35rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.1rem;
  text-align: center;
}

.dot-wrap.above .dot-label {
  bottom: calc(50% + #{$dot-radius} + #{$stem-height});
}

.dot-wrap.below .dot-label {
  top: calc(50% + #{$dot-radius} + #{$stem-height});
}

.dot-num {
  font-size: 0.65rem;
  color: var(--color-text-light);

  .active & {
    color: var(--color-primary);
  }
}

.dot-title {
  font-size: 0.72rem;
  line-height: 1.25;
  color: var(--color-text);

  .active & {
    color: var(--color-primary);
    font-weight: 600;
  }

  .upcoming & {
    color: var(--color-text-light);
  }
}

// ===== RESPONSIVE =====
@media (max-width: 768px) {
  .timeline {
    height: 220px;
  }

  .dot {
    width: 12px;
    height: 12px;
  }

  .dot-title {
    font-size: 0.62rem;
  }

  .dot-num {
    font-size: 0.58rem;
  }
}
</style>