CREATE TABLE "permisos" (
	"id" serial PRIMARY KEY NOT NULL,
	"nombre" varchar(100) NOT NULL,
	"descripcion" text,
	CONSTRAINT "permisos_nombre_unique" UNIQUE("nombre")
);
--> statement-breakpoint
CREATE TABLE "roles" (
	"id" serial PRIMARY KEY NOT NULL,
	"nombre" varchar(50) NOT NULL,
	CONSTRAINT "roles_nombre_unique" UNIQUE("nombre")
);
