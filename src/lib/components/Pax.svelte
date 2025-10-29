<script>
	import { masterPax } from '$lib/data/masterPax.js';
	import { paxDetails, getPaxDetailsByNumber, getDefaultDataForPax } from '$lib/data/paxDetails.js';
	import { 
		dekorasiVendors, 
		riasBusanaVendors, 
		photoVideoVendors, 
		entertainmentVendors,
		weddingOrganizerVendors 
	} from '$lib/data/vendorData.js';
	import { buffetData } from '$lib/data/cateringData.js';

	let paxList = [...masterPax];

	let showAddModal = false;
	let showDetailModal = false;
	let newPax = '';
	let selectedPaxId = null;

	let paxData = {
		buffetType: '',
		buffetQuantity: '',
		buffetItems: [],
		gubukanItems: [],
		dekorasiVendor: '',
		dekorasiItems: [],
		riasBusanaVendor: '',
		riasBusanaItems: [],
		photoVideoVendor: '',
		photoVideoItems: [],
		entertainmentVendor: '',
		entertainmentType: '',
		weddingOrganizerVendor: '',
		weddingOrganizerPackage: '',
		pendukungMc: '',
		pendukungUpacaraAdat: '',
		pendukungIntagiri: '',
		pendukungTarian: ''
	};

	$: selectedPaxDetail = selectedPaxId ? getPaxDetailsByNumber(paxList.find(p => p.id === selectedPaxId)?.pax) : null;

	function openAddModal() {
		showAddModal = true;
		newPax = '';
	}

	function closeAddModal() {
		showAddModal = false;
		newPax = '';
	}

	function addPax() {
		if (newPax && !isNaN(newPax) && parseInt(newPax) > 0) {
			const newId = Math.max(...paxList.map((p) => p.id), 0) + 1;
			paxList = [...paxList, { id: newId, pax: parseInt(newPax) }];
			closeAddModal();
		}
	}

	function deletePax(id) {
		if (confirm('Are you sure you want to delete this pax?')) {
			paxList = paxList.filter((p) => p.id !== id);
		}
	}

	function openDetailModal(pax) {
		selectedPaxId = pax.id;
		const defaultData = getDefaultDataForPax(pax.pax);
		if (defaultData) {
			paxData = {
				buffetType: '',
				buffetQuantity: pax.pax,
				buffetItems: JSON.parse(JSON.stringify(defaultData.buffetItems)),
				gubukanItems: JSON.parse(JSON.stringify(defaultData.gubukanItems)),
				dekorasiVendor: '',
				dekorasiItems: JSON.parse(JSON.stringify(defaultData.dekorasiItems)),
				riasBusanaVendor: '',
				riasBusanaItems: JSON.parse(JSON.stringify(defaultData.riasBusanaItems)),
				photoVideoVendor: '',
				photoVideoItems: JSON.parse(JSON.stringify(defaultData.photoVideoItems)),
				entertainmentVendor: '',
				entertainmentType: '',
				weddingOrganizerVendor: '',
				weddingOrganizerPackage: '',
				pendukungMc: '',
				pendukungUpacaraAdat: '',
				pendukungIntagiri: '',
				pendukungTarian: ''
			};
		}
		showDetailModal = true;
	}

	function closeDetailModal() {
		showDetailModal = false;
		selectedPaxId = null;
	}

	function addBuffetRow() {
		paxData.buffetItems = [...paxData.buffetItems, { category: '', menu: '', notes: '' }];
	}

	function removeBuffetRow(index) {
		paxData.buffetItems = paxData.buffetItems.filter((_, i) => i !== index);
	}

	function addGubukanRow() {
		paxData.gubukanItems = [...paxData.gubukanItems, { category: '', menu: '', quantity: '', notes: '' }];
	}

	function removeGubukanRow(index) {
		paxData.gubukanItems = paxData.gubukanItems.filter((_, i) => i !== index);
	}

	function addDekorasiRow() {
		paxData.dekorasiItems = [...paxData.dekorasiItems, { item: '', quantity: '', notes: '' }];
	}

	function removeDekorasiRow(index) {
		paxData.dekorasiItems = paxData.dekorasiItems.filter((_, i) => i !== index);
	}

	function addRiasBusanaRow() {
		paxData.riasBusanaItems = [...paxData.riasBusanaItems, { item: '', quantity: '', notes: '' }];
	}

	function removeRiasBusanaRow(index) {
		paxData.riasBusanaItems = paxData.riasBusanaItems.filter((_, i) => i !== index);
	}

	function addPhotoVideoRow() {
		paxData.photoVideoItems = [...paxData.photoVideoItems, { item: '', quantity: '', notes: '' }];
	}

	function removePhotoVideoRow(index) {
		paxData.photoVideoItems = paxData.photoVideoItems.filter((_, i) => i !== index);
	}

	function formatCurrency(amount) {
		return new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: 'IDR',
			minimumFractionDigits: 0
		}).format(amount);
	}
