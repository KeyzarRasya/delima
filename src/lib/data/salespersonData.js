// Salesperson Master Data

export const salespersonData = [
	{ id: 1, name: 'Administrator' },
	{ id: 2, name: 'John Doe' },
	{ id: 3, name: 'Jane Smith' },
	{ id: 4, name: 'Michael Johnson' },
	{ id: 5, name: 'Sarah Williams' }
];

export function getSalespersonById(id) {
	return salespersonData.find((sp) => sp.id === id);
}

export function getSalespersonByName(name) {
	return salespersonData.find((sp) => sp.name === name);
}