<script setup lang="ts">

</script>

<template>
  <section id="about" class="about" >
    <div class="container">
      <div class="section-header">
        <span class="section-number mono">01</span>
        <h2>Project Description</h2>
      </div>

      <!-- Row 1: Concept -->
      <div class="content-row">
        <div class="content-text">
          <div class="row-label mono">// CONCEPT</div>
          <h3>Configurable Sorting Logic</h3>
          <p>
            Rokaro develops an industrial sorting cell for Tronrud Engineering.
            The cell receives products from two separate input lines (A and B) and
            sorts them into two output lines based on a configurable sequence.
          </p>
          <p>
            For example, the left output can be configured for sequence
            <code class="code mono">AABBAA</code> while the right output receives
            <code class="code mono">BBAABB</code>. This flexibility enables
            customized sorting for various production requirements.
          </p>
        </div>
        <div class="content-visual">
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
              <div class="flow-arrows">
                <svg viewBox="0 0 60 80" class="arrow-svg">
                  <path d="M10 10 L30 40 L10 70" fill="none" stroke="var(--color-primary)" stroke-width="2" />
                  <path d="M50 10 L30 40 L50 70" fill="none" stroke="var(--color-text)" stroke-width="2" />
                </svg>
              </div>
              <div class="flow-cell">
                <img src="/favicon.png" alt="Sorting Cell" />
                <span class="mono">CELL</span>
              </div>
              <div class="flow-arrows">
                <svg viewBox="0 0 60 80" class="arrow-svg">
                  <path d="M30 40 L10 10" fill="none" stroke="var(--color-text)" stroke-width="2" />
                  <path d="M30 40 L50 10" fill="none" stroke="var(--color-text)" stroke-width="2" />
                  <path d="M30 40 L10 70" fill="none" stroke="var(--color-text)" stroke-width="2" />
                  <path d="M30 40 L50 70" fill="none" stroke="var(--color-text)" stroke-width="2" />
                </svg>
              </div>
              <div class="flow-outputs">
                <div class="flow-output">
                  <span class="flow-tag mono">OUT:L</span>
                  <span class="flow-sequence mono">AABBAA</span>
                </div>
                <div class="flow-output">
                  <span class="flow-tag mono">OUT:R</span>
                  <span class="flow-sequence mono">BBAABB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Row 2: Product -->
      <div class="content-row reverse">
        <div class="content-text">
          <div class="row-label mono">// PRODUCT</div>
          <h3>Bag Handling System</h3>
          <p>
            The sorting cell is designed to handle bags in a production line,
            such as potato chip bags. Products arrive from two separate lines
            and must be sorted and combined in the correct sequence for packaging.
          </p>
          <p>
            The system must handle varying speeds, different bag sizes, and ensure
            products arrive in the correct sequence without damage.
          </p>
        </div>
        <div class="content-visual">
          <div class="conveyor-box">
            <div class="diagram-label mono">CONVEYOR SIMULATION</div>
            <div class="conveyor-track">
              <div class="conveyor-belt">
                <div class="belt-segment"></div>
                <div class="belt-segment"></div>
                <div class="belt-segment"></div>
                <div class="belt-segment"></div>
                <div class="belt-segment"></div>
                <div class="belt-segment"></div>
                <div class="belt-segment"></div>
                <div class="belt-segment"></div>
              </div>
              <div class="bags-container">
                <div class="bag bag-a"><span class="mono">A</span></div>
                <div class="bag bag-b"><span class="mono">B</span></div>
                <div class="bag bag-a"><span class="mono">A</span></div>
                <div class="bag bag-b"><span class="mono">B</span></div>
                <div class="bag bag-a"><span class="mono">A</span></div>
                <div class="bag bag-b"><span class="mono">B</span></div>
              </div>
              <div class="conveyor-wheel wheel-left"></div>
              <div class="conveyor-wheel wheel-right"></div>
            </div>
            <div class="conveyor-label mono">Product flow direction →</div>
          </div>
        </div>
      </div>

      <div class="section-header">
        <span class="section-number mono">02</span>
        <h2>Our goal (what this entails)</h2>
      </div>

      <!-- Row 3: Analysis -->
      <div class="content-row">
        <div class="content-text">
          <div class="row-label mono">// ANALYSIS</div>
          <h3>Scenario Testing</h3>
          <p>
            A significant part of the project involves analyzing various scenarios
            that can occur in production. The sorting cell must be robust and handle
            many different situations without causing stops or product loss.
          </p>
          <p>
            We conduct thorough analyses of potential failure situations and develop
            strategies for how the system should respond in each case.
          </p>
        </div>
        <div class="content-visual">
          <div class="scenarios-box">
            <div class="diagram-label mono">FAILURE SCENARIOS</div>
            <div class="scenarios-list">
              <div
                  v-for="(scenario, i) in scenarios"
                  :key="scenario.icon"
                  class="scenario-item"
                  :style="{opacity: 1 - i*0.15}"
              >
                <span class="scenario-num mono">{{ scenario.icon }}</span>
                <span class="scenario-text">{{ scenario.text }}</span>
                <span class="scenario-arrow">→</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Row 4: Robustness -->
      <div class="content-row reverse">
        <div class="content-text">
          <div class="row-label mono">// DESIGN</div>
          <h3>Robust Architecture</h3>
          <p>
            The goal is to develop a system that is reliable in an industrial setting.
            This requires consideration of both normal operating conditions and
            unexpected situations.
          </p>
          <p>
            Through systematic testing and analysis, we ensure that the sorting cell
            can be seamlessly integrated into existing production lines at Tronrud Engineering.
          </p>
        </div>
        <div class="content-visual">
          <div class="robust-box">
            <div class="diagram-label mono">SYSTEM FEATURES</div>
            <div class="features-grid">
              <div class="feature-item">
                <div class="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <span class="feature-label mono">Error Handling</span>
              </div>
              <div class="feature-item">
                <div class="feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M40-480v-80h80v80H40Zm800 0v-80h80v80h-80ZM40-640v-80h80v80H40Zm800 0v-80h80v80h-80ZM40-800v-80h80v80H40Zm160 320v-80h80v80h-80Zm480 0v-80h80v80h-80Zm160-320v-80h80v80h-80Zm-640 0v-80h80v80h-80Zm160 0v-80h80v80h-80Zm160 0v-80h80v80h-80Zm160 0v-80h80v80h-80ZM473-40q-24 0-46-9t-39-26L184-280l33-34q14-14 34-19t40 0l69 20v-327q0-17 11.5-28.5T400-680q17 0 28.5 11.5T440-640v433l-98-28 103 103q6 6 13 9t15 3h167q33 0 56.5-23.5T720-200v-160q0-17 11.5-28.5T760-400q17 0 28.5 11.5T800-360v160q0 66-47 113T640-40H473Zm7-280v-160q0-17 11.5-28.5T520-520q17 0 28.5 11.5T560-480v160h-80Zm120 0v-120q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440v120h-80Zm40 200H445h195Z"/></svg>
                </div>
                <span class="feature-label mono">Sensible Interface</span>
              </div>
              <div class="feature-item">
                <div class="feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M440-280h80l12-60q12-5 22.5-10.5T576-364l58 18 40-68-46-40q2-14 2-26t-2-26l46-40-40-68-58 18q-11-8-21.5-13.5T532-620l-12-60h-80l-12 60q-12 5-22.5 10.5T384-596l-58-18-40 68 46 40q-2 14-2 26t2 26l-46 40 40 68 58-18q11 8 21.5 13.5T428-340l12 60Zm40-120q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg>
                </div>
                <span class="feature-label mono">Durable Mechanisms</span>
              </div>
              <div class="feature-item">
                <div class="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <path d="M14 2v6h6"/>
                    <path d="M16 13H8"/>
                    <path d="M16 17H8"/>
                  </svg>
                </div>
                <span class="feature-label mono">Event Logging</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

