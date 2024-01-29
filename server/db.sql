drop database taho_movies;

create database if not exists taho_movies;
use taho_movies;


drop table if exists users;
create table if not exists users (
	id int not null auto_increment,
	username varchar(255) not null,
	password varchar(255) not null,
	balance decimal(10, 2) not null default 0,
	email varchar(255),

	created timestamp default current_timestamp,
	modified timestamp default current_timestamp,
	is_deleted boolean default false,

	primary key (id)
);

drop table if exists verifications;
create table if not exists verifications (
	user_id int not null,
	otp varchar(255) not null,
	token varchar(255) not null,

	created timestamp default current_timestamp,
	modified timestamp default current_timestamp,
	is_deleted boolean default false,

	primary key (user_id),
	foreign key (user_id) references users(id) on delete restrict on update cascade
);

drop table if exists roles;
create table if not exists roles (
	id int not null auto_increment,
	name varchar(255) not null,
	slug varchar(255) not null,

	created timestamp default current_timestamp,
	modified timestamp default current_timestamp,
	is_deleted boolean default false,

	primary key (id)
);

drop table if exists users_roles;
create table if not exists users_roles (
	user_id int not null,
	role_id int not null,

	created timestamp default current_timestamp,
	modified timestamp default current_timestamp,
	is_deleted boolean default false,

	foreign key (user_id) references users(id) on delete restrict on update cascade,
	foreign key (role_id) references roles(id) on delete restrict on update cascade
);

drop table if exists token_users;
create table if not exists token_users (
	user_id int not null,
	refresh_token varchar(1000) not null,

	created timestamp default current_timestamp,
	modified timestamp default current_timestamp,
	is_deleted boolean default false,

	primary key (user_id),
	foreign key (user_id) references users(id) on delete restrict on update cascade
);

drop table if exists movies;
create table if not exists movies(
	id int not null auto_increment,
	name varchar(255) not null,
	origin_name varchar(255) not null,
	content text,
	type enum('single', 'series', 'tvshows', 'hoathinh', 'other') not null default 'other',
	status enum('ongoing', 'trailer', 'completed', 'other') not null default 'other',
	thumb_url varchar(511) not null default '',
	trailer_url varchar(511) not null default '',
	poster_url varchar(511) not null default '',
	time varchar(255) not null default '',
	episode_current varchar(255) default '',
	episode_total varchar(255) default '',
	quality varchar(25) default 'HD',
	lang varchar(255) default '',
	notify varchar(255) default '',
	showtimes varchar(255) default '',
	slug varchar(255) not null,
	year int not null default 0,
	view int not null default 0,
	chieurap boolean default false,
	
	created timestamp default current_timestamp,
	modified timestamp default current_timestamp,
	is_deleted boolean default false,

	primary key (id)
);

drop table if exists users_movies;
create table if not exists users_movies(
	id int not null auto_increment,
	user_id int not null,
	movie_id int not null,
	type enum('watched', 'favorite', 'other') not null default 'other',

	created timestamp default current_timestamp,
	modified timestamp default current_timestamp,
	is_deleted boolean default false,

	primary key(id),
	foreign key (user_id) references users(id) on delete restrict on update cascade,
	foreign key (movie_id) references movies(id) on delete restrict on update cascade
);

drop table if exists comments;
create table if not exists comments(
	id int not null auto_increment,
	user_id int not null,
	movie_id int not null,
	content text not null,

	created timestamp default current_timestamp,
	modified timestamp default current_timestamp,
	is_deleted boolean default false,

	primary key(id),
	foreign key (user_id) references users(id) on delete restrict on update cascade,
	foreign key (movie_id) references movies(id) on delete restrict on update cascade
);

drop table if exists rates;
create table if not exists rates(
	user_id int not null,
	movie_id int not null,
	rate int not null default 0,

	created timestamp default current_timestamp,
	modified timestamp default current_timestamp,
	is_deleted boolean default false,

	foreign key (user_id) references users(id) on delete restrict on update cascade,
	foreign key (movie_id) references movies(id) on delete restrict on update cascade
);

drop table if exists actors;
create table if not exists actors(
	id int not null auto_increment,
	name varchar(255) not null,
	slug varchar(255) not null,

	created timestamp default current_timestamp,
	modified timestamp default current_timestamp,
	is_deleted boolean default false,

	primary key (id)
);

drop table if exists movies_actors;
create table if not exists movies_actors(
	movie_id int not null,
	actor_id int not null,

	created timestamp default current_timestamp,
	modified timestamp default current_timestamp,
	is_deleted boolean default false,

	foreign key (movie_id) references movies(id) on delete restrict on update cascade,
	foreign key (actor_id) references actors(id) on delete restrict on update cascade
);

