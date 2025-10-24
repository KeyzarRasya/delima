<script>
  import ProductTable from './ProductTable.svelte';
  
  let products = [
    { category: '', item: '', unitPrice: '', keterangan: '' }
  ];
  
  const categories = [
    'Sound System',
    'Lighting',
    'Furniture',
    'Generator',
    'Cooling System',
    'Others'
  ];
  
  const columns = [
    { key: 'category', label: 'Category', type: 'dropdown', options: categories },
    { key: 'item', label: 'Item', type: 'input', placeholder: 'Enter item name' },
    { key: 'unitPrice', label: 'Unit Price', type: 'number' },
    { key: 'keterangan', label: 'Keterangan', type: 'input', placeholder: 'Enter notes' }
  ];
  
  function addProduct() {
    products = [...products, { category: '', item: '', unitPrice: '', keterangan: '' }];
  }
  
  function removeProduct(index) {
    products = products.filter((_, i) => i !== index);
  }
</script>

<div>
  <h2 class="text-2xl font-bold text-gray-800 mb-6">Pendukung</h2>
  
  <ProductTable
    {columns}
    data={products}
    onAddProduct={addProduct}
    onRemoveProduct={removeProduct}
  />
</div>