// Mock Data Index
// Central export point for all mock data with comprehensive documentation

// Import all data modules
export * from './masterPax.js';
export * from './masterVenues.js';
export * from './cateringData.js';
export * from './vendorData.js';
export * from './pendukungData.js';
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
 * 3. CRM EVENTS - VENUE SELECTION
 *    - User selects venue from dropdown (e.g., "Studio Kencana")
 *    - System checks which pax numbers are available for that venue
 *    - Only shows pax numbers that exist in that venue's paxPrices
 *    - If venue doesn't have a pax number, it won't appear in the dropdown
 * 
 * 4. CRM EVENTS - PAX SELECTION
 *    - After selecting venue, user selects pax number
 *    - Only pax numbers supported by the selected venue are available
 *    - Example: If "Studio Kencana" is selected, only 200, 400, 600 pax are available
 *    - Creates a tab for each selected pax number
 * 
 * 5. BUFFET AND BUFFET-PENDUKUNG
 *    - When user is on a specific pax tab (e.g., "200 Pax" tab)
 *    - Buffet selection applies to that pax number
 *    - Buffet-Pendukung quantity is related to the selected pax
 *    - Example: 200 pax selected → buffet-pendukung items should be ~200 or related
 * 
 * 6. GUBUKAN
 *    - Gubukan items are also tied to the pax number
 *    - Total quantity in gubukan relates to the selected pax
 *    - Can be from Master Data (Gubukan Basic) or vendor-specific (Gubukan Special)
 * 
 * 7. VENDOR RELATIONSHIPS
 *    - Dekorasi, Rias Busana, Photo Video, Entertainment, Wedding Organizer
 *    - Each vendor has specific items/packages
 *    - Selected vendor's items become available for selection
 *    - Vendor data is independent but quantity may relate to pax
 * 
 * 8. PENDUKUNG (SUPPORTING SERVICES)
 *    - MC, Upacara Adat, Intagiri, Tarian
 *    - Each has its own master data
 *    - Can be selected independently
 *    - Some may have performer counts that relate to venue size
 * 
 * VALIDATION RULES:
 * 
 * - A venue can only be selected if it exists in masterVenues
 * - A pax can only be selected if it exists in the selected venue's paxPrices
 * - If venue A is selected but venue A doesn't have pax 1000, then pax 1000 won't show
 * - Buffet pendukung quantities should logically relate to selected pax
 * - All vendor selections must reference existing vendors in vendorData
 * - All pendukung selections must reference existing items in pendukungData
 * 
 * USAGE EXAMPLES:
 * 
 * Example 1: Valid venue-pax relationship
 * - Venue: "Studio Kencana"
 * - Available pax: 200, 400, 600 (from masterVenues)
 * - User selects 200 → Valid, shows 200 pax tab
 * - User selects 1000 → Invalid, 1000 not available for Studio Kencana
 * 
 * Example 2: Buffet-Pendukung relationship
 * - Selected pax: 400
 * - Buffet: "Buffet Premium" for 400 people
 * - Buffet-Pendukung: Extra items with quantities related to 400
 *   - Extra Dessert: 100 (subset of guests)
 *   - Extra Beverage: 400 (all guests)
 * 
 * Example 3: Complete event flow
 * 1. Select venue: "Grand Ballroom"
 * 2. System shows available pax: 500, 600, 800 (from venue's paxPrices)
 * 3. User selects pax: 500
 * 4. Create tab: "500 Pax"
 * 5. In "500 Pax" tab:
 *    - Select buffet type: "Buffet Luxury"
 *    - Set buffet quantity: 500
 *    - Add buffet-pendukung items (quantities relate to 500)
 *    - Add gubukan items (quantities relate to 500)
 *    - Select vendors and their items
 *    - Select pendukung services
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
import { crmContacts } from './crmData.js';

// Aggregate exports for easy access
export const mockData = {
	// Master Data
	masterPax,
	masterVenues,
	
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