</template>

<style scoped lang="scss">
// ===== ANIMATIONS =====
@keyframes beltMove {
  0% { transform: translateX(0); }
  100% { transform: translateX(100%); }
}

@keyframes bagsMove {
  0% { transform: translateX(100px); }
  100% { transform: translateX(-100px); }
}

// ===== SECTION COMMON =====
.section {
  &-header {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 4rem;
  }

  &-number {
    font-size: 0.85rem;
    color: var(--color-primary);
    letter-spacing: 0.05em;
  }
}

// ===== ABOUT SECTION =====
.about {
  background: var(--color-white);
  position: relative;
}

// ===== CONTENT ROWS =====
.content-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: center;
  margin-bottom: 6rem;

  &:last-child {
    margin-bottom: 0;
  }

  &.reverse {
    direction: rtl;

    > * {
      direction: ltr;
    }
  }
}

.content-text {
  h3 {
    color: var(--color-text);
    font-size: 1.5rem;
    margin-bottom: 1.25rem;
  }

  p {
    font-size: 1.05rem;
    line-height: 1.8;
    color: var(--color-text);

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.row-label {
  font-size: 0.75rem;
  color: var(--color-text-light);
  letter-spacing: 0.1em;
  margin-bottom: 0.75rem;
}

.code {
  background: var(--color-bg-light);
  padding: 0.15rem 0.5rem;
  border: 1px solid var(--color-border);
  color: var(--color-primary);
  font-size: 0.9em;
}

// ===== DIAGRAM BOXES =====
.diagram-box,
.conveyor-box,
.scenarios-box,
.robust-box {
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

// ===== FLOW DIAGRAM =====
.flow {
  &-diagram {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
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

  &-arrows {
    width: 40px;

    .arrow-svg {
      width: 100%;
      height: 60px;
    }
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

// ===== CONVEYOR =====
.conveyor {
  &-track {
    position: relative;
    padding: 2rem 1rem;
    background: var(--color-white);
    border: 1px solid var(--color-border);
    overflow: hidden;
  }

  &-belt {
    display: flex;
    gap: 2px;
    position: absolute;
    bottom: 1rem;
    left: 1.5rem;
    right: 1.5rem;

    .belt-segment {
      flex: 1;
      height: 8px;
      background: var(--color-border);
      animation: beltMove 0.5s linear infinite;

      &:nth-child(even) {
        background: var(--color-text-light);
      }
    }
  }

  &-wheel {
    position: absolute;
    width: 24px;
    height: 24px;
    background: var(--color-text);
    border-radius: 50%;
    bottom: 0.25rem;
    border: 3px solid var(--color-text-light);

    &.wheel-left { left: 0.5rem; }
    &.wheel-right { right: 0.5rem; }
  }

  &-label {
    text-align: center;
    margin-top: 1.5rem;
    font-size: 0.7rem;
    color: var(--color-text-light);
    letter-spacing: 0.05em;
  }
}

.bags-container {
  display: flex;
  gap: 1.25rem;
  justify-content: center;
  animation: bagsMove 8s linear infinite;
}

.bag {
  width: 44px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-white);
  font-size: 0.9rem;
  font-weight: 600;
  border: 2px solid;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 6px;
    background: inherit;
    border: 2px solid;
    border-color: inherit;
    border-bottom: none;
  }

  &-a {
    background: var(--color-primary);
    border-color: var(--color-primary-dark);

    &::before {
      background: var(--color-primary);
      border-color: var(--color-primary-dark);
    }
  }

  &-b {
    background: var(--color-text);
    border-color: #3d3f3c;

    &::before {
      background: var(--color-text);
      border-color: #3d3f3c;
    }
  }
}

// ===== SCENARIOS =====
.scenarios {
  &-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    max-height: 23rem; // made to match approx 4,5 scenarios
    overflow: hidden;
  }
}

.scenario {
  &-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: var(--color-white);
    border: 1px solid var(--color-border);
    border-left: 3px solid var(--color-primary);
  }

  &-num {
    font-size: 0.7rem;
    color: var(--color-primary);
    letter-spacing: 0.05em;
  }

  &-text {
    flex: 1;
    font-size: 0.95rem;
  }

  &-arrow {
    color: var(--color-text-light);
    font-size: 1.2rem;
    opacity: 0;
    transform: translateX(-10px);
    transition: all 0.2s ease;
  }
}

// ===== FEATURES =====
.features-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.feature {
  &-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    padding: 1.5rem 1rem;
    background: var(--color-white);
    border: 1px solid var(--color-border);
    transition: border-color 0.2s ease;

    &:hover {
      border-color: var(--color-primary);
    }
  }

  &-icon {
    width: 32px;
    height: 32px;
    color: var(--color-primary);

    svg {
      width: 100%;
      height: 100%;
    }
  }

  &-label {
    font-size: 0.7rem;
    color: var(--color-text);
    letter-spacing: 0.05em;
    text-align: center;
  }
}

// ===== RESPONSIVE =====
@media (max-width: 1024px) {
  .content-row {
    gap: 3rem;
  }
}

@media (max-width: 768px) {
  .section-header {
    margin-bottom: 2.5rem;
  }

  .content-row {
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-bottom: 4rem;

    &.reverse {
      direction: ltr;
    }
  }

  .flow {
    &-diagram {
      flex-wrap: wrap;
      gap: 1rem;
    }

    &-arrows {
      display: none;
    }
  }

  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>