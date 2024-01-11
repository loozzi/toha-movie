const query = require('../../config/query')

module.exports = {
	all: async () => {
		return await query(`select * from roles where is_deleted = false;`)
	},
	find: async (role) => {
		return await query(`select * from roles where slug = '${role}' and is_deleted = false;`)
	},
	findOne: async (role_id) => {
		return (await query(`select * from roles where id = ${role_id} and is_deleted = false;`))[0]
	},
	create: async (name, slug) => {
		await query(`insert into roles (name, slug) values ('${name}', '${slug}');`)
	},
	update: async (id, name, slug) => {
		await query(`update roles set name = '${name}', slug = '${slug}', modified = current_timestamp where id = ${id};`)
		return (await query(`select * from roles where id = ${id} and is_deleted = false;`))[0]
	},
	delete: async (id) => {
		await query(`update roles set is_deleted = true, modified = current_timestamp where id = ${id};`)
	},
	getRoles: async (user_id) => {
		return await query(`
			select roles.name, roles.slug from roles
			inner join users_roles on roles.id = users_roles.role_id
			where users_roles.user_id = ${user_id} and roles.is_deleted = false and users_roles.is_deleted = false;
		`)
	},
	addUser: async (user_id, role_id) => {
		await query(`insert into users_roles set ?`, { user_id, role_id })
	},
	removeUser: async (user_id, role_id) => {
		await query(`update users_roles set is_deleted = true where role_id = ${role_id} and user_id = ${user_id};`)
	}
}