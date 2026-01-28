<script setup lang="ts">

import SimProduct from "./SimProduct.vue";
import {Prod, ProdA, ProdB, Product} from "../Product.ts";
import {computed, onMounted, ref} from "vue";

enum Band {
  Up,
  Down
}

const scrollTick = ref(0)
const scrollLength = computed(() => {
  scrollTick.value // 👈 dependency trigger

  if (!scrolling.value) return 0

  return 84 - scrolling.value.getBoundingClientRect().top
})
const scrolling = ref<HTMLElement | null>(null);
const currectScrollSection = computed(()=>Math.floor(scrollLength.value / SECTION_HEIGHT))
const currentPeriod = computed(()=>currectScrollSection.value < 1 ? 1000 : 1000/(280000/60000))
const animSpeed = computed(()=>currentPeriod.value/1000 + "s");
// Slot pattern: FS S S S FS (5 slots)
// FS = fading, S = static visible
// Products track their own opacity for smooth transitions

class Conveyor<P extends Product> {
  slots: (P | null)[];
  exiting: P[];  // Products fading out (kept for animation)
  capacity: number;
  phaseIn: Prod | undefined;

  constructor(capacity: number, phaseIn: Prod | undefined) {
    this.capacity = capacity;
    this.phaseIn = phaseIn;
    this.slots = new Array(capacity).fill(null);
    this.exiting = [];

    // If input conveyor, fill all slots
    if (phaseIn !== undefined) {
      for (let i = 0; i < capacity; i++) {
        const p = this.createProduct() as P;
        p.opacity = this.getOpacityForIndex(i);
        this.slots[i] = p;
      }
    }
  }

  createProduct(): Product {
    const p = this.phaseIn === Prod.A ? new ProdA() : new ProdB();
    p.opacity = 0; // Start invisible, will fade in
    return p;
  }

  getOpacityForIndex(index: number): number {
    // Input conveyors: fade on left (index 0), full opacity near cell (right side)
    // Output conveyors: full opacity near cell (index 0), fade on right (far side)
    if (this.phaseIn !== undefined) {
      // Input conveyor - fade at index 0 (far from cell)
      if (index === 0) return 0.3;
    } else {
      // Output conveyor - fade at last index (far from cell)
      if (index === this.capacity - 1) return 0.3;
    }
    return 1;
  }

  // Pop from right side (for input conveyors)
  pop(): P | undefined {
    const leaving = this.slots[this.capacity - 1];
    if (!leaving) return undefined;

    // For input conveyors, product slides into the cell (covered by cell's z-index)
    // No need for exiting array - cell covers the product as it slides in

    // Shift all products right
    const newSlots: (P | null)[] = new Array(this.capacity).fill(null);

    // New product enters at index 0
    if (this.phaseIn !== undefined) {
      const newProd = this.createProduct() as P;
      newSlots[0] = newProd;
      // Fade in after a tick
      setTimeout(() => {
        newProd.opacity = this.getOpacityForIndex(0);
      }, 20);
    }

    // Shift existing: slot[i] moves to slot[i+1]
    for (let i = 0; i < this.capacity - 1; i++) {
      const product = this.slots[i];
      if (product) {
        product.opacity = this.getOpacityForIndex(i + 1);
        product.move(currentPeriod.value); // Trigger slide animation
        newSlots[i + 1] = product;
      }
    }

    this.slots = newSlots;
    return leaving;
  }

  // Queue from left side (for output conveyors)
  queue(product: P): void {
    // Shift existing right, dropping rightmost if full
    const newSlots: (P | null)[] = new Array(this.capacity).fill(null);

    // New product at index 0 - coming from cell, starts at full opacity
    product.opacity = 1;
    product.move(currentPeriod.value); // Trigger slide animation
    newSlots[0] = product;

    // Shift existing - trigger move animation on each
    for (let i = 0; i < this.capacity - 1; i++) {
      const existing = this.slots[i];
      if (existing) {
        existing.opacity = this.getOpacityForIndex(i + 1);
        existing.move(currentPeriod.value); // Trigger slide animation
        newSlots[i + 1] = existing;
      }
    }

    // Handle overflow - rightmost product exits
    const overflow = this.slots[this.capacity - 1];
    if (overflow) {
      overflow.opacity = 0;
      this.exiting = [...this.exiting, overflow];
      setTimeout(() => {
        this.exiting = this.exiting.filter(p => p !== overflow);
      }, currentPeriod.value/2);
    }

    this.slots = newSlots;
  }
}

const input1 = ref(new Conveyor<ProdA>(6, Prod.A));
const input2 = ref(new Conveyor<ProdB>(6, Prod.B));

