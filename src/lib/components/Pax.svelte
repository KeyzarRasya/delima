<script>
	let paxList = [
		{ id: 1, pax: '200' },
		{ id: 2, pax: '400' },
		{ id: 3, pax: '500' },
		{ id: 4, pax: '600' },
		{ id: 5, pax: '800' }
	];

	let showAddModal = false;
	let showDetailModal = false;
	let newPax = '';
	let selectedPaxId = null;

	let paxData = {
		buffetType: '',
		buffetQuantity: '',
		buffetItems: [{ category: '', menu: '', notes: '' }],
		gubukanItems: [{ category: '', menu: '', quantity: '', notes: '' }],
		dekorasiVendor: '',
		dekorasiType: '',
		dekorasiItems: [{ item: '', quantity: '', notes: '' }],
		riasBusanaVendor: '',
		riasBusanaType: '',
		riasBusanaItems: [{ item: '', quantity: '', notes: '' }],
		photoVideoVendor: '',
		photoVideoType: '',
		photoVideoItems: [{ item: '', quantity: '', notes: '' }],
		entertainmentVendor: '',
		entertainmentType: '',
		weddingOrganizerVendor: '',
		weddingOrganizerType: '',
		pendukungMc: '',
		pendukungMcType: '',
		pendukungIntagiri: '',
		pendukungIntagiriType: '',
		pendukungUpacaraAdat: '',
		pendukungUpacaraAdatType: '',
		pendukungTarian: '',
		pendukungTarianType: ''
	};

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
			paxList = [...paxList, { id: newId, pax: newPax }];
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
		paxData.gubukanItems = [
			...paxData.gubukanItems,
			{ category: '', menu: '', quantity: '', notes: '' }
		];
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

	function saveDetails() {
		console.log('Saving pax details:', paxData);
		alert('Details saved successfully!');
		closeDetailModal();
	}

	function handlePrint() {
		window.print();
	}
</script>

<div class="bg-white rounded-lg shadow">
	<div class="p-6">
		<h2 class="text-2xl font-bold text-gray-800 mb-6">Pax Management</h2>

		<div class="overflow-x-auto">
			<table class="min-w-full divide-y divide-gray-200">
				<thead class="bg-gray-50">
					<tr>
						<th
							class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
						>
							No
						</th>
						<th
							class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
						>
							Pax
						</th>
						<th
							class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
						>
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
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
											/>
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
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
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

