// Mock Data Index
// Central export point for all mock data with comprehensive documentation

// Import all data modules
export * from './masterPax.js';
export * from './masterVenues.js';
export * from './cateringData.js';
export * from './vendorData.js';
export * from './pendukungData.js';
export * from './salespersonData.js';
export * from './crmData.js';

/**
 * DATA RELATIONSHIPS AND BACK-TO-BACK CONNECTIONS
 * 
 * This mock data system demonstrates the following relationships:
 * 
 * 1. MASTER PAX (Source of Truth)
 *    - Defines all valid pax numbers: 200, 400, 500, 600, 800, 1000
 *    - Referenced by: Master Venues, CRM Events
 * 
 * 2. MASTER VENUES
 *    - Each venue has specific pax numbers it can accommodate
 *    - Each venue-pax combination has a specific price
 *    - Example: Studio Kencana supports pax 200, 400, 600
 *    - When a venue is selected in CRM, only its supported pax numbers will show
 * 
 * 3. SALESPERSON MASTER DATA
 *    - Contains all available salespersons
 *    - Referenced by: CRM Contacts
 *    - Each contact has a salespersonId that links to salespersonData
 * 
 * 4. CRM CONTACTS - SALESPERSON RELATIONSHIP
 *    - Each CRM contact has a salespersonId field
 *    - This ID references the salespersonData master data
 *    - Use getSalespersonById(id) to get salesperson details
 * 
 * 5. CRM EVENTS - VENUE SELECTION
 *    - User selects venue from dropdown (e.g., "Studio Kencana")
 *    - System checks which pax numbers are available for that venue
 *    - Only shows pax numbers that exist in that venue's paxPrices
 *    - If venue doesn't have a pax number, it won't appear in the dropdown
 * 
 * 6. CRM EVENTS - PAX SELECTION
 *    - After selecting venue, user selects pax number
 *    - Only pax numbers supported by the selected venue are available
 *    - Example: If "Studio Kencana" is selected, only 200, 400, 600 pax are available
 *    - Creates a tab for each selected pax number
 * 
 * 7. VENDOR RELATIONSHIPS
 *    - Dekorasi, Rias Busana, Photo Video, Entertainment, Wedding Organizer
 *    - Each vendor has specific items/packages with vendorId
 *    - CRM events store vendorId to reference vendor master data
 *    - Use getDekorasiVendorById(id) etc. to get vendor details
 * 
 * 8. PENDUKUNG RELATIONSHIPS
 *    - MC, Upacara Adat, Intagiri, Tarian
 *    - Each has master data with id, name, price
 *    - CRM events store IDs (mcId, upacaraAdatId, etc.)
 *    - Use getMcById(id), getUpacaraAdatById(id), etc.
 * 
 * 9. BUFFET AND BUFFET-PENDUKUNG
 *    - When user is on a specific pax tab (e.g., "200 Pax" tab)
 *    - Buffet selection applies to that pax number
 *    - Buffet-Pendukung quantity is related to the selected pax
 *    - Example: 200 pax selected → buffet-pendukung items should be ~200 or related
 * 
 * 10. GUBUKAN
 *    - Gubukan items are also tied to the pax number
 *    - Total quantity in gubukan relates to the selected pax
 *    - Can be from Master Data (Gubukan Basic) or vendor-specific (Gubukan Special)
 * 
 * EXAMPLE DATA FLOW:
 * 
 * In "200 Pax" tab:
 *    - Select venue: "Studio Kencana" (venueId: 1)
 *    - Select pax: 200
 *    - Select buffet type: "Buffet Premium"
 *    - Set buffet quantity: 200
 *    - Add buffet-pendukung items (quantities relate to 200)
 *    - Add gubukan items (quantities relate to 200)
 *    - Select vendors by ID:
 *      * Dekorasi: vendorId 3 (Paradise Decor)
 *      * Rias Busana: vendorId 1 (Sari Makeup Artist)
 *      * Photo Video: vendorId 1 (Royal Photography)
 *      * Entertainment: vendorId 3 (Joy Entertainment)
 *      * Wedding Organizer: vendorId 3 (Dream Wedding Organizer)
 *    - Select pendukung services by ID:
 *      * MC: mcId 2 (MC Sarah Wijaya)
 *      * Upacara Adat: upacaraAdatId 4 (Upacara Adat Betawi)
 *      * Intagiri: intagiriId 1 (Intagiri Traditional - Basic)
 *      * Tarian: tarianId 5 (Tari Pendet)
 * 
 * DATA FLOW FOR VENUE DISPLAY:
 * 
 * When displaying venues in a table based on selected pax:
 * 1. User has selected pax (e.g., 200, 400)
 * 2. Filter masterVenues to only show venues that have ANY of the selected pax
 * 3. For each venue, show only the pax prices that match selected pax
 * 4. Example:
 *    - Selected pax: 200, 400
 *    - Studio Kencana has: 200 (50M), 400 (75M), 600 (95M)
 *    - Display: Studio Kencana with 200 (50M) and 400 (75M) only
 *    - Don't show 600 because user hasn't selected it
 */

// Re-export specific collections for convenience
import { masterPax } from './masterPax.js';
import { masterVenues } from './masterVenues.js';
import { 
	gubukanBasicData, 
	gubukanSpecialData, 
	buffetData, 
	boxData, 
	snackBoxData 
} from './cateringData.js';
import {
	dekorasiVendors,
	riasBusanaVendors,
	photoVideoVendors,
	entertainmentVendors,
	weddingOrganizerVendors
} from './vendorData.js';
import {
	mcData,
	upacaraAdatData,
	intagiriData,
	tarianData
} from './pendukungData.js';
import { salespersonData } from './salespersonData.js';
import { crmContacts } from './crmData.js';

// Aggregate exports for easy access
export const mockData = {
	// Master Data
	masterPax,
	masterVenues,
	salesperson: salespersonData,
	
	// Catering
	gubukanBasic: gubukanBasicData,
	gubukanSpecial: gubukanSpecialData,
	buffet: buffetData,
	box: boxData,
	snackBox: snackBoxData,
	
	// Vendors
	dekorasiVendors,
	riasBusanaVendors,
	photoVideoVendors,
	entertainmentVendors,
	weddingOrganizerVendors,
	
	// Pendukung
	mc: mcData,
	upacaraAdat: upacaraAdatData,
	intagiri: intagiriData,
	tarian: tarianData,
	
	// CRM
	contacts: crmContacts
};

// Utility function to get all available venues for a specific pax
export function getVenuesForPax(paxNumber) {
	return masterVenues.filter((venue) =>
		venue.paxPrices.some((pp) => pp.pax === paxNumber)
	);
}

// Utility function to get all available pax for a specific venue
export function getPaxForVenue(venueName) {
	const venue = masterVenues.find((v) => v.venue === venueName);
	return venue ? venue.paxPrices.map((pp) => pp.pax) : [];
}

// Utility function to filter venues by selected pax array
export function filterVenuesBySelectedPax(selectedPaxArray) {
	return masterVenues
		.map((venue) => ({
			...venue,
			paxPrices: venue.paxPrices.filter((pp) =>
				selectedPaxArray.includes(pp.pax)
			)
		}))
		.filter((venue) => venue.paxPrices.length > 0);
}

export default mockData;