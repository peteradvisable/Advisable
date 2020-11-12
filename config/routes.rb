require 'sidekiq/web'
require 'admin_constraint'

Rails.application.routes.draw do
  if Rails.env.development? || ENV["STAGING"]
    mount GraphqlPlayground::Rails::Engine, as: "graphql_playground", at: '/playground', graphql_path: '/graphql'
    mount GraphqlPlayground::Rails::Engine, as: "admin_graphql_playground", at: '/admin_playground', graphql_path: '/admin_graphql'
  end

  namespace :admin do
    mount Sidekiq::Web => '/sidekiq', constraints: AdminConstraint.new
    mount PgHero::Engine, at: "pghero", constraints: AdminConstraint.new

    resources :applications
    resources :countries
    resources :projects
    resources :skills
    resources :accounts
    resources :specialists
    resources :users
    resources :project_skills
    resources :interviews
    resources :video_calls
    resources :blacklisted_domains
    resources :webhook_events
    resources :webhook_configurations
    resources :webhooks, only: %i[index show]
    namespace :guild do
      resources :posts
      resources :posts, as: :post_opportunity
      resources :posts, as: :post_case_study
      resources :posts, as: :post_advice_required
    end

    post 'resync', to: 'application#resync', as: :resync if ENV['STAGING']
    get 'login/:gid', to: 'application#login_as', as: :login_as

    if ENV['STAGING'] || Rails.env.development?
      post 'reset_test', to: 'application#reset_test', as: :reset_test
    end

    root to: 'applications#index'
  end

  post '/graphql', to: 'graphql#execute'

  if Rails.env.development? || ENV["STAGING"]
    post '/admin_graphql', to: 'graphql#admin'
    get "/advisatable", to: "application#advisatable"
    get "/advisatable/*admin", to: "application#advisatable"
  end

  post '/stripe_events', to: 'stripe_events#create'

  get '/auth/:provider/callback', to: 'auth_providers#create'

  get '/guild', to: 'application#guild', as: :guild_root
  get '/guild/*guild_path', to: 'application#guild'

  post '/webhooks/twilio_chat', to: 'webhooks#twilio_chat'

  # Routes for internal tooling
  get '/internal', to: 'application#internal', as: :internal_root
  get '/internal/*guild_path', to: 'application#internal'
  post '/projects/send_invites'
  post '/projects/create_linkedin_ad'

  get '/accounts/me'
  post '/accounts/user'
  post '/accounts/specialist'
  post 'zappier_interactor/attach_previous_project_image'

  # match every other route to the frontend codebase
  root 'application#frontend'
  get '*path',
      to: 'application#frontend',
      constraints: ->(req) { req.path.exclude?('rails/active_storage') }
end
