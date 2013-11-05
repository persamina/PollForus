PollForUs::Application.routes.draw do
  resources :users, only: [:new, :create, :show] do
    resources :polls, only: [:index]
  end

  resource :session, only: [:new, :create, :destroy]

  resources :polls, except: [:index]

  root to: "sessions#new"
end