{#if showDetailModal && selectedPaxId}
	<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
		<div class="bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] overflow-hidden">
			<div class="px-8 py-6 border-b border-gray-200 flex justify-between items-center">
				<h3 class="text-2xl font-bold text-gray-800">
					Paket Pernikahan - {paxList.find((p) => p.id === selectedPaxId)?.pax} Orang
				</h3>
				<button on:click={closeDetailModal} class="text-gray-400 hover:text-gray-600">
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>

			<div class="p-8 overflow-y-auto max-h-[calc(90vh-180px)]">
				<div class="space-y-8">
					<section>
							<div class="mb-4">
								<h2 class="text-lg font-bold text-gray-800 mb-2">Buffet</h2>
								<div class="space-y-2 mb-4">
									<div>
										<label class="block text-sm text-gray-600 mb-1">Type</label>
										<select
											bind:value={paxData.buffetType}
											class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
										>
											<option value="">Select type</option>
											<option value="basic">Basic</option>
											<option value="premium">Premium</option>
											<option value="deluxe">Deluxe</option>
										</select>
									</div>
									<div>
										<label class="block text-sm text-gray-600 mb-1">Quantity</label>
										<input
											type="text"
											bind:value={paxData.buffetQuantity}
											class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
										/>
									</div>
								</div>
							</div>
							<div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
								<table class="min-w-full divide-y divide-gray-200">
									<thead class="bg-gray-50">
										<tr>
											<th class="px-6 py-3 w-12"></th>
											<th
												class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
												>Category</th
											>
											<th
												class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
												>Menu</th
											>
											<th
												class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
												>Notes</th
											>
											<th class="px-6 py-3 w-12"></th>
										</tr>
									</thead>
									<tbody class="bg-white divide-y divide-gray-200">
										{#each paxData.buffetItems as item, index}
											<tr class="hover:bg-gray-50">
												<td class="px-6 py-4">
													<button class="text-gray-400 hover:text-gray-600 cursor-move">
														<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
															<path
																stroke-linecap="round"
																stroke-linejoin="round"
																stroke-width="2"
																d="M4 8h16M4 16h16"
															/>
														</svg>
													</button>
												</td>
												<td class="px-6 py-4">
													<input
														type="text"
														bind:value={item.category}
														class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
													/>
												</td>
												<td class="px-6 py-4">
													<input
														type="text"
														bind:value={item.menu}
														class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
													/>
												</td>
												<td class="px-6 py-4">
													<input
														type="text"
														bind:value={item.notes}
														class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
													/>
												</td>
												<td class="px-6 py-4">
													<button
														on:click={() => removeBuffetRow(index)}
														class="text-red-500 hover:text-red-700"
													>
														<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
															<path
																stroke-linecap="round"
																stroke-linejoin="round"
																stroke-width="2"
																d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
															/>
														</svg>
													</button>
												</td>
											</tr>
										{/each}
									</tbody>
								</table>
								<div class="px-6 py-4 border-t border-gray-200">
									<button on:click={addBuffetRow} class="text-amber-700 hover:text-amber-800 font-medium">
										Add a Menu
									</button>
								</div>
							</div>
						</section>

						<section>
							<h2 class="text-lg font-bold text-gray-800 mb-4">Gubukan</h2>
							<div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
								<table class="min-w-full divide-y divide-gray-200">
									<thead class="bg-gray-50">
										<tr>
											<th class="px-6 py-3 w-12"></th>
											<th
												class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
												>Category</th
											>
											<th
												class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
												>Menu</th
											>
											<th
												class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
												>Quantity</th
											>
											<th
												class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
												>Notes</th
											>
											<th class="px-6 py-3 w-12"></th>
										</tr>
									</thead>
									<tbody class="bg-white divide-y divide-gray-200">
										{#each paxData.gubukanItems as item, index}
											<tr class="hover:bg-gray-50">
												<td class="px-6 py-4">
													<button class="text-gray-400 hover:text-gray-600 cursor-move">
														<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
															<path
																stroke-linecap="round"
																stroke-linejoin="round"
																stroke-width="2"
																d="M4 8h16M4 16h16"
															/>
														</svg>
													</button>
												</td>
												<td class="px-6 py-4">
													<input
														type="text"
														bind:value={item.category}
														class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
													/>
												</td>
												<td class="px-6 py-4">
													<input
														type="text"
														bind:value={item.menu}
														class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
													/>
												</td>
												<td class="px-6 py-4">
													<input
														type="text"
														bind:value={item.quantity}
														class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
													/>
												</td>
												<td class="px-6 py-4">
													<input
														type="text"
														bind:value={item.notes}
														class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
													/>
												</td>
												<td class="px-6 py-4">
													<button
														on:click={() => removeGubukanRow(index)}
														class="text-red-500 hover:text-red-700"
													>
														<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
															<path
																stroke-linecap="round"
																stroke-linejoin="round"
																stroke-width="2"
																d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
															/>
														</svg>
													</button>
												</td>
											</tr>
										{/each}
									</tbody>
								</table>
								<div class="px-6 py-4 border-t border-gray-200">
									<button on:click={addGubukanRow} class="text-amber-700 hover:text-amber-800 font-medium">
										Add a Menu
									</button>
								</div>
							</div>
						</section>

						<section>
							<h2 class="text-lg font-bold text-gray-800 mb-4">Dekorasi</h2>
							<div class="grid grid-cols-2 gap-4 mb-4">
								<div>
									<label class="block text-sm text-gray-600 mb-1">Vendor</label>
									<input
										type="text"
										bind:value={paxData.dekorasiVendor}
										class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
									/>
								</div>
								<div>
									<label class="block text-sm text-gray-600 mb-1">Type</label>
									<input
										type="text"
										bind:value={paxData.dekorasiType}
										class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
									/>
								</div>
							</div>
							<div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
								<table class="min-w-full divide-y divide-gray-200">
									<thead class="bg-gray-50">
										<tr>
											<th class="px-6 py-3 w-12"></th>
											<th
												class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
												>Item</th
											>
											<th
												class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
												>Quantity</th
											>
											<th
												class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
												>Notes</th
											>
											<th class="px-6 py-3 w-12"></th>
										</tr>
									</thead>
									<tbody class="bg-white divide-y divide-gray-200">
										{#each paxData.dekorasiItems as item, index}
											<tr class="hover:bg-gray-50">
												<td class="px-6 py-4">
													<button class="text-gray-400 hover:text-gray-600 cursor-move">
														<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
															<path
																stroke-linecap="round"
																stroke-linejoin="round"
																stroke-width="2"
																d="M4 8h16M4 16h16"
															/>
														</svg>
													</button>
												</td>
												<td class="px-6 py-4">
													<input
														type="text"
														bind:value={item.item}
														class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
													/>
												</td>
												<td class="px-6 py-4">
													<input
														type="text"
														bind:value={item.quantity}
														class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
													/>
												</td>
												<td class="px-6 py-4">
													<input
														type="text"
														bind:value={item.notes}
														class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
													/>
												</td>
												<td class="px-6 py-4">
													<button
														on:click={() => removeDekorasiRow(index)}
														class="text-red-500 hover:text-red-700"
													>
														<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
															<path
																stroke-linecap="round"
																stroke-linejoin="round"
																stroke-width="2"
																d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
															/>
														</svg>
													</button>
												</td>
											</tr>
										{/each}
									</tbody>
								</table>
								<div class="px-6 py-4 border-t border-gray-200">
									<button on:click={addDekorasiRow} class="text-amber-700 hover:text-amber-800 font-medium">
										Add an Item
									</button>
								</div>
							</div>
						</section>

						<section>
							<h2 class="text-lg font-bold text-gray-800 mb-4">Rias dan Busana</h2>
							<div class="grid grid-cols-2 gap-4 mb-4">
								<div>
									<label class="block text-sm text-gray-600 mb-1">Vendor</label>
									<input
										type="text"
										bind:value={paxData.riasBusanaVendor}
										class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
									/>
								</div>
								<div>
									<label class="block text-sm text-gray-600 mb-1">Type</label>
									<input
										type="text"
										bind:value={paxData.riasBusanaType}
										class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
									/>
								</div>
							</div>
							<div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
								<table class="min-w-full divide-y divide-gray-200">
									<thead class="bg-gray-50">
										<tr>
											<th class="px-6 py-3 w-12"></th>
											<th
												class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
												>Item</th
											>
											<th
												class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
												>Quantity</th
											>
											<th
												class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
												>Notes</th
											>
											<th class="px-6 py-3 w-12"></th>
										</tr>
									</thead>
									<tbody class="bg-white divide-y divide-gray-200">
										{#each paxData.riasBusanaItems as item, index}
											<tr class="hover:bg-gray-50">
												<td class="px-6 py-4">
													<button class="text-gray-400 hover:text-gray-600 cursor-move">
														<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
															<path
																stroke-linecap="round"
																stroke-linejoin="round"
																stroke-width="2"
																d="M4 8h16M4 16h16"
															/>
														</svg>
													</button>
												</td>
												<td class="px-6 py-4">
													<input
														type="text"
														bind:value={item.item}
														class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
													/>
												</td>
												<td class="px-6 py-4">
													<input
														type="text"
														bind:value={item.quantity}
														class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
													/>
												</td>
												<td class="px-6 py-4">
													<input
														type="text"
														bind:value={item.notes}
														class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
													/>
												</td>
												<td class="px-6 py-4">
													<button
														on:click={() => removeRiasBusanaRow(index)}
														class="text-red-500 hover:text-red-700"
													>
														<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
															<path
																stroke-linecap="round"
																stroke-linejoin="round"
																stroke-width="2"
																d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
															/>
														</svg>
													</button>
												</td>
											</tr>
										{/each}
									</tbody>
								</table>
								<div class="px-6 py-4 border-t border-gray-200">
									<button
										on:click={addRiasBusanaRow}
										class="text-amber-700 hover:text-amber-800 font-medium"
									>
										Add an Item
									</button>
								</div>
							</div>
						</section>

						<section>
							<h2 class="text-lg font-bold text-gray-800 mb-4">Photo dan Video</h2>
							<div class="grid grid-cols-2 gap-4 mb-4">
								<div>
									<label class="block text-sm text-gray-600 mb-1">Vendor</label>
									<input
										type="text"
										bind:value={paxData.photoVideoVendor}
										class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
									/>
								</div>
								<div>
									<label class="block text-sm text-gray-600 mb-1">Type</label>
									<input
										type="text"
										bind:value={paxData.photoVideoType}
										class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
									/>
								</div>
							</div>
							<div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
								<table class="min-w-full divide-y divide-gray-200">
									<thead class="bg-gray-50">
										<tr>
											<th class="px-6 py-3 w-12"></th>
											<th
												class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
												>Item</th
											>
											<th
												class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
												>Quantity</th
											>
											<th
												class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
												>Notes</th
											>
											<th class="px-6 py-3 w-12"></th>
										</tr>
									</thead>
									<tbody class="bg-white divide-y divide-gray-200">
										{#each paxData.photoVideoItems as item, index}
											<tr class="hover:bg-gray-50">
												<td class="px-6 py-4">
													<button class="text-gray-400 hover:text-gray-600 cursor-move">
														<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
															<path
																stroke-linecap="round"
																stroke-linejoin="round"
																stroke-width="2"
																d="M4 8h16M4 16h16"
															/>
														</svg>
													</button>
												</td>
												<td class="px-6 py-4">
													<input
														type="text"
														bind:value={item.item}
														class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
													/>
												</td>
												<td class="px-6 py-4">
													<input
														type="text"
														bind:value={item.quantity}
														class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
													/>
												</td>
												<td class="px-6 py-4">
													<input
														type="text"
														bind:value={item.notes}
														class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
													/>
												</td>
												<td class="px-6 py-4">
													<button
														on:click={() => removePhotoVideoRow(index)}
														class="text-red-500 hover:text-red-700"
													>
														<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
															<path
																stroke-linecap="round"
																stroke-linejoin="round"
																stroke-width="2"
																d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
															/>
														</svg>
													</button>
												</td>
											</tr>
										{/each}
									</tbody>
								</table>
								<div class="px-6 py-4 border-t border-gray-200">
									<button
										on:click={addPhotoVideoRow}
										class="text-amber-700 hover:text-amber-800 font-medium"
									>
										Add an Item
									</button>
								</div>
							</div>
						</section>

						<section>
							<h2 class="text-lg font-bold text-gray-800 mb-4">Entertainment</h2>
							<div class="grid grid-cols-2 gap-4">
								<div>
									<label class="block text-sm text-gray-600 mb-1">Vendor</label>
									<input
										type="text"
										bind:value={paxData.entertainmentVendor}
										class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
									/>
								</div>
								<div>
									<label class="block text-sm text-gray-600 mb-1">Type</label>
									<select
										bind:value={paxData.entertainmentType}
										class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
									>
										<option value="">Select type</option>
										<option value="type1">Type 1</option>
										<option value="type2">Type 2</option>
										<option value="type3">Type 3</option>
									</select>
								</div>
							</div>
						</section>

						<section>
							<h2 class="text-lg font-bold text-gray-800 mb-4">Wedding Organizer</h2>
							<div class="grid grid-cols-2 gap-4">
								<div>
									<label class="block text-sm text-gray-600 mb-1">Vendor</label>
									<input
										type="text"
										bind:value={paxData.weddingOrganizerVendor}
										class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
									/>
								</div>
								<div>
									<label class="block text-sm text-gray-600 mb-1">Type</label>
									<input
										type="text"
										bind:value={paxData.weddingOrganizerType}
										class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
									/>
								</div>
							</div>
						</section>

						<section>
							<h2 class="text-lg font-bold text-gray-800 mb-4">Pendukung</h2>
							<div class="grid grid-cols-2 gap-4">
								<div>
									<label class="block text-sm text-gray-600 mb-1">MC</label>
									<input
										type="text"
										bind:value={paxData.pendukungMc}
										class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
									/>
								</div>
								<div>
									<label class="block text-sm text-gray-600 mb-1">Upacara Adat</label>
									<input
										type="text"
										bind:value={paxData.pendukungUpacaraAdat}
										class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
									/>
								</div>
								<div>
									<label class="block text-sm text-gray-600 mb-1">Intagiri</label>
									<input
										type="text"
										bind:value={paxData.pendukungIntagiri}
										class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
									/>
								</div>
								<div>
									<label class="block text-sm text-gray-600 mb-1">Tarian</label>
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

			<div class="px-8 py-6 border-t border-gray-200 flex justify-end gap-2">
				<button
					on:click={handlePrint}
					class="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
				>
					Print
				</button>
				<button
					on:click={saveDetails}
					class="px-6 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
				>
					Save
				</button>
			</div>
		</div>
	</div>
{/if}