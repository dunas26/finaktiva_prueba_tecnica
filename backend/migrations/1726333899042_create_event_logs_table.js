module.exports = {
	"up": "CREATE TABLE EventLogs(id VARCHAR(255) PRIMARY KEY NOT NULL, type CHAR(80) NOT NULL, description VARCHAR(1024), severity VARCHAR(255), createdAt DATETIME NOT NULL DEFAULT now(), deletedAt DATETIME)",
	"down": "DROP TABLE EventLogs"
}
