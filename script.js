import { question } from 'readline-sync'
import bcrypt from 'bcryptjs'

const users = []
const salt = bcrypt.genSaltSync(10);
console.log('Starting service... salt is ', salt)

console.log('1. Register new user')
console.log('2. List users')
console.log('3. Verify login')



let input = ''

while( input != 'q' ) {
	input = question('Choose an option: ')
	// console.log('You chose: ', input)

	if( input == '1' ) {
		let username = question('> Please enter username: ')
		let password = question('> Please enter password: ')
		let hashedPassword = bcrypt.hashSync(password, salt)
		let user = { username, password: hashedPassword }
		users.push(user)
		console.log('')

	} else if( input == '2' ) {
		users.forEach(user => {
			console.log(`* ${user.username} , ${user.password} `)
		})
		console.log('')

	} else if( input == '3' ) {
		let username = question('> Please enter username: ')
		let password = question('> Please enter password: ')
		let hashedPassword = bcrypt.hashSync(password, salt)
		let match = users.find(user => user.username == username)
		if( !match ) {
			console.log('> Wrong username\n')
		} else {
			let correctPassword = match.password == hashedPassword
			if( correctPassword ) {
				console.log('> Welcome user!')
			} else {
				console.log('> Password does not match.')
			}
		}
	}
}