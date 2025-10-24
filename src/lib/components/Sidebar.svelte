<script>
  import { createEventDispatcher } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  
  export let activeMenu = 'photo-video';
  
  const dispatch = createEventDispatcher();
  
  let isPricelistOpen = true;
  
  const menuItems = [
    { id: 'photo-video', label: 'Photo & Video' },
    { id: 'rias-busana', label: 'Rias & Busana' },
    { id: 'dekorasi', label: 'Dekorasi' },
    { id: 'entertainment', label: 'Entertainment' },
    { id: 'pendukung', label: 'Pendukung' },
    { id: 'catering', label: 'Catering' }
  ];
  
  function selectMenu(menuId) {
    dispatch('menuChange', menuId);
    goto('/');
  }
  
  function togglePricelist() {
    isPricelistOpen = !isPricelistOpen;
    if (isPricelistOpen && !$page.url.pathname.startsWith('/crm')) {
      // Already on pricelist page, just toggle
    } else if (isPricelistOpen) {
      // Navigate to pricelist from CRM
      goto('/');
    }
  }
  
  $: currentPath = $page.url.pathname;
  $: isCrmPage = currentPath.startsWith('/crm');
</script>

<aside class="w-64 bg-white shadow-lg h-screen overflow-y-auto">
  <div class="p-6 border-b border-gray-200">
    <h2 class="text-xl font-bold text-amber-700">Delima</h2>
    <p class="text-sm text-gray-600">Catering Services</p>
  </div>
  
  <nav class="p-4">
    <ul class="space-y-2">
      <li>
        <button
          class="w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 font-semibold flex items-center justify-between {!isCrmPage ? 'bg-amber-100 text-amber-800' : 'text-gray-700 hover:bg-gray-100'}"
          on:click={togglePricelist}
        >
          <span>Pricelist</span>
          <svg
            class="w-5 h-5 transition-transform duration-200 {isPricelistOpen ? 'rotate-180' : ''}"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {#if isPricelistOpen}
          <ul class="mt-2 ml-4 space-y-1">
            {#each menuItems as item}
              <li>
                <button
                  class="w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 text-sm {activeMenu === item.id && !isCrmPage ? 'bg-amber-100 text-amber-800 font-semibold' : 'text-gray-600 hover:bg-gray-100'}"
                  on:click={() => selectMenu(item.id)}
                >
                  {item.label}
                </button>
              </li>
            {/each}
          </ul>
        {/if}
      </li>
      
      <li>
        <a
          href="/crm"
          class="block w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 font-semibold {isCrmPage ? 'bg-amber-100 text-amber-800' : 'text-gray-700 hover:bg-gray-100'}"
        >
          CRM
        </a>
      </li>
    </ul>
  </nav>
</aside>