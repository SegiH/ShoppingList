# ShoppingList

This project is my React based Shopping List application.

Add grocery items with a preferred store and then view a shopping last organized by store and add individual items not tied to a store.

The backend script currently supports running on your own SQL Server database. You need to install the ShoppingListBackend backend (See my other repo)

## Requirements
1. Web server: Apache, Nginx or Docker based Apache/Nginx web server
1. Database: SQL Server database
1. Backend server: Node.JS Server for the backend script.

## Build Instructions

1. Check out source from GitHub.
1. Install Ionic CLI `npm install -g @ionic/cli`
1. Download dependencies: `npm install`.
1. ionic build
1. Move contents of build to web server
1. ionic cap add android (or ios if you want to build for ios)
1. ionic cap sync
1. ionic cap open android (or ios)
1. Run app
1. Enter backend URL and the backend AUTH key which you set in the backend docker_compose script