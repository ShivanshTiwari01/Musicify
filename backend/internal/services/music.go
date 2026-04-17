package services

import (
	"os"
	"path/filepath"
	"strings"

	"github.com/ShivanshTiwari01/Musicify/backend/internal/models"
	"gorm.io/gorm"
)

// audioExtensions lists supported audio file extensions.
var audioExtensions = map[string]bool{
	".mp3":  true,
	".flac": true,
	".wav":  true,
	".ogg":  true,
	".m4a":  true,
	".aac":  true,
}

// SyncMusicFolder scans the given directory and upserts song records into the DB.
func SyncMusicFolder(db *gorm.DB, musicDir string) error {
	entries, err := os.ReadDir(musicDir)
	if err != nil {
		// Music folder may not exist yet — that's fine
		return nil
	}

	for _, entry := range entries {
		if entry.IsDir() {
			continue
		}

		ext := strings.ToLower(filepath.Ext(entry.Name()))
		if !audioExtensions[ext] {
			continue
		}

		nameWithoutExt := strings.TrimSuffix(entry.Name(), filepath.Ext(entry.Name()))
		title := formatTitle(nameWithoutExt)

		song := models.Song{
			Filename: entry.Name(),
			Title:    title,
			Artist:   "Unknown Artist",
		}

		// Insert only if the filename isn't already tracked
		db.Where(models.Song{Filename: entry.Name()}).FirstOrCreate(&song)
	}

	return nil
}

// formatTitle converts "my_cool_song" -> "My Cool Song"
func formatTitle(name string) string {
	name = strings.ReplaceAll(name, "_", " ")
	name = strings.ReplaceAll(name, "-", " ")
	words := strings.Fields(name)
	for i, w := range words {
		if len(w) > 0 {
			words[i] = strings.ToUpper(w[:1]) + w[1:]
		}
	}
	return strings.Join(words, " ")
}
