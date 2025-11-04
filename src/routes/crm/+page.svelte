<script>
  import Sidebar from '$lib/components/Sidebar.svelte';
  import AddContactPopup from '$lib/components/AddContactPopup.svelte';
  import { goto } from '$app/navigation';
  import { crmContacts, getLatestContactLogStatus } from '$lib/data/crmData.js';
  import { salespersonData, getSalespersonById } from '$lib/data/salespersonData.js';
  
  let showAddContactPopup = false;
  
  let allContacts = crmContacts.map(contact => ({
    ...contact,
    stage: 'assigned',
    salespersonName: getSalespersonById(contact.salespersonId)?.name || 'Unknown',
    latestStatus: getLatestContactLogStatus(contact.id)
  }));
  
  const stages = [
    { id: 'assigned', title: 'Assigned', color: 'bg-blue-100' },
    { id: 'contacted', title: 'Contacted', color: 'bg-yellow-100' },
    { id: 'final', title: 'Finalization', color: 'bg-purple-100' },
    { id: 'techmeet', title: 'Technical Meeting', color: 'bg-orange-100' },
  ];
  
  let filterBy = 'opportunityName';
  let searchQuery = '';
  
  const filterOptions = [
    { value: 'opportunityName', label: 'Opportunity Name' },
    { value: 'status', label: 'Status' },
    { value: 'salesperson', label: 'Salesperson' },
    { value: 'date', label: 'Date' },
    { value: 'eventName', label: 'Event Name' }
  ];
  
  const statusOptions = ['Belum Ada Respon', 'Sudah Direspon', 'Prospek'];
  
  // Reactive statement that automatically filters contacts
  $: filteredContacts = (() => {
    console.log('Filtering triggered:', { searchQuery, filterBy });
    console.log('All contacts stages:', allContacts.map(c => ({ name: c.opportunityName, stage: c.stage })));
    
    if (!searchQuery || searchQuery === '') {
      console.log('No search query, returning all contacts:', allContacts.length);
      return allContacts;
    }
    
    const query = searchQuery.toLowerCase();
    console.log('Searching for:', query);
    
    const result = allContacts.filter(contact => {
      switch(filterBy) {
        case 'opportunityName':
          const nameMatch = contact.opportunityName.toLowerCase().includes(query);
          console.log(`Checking ${contact.opportunityName} (stage: ${contact.stage}): ${nameMatch}`);
          return nameMatch;
        
        case 'status':
          if (!contact.latestStatus) return false;
          return contact.latestStatus.toLowerCase() === query.toLowerCase();
        
        case 'salesperson':
          return contact.salespersonName.toLowerCase().includes(query);
        
        case 'date':
          return contact.events.some(event => {
            if (!event.date) return false;
            const eventDate = new Date(event.date).toISOString().split('T')[0];
            return eventDate === searchQuery;
          });
        
        case 'eventName':
          return contact.events.some(event => 
            event.name.toLowerCase().includes(query)
          );
        
        default:
          return true;
      }
    });
    
    console.log('Filtered results:', result.length, result);
    console.log('Filtered stages:', result.map(c => ({ name: c.opportunityName, stage: c.stage })));
    return result;
  })();
  
  function handleClearSearch() {
    searchQuery = '';
    filterBy = 'opportunityName';
  }
  
  function getContactsByStage(stageId) {
    const contacts = filteredContacts.filter(c => c.stage === stageId);
    console.log(`Stage ${stageId}:`, contacts.length);
    return contacts;
  }
  
  function viewContact(contactId) {
    goto(`/crm/${contactId}`);
  }
  
  function openAddContactPopup() {
    showAddContactPopup = true;
  }
  
  function closeAddContactPopup() {
    showAddContactPopup = false;
  }
  
  function handleContactSave(contactData) {
    const newId = Math.max(...allContacts.map(c => c.id), 0) + 1;
    const salesperson = getSalespersonById(parseInt(contactData.salespersonId));
    const newContact = {
      id: newId,
      opportunityName: contactData.opportunityName,
      salespersonId: parseInt(contactData.salespersonId),
      salespersonName: salesperson?.name || 'Unknown',
      contacts: contactData.contacts || [],
      stage: 'assigned',
      events: [],
      contactLogs: [],
      latestStatus: null
    };
    
    allContacts = [...allContacts, newContact];
  }
  
  let draggedContact = null;
  
  function handleDragStart(event, contact) {
    draggedContact = contact;
    event.dataTransfer.effectAllowed = 'move';
  }
  
  function handleDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }
  
  function handleDrop(event, targetStage) {
    event.preventDefault();
    if (draggedContact) {
      allContacts = allContacts.map(c => 
        c.id === draggedContact.id ? { ...c, stage: targetStage } : c
      );
      draggedContact = null;
    }
  }
  
  function getDaysUntilNextEvent(events) {
    if (!events || events.length === 0) return null;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const futureDates = events
      .map(e => new Date(e.date))
      .filter(date => date >= today)
      .sort((a, b) => a - b);
    
    if (futureDates.length === 0) {
      // No future events, find the most recent past event
      const pastDates = events
        .map(e => new Date(e.date))
        .filter(date => date < today)
        .sort((a, b) => b - a); // Sort descending to get most recent
      
      if (pastDates.length === 0) return null;
      
      const lastDate = pastDates[0];
      const diffTime = today - lastDate;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      return -diffDays; // Return negative to indicate past
    }
    
    const nextDate = futureDates[0];
    const diffTime = nextDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  }
  
  function getStatusColor(status) {
    switch(status) {
      case 'Belum Ada Respon':
        return 'bg-red-100 text-red-800';
      case 'Sudah Direspon':
        return 'bg-blue-100 text-blue-800';
      case 'Prospek':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
</script>

<div class="flex min-h-screen bg-gray-50">
  <Sidebar />
  
  <main class="flex-1 p-8 overflow-x-auto">
    <div class="mb-6 flex justify-between items-center">
      <h1 class="text-3xl font-bold text-gray-800">CRM Pipeline</h1>
      <button
        on:click={openAddContactPopup}
        class="px-6 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
      >
        Add New Contact
      </button>
    </div>
    
    <div class="mb-6 bg-white rounded-lg shadow p-4">
      <div class="flex gap-4 items-end">
        <div class="w-48">
          <label class="block text-sm font-medium text-gray-700 mb-2">Filter by:</label>
          <select
            bind:value={filterBy}
            on:change={() => searchQuery = ''}
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            {#each filterOptions as option}
              <option value={option.value}>{option.label}</option>
            {/each}
          </select>
        </div>
        
        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-700 mb-2">Search:</label>
          {#if filterBy === 'date'}
            <input
              type="date"
              bind:value={searchQuery}
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Select date"
            />
          {:else if filterBy === 'status'}
            <select
              bind:value={searchQuery}
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="">All Status</option>
              {#each statusOptions as status}
                <option value={status}>{status}</option>
              {/each}
            </select>
          {:else if filterBy === 'salesperson'}
            <select
              bind:value={searchQuery}
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="">All Salesperson</option>
              {#each salespersonData as salesperson}
                <option value={salesperson.name.toLowerCase()}>{salesperson.name}</option>
              {/each}
            </select>
          {:else}
            <input
              type="text"
              bind:value={searchQuery}
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Type to search..."
            />
          {/if}
        </div>
        
        <div class="flex gap-2">
          <button
            on:click={handleClearSearch}
            class="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
    
    <div class="mb-4 bg-blue-50 p-3 rounded">
      <p class="text-sm text-gray-700">
        Debug: Showing {filteredContacts.length} of {allContacts.length} contacts
        {#if searchQuery}(searching for "{searchQuery}" in {filterBy}){/if}
      </p>
    </div>
    
    {#key filteredContacts}
    <div class="flex gap-4 min-w-max">
      {#each stages as stage}
        <div class="flex-1 min-w-[300px]">
          <div class="bg-white rounded-lg shadow-lg">
            <div class="p-4 border-b border-gray-200 {stage.color}">
              <h2 class="font-bold text-gray-800">{stage.title}</h2>
              <p class="text-sm text-gray-600">{getContactsByStage(stage.id).length} contacts</p>
            </div>
            
            <div 
              class="p-4 space-y-3 min-h-[500px]"
              on:dragover={handleDragOver}
              on:drop={(e) => handleDrop(e, stage.id)}
            >
              {#each getContactsByStage(stage.id) as contact (contact.id)}
                <div
                  draggable="true"
                  on:dragstart={(e) => handleDragStart(e, contact)}
                  on:click={() => viewContact(contact.id)}
                  class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                >
                  <h3 class="font-semibold text-gray-800 mb-1 text-lg">{contact.opportunityName}</h3>
                  <p class="text-sm text-gray-600 mb-3">Salesperson: {contact.salespersonName}</p>
                  
                  {#if contact.events && contact.events.length > 0}
                    <div class="space-y-2 mb-3">
                      {#each contact.events as event}
                        <div class="flex justify-between items-center text-sm">
                          <span class="font-medium text-gray-700">{event.name}</span>
                          <span class="text-gray-600">{event.date ? new Date(event.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'}</span>
                        </div>
                      {/each}
                    </div>
                  {:else}
                    <p class="text-sm text-gray-500 mb-3">No events scheduled</p>
                  {/if}
                  
                  <div class="flex items-center gap-2 pt-3 border-t border-gray-200">
                    {#if getDaysUntilNextEvent(contact.events) !== null}
                      {@const daysUntil = getDaysUntilNextEvent(contact.events)}
                      {#if daysUntil < 0}
                        <span class="text-xs text-red-600 font-semibold">{Math.abs(daysUntil)} days ago</span>
                      {:else}
                        <span class="text-xs text-gray-600">In {daysUntil} days</span>
                      {/if}
                    {:else}
                      <span class="text-xs text-gray-500">No upcoming</span>
                    {/if}
                    
                    {#if contact.latestStatus}
                      <span class="px-2 py-0.5 inline-flex text-xs font-semibold rounded-full {getStatusColor(contact.latestStatus)}">
                        {contact.latestStatus}
                      </span>
                    {/if}
                  </div>
                </div>
              {/each}
            </div>
          </div>
        </div>
      {/each}
    </div>
    {/key}
  </main>
</div>

{#if showAddContactPopup}
  <AddContactPopup
    on:close={closeAddContactPopup}
    on:save={(e) => handleContactSave(e.detail)}
  />
{/if}