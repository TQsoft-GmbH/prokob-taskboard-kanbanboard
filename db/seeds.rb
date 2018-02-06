# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# This creates some sample demo records to populate both the TaskBoard and the KanbanBoard
User.create(id:1, name:'anonymous', email: '', password:'') rescue nil
User.create(id:123, name:'Daniel Developer', email: 'daniel.developer@domain.local', password:'password') rescue nil
User.create(id:234, name:'Gregor Guiman', email: 'gregor.guiman@domain.local', password:'password') rescue nil
User.create(id:456, name:'Tim Tester', email: 'tim.tester@domain.local', password:'password') rescue nil
User.create(id:754, name:'Simone Support', email: 'simone.support@domain.local', password:'password') rescue nil
User.create(id:876, name:'Bibi Backend', email: 'Bibi.backend@domain.local', password:'password') rescue nil
User.create(id:987, name:'Paul Project', email: 'paul.project@domain.local', password:'password') rescue nil

RANDOM_PROJECT = ['Project Alpha', 'Project Beta', 'Project Gamma', 'Project Delta', 'Project Omega', 'Main Product', 'Client ABC Corp']
RANDOM_USER = User.where('id > 1').all
RANDOM_TASK_ID = (1000...9999).to_a
RANDOM_PHASE = ['Development.Concept.Done', 'Development.Concept.Ongoing', 'Development.Develop.Done', 'Development.Develop.Ongoing', 'Development.Test.Done', 'Development.Test.Ongoing', 'Development.Todo', 'Projekt.Done', 'Projekt.Ongoing', 'Projekt.Todo', 'Support.Done', 'Support.Ongoing', 'Support.Test']

50.times do
  user = RANDOM_USER.sample
  task_id = RANDOM_TASK_ID.sample
  Task.create(user_id: user.id,
    user_name: user.name,
    user_initials: user.name.split(' ').collect{|n|n[0]}.join(''),
    title: "#{RANDOM_PROJECT.sample} - Task #{(1..9).to_a.sample}",
    hours: (1..24).to_a.sample,
    deadline_at: (1...60).to_a.sample.days.from_now,
    release: "Release #{(1..3).to_a.sample}.#{(1...9).to_a.sample}",
    reference: "##{task_id}",
    task_id: task_id,
    task_type: 'todo',
    url: "http://external.local/todos/?id=#{task_id}",
    phase: RANDOM_PHASE.sample,
    archived: false,
    modified_at: (1...999).to_a.sample.minutes.ago
  )
end