Rails.application.routes.draw do
  resources :users, :tasks
  resources :login, :only => [:create, :new, :destroy]


  #Need to add route to home page here


  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
