<script setup lang="ts">
</script>

<template>
  <section id="outcomes" class="conclusion">
    <div class="container">
      <div class="conclusion-layout">
        <div class="conclusion-intro-col">
          <div class="section-header">
            <span class="section-number mono">// OUTCOMES</span>
            <h2>Project Concluded</h2>
          </div>
          <p class="conclusion-intro">
            After a semester of design, simulation, and iteration, the Rokaro bachelor's
            project has reached its conclusion. Here are the resources that came out of our
            work.
          </p>
        </div>

        <div class="resource-grid">
          <!-- GitHub: administrative tools -->
          <a
            class="resource-card"
            href="https://github.com/RokaroUSN"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div class="resource-head">
              <h3>Administrative Tools</h3>
              <span class="resource-tag mono">CODE</span>
            </div>
            <div class="resource-foot">
              <p>
                Supporting tools and utilities developed during the project, published on GitHub.
              </p>
              <span class="resource-arrow">→</span>
            </div>
          </a>

          <!-- Bachelor thesis: not yet published -->
          <div class="resource-card is-pending">
            <div class="resource-head">
              <h3>Bachelor Thesis</h3>
              <span class="resource-tag mono">REPORT</span>
            </div>
            <div class="resource-foot">
              <p>
                The full written report documenting our process, design decisions, and results.
              </p>
              <span class="resource-arrow disabled">Soon</span>
            </div>
          </div>

          <!-- Final presentation -->
          <a
            class="resource-card"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div class="resource-head">
              <h3>Final Presentation</h3>
              <span class="resource-tag mono">SLIDES</span>
            </div>
            <div class="resource-foot">
              <p>
                The slides from our third and final presentation.
              </p>
              <span class="resource-arrow">→</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.conclusion {
  background: var(--color-bg-light);
  padding: 3.5rem 0;
}

.conclusion-layout {
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 3rem;
  align-items: start;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.25rem;
}

.section-number {
  font-size: 0.75rem;
  color: var(--color-text-light);
  letter-spacing: 0.1em;
}

.conclusion-intro {
  font-size: 1.05rem;
  line-height: 1.7;
  color: var(--color-text);
  margin-bottom: 0;
}

// ===== RESOURCE CARDS =====
.resource-grid {
  display: flex;
  flex-direction: column;
}

.resource-card {
  display: block;
  position: relative;
  background: var(--color-white);
  border: 1px solid var(--color-border);
  padding: 1.25rem 1.5rem;
  color: var(--color-text);
  transition: border-color 0.2s ease;

  // Overlap adjacent borders so they read as a single shared line
  & + & {
    margin-top: -1px;
  }

  &:not(.is-pending):hover {
    z-index: 1;
    border-color: var(--color-primary);

    .resource-arrow {
      transform: translateX(4px);
    }
  }
}

.resource-head {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.4rem;

  h3 {
    font-size: 1.15rem;
    margin: 0;
  }
}

.resource-tag {
  margin-left: auto;
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  color: var(--color-primary);
  border: 1px solid var(--color-border);
  padding: 0.2rem 0.5rem;
  white-space: nowrap;
}

.resource-foot {
  display: flex;
  align-items: center;
  gap: 1.5rem;

  p {
    flex: 1;
    min-width: 0;
    font-size: 0.9rem;
    line-height: 1.6;
    color: var(--color-text-light);
    margin: 0;
  }
}

.resource-arrow {
  flex-shrink: 0;
  font-size: 1.75rem;
  line-height: 1;
  color: var(--color-primary);
  transition: transform 0.2s ease;

  &.disabled {
    font-size: 0.85rem;
    font-style: italic;
    color: var(--color-text-light);
  }
}

.is-pending {
  opacity: 0.7;
}

@media (max-width: 900px) {
  .conclusion-layout {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>