let output1 = ref(new Conveyor<Product>(5, undefined));
let output2 = ref(new Conveyor<Product>(5, undefined));

class OutputConfig {
  receptO1: Prod[] = []
  receptO2: Prod[] = []

  // index of the prod to output next
  private iO1: number = 0;
  private iO2: number = 0;

  constructor(receptO1: Prod[], receptO2: Prod[]) {
    this.receptO1 = receptO1
    this.receptO2 = receptO2
  }

  getNextO1(): Prod {
    const out = this.receptO1[this.iO1]
    return out!;
  }
  getNextO2(): Prod {
    const out = this.receptO2[this.iO2]
    return out!;
  }

  incrementO1(): void {
    this.iO1 = (this.iO1 + 1) % this.receptO1.length;
  }

  incrementO2(): void {
    this.iO2 = (this.iO2 + 1) % this.receptO2.length;
  }

  updateReciept1(text: string): void {
    this.receptO1 = this.generateRecieptFromText(text)
    this.iO1 = 0; // Reset index to avoid out of bounds
  }

  updateReciept2(text: string): void {
    this.receptO2 = this.generateRecieptFromText(text)
    this.iO2 = 0; // Reset index to avoid out of bounds
  }

  generateRecieptFromText(text: string): Prod[] {
    const newReciept: Prod[] = []
    for (const c of text) {
      if (c == "A") {
        newReciept.push(Prod.A)
      } else if (c == "B") {
        newReciept.push(Prod.B)
      }
    }
    return newReciept;
  }
}

const processOutput1 = (oConfig: OutputConfig): boolean => {
  if (oConfig.receptO1.length === 0) return false;
  const nextProd = oConfig.getNextO1();
  if (nextProd === Prod.A) {
    const fulfilment = input1.value.pop();
    if (fulfilment) {
      output1.value.queue(fulfilment);
      oConfig.incrementO1();
      return true;
    }
  } else if (nextProd === Prod.B) {
    const fulfilment = input2.value.pop();
    if (fulfilment) {
      output1.value.queue(fulfilment);
      oConfig.incrementO1();
      return true;
    }
  }
  return false;
};

const processOutput2 = (oConfig: OutputConfig): boolean => {
  if (oConfig.receptO2.length === 0) return false;
  const nextProd = oConfig.getNextO2();
  if (nextProd === Prod.A) {
    const fulfilment = input1.value.pop();
    if (fulfilment) {
      output2.value.queue(fulfilment);
      oConfig.incrementO2();
      return true;
    }
  } else if (nextProd === Prod.B) {
    const fulfilment = input2.value.pop();
    if (fulfilment) {
      output2.value.queue(fulfilment);
      oConfig.incrementO2();
      return true;
    }
  }
  return false;
};

const update = (oConfig: OutputConfig, toProcess: Band): void => {
  if (toProcess == Band.Up) {
    // Try output1 first, fall back to output2 if blocked
    if (!processOutput1(oConfig)) {
      processOutput2(oConfig);
    }
  } else {
    // Try output2 first, fall back to output1 if blocked
    if (!processOutput2(oConfig)) {
      processOutput1(oConfig);
    }
  }
}

const SECTION_HEIGHT = 300;

let toProcess: Band = Band.Up;
const receipt1Text = ref("ABBA");
const receipt2Text = ref("ABAB");


const config = new OutputConfig(
    [Prod.A, Prod.B, Prod.B, Prod.A],
    [Prod.A, Prod.B, Prod.A, Prod.B],
);

const onReceipt1Change = () => {
  config.updateReciept1(receipt1Text.value);
};

const onReceipt2Change = () => {
  config.updateReciept2(receipt2Text.value);
};

const timeoutAction = () => {
  setTimeout(()=>{
    update(config, toProcess);
    toProcess = toProcess == Band.Up ? Band.Down : Band.Up;
    timeoutAction()
  }, currentPeriod.value)
}


onMounted(() => {
  console.log("test")
  timeoutAction()
  window.addEventListener("scroll", () => {
    scrollTick.value++
  })
})



</script>

