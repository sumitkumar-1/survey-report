CREATE TABLE IF NOT EXISTS pm_projects (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	projectname TEXT NOT NULL,
	market TEXT NOT NULL,
	siteid TEXT NOT NULL,
	sitename TEXT NOT NULL,
	contractor TEXT NOT NULL,
	startdate Date NOT NULL,
	installation TEXT NOT NULL,
	onsitetech TEXT NOT NULL,
	additionalnotes TEXT NOT NULL,
	sourcelogopath TEXT NOT NULL,
	targetlogopath TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS pm_project_details (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	projectid INTEGER NOT NULL,
	aspname TEXT NOT NULL,
	completeddate Date NOT NULL,
	shift TEXT NOT NULL,
	currentstatus TEXT NOT NULL,
	e911completed TEXT NOT NULL,
	srscompleted TEXT NOT NULL,
	usedlongcable TEXT NOT NULL,
	dusasset TEXT NOT NULL,
	dusserial TEXT NOT NULL,
	dulasset TEXT NOT NULL,
	dulserial TEXT NOT NULL,
	xmuasset TEXT NOT NULL,
	xmuserial TEXT NOT NULL,
	installedserial TEXT NOT NULL,
	installedasset TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS pm_project_assets (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	projectid INTEGER NOT NULL,
	assettype TEXT NOT NULL,
	assetpath TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS bc_users (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	username TEXT NOT NULL,
	uemail TEXT NOT NULL,
	upassword TEXT NOT NULL
);

INSERT or IGNORE INTO bc_users(id, username, uemail, upassword) values(1, 'Ajay', 'ajaymishra.1985@gmail.com', 'ajay@123');