</script>

<div class="bg-white rounded-lg shadow">
	<div class="p-6">
		<h2 class="text-2xl font-bold text-gray-800 mb-6">Pax Management</h2>

		<div class="overflow-x-auto">
			<table class="min-w-full divide-y divide-gray-200">
				<thead class="bg-gray-50">
					<tr>
						<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							No
						</th>
						<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Pax
						</th>
						<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Aksi
						</th>
					</tr>
				</thead>
				<tbody class="bg-white divide-y divide-gray-200">
					{#each paxList as pax, index}
						<tr class="hover:bg-gray-50">
							<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
							<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{pax.pax} Orang</td>
							<td class="px-6 py-4 whitespace-nowrap text-sm">
								<div class="flex gap-2">
									<button
										on:click={() => openDetailModal(pax)}
										class="px-4 py-2 text-sm text-amber-700 border border-amber-700 rounded-md hover:bg-amber-50 transition-colors"
									>
										Detail
									</button>
									<button
										on:click={() => deletePax(pax.id)}
										class="text-red-500 hover:text-red-700 transition-colors"
									>
										<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
										</svg>
									</button>
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<div class="mt-4">
			<button
				on:click={openAddModal}
				class="px-6 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
			>
				Add New Pax
			</button>
		</div>
	</div>
</div>

{#if showAddModal}
	<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
		<div class="bg-white rounded-lg shadow-xl max-w-md w-full">
			<div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
				<h3 class="text-xl font-bold text-gray-800">Add New Pax</h3>
				<button on:click={closeAddModal} class="text-gray-400 hover:text-gray-600">
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>

			<div class="p-6 space-y-4">
				<div>
					<label class="block text-sm font-medium text-gray-700 mb-2">Pax Amount</label>
					<input
						type="number"
						bind:value={newPax}
						placeholder="Enter pax amount"
						class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
					/>
				</div>
			</div>

			<div class="px-6 py-4 border-t border-gray-200 flex justify-end gap-2">
				<button
					on:click={closeAddModal}
					class="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
				>
					Cancel
				</button>
				<button
					on:click={addPax}
					class="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
				>
					Add Pax
				</button>
			</div>
		</div>
	</div>
{/if}

{#if showDetailModal && selectedPaxDetail}
	<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
		<div class="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
			<div class="px-8 py-6 border-b border-gray-200 flex justify-between items-center">
				<h3 class="text-2xl font-bold text-gray-800">
					Paket Pernikahan - {selectedPaxDetail.pax} Orang
				</h3>
				<button on:click={closeDetailModal} class="text-gray-400 hover:text-gray-600">
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>

			<div class="p-8 overflow-y-auto max-h-[calc(90vh-180px)]">
				<div class="space-y-8">
					<section class="bg-amber-50 p-6 rounded-lg">
						<h4 class="text-lg font-semibold text-gray-800 mb-3">Overview</h4>
						<div class="grid grid-cols-2 gap-4">
							<div>
								<p class="text-sm text-gray-600">Category</p>
								<p class="font-medium text-gray-900">{selectedPaxDetail.category}</p>
							</div>
							<div>
								<p class="text-sm text-gray-600">Description</p>
								<p class="font-medium text-gray-900">{selectedPaxDetail.description}</p>
							</div>
							<div>
								<p class="text-sm text-gray-600">Budget Range</p>
								<p class="font-medium text-amber-600">
									{formatCurrency(selectedPaxDetail.estimatedBudgetRange.min)} - {formatCurrency(selectedPaxDetail.estimatedBudgetRange.max)}
								</p>
							</div>
						</div>
					</section>

					<section class="border-b pb-6">
						<h4 class="text-lg font-semibold text-gray-800 mb-4">Buffet</h4>
						
						<div class="grid grid-cols-2 gap-4 mb-4">
							<div>
								<label class="block text-sm font-medium text-gray-700 mb-2">Type</label>
								<select
									bind:value={paxData.buffetType}
									class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
								>
									<option value="">Select type</option>
									{#each buffetData as buffet}
										<option value={buffet.type}>{buffet.type}</option>
									{/each}
								</select>
							</div>
							<div>
								<label class="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
								<input
									type="number"
									bind:value={paxData.buffetQuantity}
									class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
								/>
							</div>
						</div>
						
						<div class="space-y-2">
							<div class="grid grid-cols-3 gap-4 text-sm font-medium text-gray-700 mb-2">
								<div>Category</div>
								<div>Menu</div>
								<div>Notes</div>
							</div>
							
							{#each paxData.buffetItems as item, index}
								<div class="grid grid-cols-3 gap-4 items-center">
									<input
										type="text"
										bind:value={item.category}
										class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
									/>
									<input
										type="text"
										bind:value={item.menu}
										class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
									/>
									<div class="flex gap-2">
										<input
											type="text"
											bind:value={item.notes}
											class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
										/>
										{#if paxData.buffetItems.length > 1}
											<button
												on:click={() => removeBuffetRow(index)}
												class="text-red-500 hover:text-red-700"
											>
												<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
												</svg>
											</button>
										{/if}
									</div>
								</div>
							{/each}
						</div>
						
						<button
							on:click={addBuffetRow}
							class="mt-3 text-amber-600 hover:text-amber-700 font-medium text-sm"
						>
							Add row
						</button>
					</section>

					<section class="border-b pb-6">
						<h4 class="text-lg font-semibold text-gray-800 mb-4">Gubukan</h4>
						
						<div class="space-y-2">
							<div class="grid grid-cols-4 gap-4 text-sm font-medium text-gray-700 mb-2">
								<div>Category</div>
								<div>Menu</div>
								<div>Quantity</div>
								<div>Notes</div>
							</div>
							
							{#each paxData.gubukanItems as item, index}
								<div class="grid grid-cols-4 gap-4 items-center">
									<input
										type="text"
										bind:value={item.category}
										class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
									/>
									<input
										type="text"
										bind:value={item.menu}
										class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
									/>
									<input
										type="text"
										bind:value={item.quantity}
										class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
									/>
									<div class="flex gap-2">
										<input
											type="text"
											bind:value={item.notes}
											class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
										/>
										{#if paxData.gubukanItems.length > 1}
											<button
												on:click={() => removeGubukanRow(index)}
												class="text-red-500 hover:text-red-700"
											>
												<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
												</svg>
											</button>
										{/if}
									</div>
								</div>
							{/each}
						</div>
						
						<button
							on:click={addGubukanRow}
							class="mt-3 text-amber-600 hover:text-amber-700 font-medium text-sm"
						>
							Add row
						</button>
					</section>

					<section class="border-b pb-6">
						<h4 class="text-lg font-semibold text-gray-800 mb-4">Dekorasi</h4>
						
						<div class="mb-4">
							<label class="block text-sm font-medium text-gray-700 mb-2">Vendor</label>
							<select
								bind:value={paxData.dekorasiVendor}
								class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
							>
								<option value="">Select vendor</option>
								{#each dekorasiVendors as vendor}
									<option value={vendor.vendor}>{vendor.vendor}</option>
								{/each}
							</select>
						</div>
						
						<div class="space-y-2">
							<div class="grid grid-cols-3 gap-4 text-sm font-medium text-gray-700 mb-2">
								<div>Item</div>
								<div>Quantity</div>
								<div>Notes</div>
							</div>
							
							{#each paxData.dekorasiItems as item, index}
								<div class="grid grid-cols-3 gap-4 items-center">
									<input
										type="text"
										bind:value={item.item}
										class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
									/>
									<input
										type="text"
										bind:value={item.quantity}
										class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
									/>
									<div class="flex gap-2">
										<input
											type="text"
											bind:value={item.notes}
											class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
										/>
										{#if paxData.dekorasiItems.length > 1}
											<button
												on:click={() => removeDekorasiRow(index)}
												class="text-red-500 hover:text-red-700"
											>
												<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
												</svg>
											</button>
										{/if}
									</div>
								</div>
							{/each}
						</div>
						
						<button
							on:click={addDekorasiRow}
							class="mt-3 text-amber-600 hover:text-amber-700 font-medium text-sm"
						>
							Add row
						</button>
					</section>

					<section class="border-b pb-6">
						<h4 class="text-lg font-semibold text-gray-800 mb-4">Rias dan Busana</h4>
						
						<div class="mb-4">
							<label class="block text-sm font-medium text-gray-700 mb-2">Vendor</label>
							<select
								bind:value={paxData.riasBusanaVendor}
								class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
							>
								<option value="">Select vendor</option>
								{#each riasBusanaVendors as vendor}
									<option value={vendor.vendor}>{vendor.vendor}</option>
								{/each}
							</select>
						</div>
						
						<div class="space-y-2">
							<div class="grid grid-cols-3 gap-4 text-sm font-medium text-gray-700 mb-2">
								<div>Item</div>
								<div>Quantity</div>
								<div>Notes</div>
							</div>
							
							{#each paxData.riasBusanaItems as item, index}
								<div class="grid grid-cols-3 gap-4 items-center">
									<input
										type="text"
										bind:value={item.item}
										class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
									/>
									<input
										type="text"
										bind:value={item.quantity}
										class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
									/>
									<div class="flex gap-2">
										<input
											type="text"
											bind:value={item.notes}
											class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
										/>
										{#if paxData.riasBusanaItems.length > 1}
											<button
												on:click={() => removeRiasBusanaRow(index)}
												class="text-red-500 hover:text-red-700"
											>
												<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
												</svg>
											</button>
										{/if}
									</div>
								</div>
							{/each}
						</div>
						
						<button
							on:click={addRiasBusanaRow}
							class="mt-3 text-amber-600 hover:text-amber-700 font-medium text-sm"
						>
							Add row
						</button>
					</section>

					<section class="border-b pb-6">
						<h4 class="text-lg font-semibold text-gray-800 mb-4">Photo dan Video</h4>
						
						<div class="mb-4">
							<label class="block text-sm font-medium text-gray-700 mb-2">Vendor</label>
							<select
								bind:value={paxData.photoVideoVendor}
								class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
							>
								<option value="">Select vendor</option>
								{#each photoVideoVendors as vendor}
									<option value={vendor.vendor}>{vendor.vendor}</option>
								{/each}
							</select>
						</div>
						
						<div class="space-y-2">
							<div class="grid grid-cols-3 gap-4 text-sm font-medium text-gray-700 mb-2">
								<div>Item</div>
								<div>Quantity</div>
								<div>Notes</div>
							</div>
							
							{#each paxData.photoVideoItems as item, index}
								<div class="grid grid-cols-3 gap-4 items-center">
									<input
										type="text"
										bind:value={item.item}
										class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
									/>
									<input
										type="text"
										bind:value={item.quantity}
										class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
									/>
									<div class="flex gap-2">
										<input
											type="text"
											bind:value={item.notes}
											class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
										/>
										{#if paxData.photoVideoItems.length > 1}
											<button
												on:click={() => removePhotoVideoRow(index)}
												class="text-red-500 hover:text-red-700"
											>
												<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
												</svg>
											</button>
										{/if}
									</div>
								</div>
							{/each}
						</div>
						
						<button
							on:click={addPhotoVideoRow}
							class="mt-3 text-amber-600 hover:text-amber-700 font-medium text-sm"
						>
							Add row
						</button>
					</section>

					<section class="border-b pb-6">
						<h4 class="text-lg font-semibold text-gray-800 mb-4">Entertainment & Wedding Organizer</h4>
						
						<div class="grid grid-cols-2 gap-6">
							<div>
								<label class="block text-sm font-medium text-gray-700 mb-2">Entertainment</label>
								<select
									bind:value={paxData.entertainmentVendor}
									class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
								>
									<option value="">Select vendor</option>
									{#each entertainmentVendors as vendor}
										<option value={vendor.name}>{vendor.name}</option>
									{/each}
								</select>
							</div>
							
							<div>
								<label class="block text-sm font-medium text-gray-700 mb-2">Wedding Organizer</label>
								<select
									bind:value={paxData.weddingOrganizerVendor}
									class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
								>
									<option value="">Select vendor</option>
									{#each weddingOrganizerVendors as vendor}
										<option value={vendor.name}>{vendor.name}</option>
									{/each}
								</select>
							</div>
						</div>
					</section>

					<section>
						<h4 class="text-lg font-semibold text-gray-800 mb-4">Pendukung</h4>
						
						<div class="grid grid-cols-2 gap-6">
							<div>
								<label class="block text-sm font-medium text-gray-700 mb-2">MC</label>
								<input
									type="text"
									bind:value={paxData.pendukungMc}
									class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
								/>
							</div>
							
							<div>
								<label class="block text-sm font-medium text-gray-700 mb-2">Upacara Adat</label>
								<input
									type="text"
									bind:value={paxData.pendukungUpacaraAdat}
									class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
								/>
							</div>
							
							<div>
								<label class="block text-sm font-medium text-gray-700 mb-2">Integri</label>
								<input
									type="text"
									bind:value={paxData.pendukungIntagiri}
									class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
								/>
							</div>
							
							<div>
								<label class="block text-sm font-medium text-gray-700 mb-2">Tarian</label>
								<input
									type="text"
									bind:value={paxData.pendukungTarian}
									class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
								/>
							</div>
						</div>
					</section>
				</div>
			</div>

			<div class="px-8 py-4 border-t border-gray-200 flex justify-end">
				<button
					on:click={closeDetailModal}
					class="px-6 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
				>
					Close
				</button>
			</div>
		</div>
	</div>
{/if}