<script>
  export let title = "";

  import products, { featuredStore } from "../../stores/defaultProducts";
  import Product from "./Product.svelte";
  import Loading from "../Loading.svelte";

  // $: featured = $products.filter(item => item.featured === true);
</script>

<!-- This block is for the commented out $: featured script above -->
<!-- {#if featured.length === 0}
  <Loading />
{:else}
  <section class="section">
    <h2 class="section-title">{title}</h2>
    <div class="products-center">
      {#each featured as product (product.id)}
        <Product {product} />
      {/each}
    </div>
  </section>
{/if} -->

{#if $featuredStore.length === 0}
  <Loading />
{:else}
  <section class="section">
    <h2 class="section-title">{title}</h2>
    <div class="products-center">
      {#each $featuredStore as product (product.id)}
        <Product {product} />
      {/each}
    </div>
  </section>
{/if}
