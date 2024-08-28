package main

import (
	"embed"
	_ "embed"
	"github.com/wailsapp/wails/v3/pkg/application"
	"github.com/wailsapp/wails/v3/pkg/events"
	"github.com/wailsapp/wails/v3/pkg/icons"
	"log"
	"os"
	"runtime"
)

//go:embed frontend/dist
var assets embed.FS

func main() {
	app := application.New(application.Options{
		Name:        "discord-rpc-gui",
		Description: "Discord RPC GUI",
		Services: []application.Service{
			application.NewService(NewDiscordRPCService()),
		},
		Assets: application.AssetOptions{
			Handler: application.AssetFileServerFS(assets),
		},
	})

	window := app.NewWebviewWindowWithOptions(application.WebviewWindowOptions{
		Title:            "RPC Client",
		BackgroundColour: application.NewRGB(27, 38, 54),
		URL:              "/",
		ShouldClose: func(window *application.WebviewWindow) bool {
			return false
		},
	})

	window.On(events.Common.WindowClosing, func(event *application.WindowEvent) {
		event.Cancel()
		window.Hide()
	})

	trayMenu := app.NewSystemTray()

	// Support for template icons on macOS
	if runtime.GOOS == "darwin" {
		trayMenu.SetTemplateIcon(icons.SystrayMacTemplate)
	} else {
		// Support for light/dark mode icons
		trayMenu.SetDarkModeIcon(icons.SystrayDark)
		trayMenu.SetIcon(icons.SystrayLight)
	}

	menu := app.NewMenu()
	trayMenu.OnClick(func() {
		window.Show()
		window.Focus()
	})
	trayMenu.OnRightClick(func() {
		trayMenu.OpenMenu()
	})
	menu.Add("Open").OnClick(func(context *application.Context) {
		window.Show()
		window.Focus()
	})
	menu.AddSeparator()
	menu.Add("Exit").OnClick(func(context *application.Context) {
		os.Exit(0)
	})
	trayMenu.SetMenu(menu)

	err := app.Run()

	if err != nil {
		log.Fatal(err)
	}
}
