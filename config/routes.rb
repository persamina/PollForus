PollForUs::Application.routes.draw do
  resources :users, only: [:new, :create, :show] do
  end

  resource :text_messages, :only => [] do 
    post :receive_text_message
  end

  resource :session, only: [:new, :create, :destroy]

  resources :polls

  root to: "polls#index"
end
