<script setup lang="ts">
const PERIOD = 600;

import SimProduct from "./SimProduct.vue";
import {Prod, ProdA, ProdB, Product} from "../Product.ts";
import {onMounted, type Ref, ref} from "vue";

enum Band {
  Up,
  Down
}

class Conveyor<P extends Product> {
  content: P[];
  capacity: number;

  // refill with product when popping something out to keep content at length
  phaseIn: Prod | undefined;


  constructor(conveyor: P[], capacity: number, phaseIn: Prod | undefined) {
    this.content = conveyor;
    this.phaseIn = phaseIn;
    this.capacity = capacity;
  }

  pop(): P | undefined {
    const out = this.content.splice(this.length - 1);
    if (this.phaseIn !== undefined) {
      const currentLength = this.content.length;
      let toAdd: Product[] = [];
      for(let i = 0; i < this.capacity - currentLength; i++) {
        toAdd.push((this.phaseIn == Prod.A) ? new ProdA() : new ProdB());
      }
      this.queue(toAdd as P[])
    }
    this.content.forEach((p: P) => p.move())
    return out[0]
  }

  queue(newProducts: P[]) {
    this.content = [...newProducts, ...this.content];
    this.content.splice(this.capacity - 1);
    this.content.forEach((p: P) => p.move())
  }

  get length() {
    return this.content.length;
  }
}

const input1: Ref<Conveyor<ProdA>> = ref(new Conveyor([new ProdA(), new ProdA(), new ProdA(), new ProdA()], 5, Prod.A));
const input2: Ref<Conveyor<ProdB>> = ref(new Conveyor([new ProdB(), new ProdB(), new ProdB(), new ProdB()], 5, Prod.B));

let output1 = ref(new Conveyor<Product>([],5, undefined));
let output2 = ref(new Conveyor<Product>([], 5, undefined));

class OutputConfig {
  private receptO1: Prod[] = []
  private receptO2: Prod[] = []

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
}

const update = (oConfig: OutputConfig, toProcess: Band): void => {
  // Process one of the outputs
  // MVP; flip flop between each output
  if (toProcess == Band.Up) {
    const nextProd = oConfig.getNextO1();
    if (nextProd == Prod.A) {
      const fulfilment = input1.value.pop();
      if (fulfilment) {
        output1.value.queue([fulfilment]);
        oConfig.incrementO1()
      }
    } else {
      const fulfilment = input2.value.pop()
      if (fulfilment) {
        output1.value.queue([fulfilment]);
        oConfig.incrementO1()
      }
    }

  } else {
    const nextProd = oConfig.getNextO2();
    if (nextProd == Prod.A) {
      const fulfilment = input1.value.pop();
      if (fulfilment) {
        output2.value.queue([fulfilment]);
        oConfig.incrementO2()
      }
    } else {
      const fulfilment = input2.value.pop()
      if (fulfilment) {
        output2.value.queue([fulfilment]);
        oConfig.incrementO2()
      }
    }
  }


}

let toProcess: Band = Band.Up;
const config = new OutputConfig(
    [Prod.A, Prod.B, Prod.B, Prod.A],
    [Prod.A, Prod.B, Prod.A, Prod.B],
);

onMounted(() => {
  console.log("test")
  setInterval(()=>{
    update(config, toProcess);
    toProcess = toProcess == Band.Up ? Band.Down : Band.Up;
  }, PERIOD)
})

</script>

<template>
<div class="scrollable-section">

  <div class="main-container">
    <div class="conveyor-col inputs">
      <div class="row">
        <SimProduct v-for="(p1,i) in input1.content" :product="p1" :class="{faded: i == 0 || i == input1.length - 1}" class="product" />
      </div>
      <div class="row">
        <SimProduct v-for="(p2,i) in input2.content" :product="p2" :class="{faded: i == 0 || i == input1.length - 1}" class="product" />
      </div>
    </div>
    <div class="cell-collider">
      <div class="the-cell">
    </div>

    </div>
    <div class="conveyor-col outputs">

      <div class="row">
        <SimProduct v-for="p1 in output1.content" :product="p1" />
      </div>
      <div class="row">
        <SimProduct v-for="p2 in output2.content" :product="p2" />
      </div>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">



.scrollable-section {
  position: relative;
  height: 100vh;
}

.row {
  display: flex;
  flex-direction: row;
}

.product {
  opacity: 1;
  transition: opacity 0.5s;
  &.faded {
    //opacity: 0;
  }
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
      left: -2.6rem;
      right: -2.6rem;
      background: #585a57;
      border-radius: 0.3rem;
      z-index: 10;
    }
  }
}
</style>