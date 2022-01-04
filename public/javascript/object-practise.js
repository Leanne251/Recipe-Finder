const searchTerm = 'hello';

const obj = {
	hello: 'Ellie',
	book: 'happy',
	school: 'high school'
};

function findValue() {
	for (const property in obj) {
		if (searchTerm === property) {
			return obj[property];
		}
	}
}
const id = findValue();

console.log(id);
