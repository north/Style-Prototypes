
file 'style.scss.erb', :to => 'style.scss', :like => :stylesheet, :erb => true

file 'bowerrc', :to => '.bowerrc'
file 'component.json', :to => 'component.json'
file 'Gemfile', :to => 'Gemfile'

discover :images
discover :javascripts