<script setup lang="ts">
</script>

<template>
  <section id="outcomes" class="conclusion">
    <div class="container">
      <div class="section-header">
        <span class="section-number mono">// OUTCOMES</span>
        <h2>Project Concluded</h2>
      </div>

      <p class="conclusion-intro">
        After two semesters of design, simulation, and iteration, the Rokaro bachelor's
        project has reached its conclusion. Below are the resources that came out of our
        work with Tronrud Engineering.
      </p>

      <div class="resource-grid">
        <!-- GitHub: administrative tools -->
        <a
          class="resource-card"
          href="https://github.com/RokaroUSN"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="resource-tag mono">CODE</span>
          <h3>Administrative Tools</h3>
          <p>
            Supporting tools and utilities developed during the project, published on GitHub.
          </p>
          <span class="resource-link">
            View on GitHub
            <span class="arrow">→</span>
          </span>
        </a>

        <!-- Bachelor thesis: not yet published -->
        <div class="resource-card is-pending">
          <span class="resource-tag mono">REPORT</span>
          <h3>Bachelor Thesis</h3>
          <p>
            The full written report documenting our process, design decisions, and results.
          </p>
          <span class="resource-link disabled">Coming soon</span>
        </div>

        <!-- Final presentation -->
        <a
          class="resource-card"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="resource-tag mono">SLIDES</span>
          <h3>Final Presentation</h3>
          <p>
            The slides from our third and final presentation.
          </p>
          <span class="resource-link">
            View presentation
            <span class="arrow">→</span>
          </span>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.conclusion {
  background: var(--color-bg-light);
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.section-number {
  font-size: 0.75rem;
  color: var(--color-text-light);
  letter-spacing: 0.1em;
}

.conclusion-intro {
  max-width: 640px;
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--color-text);
  margin-bottom: 3rem;
}

// ===== RESOURCE GRID =====
.resource-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.resource-card {
  display: flex;
  flex-direction: column;
  background: var(--color-white);
  border: 1px solid var(--color-border);
  padding: 1.75rem;
  color: var(--color-text);
  transition: border-color 0.2s ease, transform 0.2s ease;

  &:not(.is-pending):hover {
    border-color: var(--color-primary);
    transform: translateY(-3px);

    .arrow {
      transform: translateX(3px);
    }
  }

  h3 {
    font-size: 1.25rem;
    margin-bottom: 0.75rem;
  }

  p {
    font-size: 0.95rem;
    line-height: 1.7;
    color: var(--color-text-light);
    margin-bottom: 1.5rem;
    flex: 1;
  }
}

.resource-tag {
  align-self: flex-start;
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  color: var(--color-primary);
  border: 1px solid var(--color-border);
  padding: 0.25rem 0.6rem;
  margin-bottom: 1.25rem;
}

.resource-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--color-primary);

  .arrow {
    transition: transform 0.2s ease;
  }

  &.disabled {
    color: var(--color-text-light);
    font-weight: 400;
    font-style: italic;
  }
}

.is-pending {
  opacity: 0.7;
}

@media (max-width: 1024px) {
  .resource-grid {
    grid-template-columns: 1fr;
    max-width: 560px;
  }
}

@media (max-width: 768px) {
  .section-header {
    margin-bottom: 1.5rem;
  }

  .conclusion-intro {
    margin-bottom: 2rem;
  }
}
</style>