<script>
  import Sidebar from '$lib/components/Sidebar.svelte';
  import AttachmentUploadPopup from '$lib/components/AttachmentUploadPopup.svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  
  let showUploadPopup = false;
  
  $: contactId = $page.params.id;
  
  function goBack() {
    goto('/crm');
  }
  
  let contact = {
    name: 'Juni & Hermansyah',
    company: 'My Company',
    phone: '08999415758',
    salesperson: 'Administrator'
  };
  
  let events = [
    { id: 1, name: 'Studio Kencana', date: '', venue: '', numberOfPax: '', status: '' }
  ];
  
  let contactLogs = [
    { id: 1, event: 'Studio Kencana', createdDate: new Date().toISOString(), attachment: null, status: 'Belum Ada Respon' }
  ];
  
  function addEvent() {
    events = [...events, {
      id: Date.now(),
      name: '',
      date: '',
      venue: '',
      numberOfPax: '',
      status: ''
    }];
  }
  
  function removeEvent(index) {
    events = events.filter((_, i) => i !== index);
  }
  
  function openUploadPopup() {
    showUploadPopup = true;
  }
  
  function closeUploadPopup() {
    showUploadPopup = false;
  }
  
  function handleUploadSave(data) {
    contactLogs = [...contactLogs, {
      id: Date.now(),
      event: events[0]?.name || 'New Event',
      createdDate: data.createdDate,
      attachment: data.file.name,
      status: data.status
    }];
  }
  
  function viewDetails(eventId) {
    goto(`/crm/${contactId}/event/${eventId}`);
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
  
  <main class="flex-1 p-8">
    <div class="max-w-7xl mx-auto">
      <div class="mb-6">
        <button
          on:click={goBack}
          class="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to CRM
        </button>
      </div>
      
      <div class="bg-white rounded-lg shadow-lg p-8">
        <div class="flex items-center justify-between mb-6">
          <h1 class="text-3xl font-bold text-gray-800">{contact.name}</h1>
          <div class="w-12 h-12 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold text-xl">
            L
          </div>
        </div>
        
        <div class="grid grid-cols-3 gap-6 mb-8">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Contact</label>
            <input
              type="text"
              bind:value={contact.company}
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="text"
              bind:value={contact.phone}
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Salesperson</label>
            <div class="flex items-center">
              <span class="inline-flex items-center px-3 py-2 rounded-md text-sm font-medium bg-amber-100 text-amber-800">
                A
              </span>
              <span class="ml-2 text-sm text-gray-900">{contact.salesperson}</span>
            </div>
          </div>
        </div>
        
        <div class="mb-8">
          <h2 class="text-xl font-bold text-gray-800 mb-4">List of Event</h2>
          
          <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 w-12"></th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Date</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venue</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number of Pax</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="px-6 py-3 w-32"></th>
                  <th class="px-6 py-3 w-12"></th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                {#each events as event, index}
                  <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4">
                      <button class="text-gray-400 hover:text-gray-600 cursor-move">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16" />
                        </svg>
                      </button>
                    </td>
                    <td class="px-6 py-4">
                      <input
                        type="text"
                        bind:value={event.name}
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </td>
                    <td class="px-6 py-4">
                      <input
                        type="date"
                        bind:value={event.date}
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </td>
                    <td class="px-6 py-4">
                      <input
                        type="text"
                        bind:value={event.venue}
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </td>
                    <td class="px-6 py-4">
                      <input
                        type="text"
                        bind:value={event.numberOfPax}
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </td>
                    <td class="px-6 py-4">
                      <input
                        type="text"
                        bind:value={event.status}
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </td>
                    <td class="px-6 py-4">
                      <button
                        on:click={() => viewDetails(event.id)}
                        class="text-amber-700 hover:text-amber-800 font-medium text-sm"
                      >
                        Details
                      </button>
                    </td>
                    <td class="px-6 py-4">
                      <button
                        on:click={() => removeEvent(index)}
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
            
            <div class="px-6 py-4 border-t border-gray-200">
              <button
                on:click={addEvent}
                class="text-amber-700 hover:text-amber-800 font-medium"
              >
                Add event
              </button>
            </div>
          </div>
        </div>
        
        <div>
          <h2 class="text-xl font-bold text-gray-800 mb-4">Contact Log</h2>
          
          <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 w-12"></th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created Date</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attachment</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                {#each contactLogs as log, index}
                  <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4">
                      <button class="text-gray-400 hover:text-gray-600 cursor-move">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16" />
                        </svg>
                      </button>
                    </td>
                    <td class="px-6 py-4">
                      <span class="text-sm text-gray-900">{log.event}</span>
                    </td>
                    <td class="px-6 py-4">
                      <span class="text-sm text-gray-900">{log.attachment || '-'}</span>
                    </td>
                    <td class="px-6 py-4">
                      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium {getStatusColor(log.status)}">
                        {log.status}
                      </span>
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
            
            <div class="px-6 py-4 border-t border-gray-200">
              <button
                on:click={openUploadPopup}
                class="text-amber-700 hover:text-amber-800 font-medium"
              >
                Upload Attachment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</div>

<AttachmentUploadPopup
  isOpen={showUploadPopup}
  onClose={closeUploadPopup}
  onSave={handleUploadSave}
/>