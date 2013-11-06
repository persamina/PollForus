PollForUs::Application.routes.draw do
  resources :users, only: [:new, :create, :show] do
  end

  resource :session, only: [:new, :create, :destroy]

  resources :polls

  root to: "polls#index"
end
