Postman Collection - https://www.getpostman.com/collections/0e01b93687c2c1bd2dab
user details
	name
	email
	mobile
	role

log details
	author
	activityType
	dbAltered
	dbFieldId
	timestamps
	
request details
	adminId
	author
	activityType
	dbAltered
	dbFieldId
	timestamps
	
user authorities
	role // string and thus extendable
		role_admin
		role_super_ADMIN
		role_user

User Creation and Login
	signup
		post /users/signup
	login
		post /users/login

Normal user
	can only do following related to its account
	create
		post /tweets
		body details - content
	list all the tweets chronologically
		get /tweets
	delete
		delete /tweets/:tweetid
	*udpate
		put /tweets/:tweetid

Admin user
	see all users
		get /admin
	edit user details
		put /admin/:userid
		body - whatever to be updated
	CRUD on user behalf
		/admin/tweets 

Super Admin
	view logs
		get /superAdmin/logs
	view requests
		get /superAdmin/
	edit requests
		put /superAdmin/:requestId
	