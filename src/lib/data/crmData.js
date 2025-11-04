// CRM Contacts Data with Relational Structure
// All fields use IDs to reference master data

import { masterVenues } from './masterVenues.js';
import { salespersonData } from './salespersonData.js';
import { dekorasiVendors, riasBusanaVendors, photoVideoVendors, entertainmentVendors, weddingOrganizerVendors } from './vendorData.js';
import { mcData, upacaraAdatData, intagiriData, tarianData } from './pendukungData.js';

export const crmContacts = [
	{
		id: 1,
		opportunityName: 'Wedding Juni & Hermansyah',
		salespersonId: 1,
		contacts: [
			{ name: 'Juni', phone: '08999415758', keterangan: 'Bride' },
			{ name: 'Hermansyah', phone: '08999415759', keterangan: 'Groom' }
		],
		events: [
			{
				id: 'evt-001',
				name: 'Akad Nikah',
				date: '2025-06-15',
				status: 'In Progress',
				selectedVenues: [
					{
						venueId: 1,
						venueName: 'Studio Kencana',
						selectedPax: [
							{
								paxNumber: 200,
								venueId: 1,
								buffetType: 'Buffet Premium',
								buffetQuantity: 200,
								buffetItems: [
									{ menu: 'Sop Buntut', quantity: 200, notes: '' },
									{ menu: 'Nasi Goreng Spesial', quantity: 200, notes: '' }
								],
								totalQuantity: 200,
								dekorasi: {
									vendorId: 3,
									vendor: 'Paradise Decor',
									items: [
										{ item: 'Dekorasi Outdoor Complete', quantity: 1, notes: '' }
									]
								},
								riasBusana: {
									vendorId: 1,
									vendor: 'Sari Makeup Artist',
									items: [
										{ item: 'Paket Rias Pengantin Akad', quantity: 1, notes: '' }
									]
								},
								photoVideo: {
									vendorId: 1,
									vendor: 'Royal Photography',
									items: [
										{ item: 'Paket Foto Standard', quantity: 1, notes: '' }
									]
								},
								entertainment: {
									vendorId: 3,
									vendor: 'Joy Entertainment',
									type: 'Acoustic Solo'
								},
								weddingOrganizer: {
									vendorId: 3,
									vendor: 'Dream Wedding Organizer',
									package: 'Paket Minimalist'
								},
								pendukung: {
									mcId: 2,
									mc: 'MC Sarah Wijaya',
									upacaraAdatId: 4,
									upacaraAdat: 'Upacara Adat Betawi',
									intagiriId: 1,
									intagiri: 'Intagiri Traditional - Basic',
									tarianId: 5,
									tarian: 'Tari Pendet'
								}
							}
						]
					}
				]
			},
			{
				id: 'evt-002',
				name: 'Resepsi',
				date: '2025-06-16',
				status: 'Planning',
				selectedVenues: []
			}
		],
		contactLogs: [
			{ 
				id: 1, 
				eventId: 'evt-001',
				eventName: 'Akad Nikah',
				createdDate: '2025-05-01T10:00:00Z', 
				attachment: 'quotation_akad.pdf', 
				status: 'Sudah Direspon' 
			},
			{ 
				id: 2, 
				eventId: 'evt-001',
				eventName: 'Akad Nikah',
				createdDate: '2025-05-15T14:30:00Z', 
				attachment: 'venue_confirmation.jpg', 
				status: 'Prospek' 
			},
			{ 
				id: 3, 
				eventId: 'evt-002',
				eventName: 'Resepsi',
				createdDate: '2025-05-20T09:00:00Z', 
				attachment: null, 
				status: 'Belum Ada Respon' 
			}
		]
	},
	{
		id: 2,
		opportunityName: 'Corporate Event - Tech Summit 2025',
		salespersonId: 2,
		contacts: [
			{ name: 'Sarah', phone: '08123456789', keterangan: 'Event Manager' }
		],
		events: [
			{
				id: 'evt-003',
				name: 'Tech Summit Opening',
				date: '2025-07-10',
				status: 'Planning',
				selectedVenues: []
			}
		],
		contactLogs: [
			{ 
				id: 4, 
				eventId: 'evt-003',
				eventName: 'Tech Summit Opening',
				createdDate: '2025-04-10T11:00:00Z', 
				attachment: 'initial_proposal.pdf', 
				status: 'Belum Ada Respon' 
			}
		]
	},
	{
		id: 3,
		opportunityName: 'Birthday Party - Lisa 25th',
		salespersonId: 3,
		contacts: [
			{ name: 'Lisa', phone: '08234567890', keterangan: 'Birthday Girl' },
			{ name: 'Budi', phone: '08234567891', keterangan: 'Organizer' }
		],
		events: [
			{
				id: 'evt-004',
				name: 'Birthday Celebration',
				date: '2025-08-20',
				status: 'Initial Contact',
				selectedVenues: []
			}
		],
		contactLogs: [
			{ 
				id: 5, 
				eventId: 'evt-004',
				eventName: 'Birthday Celebration',
				createdDate: '2025-04-25T15:00:00Z', 
				attachment: 'whatsapp_chat.jpg', 
				status: 'Sudah Direspon' 
			}
		]
	},
	{
		id: 4,
		opportunityName: 'Wedding Dewi & Rizki',
		salespersonId: 1,
		contacts: [
			{ name: 'Dewi', phone: '08345678901', keterangan: 'Bride' }
		],
		events: [],
		contactLogs: []
	},
	{
		id: 5,
		opportunityName: 'Annual Gathering PT Global',
		salespersonId: 4,
		contacts: [
			{ name: 'Maya', phone: '08456789012', keterangan: 'HR Manager' },
			{ name: 'Arief', phone: '08456789013', keterangan: 'Finance' }
		],
		events: [
			{
				id: 'evt-005',
				name: 'Annual Gathering',
				date: '2025-12-15',
				status: 'Quotation Sent',
				selectedVenues: []
			}
		],
		contactLogs: [
			{ 
				id: 6, 
				eventId: 'evt-005',
				eventName: 'Annual Gathering',
				createdDate: '2025-03-01T08:00:00Z', 
				attachment: 'quotation_annual.pdf', 
				status: 'Prospek' 
			},
			{ 
				id: 7, 
				eventId: 'evt-005',
				eventName: 'Annual Gathering',
				createdDate: '2025-03-15T16:00:00Z', 
				attachment: 'follow_up.pdf', 
				status: 'Prospek' 
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
			opportunityName: contact.opportunityName
		}))
	);
}

export function getContactLogsByContactId(contactId) {
	const contact = getContactById(contactId);
	return contact ? contact.contactLogs : [];
}

export function getContactLogsByEventId(contactId, eventId) {
	const contact = getContactById(contactId);
	if (!contact) return [];
	return contact.contactLogs.filter(log => log.eventId === eventId);
}

export function getLatestContactLogStatus(contactId) {
	const logs = getContactLogsByContactId(contactId);
	if (logs.length === 0) return null;
	
	const sortedLogs = [...logs].sort((a, b) => 
		new Date(b.createdDate) - new Date(a.createdDate)
	);
	
	return sortedLogs[0].status;
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