# Protoype TaskBoard & KanbanBoard

This application is a Demo / Protoype version that was built as part of [ProKoB](http://www.prokob.info/).

It consists of a simpliefied Back-End with a REST Interface for 2 Front-Ends. The TaskBoard and the KanbanBoard. The TaskBoard is meant as a tool to support an agile development process by distilling multiple sources of Todos or Task management system (e.g. from  project management tools). To Quickly see what tasks are queeud up and to decide which ones to plan for a day while allowing other users to see what someone is currently working on or what is next on their list.

The KanbanBoard then *recycles* that information to display a color coded overview about open / ongoing and finished tasks within the development process.

The Front-End was built with ExtJS 6.5.2. The sources to these apps are located below the `vendor/` folder of this project.
To build you need the Sencha Cmd tools and the ExtJS Framework Version v6.5.2.15 [sencha.com](https://www.sencha.com/products/sencha-cmd/)

The Back-End is a Rails application based on Rails 5.1.4 initially created in API mode. Developend and run with Ruby 2.4.2p198.

For a simple demo the Rails app is using a default SQLite3 database.

- Basic setup requires Rails 5.1.4 and Ruby set-up.
- Run a `bundle install` for the reuqired Gems (mostly basic).
- Initialize the local SQLite database with `rails db:migrate`
- Create a few users and task records for demonstration via `rake db:seed`
- run the builtin Rails server via `rails s`
- Open the Taskboard via [http://127.0.0.1:3000/login](http://127.0.0.1:3000/login) and use any of the email/password cominations from the demo users from `db/seeds.rb` 
- Open the KanbanBoard via [http://127.0.0.1:3000/KanbanBoard/]

##Screenshots

### TaskBoard
- ![Screenshot TaskBoard](/blob/master/public/screenshot-taskboard.png)

### KanbanBoard
- ![Screenshot KanbanBoard](/blob/master/public/screenshot-kanbanboard)


