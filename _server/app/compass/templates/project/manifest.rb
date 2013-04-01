
file 'style.scss.erb', :to => 'style.scss', :like => :stylesheet, :erb => true

file 'bowerrc', :to => '.bowerrc'

discover :images
discover :javascripts