// CRM Event Data
// Sample events showing complete back-to-back relationships
// between venues, pax, buffet, gubukan, vendors, and all other services

import { masterPax } from './masterPax.js';
import { masterVenues } from './masterVenues.js';

export const crmContacts = [
	{
		id: 1,
		name: 'Juni & Hermansyah',
		company: 'Tech Solutions Inc',
		phone: '08999415758',
		salesperson: 'Administrator',
		events: [
			{
				id: 'evt-001',
				name: 'Akad - Juni & Hermansyah',
				date: '2025-06-15',
				status: 'Planning',
				// Selected venues - must exist in masterVenues
				selectedVenues: [
					{
						venueName: 'Studio Kencana',
						// Only pax that exist in Studio Kencana's paxPrices can be selected
						selectedPax: [
							{
								paxNumber: 200, // This exists in Studio Kencana's paxPrices
								// For this pax, we have:
								buffet: {
									type: 'Buffet Premium',
									quantity: 200,
									items: [
										{ category: 'Appetizer', menu: 'International Salad, Cream Soup' },
										{ category: 'Main Course', menu: 'Nasi Kebuli, Beef Tenderloin, Grilled Salmon' },
										{ category: 'Dessert', menu: 'Cake Selection, Ice Cream Bar' }
									]
								},
								// Buffet pendukung - total must equal or relate to paxNumber (200)
								buffetPendukung: {
									items: [
										{ category: 'Extra Dessert', menu: 'French Pastries', quantity: 50, notes: 'For VIP guests' },
										{ category: 'Extra Beverage', menu: 'Fresh Juice Station', quantity: 200, notes: 'For all guests' }
									],
									totalQuantity: 250 // Can exceed pax for extras
								},
								gubukan: {
									items: [
										{ category: 'Appetizer', menu: 'Spring Roll', quantity: 100, notes: 'Half of guests' },
										{ category: 'Main Course', menu: 'Nasi Goreng Spesial', quantity: 200, notes: 'All guests' },
										{ category: 'Dessert', menu: 'Es Campur', quantity: 200, notes: 'All guests' }
									],
									totalQuantity: 500 // Total items can exceed pax
								},
								dekorasi: {
									vendor: 'Elegant Decoration',
									items: [
										{ item: 'Dekorasi Pelaminan Modern', quantity: 1, notes: 'Main stage' },
										{ item: 'Dekorasi Jalan Masuk', quantity: 1, notes: 'Entrance decoration' },
										{ item: 'Dekorasi Meja Tamu', quantity: 20, notes: '20 tables for 200 pax' }
									]
								},
								riasBusana: {
									vendor: 'Sari Makeup Artist',
									items: [
										{ item: 'Paket Rias Pengantin Akad', quantity: 1, notes: 'Bride and groom' },
										{ item: 'Busana Pengantin Adat Jawa', quantity: 1, notes: 'Traditional attire' }
									]
								},
								photoVideo: {
									vendor: 'Cinematic Wedding',
									items: [
										{ item: 'Paket Foto + Video Complete', quantity: 1, notes: 'Full coverage' },
										{ item: 'Album Premium', quantity: 2, notes: 'For both families' }
									]
								},
								entertainment: {
									vendor: 'Harmony Entertainment',
									type: 'Acoustic Band'
								},
								weddingOrganizer: {
									vendor: 'Perfect Wedding Organizer',
									package: 'Paket Standard'
								},
								pendukung: {
									mc: 'MC Sarah Wijaya',
									upacaraAdat: 'Upacara Adat Jawa',
									intagiri: 'Intagiri Traditional - Standard',
									tarian: 'Tari Serimpi'
								}
							},
							{
								paxNumber: 400, // This also exists in Studio Kencana's paxPrices
								buffet: {
									type: 'Buffet Luxury',
									quantity: 400,
									items: [
										{ category: 'Appetizer', menu: 'Caviar Station, Sushi Bar' },
										{ category: 'Main Course', menu: 'Wagyu Beef, Lobster Thermidor' },
										{ category: 'Dessert', menu: 'French Pastries, Chocolate Fountain' }
									]
								},
								buffetPendukung: {
									items: [
										{ category: 'Premium Drinks', menu: 'Champagne Station', quantity: 400, notes: 'For all guests' }
									],
									totalQuantity: 400
								},
								gubukan: {
									items: [
										{ category: 'Main Course', menu: 'Ayam Bakar Taliwang', quantity: 400, notes: 'All guests' }
									],
									totalQuantity: 400
								},
								dekorasi: {
									vendor: 'Royal Decoration',
									items: [
										{ item: 'Dekorasi Pelaminan Luxury', quantity: 1, notes: 'Premium stage' }
									]
								},
								riasBusana: {
									vendor: 'Glamour Bridal',
									items: [
										{ item: 'Paket Rias Pengantin Complete', quantity: 1, notes: 'Full package' }
									]
								},
								photoVideo: {
									vendor: 'Royal Photography',
									items: [
										{ item: 'Paket Foto Premium', quantity: 1, notes: '' },
										{ item: 'Paket Video Premium', quantity: 1, notes: '' }
									]
								},
								entertainment: {
									vendor: 'Prestige Entertainment',
									type: 'Full Band'
								},
								weddingOrganizer: {
									vendor: 'Elite Wedding Planner',
									package: 'Paket Complete'
								},
								pendukung: {
									mc: 'MC Dedi Prasetyo',
									upacaraAdat: 'Upacara Adat Jawa',
									intagiri: 'Intagiri Traditional - Premium',
									tarian: 'Tari Kecak'
								}
							}
						]
					}
				]
			},
			{
				id: 'evt-002',
				name: 'Resepsi - Juni & Hermansyah',
				date: '2025-06-16',
				status: 'Planning',
				selectedVenues: [
					{
						venueName: 'Grand Ballroom',
						selectedPax: [
							{
								paxNumber: 500,
								buffet: {
									type: 'Buffet Premium',
									quantity: 500,
									items: [
										{ category: 'Appetizer', menu: 'International Salad, Cream Soup' },
										{ category: 'Main Course', menu: 'Nasi Kebuli, Beef Tenderloin' },
										{ category: 'Dessert', menu: 'Cake Selection' }
									]
								},
								buffetPendukung: {
									items: [
										{ category: 'Extra Beverage', menu: 'Coffee & Tea Station', quantity: 500, notes: 'All guests' }
									],
									totalQuantity: 500
								},
								gubukan: {
									items: [
										{ category: 'Main Course', menu: 'Ikan Bakar Jimbaran', quantity: 500, notes: '' }
									],
									totalQuantity: 500
								},
								dekorasi: {
									vendor: 'Paradise Decor',
									items: [
										{ item: 'Dekorasi Pelaminan Garden', quantity: 1, notes: '' }
									]
								},
								riasBusana: {
									vendor: 'Traditional Beauty',
									items: [
										{ item: 'Paket Rias Adat Sunda', quantity: 1, notes: '' }
									]
								},
								photoVideo: {
									vendor: 'Eternal Moments',
									items: [
										{ item: 'Paket Foto Luxury', quantity: 1, notes: '' }
									]
								},
								entertainment: {
									vendor: 'Joy Entertainment',
									type: 'DJ + Singer'
								},
								weddingOrganizer: {
									vendor: 'Dream Wedding Organizer',
									package: 'Paket Grand'
								},
								pendukung: {
									mc: 'MC Budi Santoso',
									upacaraAdat: 'Upacara Adat Sunda',
									intagiri: 'Intagiri Traditional - Basic',
									tarian: 'Tari Jaipong'
								}
							}
						]
					}
				]
			}
		]
	},
	{
		id: 2,
		name: 'Rudi & Sinta',
		company: 'Creative Agency',
		phone: '08123456789',
		salesperson: 'Administrator',
		events: [
			{
				id: 'evt-003',
				name: 'Wedding Reception - Rudi & Sinta',
				date: '2025-07-20',
				status: 'Contract Signed',
				selectedVenues: [
					{
						venueName: 'Royal Hall',
						selectedPax: [
							{
								paxNumber: 400,
								buffet: {
									type: 'Buffet Traditional',
									quantity: 400,
									items: [
										{ category: 'Appetizer', menu: 'Gado-gado, Karedok' },
										{ category: 'Main Course', menu: 'Nasi Kuning, Rendang, Ayam Betutu' },
										{ category: 'Dessert', menu: 'Es Campur, Klepon' }
									]
								},
								buffetPendukung: {
									items: [
										{ category: 'Extra Dessert', menu: 'Traditional Sweets', quantity: 400, notes: '' }
									],
									totalQuantity: 400
								},
								gubukan: {
									items: [
										{ category: 'Appetizer', menu: 'Lumpia Semarang', quantity: 400, notes: '' }
									],
									totalQuantity: 400
								},
								dekorasi: {
									vendor: 'Elegant Decoration',
									items: [
										{ item: 'Dekorasi Pelaminan Traditional', quantity: 1, notes: '' }
									]
								},
								riasBusana: {
									vendor: 'Traditional Beauty',
									items: [
										{ item: 'Paket Rias Adat Minang', quantity: 1, notes: '' }
									]
								},
								photoVideo: {
									vendor: 'Cinematic Wedding',
									items: [
										{ item: 'Paket Foto Standard', quantity: 1, notes: '' }
									]
								},
								entertainment: {
									vendor: 'Prestige Entertainment',
									type: 'Traditional Gamelan'
								},
								weddingOrganizer: {
									vendor: 'Perfect Wedding Organizer',
									package: 'Paket Premium'
								},
								pendukung: {
									mc: 'MC Rina Kusuma',
									upacaraAdat: 'Upacara Adat Minang',
									intagiri: 'Intagiri Traditional - Standard',
									tarian: 'Tari Piring'
								}
							}
						]
					}
				]
			}
		]
	},
	{
		id: 3,
		name: 'Ahmad & Fitri',
		company: 'Retail Business',
		phone: '08567890123',
		salesperson: 'Administrator',
		events: [
			{
				id: 'evt-004',
				name: 'Intimate Wedding - Ahmad & Fitri',
				date: '2025-08-10',
				status: 'Planning',
				selectedVenues: [
					{
						venueName: 'Paradise Garden',
						selectedPax: [
							{
								paxNumber: 200,
								buffet: {
									type: 'Buffet Standard',
									quantity: 200,
									items: [
										{ category: 'Appetizer', menu: 'Salad Bar, Soup Station' },
										{ category: 'Main Course', menu: 'Nasi Putih, Ayam Goreng, Ikan Bakar' },
										{ category: 'Dessert', menu: 'Fresh Fruit, Pudding' }
									]
								},
								buffetPendukung: {
									items: [],
									totalQuantity: 0
								},
								gubukan: {
									items: [
										{ category: 'Main Course', menu: 'Nasi Goreng Spesial', quantity: 200, notes: '' }
									],
									totalQuantity: 200
								},
								dekorasi: {
									vendor: 'Paradise Decor',
									items: [
										{ item: 'Dekorasi Outdoor Complete', quantity: 1, notes: '' }
									]
								},
								riasBusana: {
									vendor: 'Sari Makeup Artist',
									items: [
										{ item: 'Paket Rias Pengantin Akad', quantity: 1, notes: '' }
									]
								},
								photoVideo: {
									vendor: 'Royal Photography',
									items: [
										{ item: 'Paket Foto Standard', quantity: 1, notes: '' }
									]
								},
								entertainment: {
									vendor: 'Joy Entertainment',
									type: 'Acoustic Solo'
								},
								weddingOrganizer: {
									vendor: 'Dream Wedding Organizer',
									package: 'Paket Minimalist'
								},
								pendukung: {
									mc: 'MC Sarah Wijaya',
									upacaraAdat: 'Upacara Adat Betawi',
									intagiri: 'Intagiri Traditional - Basic',
									tarian: 'Tari Pendet'
								}
							}
						]
					}
				]
			}
		]
	}
];

