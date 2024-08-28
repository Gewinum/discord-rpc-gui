package main

import (
	"github.com/hugolgst/rich-go/client"
	"github.com/spf13/viper"
	"time"
)

func NewDiscordRPCService() *DiscordRPCService {
	inst := &DiscordRPCService{StartingTime: time.Now()}
	inst.initializeConfig()
	return inst
}

type DiscordRPCService struct {
	AppID             string
	DiscordState      string
	DiscordDetails    string
	BigImage          string
	BigImageDetails   string
	SmallImage        string
	SmallImageDetails string
	StartingTime      time.Time
}

func (s *DiscordRPCService) UpdatePresence(appId, state, details, bigImage, bigImageDetails, smallImage, smallImageDetails string) string {
	if s.AppID != appId {
		err := client.Login(appId)
		if err != nil {
			return err.Error()
		}
	}
	err := client.SetActivity(client.Activity{
		State:      state,
		Details:    details,
		LargeImage: bigImage,
		LargeText:  bigImageDetails,
		SmallImage: smallImage,
		SmallText:  smallImageDetails,
		Timestamps: &client.Timestamps{
			Start: &s.StartingTime,
		},
	})

	if err != nil {
		return err.Error()
	}

	s.AppID = appId
	s.DiscordState = state
	s.DiscordDetails = details

	viper.Set("appId", appId)
	viper.Set("state", state)
	viper.Set("details", details)
	viper.Set("bigImage", bigImage)
	viper.Set("bigImageDetails", bigImageDetails)
	viper.Set("smallImage", smallImage)
	viper.Set("smallImageDetails", smallImageDetails)
	_ = viper.WriteConfig()

	return "Successfully updated"
}

func (s *DiscordRPCService) GetAppID() string {
	return s.AppID
}

func (s *DiscordRPCService) GetDiscordState() string {
	return s.DiscordState
}

func (s *DiscordRPCService) GetDiscordDetails() string {
	return s.DiscordDetails
}

func (s *DiscordRPCService) GetBigImage() string {
	return s.BigImage
}

func (s *DiscordRPCService) GetBigImageDetails() string {
	return s.BigImageDetails
}

func (s *DiscordRPCService) GetSmallImage() string {
	return s.SmallImage
}

func (s *DiscordRPCService) GetSmallImageDetails() string {
	return s.SmallImageDetails
}

func (s *DiscordRPCService) initializeConfig() {
	viper.SetConfigFile("config.yml")
	err := viper.ReadInConfig()
	if err != nil {
		return
	}
	s.UpdatePresence(viper.GetString("appId"), viper.GetString("state"), viper.GetString("details"),
		viper.GetString("bigImage"), viper.GetString("bigImageDetails"), viper.GetString("smallImage"), viper.GetString("smallImageDetails"))
}
