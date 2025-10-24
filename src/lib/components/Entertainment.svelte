<script>
  import ProductTable from './ProductTable.svelte';
  
  let products = [
    { vendor: '', description: '', unitPrice: '' }
  ];
  
  const columns = [
    { key: 'vendor', label: 'Vendor', type: 'input', placeholder: 'Enter vendor name' },
    { key: 'description', label: 'Description', type: 'input', placeholder: 'Enter description' },
    { key: 'unitPrice', label: 'Unit Price', type: 'number' }
  ];
  
  function addProduct() {
    products = [...products, { vendor: '', description: '', unitPrice: '' }];
  }
  
  function removeProduct(index) {
    products = products.filter((_, i) => i !== index);
  }
</script>

<div>
  <h2 class="text-2xl font-bold text-gray-800 mb-6">Entertainment</h2>
  
  <ProductTable
    {columns}
    data={products}
    onAddProduct={addProduct}
    onRemoveProduct={removeProduct}
  />
</div>