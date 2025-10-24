<script>
  import ProductTable from './ProductTable.svelte';
  
  let products = [
    { vendor: '', unitPrice: '' }
  ];
  
  const columns = [
    { key: 'vendor', label: 'Vendor', type: 'input', placeholder: 'Enter vendor name' },
    { key: 'unitPrice', label: 'Unit Price', type: 'number' }
  ];
  
  function addProduct() {
    products = [...products, { vendor: '', unitPrice: '' }];
  }
  
  function removeProduct(index) {
    products = products.filter((_, i) => i !== index);
  }
</script>

<div>
  <h2 class="text-2xl font-bold text-gray-800 mb-6">Rias & Busana</h2>
  
  <ProductTable
    {columns}
    data={products}
    onAddProduct={addProduct}
    onRemoveProduct={removeProduct}
  />
</div>