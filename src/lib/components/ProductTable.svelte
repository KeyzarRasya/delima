<script>
  export let columns = [];
  export let data = [];
  export let onAddProduct;
  export let onRemoveProduct;
  export let showDragHandle = true;
</script>

<div class="bg-white rounded-lg shadow overflow-hidden">
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          {#if showDragHandle}
            <th class="px-6 py-3 w-12"></th>
          {/if}
          {#each columns as column}
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {column.label}
            </th>
          {/each}
          <th class="px-6 py-3 w-16"></th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        {#each data as row, index}
          <tr class="hover:bg-gray-50">
            {#if showDragHandle}
              <td class="px-6 py-4">
                <button class="text-gray-400 hover:text-gray-600 cursor-move">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16" />
                  </svg>
                </button>
              </td>
            {/if}
            {#each columns as column}
              <td class="px-6 py-4">
                {#if column.type === 'input'}
                  <input
                    type="text"
                    bind:value={row[column.key]}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder={column.placeholder || ''}
                  />
                {:else if column.type === 'number'}
                  <input
                    type="text"
                    bind:value={row[column.key]}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-right"
                    placeholder="0.00"
                  />
                {:else if column.type === 'dropdown'}
                  <select
                    bind:value={row[column.key]}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="">Select {column.label}</option>
                    {#each column.options || [] as option}
                      <option value={option}>{option}</option>
                    {/each}
                  </select>
                {:else if column.type === 'button'}
                  <button
                    on:click={() => column.onClick(row, index)}
                    class="px-4 py-2 text-sm text-amber-700 border border-amber-700 rounded-md hover:bg-amber-50"
                  >
                    {column.buttonLabel || 'Action'}
                  </button>
                {:else}
                  <span class="text-gray-900">{row[column.key] || '-'}</span>
                {/if}
              </td>
            {/each}
            <td class="px-6 py-4">
              <button
                on:click={() => onRemoveProduct(index)}
                class="text-red-500 hover:text-red-700"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  
  <div class="px-6 py-4 border-t border-gray-200">
    <button
      on:click={onAddProduct}
      class="text-amber-700 hover:text-amber-800 font-medium"
    >
      Add a Product
    </button>
  </div>
</div>