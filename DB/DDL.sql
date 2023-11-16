BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "operator" (
	"id"	integer,
	"surname"	varchar(32) NOT NULL,
	"name"	varchar(32) NOT NULL,
	"email"	varchar(64) NOT NULL,
	"pass"	varchar(64) NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "package" (
	"code"	varchar(32),
	"destination"	varchar(64) NOT NULL,
	"weight"	float NOT NULL,
	"volume"	float NOT NULL,
	"id_c"	INTEGER DEFAULT null,
	CONSTRAINT "FK_id" FOREIGN KEY("id_c") REFERENCES "courier"("id"),
	PRIMARY KEY("code")
);
CREATE TABLE IF NOT EXISTS "courier" (
	"id"	integer,
	"courier_name" varchar(32) NOT NULL,
	"image_url" varchar(64) NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);

CREATE TABLE IF NOT EXISTS "courier_op" (
	"id"	integer,
	"surname"	varchar(32) NOT NULL,
	"name"	varchar(32) NOT NULL,
	"email"	varchar(64) NOT NULL,
	"pass"	varchar(64) NOT NULL,
    "id_courier" integer not null,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("id_courier") REFERENCES "courier"("id")
);

CREATE TABLE IF NOT EXISTS "vehicle" (
	"plate"	varchar(7),
	"fuel"	varchar(64) NOT NULL,
	"weightcap"	float NOT NULL,
	"volumecap"	float NOT NULL,
	"brand"	varchar(64) NOT NULL,
	"id_courier"	integer NOT NULL,
	"available"	INTEGER DEFAULT 0,
	FOREIGN KEY("id_courier") REFERENCES "courier"("id"),
	PRIMARY KEY("plate")
);

CREATE TABLE IF NOT EXISTS "lca" (
    "id_lca" INTEGER,
    "id_azienda" INTEGER not null,
    "kpi" float not null,
    "energia_elettrica" float not null,
    "fotovoltaico" float not null,
    "gpl" float not null,
    "metano" float not null,
    "gasolio" float not null,
    "km_benzina" float not null,
    "km_gasolio" float not null,
    "km_gpl" float not null,
    "km_metano" float not null,
    "km_plug" float not null,
    "km_mild" float not null,
    "voli_brevi" INTEGER not null,
    "voli_medi" INTEGER not null,
    "voli_lunghi" INTEGER not null,
    "voli_xl" INTEGER not null,
    "data_lca" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "gas" float not null,
    "km_elettrico" float not null,
    "num_dipendenti" INTEGER not null,
    	"id_courier"	integer NOT NULL,
    PRIMARY KEY ("id_lca" AUTOINCREMENT),
    	FOREIGN KEY("id_courier") REFERENCES "courier"("id")
);

INSERT INTO "courier" VALUES (1, 'Bartolini', "brt.png");
INSERT INTO "courier_op" VALUES (1,'Marcus','Smith','mSmith@amazonleaf.it','amazonleaf',1);
INSERT INTO "operator" VALUES (2,'Sito','Luca','luca.sito@gmail.com','test123');
INSERT INTO "operator" VALUES (3,'Picone','Vittorio','vittorio.picone@gmail.com','test123');
INSERT INTO "package" VALUES ('ABC123','123 Main Street',2.5,2.5,1);
INSERT INTO "package" VALUES ('DEF456','333 Blueberry Court',3.4,2.0,NULL);
INSERT INTO "package" VALUES ('GHI789','222 Raspberry Avenu',4.8,0.2,NULL);
INSERT INTO "package" VALUES ('JKL101','111 Strawberry Road',5.2,2.1,NULL);
INSERT INTO "package" VALUES ('MNO202','909 Banana Lane',6.3,3.0,1);
INSERT INTO "package" VALUES ('PQR303','808 Lemon Street',7.5,1.4,1);
INSERT INTO "package" VALUES ('STU404','606 Mango Avenue',8.1,0.9,NULL);
INSERT INTO "package" VALUES ('VWX505','707 Coconut Court',6.3,0.1,NULL);
INSERT INTO "package" VALUES ('YZ606','505 Pineapple Road',5.9,2.1,NULL);
INSERT INTO "package" VALUES ('ABC707','404 Birch Lane',2.1,3.1,1);
INSERT INTO "package" VALUES ('DEF808','303 Elm Court',1.4,3.01,NULL);
INSERT INTO "package" VALUES ('GHI909','202 Cedar Street',4.7,1.1,NULL);
INSERT INTO "package" VALUES ('JKL111','101 Maple Drive',7.6,2.1,NULL);
INSERT INTO "package" VALUES ('MNO222','789 Pine Lane',6.9,2.4,NULL);
INSERT INTO "package" VALUES ('PQR333','456 Oak Avenue',1.1,4.0,NULL);
INSERT INTO "package" VALUES ('ASG134','664 Python Street',2.0,2.0,NULL);
INSERT INTO "package" VALUES ('Napoli','Via Brombeis',4.0,4.0,NULL);
INSERT INTO "vehicle" VALUES ('CY367AY','GPL',213.0,43.0,'Renault',1,1);
INSERT INTO "vehicle" VALUES ('CY367AB','Diesel',24.0,43.0,'BMW',1,0);
COMMIT;
