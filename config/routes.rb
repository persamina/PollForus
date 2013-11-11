PollForUs::Application.routes.draw do
  resources :users, only: [:new, :create, :show] do
  end

  resource :text_messages, :only => [] do 
    post :receive_text_message
  end

  resource :session, only: [:new, :create, :destroy] do
    get :sign_out
  end

  resources :polls, only: [:index, :create, :update, :destroy]
  resources :questions, only: [:create, :update, :destroy]
  resources :answers, only: [:create, :update, :destroy]

  root to: "polls#index"
end
