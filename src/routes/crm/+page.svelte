<script>
  import Sidebar from '$lib/components/Sidebar.svelte';
  import { goto } from '$app/navigation';
  import { crmContacts } from '$lib/data/crmData.js';
  
  let contacts = crmContacts.map(contact => ({
    ...contact,
    stage: 'leads'
  }));
  
  const stages = [
    { id: 'leads', title: 'Leads', color: 'bg-blue-100' },
    { id: 'qualified', title: 'Qualified', color: 'bg-yellow-100' },
    { id: 'proposal', title: 'Proposal', color: 'bg-purple-100' },
    { id: 'negotiation', title: 'Negotiation', color: 'bg-orange-100' },
    { id: 'closed', title: 'Closed Won', color: 'bg-green-100' }
  ];
  
  function getContactsByStage(stageId) {
    return contacts.filter(c => c.stage === stageId);
  }
  
  function viewContact(contactId) {
    goto(`/crm/${contactId}`);
  }
  
  function addNewContact() {
    const newId = Math.max(...contacts.map(c => c.id), 0) + 1;
    contacts = [...contacts, {
      id: newId,
      name: 'New Contact',
      company: '',
      phone: '',
      salesperson: 'Administrator',
      stage: 'leads',
      events: []
    }];
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
      contacts = contacts.map(c => 
        c.id === draggedContact.id ? { ...c, stage: targetStage } : c
      );
      draggedContact = null;
    }
  }
</script>

<div class="flex min-h-screen bg-gray-50">
  <Sidebar />
  
  <main class="flex-1 p-8 overflow-x-auto">
    <div class="mb-6 flex justify-between items-center">
      <h1 class="text-3xl font-bold text-gray-800">CRM Pipeline</h1>
      <button
        on:click={addNewContact}
        class="px-6 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
      >
        Add New Contact
      </button>
    </div>
    
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
              {#each getContactsByStage(stage.id) as contact}
                <div
                  draggable="true"
                  on:dragstart={(e) => handleDragStart(e, contact)}
                  class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-move"
                >
                  <h3 class="font-semibold text-gray-800 mb-2">{contact.name}</h3>
                  <p class="text-sm text-gray-600 mb-1">{contact.company}</p>
                  <p class="text-sm text-gray-600 mb-2">{contact.phone}</p>
                  <div class="flex items-center justify-between">
                    <span class="text-xs text-gray-500">{contact.events.length} event(s)</span>
                    <button
                      on:click={() => viewContact(contact.id)}
                      class="px-3 py-1 text-xs text-amber-700 border border-amber-700 rounded hover:bg-amber-50 transition-colors"
                    >
                      View
                    </button>
                  </div>
                </div>
              {/each}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </main>
</div>