<template>
<div ref="scrolling" class="scrollable-section">

  <div class="main-container">
    <div class="conveyor-col inputs">
      <div class="row">
        <SimProduct v-for="p in input1.slots.filter(s => s)" :key="p!.id" :product="p!" :style="{opacity: p!.opacity}" :anim-speed="animSpeed" class="product" />
        <SimProduct v-for="exit in input1.exiting" :key="'exit-'+exit.id" :product="exit" :style="{opacity: exit.opacity}" :anim-speed="animSpeed" class="product exiting" />
      </div>
      <div class="row">
        <SimProduct v-for="p in input2.slots.filter(s => s)" :key="p!.id" :product="p!" :style="{opacity: p!.opacity}" :anim-speed="animSpeed" class="product" />
        <SimProduct v-for="exit in input2.exiting" :key="'exit-'+exit.id" :product="exit" :style="{opacity: exit.opacity}" :anim-speed="animSpeed" class="product exiting" />
      </div>
    </div>
    <div class="cell-collider">
      <div class="the-cell">
        <div class="hmi">
          <input type="text" v-model="receipt1Text" @input="onReceipt1Change" />
          <input type="text" v-model="receipt2Text" @input="onReceipt2Change" />
        </div>
      </div>
    </div>
    <div class="conveyor-col outputs">
      <div class="row">
        <SimProduct v-for="p in output1.slots.filter(s => s)" :key="p!.id" :product="p!" :style="{opacity: p!.opacity}" :anim-speed="animSpeed" class="product" />
        <SimProduct v-for="exit in output1.exiting" :key="'exit-'+exit.id" :product="exit" :style="{opacity: exit.opacity}" :anim-speed="animSpeed" class="product exiting" />
      </div>
      <div class="row">
        <SimProduct v-for="p in output2.slots.filter(s => s)" :key="p!.id" :product="p!" :style="{opacity: p!.opacity}" :anim-speed="animSpeed" class="product" />
        <SimProduct v-for="exit in output2.exiting" :key="'exit-'+exit.id" :product="exit" :style="{opacity: exit.opacity}" :anim-speed="animSpeed" class="product exiting" />
      </div>
    </div>
  </div>
  <div class="scroll-content">
    <div class="scroll-section basics">
      <div class="container">
        <h3>The concept is straightforward,</h3>
        <p>
          Above is an interactive simulation of how our system will work in practice. It takes two inputs and mixes them according to a given prescription.
        </p>
      </div>
    </div>
    <div class="scroll-section challenges">
      <div class="container">
        <h3>... The path to completion is not</h3>
        <p>
          The system will operate in an environment where speed and efficiency are key. Any failure causes delays in the entire production pipeline. It must handle these demanding conditions continuously over extended periods of time.
        </p>
      </div>
    </div>
    <div class="scroll-section speed">
      <div class="container">
        <h3>All while handling 280 products per minute</h3>
        <p>That's almost five products per second.</p>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">

$maincont-height: 250px;

.main-container {
  height: $maincont-height;
}
.scroll-content {
  display: flex;
  flex-direction: column;

  .scroll-section {
    height: 300px;

    p {
      font-size: 1.2rem;
    }

    .container {
      margin: 2.5rem 0;
      h3 {
        font-size: 2.5rem;
        font-family: var(--font-display);
      }
    }

    &.basics {
      background-color: #cfcccc;
      h3,p {
        color: #343534 !important;
      }
    }

    &.challenges {
      background-color: #2b2a2a;
      h3,p {
        color: #b5b5b5 !important;
      }
    }

    &.speed {
      background-color: var(--color-primary);
      h3,p {
        color: white !important;
      }
    }
  }
}

.the-cell {
  position: relative;

  .hmi {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    top: 0;
    right: 0;
    bottom: 0;
    gap: 1rem;

    input {
      transition: background-color 0.3s;
      margin: 0.55rem 1rem;
      width: 5rem;
      font-size: 1.3rem;
      border-radius: 0.2rem;
      border: solid 1px #3d3f3c;
      background-color: rgb(81, 81, 80);
      color: #d4d4d3;
      font-family: monospace;
      padding: 0.1rem 0.2rem;
      text-align: center;

      &:hover{
        background-color: #404040;
      }
      &:focus {
        outline: none;
        background-color: #2b2b2b;
      }
    }
  }
}



.scrollable-section {
  position: relative;
}

.row {
  display: flex;
  flex-direction: row;
  position: relative;
}

.product {
  transition: opacity 0.3s ease;
}

.product.exiting {
  position: absolute;
  right: 0;
}



.main-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background: #e2e2e2;
  position: sticky;
  top: var(--header-height); // the same as passive header height
  z-index: 9;

  .conveyor-col {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .row {
      gap: 0.5rem;
      margin: 0.5rem;
    }

    &.inputs {
      .row {
        justify-content: end;
        // Shift right so rightmost product is hidden under the cell
        transform: translateX(2.5rem);
      }
    }
    &.outputs {
      .row {
        justify-content: start;
      }
    }
  }
  .cell-collider {
    position: relative;
    width: 10rem;
    height: 10rem;
    .the-cell {
      position: absolute;
      top: 0;
      bottom: 0;
      left: -1.3rem;
      right: -1.3rem;
      background: #585a57;
      border-radius: 0.3rem;
      z-index: 10;
    }
  }
}
</style>