<script setup lang="ts">
</script>

<template>
  <section id="about" class="project-brief">
    <div class="container">
      <div class="section-header">
        <span class="section-number mono">// PROJECT</span>
        <h2>About the Project</h2>
      </div>

      <div class="brief-content">
        <div class="brief-text">
          <h3>Configurable Mixing Cell</h3>
          <p>
            Rokaro is designing a mixing cell for packaging production lines. The cell receives
            products from two input lines, mixes them to match a configurable sequence, and sends
            the result down two output lines — enabling multi-variant case packing for snack bags.
          </p>
          <p>
            In collaboration with Tronrud Engineering, the team is developing the system architecture,
            including mechanical design, software control, and robust failure handling at 280 bags per minute.
          </p>
          <router-link :to="{ name: 'project' }" class="read-more">
            Read full project description
            <span class="arrow">→</span>
          </router-link>
        </div>

        <div class="brief-visual">
          <div class="diagram-box">
            <div class="diagram-label mono">SYSTEM OVERVIEW</div>
            <div class="flow-diagram">
              <div class="flow-inputs">
                <div class="flow-input input-a">
                  <span class="flow-tag mono">IN:A</span>
                </div>
                <div class="flow-input input-b">
                  <span class="flow-tag mono">IN:B</span>
                </div>
              </div>
              <div class="flow-cell">
                <img src="/favicon.png" alt="Sorting Cell" />
                <span class="mono">CELL</span>
              </div>
              <div class="flow-outputs">
                <div class="flow-output">
                  <span class="flow-tag mono">OUT:L</span>
                  <span class="flow-sequence mono">AABB</span>
                </div>
                <div class="flow-output">
                  <span class="flow-tag mono">OUT:R</span>
                  <span class="flow-sequence mono">BBBA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.project-brief {
  background: var(--color-white);
  padding-bottom: 3rem; // a bit shorter to stay closer to current sprint section
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.section-number {
  font-size: 0.75rem;
  color: var(--color-text-light);
  letter-spacing: 0.1em;
}

.brief-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: center;
}

.brief-text {
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1.25rem;
  }

  p {
    font-size: 1.05rem;
    line-height: 1.8;
    color: var(--color-text);
  }
}

.read-more {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--color-primary);
  margin-top: 0.5rem;
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

// ===== DIAGRAM =====
.diagram-box {
  background: var(--color-bg-light);
  border: 1px solid var(--color-border);
  padding: 1.5rem;
}

.diagram-label {
  font-size: 0.7rem;
  color: var(--color-text-light);
  letter-spacing: 0.1em;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--color-border);
}

.flow {
  &-diagram {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    padding: 1rem 0;
  }

  &-inputs,
  &-outputs {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &-input,
  &-output {
    padding: 0.75rem 1rem;
    border: 2px solid;
    text-align: center;
  }

  &-input {
    &.input-a {
      border-color: var(--color-primary);
      background: rgba(220, 78, 78, 0.1);
    }

    &.input-b {
      border-color: var(--color-text);
      background: rgba(88, 90, 87, 0.1);
    }
  }

  &-output {
    border-color: var(--color-text);
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  &-tag {
    font-size: 0.7rem;
    letter-spacing: 0.05em;
  }

  &-sequence {
    font-size: 0.8rem;
    color: var(--color-primary);
    font-weight: 600;
  }

  &-cell {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
    background: var(--color-white);
    border: 2px solid var(--color-primary);

    img {
      width: 50px;
      height: 50px;
      object-fit: contain;
    }

    span {
      font-size: 0.65rem;
      letter-spacing: 0.1em;
      color: var(--color-text-light);
    }
  }
}

@media (max-width: 768px) {
  .brief-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .section-header {
    margin-bottom: 2rem;
  }
}
</style>
