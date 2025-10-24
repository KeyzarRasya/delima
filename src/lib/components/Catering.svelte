<script>
  import ProductTable from './ProductTable.svelte';
  import DetailPopup from './DetailPopup.svelte';
  
  let activeTab = 'gubukan-basic';
  let showPopup = false;
  let currentPopupIndex = null;
  
  // Tab 1: Gubukan - Basic
  let gubukanBasicProducts = [
    { category: '', item: '', unitPrice: '' }
  ];
  
  const gubukanBasicColumns = [
    { key: 'category', label: 'Category', type: 'input', placeholder: 'Enter category' },
    { key: 'item', label: 'Item', type: 'input', placeholder: 'Enter item name' },
    { key: 'unitPrice', label: 'Unit Price', type: 'number' }
  ];
  
  // Tab 2: Gubukan - Special
  let gubukanSpecialProducts = [
    { vendor: '', keterangan: '', unitPrice: '' }
  ];
  
  const gubukanSpecialColumns = [
    { key: 'vendor', label: 'Vendor', type: 'input', placeholder: 'Enter vendor name' },
    { key: 'keterangan', label: 'Keterangan', type: 'input', placeholder: 'Enter notes' },
    { key: 'unitPrice', label: 'Unit Price', type: 'number' }
  ];
  
  // Tab 3: Buffet
  let buffetProducts = [
    { tipe: '', unitPrice: '', menuDetails: [{ kategori: '', menu: '' }] }
  ];
  
  function openDetailPopup(row, index) {
    currentPopupIndex = index;
    if (!buffetProducts[index].menuDetails || buffetProducts[index].menuDetails.length === 0) {
      buffetProducts[index].menuDetails = [{ kategori: '', menu: '' }];
    }
    showPopup = true;
  }
  
  function closeDetailPopup() {
    showPopup = false;
    currentPopupIndex = null;
  }
  
  const buffetColumns = [
    { key: 'tipe', label: 'Tipe', type: 'input', placeholder: 'Enter tipe' },
    { 
      key: 'details', 
      label: '', 
      type: 'button', 
      buttonLabel: 'Details',
      onClick: openDetailPopup
    },
    { key: 'unitPrice', label: 'Unit Price', type: 'number' }
  ];
  
  // Tab 4: Box
  let boxProducts = [
    { item: '', unitPrice: '' }
  ];
  
  const boxColumns = [
    { key: 'item', label: 'Item', type: 'input', placeholder: 'Enter item name' },
    { key: 'unitPrice', label: 'Unit Price', type: 'number' }
  ];
  
  // Tab 5: Snack Box
  let snackBoxProducts = [
    { item: '', unitPrice: '' }
  ];
  
  const snackBoxColumns = [
    { key: 'item', label: 'Item', type: 'input', placeholder: 'Enter item name' },
    { key: 'unitPrice', label: 'Unit Price', type: 'number' }
  ];
  
  // Add product functions
  function addGubukanBasic() {
    gubukanBasicProducts = [...gubukanBasicProducts, { category: '', item: '', unitPrice: '' }];
  }
  
  function removeGubukanBasic(index) {
    gubukanBasicProducts = gubukanBasicProducts.filter((_, i) => i !== index);
  }
  
  function addGubukanSpecial() {
    gubukanSpecialProducts = [...gubukanSpecialProducts, { vendor: '', keterangan: '', unitPrice: '' }];
  }
  
  function removeGubukanSpecial(index) {
    gubukanSpecialProducts = gubukanSpecialProducts.filter((_, i) => i !== index);
  }
  
  function addBuffet() {
    buffetProducts = [...buffetProducts, { tipe: '', unitPrice: '', menuDetails: [{ kategori: '', menu: '' }] }];
  }
  
  function removeBuffet(index) {
    buffetProducts = buffetProducts.filter((_, i) => i !== index);
  }
  
  function addBox() {
    boxProducts = [...boxProducts, { item: '', unitPrice: '' }];
  }
  
  function removeBox(index) {
    boxProducts = boxProducts.filter((_, i) => i !== index);
  }
  
  function addSnackBox() {
    snackBoxProducts = [...snackBoxProducts, { item: '', unitPrice: '' }];
  }
  
  function removeSnackBox(index) {
    snackBoxProducts = snackBoxProducts.filter((_, i) => i !== index);
  }
  
  const tabs = [
    { id: 'gubukan-basic', label: 'Gubukan - Basic' },
    { id: 'gubukan-special', label: 'Gubukan - Special' },
    { id: 'buffet', label: 'Buffet' },
    { id: 'box', label: 'Box' },
    { id: 'snack-box', label: 'Snack Box' }
  ];
</script>

<div>
  <h2 class="text-2xl font-bold text-gray-800 mb-6">Catering</h2>
  
  <div class="mb-6 border-b border-gray-200">
    <nav class="flex space-x-4">
      {#each tabs as tab}
        <button
          class="px-4 py-2 font-medium border-b-2 transition-colors {activeTab === tab.id ? 'border-amber-600 text-amber-600' : 'border-transparent text-gray-500 hover:text-gray-700'}"
          on:click={() => activeTab = tab.id}
        >
          {tab.label}
        </button>
      {/each}
    </nav>
  </div>
  
  <div class="mt-6">
    {#if activeTab === 'gubukan-basic'}
      <ProductTable
        columns={gubukanBasicColumns}
        data={gubukanBasicProducts}
        onAddProduct={addGubukanBasic}
        onRemoveProduct={removeGubukanBasic}
      />
    {:else if activeTab === 'gubukan-special'}
      <ProductTable
        columns={gubukanSpecialColumns}
        data={gubukanSpecialProducts}
        onAddProduct={addGubukanSpecial}
        onRemoveProduct={removeGubukanSpecial}
      />
    {:else if activeTab === 'buffet'}
      <ProductTable
        columns={buffetColumns}
        data={buffetProducts}
        onAddProduct={addBuffet}
        onRemoveProduct={removeBuffet}
      />
    {:else if activeTab === 'box'}
      <ProductTable
        columns={boxColumns}
        data={boxProducts}
        onAddProduct={addBox}
        onRemoveProduct={removeBox}
      />
    {:else if activeTab === 'snack-box'}
      <ProductTable
        columns={snackBoxColumns}
        data={snackBoxProducts}
        onAddProduct={addSnackBox}
        onRemoveProduct={removeSnackBox}
      />
    {/if}
  </div>
</div>

{#if currentPopupIndex !== null}
  <DetailPopup
    isOpen={showPopup}
    bind:menuDetails={buffetProducts[currentPopupIndex].menuDetails}
    onClose={closeDetailPopup}
  />
{/if}