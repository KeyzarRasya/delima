<script>
	import Sidebar from '$lib/components/Sidebar.svelte';
	import PhotoVideo from '$lib/components/PhotoVideo.svelte';
	import RiasBusana from '$lib/components/RiasBusana.svelte';
	import Dekorasi from '$lib/components/Dekorasi.svelte';
	import Entertainment from '$lib/components/Entertainment.svelte';
	import Pendukung from '$lib/components/Pendukung.svelte';
	import Catering from '$lib/components/Catering.svelte';
	import Venue from '$lib/components/Venue.svelte';
	import Pax from '$lib/components/Pax.svelte';
	import ContactManagement from '$lib/components/ContactManagement.svelte';

	let activeMenu = 'photo-video';

	function handleMenuChange(event) {
		activeMenu = event.detail;
	}
</script>

<div class="flex min-h-screen bg-gray-50">
	<Sidebar {activeMenu} on:menuChange={handleMenuChange} />

	<main class="flex-1 p-8">
		<div class="max-w-7xl mx-auto">
			<div class="mb-8">
				<h1 class="text-3xl font-bold text-gray-800">Delima Catering</h1>
				<p class="text-gray-600 mt-2">
					{#if activeMenu === 'venue' || activeMenu === 'pax' || activeMenu === 'contact-management'}
						Master Data Management
					{:else}
						Price List Management
					{/if}
				</p>
			</div>

			{#if activeMenu === 'photo-video'}
				<PhotoVideo />
			{:else if activeMenu === 'rias-busana'}
				<RiasBusana />
			{:else if activeMenu === 'dekorasi'}
				<Dekorasi />
			{:else if activeMenu === 'entertainment'}
				<Entertainment />
			{:else if activeMenu === 'pendukung'}
				<Pendukung />
			{:else if activeMenu === 'catering'}
				<Catering />
			{:else if activeMenu === 'venue'}
				<Venue />
			{:else if activeMenu === 'pax'}
				<Pax />
			{:else if activeMenu === 'contact-management'}
				<ContactManagement />
			{/if}
		</div>
	</main>
</div>