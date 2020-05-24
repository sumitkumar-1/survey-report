CREATE TABLE IF NOT EXISTS pm_projects (
	id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE,
	projectname TEXT NOT NULL UNIQUE,
	market TEXT NOT NULL UNIQUE,
	siteid TEXT NOT NULL UNIQUE,
	sitename TEXT NOT NULL UNIQUE,
	contractor TEXT NOT NULL UNIQUE,
	startdate Date NOT NULL,
	installation TEXT NOT NULL UNIQUE,
	onsitetech TEXT NOT NULL UNIQUE,
	additionalnotes TEXT NOT NULL UNIQUE,
	sourcelogopath TEXT NOT NULL,
	targetlogopath TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS pm_project_details (
	id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE,
	projectid INTEGER NOT NULL UNIQUE,
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
	id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE,
	projectid INTEGER NOT NULL,
	assettype TEXT NOT NULL,
	assetpath TEXT NOT NULL
);