// Helper functions
export function getContactById(id) {
	return crmContacts.find((contact) => contact.id === id);
}

export function getEventById(contactId, eventId) {
	const contact = getContactById(contactId);
	if (!contact) return null;
	return contact.events.find((event) => event.id === eventId);
}

export function getAllEvents() {
	return crmContacts.flatMap((contact) =>
		contact.events.map((event) => ({
			...event,
			contactId: contact.id,
			contactName: contact.name
		}))
	);
}

// Validation functions to ensure data integrity
export function validateVenuePaxRelationship(venueName, paxNumber) {
	const venue = masterVenues.find((v) => v.venue === venueName);
	if (!venue) return { valid: false, error: 'Venue not found in master data' };

	const hasPax = venue.paxPrices.some((pp) => pp.pax === paxNumber);
	if (!hasPax) {
		return {
			valid: false,
			error: `Venue ${venueName} does not support ${paxNumber} pax. Available pax: ${venue.paxPrices.map((pp) => pp.pax).join(', ')}`
		};
	}

	return { valid: true };
}

export function getPaxPriceForVenue(venueName, paxNumber) {
	const venue = masterVenues.find((v) => v.venue === venueName);
	if (!venue) return null;

	const paxPrice = venue.paxPrices.find((pp) => pp.pax === paxNumber);
	return paxPrice ? paxPrice.price : null;
}