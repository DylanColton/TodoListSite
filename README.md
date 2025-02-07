# Todo List Site

The purpose of this project is to work with REST in a MEEN setting.

I will attempt to develop this project with a very basic login to select which todo list you can view.

## MoSCoW
	- Must
		- Handle a list, with a description of the todo, and if it is competed
		- Be able to pull the list as a JSON
		- Query lists either at a global or user level
	- Should
		- Host the todo lists in locations appropriate to each user
		- Break up user's todo JSONs at regular intervals (this is to speed up access and updates)
	- Could
		- Have the lists displayed in a calender format
		- Adjustable stylesheets and wallpapers
	- Won't
		- Have anything outside of things related to a todo list

## Architecture

I will be using PEEN (PostgreSQL, Express, Ejs and Node.js) as I have grown quite accustomed to using this architecture.
It provides me a lot of utility in printing values out into the HTML document, and automating processes in a similar manner to php.
