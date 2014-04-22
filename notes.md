# Mason

Discrete files, writing exactly what you want
Mustache to import
Exactly the Sass by hand
Runs a server
PL sitting at root, copy to Drupal theme

Likes Ish

Sniffs MQ values


Like idea of generators, thinking through too much
Preivew of markup and Sass
	Optional display of code
	Annotations
	
JSON file for pages
	
base, components, layouts, pages
style tile++
color guide++
typography guide++


base/components/layouts/pages folder structure

Grey Box + Component

https://gist.github.com/Snugug/1e8152af3885892b5879





# Erin


Grunt a little faster, no stalling
Complete page w/components in it
Better way of organizing

Access font files from within prototypes

Not having nav at the top, have it at bottom

--

No code
	HTML, not Sass

Borealis sizes

View on Mobile Device

# To Build

**Watch -> `.www`**

* base/
* components/
* layouts/
* plugins (`bower.json`)

**Watch -> `*.json`**

* .www/base/
* .www/components/
* .www/layouts/

**Build**

**Plugins**
config/sections.yml

* Names in sections become watches
* Plugins for each section to pull in where appropriate

```yml
sections:
	- base:
		- bower_components/sp-bootstrap/css
	- components:
		- bower_components/sp-bootstrap/components
	- layouts
```

```yml
sections:
	- atoms
	- molecules:
		- bower_components/sp-pattern-library/molecules
	- organisim
	- templates
```

**Pages**

* YML hirearchy to create pages
* styl-tile.yml in pages or config? (*config*)

**Config**

* Sections
* Style Tile
* Compass Extension
	* What files/folders to include

**Distribution**

* Runner as Node module
* JS and CSS as Bower Plugin
* index.html/ish.html and folder structure setup as Yeoman generator
* Ish as path in index.html? I think it's do-able.

## Mason

YML file to inject options into scope
One for each folder, plus pages yml.

Layout - Full layout, scope options for compositions
Page: Listing of components to use
Come with Grey Box component, source Style Prototypes

(layout)
```flow.yml
flow:
	jumbotron:
		name: placeholder
		source: style-prototypes
	flow-items:
		item-1:
			name: placeholder
			source: style-prototypes
		item-2
			name: placeholder
			source: style-prototypes
	aside-item:
		item-1:
			name: placeholder
			source: style-prototypes
```

(page)
```about.yml
template:
	name: flow
	source: layout
flow:
	jumbotron:
		name: leaderboard--16x9
		source: components
	flow-items:
		item-1:
			name: placeholder
			source: style-prototypes
		item-2
			name: placeholder
			source: style-prototypes
	aside-item:
		item-1:
			name: placeholder
			source: style-prototypes
content:
	image: images/foo.jpg
	header: Hello World
```