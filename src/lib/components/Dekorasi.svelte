<script>
  import ProductTable from './ProductTable.svelte';
  
  let dekorasiProducts = [
    { vendor: '', unitPrice: '' }
  ];
  
  let addonsProducts = [
    { item: '', unitPrice: '' }
  ];
  
  const dekorasiColumns = [
    { key: 'vendor', label: 'Vendor', type: 'input', placeholder: 'Enter vendor name' },
    { key: 'unitPrice', label: 'Unit Price', type: 'number' }
  ];
  
  const addonsColumns = [
    { key: 'item', label: 'Item', type: 'input', placeholder: 'Enter item name' },
    { key: 'unitPrice', label: 'Unit Price', type: 'number' }
  ];
  
  function addDekorasi() {
    dekorasiProducts = [...dekorasiProducts, { vendor: '', unitPrice: '' }];
  }
  
  function removeDekorasi(index) {
    dekorasiProducts = dekorasiProducts.filter((_, i) => i !== index);
  }
  
  function addAddons() {
    addonsProducts = [...addonsProducts, { item: '', unitPrice: '' }];
  }
  
  function removeAddons(index) {
    addonsProducts = addonsProducts.filter((_, i) => i !== index);
  }
</script>

<div>
  <h2 class="text-2xl font-bold text-gray-800 mb-6">Dekorasi</h2>
  
  <div class="mb-8">
    <ProductTable
      columns={dekorasiColumns}
      data={dekorasiProducts}
      onAddProduct={addDekorasi}
      onRemoveProduct={removeDekorasi}
    />
  </div>
  
  <div class="mt-8">
    <h4 class="text-lg font-semibold text-gray-700 mb-4">Add-ons</h4>
    <ProductTable
      columns={addonsColumns}
      data={addonsProducts}
      onAddProduct={addAddons}
      onRemoveProduct={removeAddons}
    />
  </div>
</div>