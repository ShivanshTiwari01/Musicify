package models

import "gorm.io/gorm"

// Song represents audio files discovered in the /music folder.
type Song struct {
	gorm.Model
	Title    string `gorm:"not null" json:"title"`
	Filename string `gorm:"uniqueIndex;not null" json:"filename"`
	Artist   string `json:"artist"`
	Duration int    `json:"duration"` // seconds
}