drop table if exists directors;
create table if not exists directors(
	id int not null auto_increment,
	name varchar(255) not null,
	slug varchar(255) not null,

	created timestamp default current_timestamp,
	modified timestamp default current_timestamp,
	is_deleted boolean default false,

	primary key (id)
);

drop table if exists movies_directors;
create table if not exists movies_directors(
	movie_id int not null,
	director_id int not null,

	created timestamp default current_timestamp,
	modified timestamp default current_timestamp,
	is_deleted boolean default false,

	foreign key (movie_id) references movies(id) on delete restrict on update cascade,
	foreign key (director_id) references directors(id) on delete restrict on update cascade
);

drop table if exists categories;
create table if not exists categories(
	id int not null auto_increment,
	name varchar(255) not null,
	slug varchar(255) not null,

	created timestamp default current_timestamp,
	modified timestamp default current_timestamp,
	is_deleted boolean default false,

	primary key (id)
);

drop table if exists movies_categories;
create table if not exists movies_categories(
	movie_id int not null,
	category_id int not null,

	created timestamp default current_timestamp,
	modified timestamp default current_timestamp,
	is_deleted boolean default false,

	foreign key (movie_id) references movies(id) on delete restrict on update cascade,
	foreign key (category_id) references categories(id) on delete restrict on update cascade
);

drop table if exists countries;
create table if not exists countries(
	id int not null auto_increment,
	name varchar(255) not null,
	slug varchar(255) not null,

	created timestamp default current_timestamp,
	modified timestamp default current_timestamp,
	is_deleted boolean default false,

	primary key (id)
);

drop table if exists movies_countries;
create table if not exists movies_countries(
	movie_id int not null,
	country_id int not null,

	created timestamp default current_timestamp,
	modified timestamp default current_timestamp,
	is_deleted boolean default false,

	foreign key (movie_id) references movies(id) on delete restrict on update cascade,
	foreign key (country_id) references countries(id) on delete restrict on update cascade
);

drop table if exists servers;
create table if not exists servers(
	id int not null auto_increment,
	name varchar(255) not null,
	movie_id int not null,

	created timestamp default current_timestamp,
	modified timestamp default current_timestamp,
	is_deleted boolean default false,

	primary key (id),
	foreign key (movie_id) references movies(id) on delete restrict on update cascade
);


drop table if exists episodes;
create table if not exists episodes(
	server_id int not null,
	name varchar(255) not null,
	slug varchar(255) not null,
	filename varchar(255) not null,
	video_url varchar(511) not null,
	m3u8_url varchar(511) not null,

	created timestamp default current_timestamp,
	modified timestamp default current_timestamp,
	is_deleted boolean default false,

	foreign key (server_id) references servers(id) on delete restrict on update cascade
);

drop table if exists rooms;
create table if not exists rooms(
	id int not null auto_increment,
	host_id int not null,
	movie_id int not null,
	time_active int not null default 0,
	cur_time int not null default 0,
	name varchar(255) not null,
	slug varchar(255) not null,
	is_locked boolean default false,
	password varchar(255),

	created timestamp default current_timestamp,
	modified timestamp default current_timestamp,
	is_deleted boolean default false,

	primary key (id),
	foreign key (host_id) references users(id) on delete restrict on update cascade,
	foreign key (movie_id) references movies(id) on delete restrict on update cascade
);

drop table if exists users_rooms;
create table if not exists users_rooms(
	user_id int not null,
	room_id int not null,

	created timestamp default current_timestamp,
	modified timestamp default current_timestamp,
	is_deleted boolean default false,

	foreign key (user_id) references users(id) on delete restrict on update cascade,
	foreign key (room_id) references rooms(id) on delete restrict on update cascade
);

drop table if exists messages;
create table if not exists messages(
	id int not null auto_increment,
	user_id int not null,
	room_id int not null,
	content text not null,

	created timestamp default current_timestamp,
	modified timestamp default current_timestamp,
	is_deleted boolean default false,

	primary key (id),
	foreign key (user_id) references users(id) on delete restrict on update cascade,
	foreign key (room_id) references rooms(id) on delete restrict on update cascade
);

drop table if exists histories;
create table if not exists histories(
	user_id int not null,
	movie_id int not null,
	cur_time int default 0,

	created timestamp default current_timestamp,
	modified timestamp default current_timestamp,
	is_deleted boolean default false,

	foreign key (user_id) references users(id) on delete restrict on update cascade,
	foreign key (movie_id) references movies(id) on delete restrict on update cascade
);

alter table histories add column server_id int not null default 0;
alter table histories add column episode_name varchar(255) default '';

alter table actors add column img_url varchar(255) default '';