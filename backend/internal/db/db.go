package db

import (
	"fmt"
	"os"

	"github.com/ShivanshTiwari01/Musicify/backend/internal/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// InitDB connects to PostgreSQL using environment variables.
func InitDB() (*gorm.DB, error) {
	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=UTC",
		getEnv("DB_HOST", "localhost"),
		getEnv("DB_USER", "musicify"),
		getEnv("DB_PASSWORD", "musicify"),
		getEnv("DB_NAME", "musicify"),
		getEnv("DB_PORT", "5432"),
	)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, fmt.Errorf("failed to open database: %w", err)
	}

	return db, nil
}

// Migrate runs GORM auto-migrations.
func Migrate(db *gorm.DB) error {
	return db.AutoMigrate(&models.User{}, &models.Song{})
}

func getEnv(key, fallback string) string {
	if val := os.Getenv(key); val != "" {
		return val
	}
	return fallback
}
