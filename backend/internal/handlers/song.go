package handlers

import (
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"strings"

	"github.com/ShivanshTiwari01/Musicify/backend/internal/models"
	"github.com/ShivanshTiwari01/Musicify/backend/internal/services"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// SongHandler handles music-related requests.
type SongHandler struct {
	db          *gorm.DB
	musicDir    string
}

// NewSongHandler creates a new SongHandler and syncs the music folder.
func NewSongHandler(db *gorm.DB) *SongHandler {
	musicDir := os.Getenv("MUSIC_DIR")
	if musicDir == "" {
		musicDir = "./music"
	}

	h := &SongHandler{db: db, musicDir: musicDir}

	// Sync music folder on startup
	if err := services.SyncMusicFolder(db, musicDir); err != nil {
		// Non-fatal: log and continue
		_ = err
	}

	return h
}

// GetSongs returns all songs from the database.
func (h *SongHandler) GetSongs(c *gin.Context) {
	var songs []models.Song
	if err := h.db.Find(&songs).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to fetch songs"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"songs": songs})
}

// StreamSong serves an audio file for streaming.
func (h *SongHandler) StreamSong(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid song id"})
		return
	}

	var song models.Song
	if err := h.db.First(&song, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "song not found"})
		return
	}

	filePath := filepath.Join(h.musicDir, song.Filename)

	// Security: prevent path traversal
	absMusic, _ := filepath.Abs(h.musicDir)
	absFile, _ := filepath.Abs(filePath)
	if !strings.HasPrefix(absFile, absMusic) {
		c.JSON(http.StatusForbidden, gin.H{"error": "access denied"})
		return
	}

	c.Header("Content-Type", "audio/mpeg")
	c.Header("Accept-Ranges", "bytes")
	c.File(filePath)
}
