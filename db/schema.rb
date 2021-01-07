# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_01_06_123252) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "citext"
  enable_extension "hstore"
  enable_extension "pgcrypto"
  enable_extension "plpgsql"
  enable_extension "uuid-ossp"

  create_table "accounts", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "password_digest"
    t.citext "email"
    t.string "uid"
    t.datetime "confirmed_at"
    t.string "confirmation_digest"
    t.string "reset_digest"
    t.datetime "reset_sent_at"
    t.jsonb "permissions", default: []
    t.jsonb "completed_tutorials", default: []
    t.string "vat_number"
    t.string "confirmation_token"
    t.boolean "test_account"
    t.string "remember_token"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.jsonb "log_data"
    t.index ["email"], name: "index_accounts_on_email", unique: true
    t.index ["uid"], name: "index_accounts_on_uid", unique: true
  end

  create_table "action_mailbox_inbound_emails", force: :cascade do |t|
    t.integer "status", default: 0, null: false
    t.string "message_id", null: false
    t.string "message_checksum", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["message_id", "message_checksum"], name: "index_action_mailbox_inbound_emails_uniqueness", unique: true
  end

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.string "service_name", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "answers", force: :cascade do |t|
    t.string "content"
    t.bigint "question_id", null: false
    t.bigint "specialist_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "uid"
    t.index ["question_id"], name: "index_answers_on_question_id"
    t.index ["specialist_id"], name: "index_answers_on_specialist_id"
  end

  create_table "application_references", force: :cascade do |t|
    t.string "uid"
    t.bigint "application_id"
    t.string "project_type"
    t.bigint "project_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["application_id"], name: "index_application_references_on_application_id"
    t.index ["project_type", "project_id"], name: "index_application_references_on_project"
    t.index ["uid"], name: "index_application_references_on_uid"
  end

  create_table "applications", force: :cascade do |t|
    t.decimal "rate"
    t.string "availability"
    t.string "status"
    t.text "introduction"
    t.jsonb "questions"
    t.decimal "score"
    t.bigint "specialist_id"
    t.bigint "project_id"
    t.string "airtable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "accepts_fee"
    t.boolean "accepts_terms"
    t.boolean "featured", default: false
    t.string "comment"
    t.text "rejection_reason"
    t.text "rejection_reason_comment"
    t.boolean "references_requested"
    t.string "invitation_rejection_reason"
    t.datetime "applied_at"
    t.boolean "hidden"
    t.string "proposal_comment"
    t.string "project_type"
    t.integer "monthly_limit"
    t.string "uid"
    t.string "stopped_working_reason"
    t.boolean "trial_program"
    t.datetime "invited_to_apply_at"
    t.datetime "invitation_rejected_at"
    t.datetime "application_rejected_at"
    t.datetime "application_accepted_at"
    t.datetime "interview_scheduled_at"
    t.datetime "interview_completed_at"
    t.datetime "proposal_sent_at"
    t.datetime "started_working_at"
    t.datetime "stopped_working_at"
    t.boolean "auto_apply"
    t.boolean "hide_from_profile"
    t.jsonb "log_data"
    t.index ["project_id"], name: "index_applications_on_project_id"
    t.index ["specialist_id"], name: "index_applications_on_specialist_id"
    t.index ["uid"], name: "index_applications_on_uid"
  end

  create_table "auth_providers", force: :cascade do |t|
    t.string "uid"
    t.string "provider"
    t.string "token"
    t.string "refresh_token"
    t.datetime "expires_at"
    t.jsonb "blob"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "account_id", null: false
    t.index ["account_id"], name: "index_auth_providers_on_account_id"
    t.index ["provider", "uid"], name: "index_auth_providers_on_provider_and_uid", unique: true
  end

  create_table "blacklisted_domains", force: :cascade do |t|
    t.string "domain"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "client_calls", force: :cascade do |t|
    t.string "airtable_id"
    t.integer "duration"
    t.bigint "project_id"
    t.datetime "call_time"
    t.string "phone_number"
    t.string "email"
    t.string "event_type"
    t.string "calendly_id"
    t.boolean "cancelled"
    t.bigint "sales_person_id"
    t.string "type_of_call"
    t.bigint "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "call_attempt_count"
    t.index ["airtable_id"], name: "index_client_calls_on_airtable_id"
    t.index ["project_id"], name: "index_client_calls_on_project_id"
    t.index ["sales_person_id"], name: "index_client_calls_on_sales_person_id"
    t.index ["user_id"], name: "index_client_calls_on_user_id"
  end

  create_table "client_users", force: :cascade do |t|
    t.bigint "client_id"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["client_id"], name: "index_client_users_on_client_id"
    t.index ["user_id"], name: "index_client_users_on_user_id"
  end

  create_table "clients", force: :cascade do |t|
    t.string "name"
    t.string "airtable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "domain"
    t.index ["airtable_id"], name: "index_clients_on_airtable_id"
  end

  create_table "companies", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name"
    t.string "kind"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "sales_person_id"
    t.bigint "industry_id"
    t.string "stripe_customer_id"
    t.string "stripe_setup_intent_id"
    t.string "setup_intent_status"
    t.boolean "payments_setup", default: false
    t.string "project_payment_method"
    t.datetime "accepted_project_payment_terms_at"
    t.string "invoice_name"
    t.string "invoice_company_name"
    t.string "billing_email"
    t.string "vat_number"
    t.jsonb "address"
    t.index ["industry_id"], name: "index_companies_on_industry_id"
    t.index ["sales_person_id"], name: "index_companies_on_sales_person_id"
  end

  create_table "consultations", force: :cascade do |t|
    t.string "uid"
    t.bigint "specialist_id"
    t.bigint "user_id"
    t.string "status"
    t.string "topic"
    t.bigint "skill_id"
    t.string "airtable_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "interview_id"
    t.string "source"
    t.integer "likely_to_hire"
    t.datetime "request_started_at"
    t.datetime "request_completed_at"
    t.datetime "sent_at"
    t.datetime "accepted_at"
    t.datetime "rejected_at"
    t.datetime "advisable_rejected_at"
    t.bigint "search_id"
    t.string "rejection_reason"
    t.index ["airtable_id"], name: "index_consultations_on_airtable_id"
    t.index ["interview_id"], name: "index_consultations_on_interview_id"
    t.index ["search_id"], name: "index_consultations_on_search_id"
    t.index ["skill_id"], name: "index_consultations_on_skill_id"
    t.index ["specialist_id"], name: "index_consultations_on_specialist_id"
    t.index ["uid"], name: "index_consultations_on_uid"
    t.index ["user_id"], name: "index_consultations_on_user_id"
  end

  create_table "countries", force: :cascade do |t|
    t.string "name"
    t.string "currency"
    t.string "airtable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "uid"
    t.boolean "eu"
    t.string "alpha2"
    t.string "dial_in_number"
  end

  create_table "featured_specialist_contents", force: :cascade do |t|
    t.string "airtable_id"
    t.string "name"
    t.jsonb "skill"
    t.string "specialist"
    t.string "specialist_skills"
    t.text "featured_biography"
    t.integer "featured_specialist_score"
    t.string "featured_specialist_status"
    t.string "specialist_id"
    t.string "skill_id"
    t.string "micro_niche_description"
    t.string "companies_worked_with"
    t.string "examples_of_services"
    t.string "specialist_image"
    t.string "specialist_city"
    t.string "specialist_country"
    t.jsonb "page_skills"
    t.datetime "featured_specialist_status_applied"
    t.datetime "featured_specialist_status_reviewed"
    t.datetime "featured_specialist_status_posted"
    t.datetime "featured_specialist_status_rejected"
    t.jsonb "secondary_skills"
    t.integer "micro_niche_rating"
    t.integer "featured_biography_character_length"
    t.string "name_of_freelancers_with_high_score"
    t.string "edited"
    t.integer "number_of_pages_featured_on"
    t.string "first_30_characters"
    t.string "specialist_image_real"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["airtable_id"], name: "index_featured_specialist_contents_on_airtable_id"
  end

  create_table "follows", force: :cascade do |t|
    t.string "followable_type", null: false
    t.uuid "followable_id", null: false
    t.string "follower_type", null: false
    t.bigint "follower_id", null: false
    t.boolean "blocked", default: false, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["followable_id", "followable_type"], name: "fk_followables"
    t.index ["followable_type", "followable_id"], name: "index_follows_on_followable_type_and_followable_id"
    t.index ["follower_id", "follower_type"], name: "fk_follows"
    t.index ["follower_type", "follower_id"], name: "index_follows_on_follower_type_and_follower_id"
  end

  create_table "guild_comments", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.text "body", null: false
    t.integer "reactionable_count", default: 0, null: false
    t.uuid "guild_post_id"
    t.bigint "specialist_id"
    t.uuid "parent_comment_id"
    t.integer "status", default: 0, null: false
    t.jsonb "data"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["guild_post_id"], name: "index_guild_comments_on_guild_post_id"
    t.index ["parent_comment_id"], name: "index_guild_comments_on_parent_comment_id"
    t.index ["specialist_id"], name: "index_guild_comments_on_specialist_id"
  end

  create_table "guild_post_engagements", force: :cascade do |t|
    t.bigint "specialist_id"
    t.uuid "guild_post_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["guild_post_id"], name: "index_guild_post_engagements_on_guild_post_id"
    t.index ["specialist_id", "guild_post_id"], name: "index_guild_post_engagements_on_specialist_id_and_guild_post_id", unique: true
    t.index ["specialist_id"], name: "index_guild_post_engagements_on_specialist_id"
  end

  create_table "guild_post_images", force: :cascade do |t|
    t.uuid "guild_post_id"
    t.string "uid"
    t.string "string"
    t.integer "position"
    t.boolean "cover"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["guild_post_id"], name: "index_guild_post_images_on_guild_post_id"
    t.index ["string"], name: "index_guild_post_images_on_string"
    t.index ["uid"], name: "index_guild_post_images_on_uid"
  end

  create_table "guild_posts", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "type", default: "Post", null: false
    t.text "body"
    t.string "title"
    t.integer "status", default: 0, null: false
    t.integer "comments_count", default: 0, null: false
    t.integer "reactionable_count", default: 0, null: false
    t.bigint "specialist_id"
    t.jsonb "data", default: {}, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "engagements_count", default: 0
    t.boolean "shareable", default: false
    t.boolean "pinned", default: false
    t.index ["data"], name: "index_guild_posts_on_data", using: :gin
    t.index ["specialist_id"], name: "index_guild_posts_on_specialist_id"
  end

  create_table "guild_reactions", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "reactionable_type"
    t.uuid "reactionable_id"
    t.bigint "specialist_id"
    t.integer "kind", default: 0, null: false
    t.integer "status", default: 0, null: false
    t.jsonb "data"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["reactionable_type", "reactionable_id"], name: "index_guild_reactions_on_reactionable_type_and_reactionable_id"
    t.index ["specialist_id"], name: "index_guild_reactions_on_specialist_id"
  end

  create_table "industries", force: :cascade do |t|
    t.string "name"
    t.string "uid"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "airtable_id"
    t.string "color"
    t.boolean "active"
    t.index ["uid"], name: "index_industries_on_uid"
  end

  create_table "interviews", force: :cascade do |t|
    t.bigint "application_id"
    t.datetime "starts_at"
    t.string "status"
    t.string "time_zone"
    t.string "airtable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.string "availability_note"
    t.string "zoom_meeting_id"
    t.string "uid"
    t.datetime "call_requested_at"
    t.datetime "call_scheduled_at"
    t.datetime "requested_more_time_options_at"
    t.datetime "more_time_options_added_at"
    t.datetime "client_requested_reschedule_at"
    t.datetime "specialist_requested_reschedule_at"
    t.index ["airtable_id"], name: "index_interviews_on_airtable_id"
    t.index ["application_id"], name: "index_interviews_on_application_id"
    t.index ["user_id"], name: "index_interviews_on_user_id"
  end

  create_table "magic_links", force: :cascade do |t|
    t.bigint "account_id", null: false
    t.string "path"
    t.string "digest"
    t.datetime "expires_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["account_id"], name: "index_magic_links_on_account_id"
  end

  create_table "matches", force: :cascade do |t|
    t.bigint "specialist_id"
    t.bigint "project_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "status"
    t.index ["project_id"], name: "index_matches_on_project_id"
    t.index ["specialist_id"], name: "index_matches_on_specialist_id"
  end

  create_table "off_platform_projects", force: :cascade do |t|
    t.string "airtable_id"
    t.bigint "specialist_id"
    t.string "industry"
    t.string "contact_first_name"
    t.string "contact_last_name"
    t.string "contact_job_title"
    t.string "client_name"
    t.text "client_description"
    t.text "description"
    t.text "requirements"
    t.text "results"
    t.string "primary_skill"
    t.boolean "confidential", default: false
    t.boolean "validated", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "can_contact"
    t.string "validation_url"
    t.string "contact_email"
    t.string "validation_method"
    t.string "validation_status"
    t.boolean "validated_by_client"
    t.string "validation_explanation"
    t.string "company_type"
    t.boolean "public_use"
    t.string "uid"
    t.string "goal"
    t.string "contact_relationship"
    t.boolean "hide_from_profile"
    t.integer "priority"
    t.integer "advisable_score"
    t.bigint "application_id"
    t.boolean "draft"
    t.boolean "description_requires_update"
    t.integer "industry_relevance"
    t.integer "location_relevance"
    t.integer "cost_to_hire"
    t.integer "execution_cost"
    t.string "pending_description"
    t.string "validation_failed_reason"
    t.bigint "reviewed_by_id"
    t.jsonb "log_data"
    t.index ["airtable_id"], name: "index_off_platform_projects_on_airtable_id"
    t.index ["application_id"], name: "index_off_platform_projects_on_application_id"
    t.index ["reviewed_by_id"], name: "index_off_platform_projects_on_reviewed_by_id"
    t.index ["specialist_id"], name: "index_off_platform_projects_on_specialist_id"
  end

  create_table "payments", force: :cascade do |t|
    t.string "uid"
    t.string "source_id"
    t.string "charge_id"
    t.integer "amount"
    t.string "currency"
    t.string "status"
    t.string "error_code"
    t.bigint "project_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["charge_id"], name: "index_payments_on_charge_id"
    t.index ["project_id"], name: "index_payments_on_project_id"
    t.index ["source_id"], name: "index_payments_on_source_id"
    t.index ["uid"], name: "index_payments_on_uid"
  end

  create_table "previous_project_images", force: :cascade do |t|
    t.integer "position"
    t.bigint "off_platform_project_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "uid"
    t.boolean "cover"
    t.index ["off_platform_project_id"], name: "index_previous_project_images_on_off_platform_project_id"
  end

  create_table "project_contents", force: :cascade do |t|
    t.string "airtable_id"
    t.string "project_id"
    t.text "project_description"
    t.string "specialist_review_comment"
    t.string "specialist_image"
    t.integer "specialist_review_score"
    t.string "specialist_id"
    t.string "specialist_first_name"
    t.string "specialist_last_name"
    t.string "client_industry"
    t.string "client_contact_first_name"
    t.string "client_contact_last_name"
    t.string "client_name"
    t.string "client_contact_job_title"
    t.string "okay_with_naming_client"
    t.jsonb "skills_required"
    t.jsonb "pages_featured_on"
    t.integer "featured_project_score"
    t.string "suitable_for_freelancers_page"
    t.string "client_logo"
    t.string "project_type"
    t.jsonb "primary_skill"
    t.integer "specialist_review_comment_length"
    t.string "okay_to_use_publicly"
    t.string "specialist_city"
    t.string "specialist_country"
    t.string "our_talent_page"
    t.integer "project_description_length"
    t.string "status"
    t.string "specialist_image_real"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "project_industries", force: :cascade do |t|
    t.bigint "industry_id"
    t.string "project_type"
    t.bigint "project_id"
    t.boolean "primary"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["industry_id"], name: "index_project_industries_on_industry_id"
    t.index ["project_type", "project_id"], name: "index_project_industries_on_project_type_and_project_id"
  end

  create_table "project_skills", force: :cascade do |t|
    t.bigint "skill_id"
    t.string "project_type"
    t.bigint "project_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "primary"
    t.index ["project_type", "project_id"], name: "index_project_skills_on_project"
    t.index ["skill_id"], name: "index_project_skills_on_skill_id"
  end

  create_table "projects", force: :cascade do |t|
    t.string "name"
    t.string "airtable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "currency"
    t.bigint "client_id"
    t.string "client_referral_url"
    t.text "company_description"
    t.text "description"
    t.text "specialist_description"
    t.text "goals", default: [], array: true
    t.text "questions", default: [], array: true
    t.text "required_characteristics", default: [], array: true
    t.text "characteristics", default: [], array: true
    t.datetime "accepted_terms_at"
    t.integer "deposit"
    t.string "status"
    t.integer "deposit_paid"
    t.bigint "user_id"
    t.string "service_type"
    t.string "estimated_budget"
    t.boolean "remote"
    t.string "sales_status"
    t.string "deposit_payment_intent_id"
    t.string "owner"
    t.string "campaign_source"
    t.datetime "brief_pending_confirmation_at"
    t.datetime "brief_confirmed_at"
    t.datetime "interview_scheduled_at"
    t.datetime "call_scheduled_at"
    t.datetime "candidate_proposed_at"
    t.datetime "candidate_accepted_at"
    t.datetime "interview_completed_at"
    t.datetime "booking_request_sent_at"
    t.datetime "booking_confirmed_at"
    t.datetime "proposal_received_at"
    t.datetime "won_at"
    t.datetime "lost_at"
    t.string "campaign_name"
    t.string "uid"
    t.string "industry"
    t.string "company_type"
    t.boolean "industry_experience_required"
    t.boolean "company_type_experience_required"
    t.integer "industry_experience_importance"
    t.integer "location_importance"
    t.integer "likely_to_hire"
    t.integer "candidate_count", default: 0
    t.integer "proposed_count", default: 0
    t.integer "hired_count", default: 0
    t.boolean "sourcing"
    t.bigint "sales_person_id"
    t.bigint "linkedin_campaign_id"
    t.datetime "published_at"
    t.jsonb "log_data"
    t.index ["client_id"], name: "index_projects_on_client_id"
    t.index ["sales_person_id"], name: "index_projects_on_sales_person_id"
    t.index ["user_id"], name: "index_projects_on_user_id"
  end

  create_table "questions", force: :cascade do |t|
    t.string "content"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "uid"
  end

  create_table "reviews", force: :cascade do |t|
    t.string "airtable_id"
    t.string "type"
    t.bigint "specialist_id"
    t.string "project_type"
    t.bigint "project_id"
    t.string "reviewable_type"
    t.bigint "reviewable_id"
    t.text "comment"
    t.jsonb "ratings"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "uid"
    t.index ["airtable_id"], name: "index_reviews_on_airtable_id"
    t.index ["project_type", "project_id"], name: "index_reviews_on_project"
    t.index ["reviewable_type", "reviewable_id"], name: "index_reviews_on_reviewable"
    t.index ["specialist_id"], name: "index_reviews_on_specialist_id"
  end

  create_table "sales_people", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.string "username"
    t.boolean "active"
    t.boolean "out_of_office"
    t.string "slack"
    t.string "calendly_url"
    t.string "asana_id"
    t.string "airtable_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "uid"
  end

  create_table "searches", force: :cascade do |t|
    t.string "uid"
    t.bigint "user_id", null: false
    t.string "skill"
    t.string "industry"
    t.boolean "industry_experience_required"
    t.string "company_type"
    t.boolean "company_experience_required"
    t.bigint "recommended_project_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "description"
    t.bigint "manually_recommended_project_id"
    t.index ["manually_recommended_project_id"], name: "index_searches_on_manually_recommended_project_id"
    t.index ["recommended_project_id"], name: "index_searches_on_recommended_project_id"
    t.index ["uid"], name: "index_searches_on_uid"
    t.index ["user_id"], name: "index_searches_on_user_id"
  end

  create_table "skills", force: :cascade do |t|
    t.string "name"
    t.string "airtable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "category"
    t.boolean "profile"
    t.string "uid"
    t.bigint "original_id"
    t.boolean "active"
    t.integer "projects_count", default: 0
    t.integer "specialists_count", default: 0
    t.string "characteristic_placeholder"
    t.string "goal_placeholder"
    t.index ["airtable_id"], name: "index_skills_on_airtable_id"
    t.index ["original_id"], name: "index_skills_on_original_id"
    t.index ["uid"], name: "index_skills_on_uid"
  end

  create_table "specialist_skills", force: :cascade do |t|
    t.bigint "specialist_id"
    t.bigint "skill_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["skill_id"], name: "index_specialist_skills_on_skill_id"
    t.index ["specialist_id"], name: "index_specialist_skills_on_specialist_id"
  end

  create_table "specialists", force: :cascade do |t|
    t.jsonb "image"
    t.string "linkedin"
    t.string "travel_availability"
    t.string "city"
    t.bigint "country_id"
    t.string "airtable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "encrypted_phone_number"
    t.string "encrypted_phone_number_iv"
    t.jsonb "ratings", default: {}
    t.integer "reviews_count"
    t.text "bio"
    t.string "uid"
    t.boolean "remote"
    t.string "application_stage"
    t.string "bank_holder_name"
    t.jsonb "bank_holder_address", default: {}
    t.string "bank_currency"
    t.boolean "primarily_freelance"
    t.string "number_of_projects"
    t.integer "hourly_rate"
    t.string "website"
    t.boolean "public_use"
    t.string "pid"
    t.string "campaign_name"
    t.string "campaign_source"
    t.string "referrer"
    t.decimal "average_score"
    t.integer "project_count"
    t.string "phone"
    t.boolean "guild", default: false
    t.string "community_status"
    t.boolean "automated_invitations_subscription"
    t.jsonb "guild_data"
    t.bigint "account_id"
    t.datetime "community_applied_at"
    t.datetime "community_accepted_at"
    t.datetime "community_invited_to_call_at"
    t.integer "community_score"
    t.integer "member_of_week_email"
    t.jsonb "log_data"
    t.index ["account_id"], name: "index_specialists_on_account_id"
    t.index ["airtable_id"], name: "index_specialists_on_airtable_id"
    t.index ["country_id"], name: "index_specialists_on_country_id"
    t.index ["uid"], name: "index_specialists_on_uid"
  end

  create_table "taggings", id: :serial, force: :cascade do |t|
    t.uuid "tag_id"
    t.string "taggable_type"
    t.uuid "taggable_id"
    t.string "tagger_type"
    t.integer "tagger_id"
    t.string "context", limit: 128
    t.datetime "created_at"
    t.index ["context"], name: "index_taggings_on_context"
    t.index ["tag_id", "taggable_id", "taggable_type", "context", "tagger_id", "tagger_type"], name: "taggings_idx", unique: true
    t.index ["tag_id"], name: "index_taggings_on_tag_id"
    t.index ["taggable_id", "taggable_type", "context"], name: "taggings_taggable_context_idx"
    t.index ["taggable_id", "taggable_type", "tagger_id", "context"], name: "taggings_idy"
    t.index ["taggable_id"], name: "index_taggings_on_taggable_id"
    t.index ["taggable_type"], name: "index_taggings_on_taggable_type"
    t.index ["tagger_id", "tagger_type"], name: "index_taggings_on_tagger_id_and_tagger_type"
    t.index ["tagger_id"], name: "index_taggings_on_tagger_id"
  end

  create_table "tags", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.string "name"
    t.integer "alias_tag_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer "taggings_count", default: 0
    t.string "topicable_type"
    t.bigint "topicable_id"
    t.index ["name"], name: "index_tags_on_name", unique: true
    t.index ["topicable_type", "topicable_id"], name: "index_tags_on_topicable_type_and_topicable_id"
  end

  create_table "tasks", force: :cascade do |t|
    t.string "name"
    t.string "uid"
    t.string "airtable_id"
    t.string "stage"
    t.integer "estimate"
    t.datetime "due_date"
    t.string "description"
    t.string "submitted_for_approval_comment"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "application_id"
    t.string "repeat"
    t.integer "flexible_estimate"
    t.integer "hours_worked"
    t.boolean "trial"
    t.string "stripe_invoice_id"
    t.string "estimate_type"
    t.integer "final_cost"
    t.datetime "to_be_invited_at"
    t.datetime "quote_requested_at"
    t.datetime "quote_provided_at"
    t.datetime "assigned_at"
    t.datetime "started_working_at"
    t.datetime "submitted_at"
    t.datetime "approved_at"
    t.jsonb "log_data"
    t.index ["airtable_id"], name: "index_tasks_on_airtable_id"
    t.index ["application_id"], name: "index_tasks_on_application_id"
    t.index ["uid"], name: "index_tasks_on_uid"
  end

  create_table "unresponsiveness_reports", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.bigint "application_id", null: false
    t.bigint "user_id", null: false
    t.text "message"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["application_id"], name: "index_unresponsiveness_reports_on_application_id"
    t.index ["user_id"], name: "index_unresponsiveness_reports_on_user_id"
  end

  create_table "user_skills", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "skill_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["skill_id"], name: "index_user_skills_on_skill_id"
    t.index ["user_id"], name: "index_user_skills_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "airtable_id"
    t.text "availability"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "uid"
    t.bigint "country_id"
    t.string "company_name"
    t.string "title"
    t.string "stripe_customer_id"
    t.string "project_payment_method"
    t.string "invoice_name"
    t.string "invoice_company_name"
    t.jsonb "address"
    t.datetime "accepted_project_payment_terms_at"
    t.string "exceptional_project_payment_terms"
    t.string "stripe_setup_intent_id"
    t.string "setup_intent_status"
    t.string "company_type"
    t.bigint "industry_id"
    t.string "campaign_name"
    t.string "campaign_source"
    t.string "pid"
    t.string "rid"
    t.string "gclid"
    t.boolean "bank_transfers_enabled", default: false
    t.string "billing_email"
    t.boolean "payments_setup", default: false
    t.string "time_zone"
    t.string "campaign_medium"
    t.bigint "sales_person_id"
    t.string "contact_status"
    t.string "fid"
    t.bigint "budget"
    t.integer "locality_importance"
    t.datetime "accepted_guarantee_terms_at"
    t.string "talent_quality"
    t.string "rejection_reason"
    t.string "number_of_freelancers"
    t.datetime "application_accepted_at"
    t.datetime "application_rejected_at"
    t.datetime "application_reminder_at"
    t.bigint "account_id"
    t.jsonb "log_data"
    t.uuid "company_id"
    t.index ["account_id"], name: "index_users_on_account_id"
    t.index ["airtable_id"], name: "index_users_on_airtable_id"
    t.index ["company_id"], name: "index_users_on_company_id"
    t.index ["country_id"], name: "index_users_on_country_id"
    t.index ["industry_id"], name: "index_users_on_industry_id"
    t.index ["sales_person_id"], name: "index_users_on_sales_person_id"
    t.index ["uid"], name: "index_users_on_uid"
  end

  create_table "video_calls", force: :cascade do |t|
    t.string "uid"
    t.bigint "interview_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "fallback"
    t.string "zoom_meeting_id"
    t.string "zoom_passcode"
    t.string "zoom_url"
    t.index ["interview_id"], name: "index_video_calls_on_interview_id"
    t.index ["uid"], name: "index_video_calls_on_uid"
  end

  create_table "webhook_configurations", force: :cascade do |t|
    t.string "name"
    t.string "url"
    t.string "type"
    t.jsonb "criteria"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "webhook_events", force: :cascade do |t|
    t.string "name"
    t.string "event"
    t.string "url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "webhooks", force: :cascade do |t|
    t.string "url"
    t.string "status"
    t.jsonb "data"
    t.text "response"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "answers", "questions"
  add_foreign_key "answers", "specialists"
  add_foreign_key "application_references", "applications"
  add_foreign_key "applications", "projects"
  add_foreign_key "applications", "specialists"
  add_foreign_key "auth_providers", "accounts"
  add_foreign_key "client_calls", "projects"
  add_foreign_key "client_calls", "sales_people"
  add_foreign_key "client_calls", "users"
  add_foreign_key "client_users", "clients"
  add_foreign_key "client_users", "users"
  add_foreign_key "companies", "industries"
  add_foreign_key "companies", "sales_people"
  add_foreign_key "consultations", "interviews"
  add_foreign_key "consultations", "skills"
  add_foreign_key "consultations", "specialists"
  add_foreign_key "consultations", "users"
  add_foreign_key "guild_comments", "guild_posts", on_delete: :cascade
  add_foreign_key "guild_comments", "specialists", on_delete: :cascade
  add_foreign_key "guild_post_engagements", "guild_posts"
  add_foreign_key "guild_post_engagements", "specialists"
  add_foreign_key "guild_post_images", "guild_posts", on_delete: :cascade
  add_foreign_key "guild_posts", "specialists"
  add_foreign_key "guild_reactions", "specialists", on_delete: :cascade
  add_foreign_key "interviews", "applications"
  add_foreign_key "interviews", "users"
  add_foreign_key "matches", "projects"
  add_foreign_key "matches", "specialists"
  add_foreign_key "off_platform_projects", "specialists"
  add_foreign_key "payments", "projects"
  add_foreign_key "previous_project_images", "off_platform_projects"
  add_foreign_key "project_industries", "industries"
  add_foreign_key "project_skills", "skills"
  add_foreign_key "projects", "clients"
  add_foreign_key "projects", "sales_people"
  add_foreign_key "projects", "users"
  add_foreign_key "reviews", "specialists"
  add_foreign_key "searches", "off_platform_projects", column: "manually_recommended_project_id"
  add_foreign_key "searches", "users"
  add_foreign_key "skills", "skills", column: "original_id"
  add_foreign_key "specialist_skills", "skills"
  add_foreign_key "specialist_skills", "specialists"
  add_foreign_key "specialists", "accounts"
  add_foreign_key "specialists", "countries"
  add_foreign_key "taggings", "tags"
  add_foreign_key "unresponsiveness_reports", "applications"
  add_foreign_key "unresponsiveness_reports", "users"
  add_foreign_key "user_skills", "skills"
  add_foreign_key "user_skills", "users"
  add_foreign_key "users", "accounts"
  add_foreign_key "users", "companies"
  add_foreign_key "users", "countries"
  add_foreign_key "users", "industries"
  add_foreign_key "users", "sales_people"
  add_foreign_key "video_calls", "interviews"
  create_function :logidze_logger, sql_definition: <<-SQL
      CREATE OR REPLACE FUNCTION public.logidze_logger()
       RETURNS trigger
       LANGUAGE plpgsql
      AS $function$
        DECLARE
          changes jsonb;
          version jsonb;
          snapshot jsonb;
          new_v integer;
          size integer;
          history_limit integer;
          debounce_time integer;
          current_version integer;
          merged jsonb;
          iterator integer;
          item record;
          columns text[];
          include_columns boolean;
          ts timestamp with time zone;
          ts_column text;
        BEGIN
          ts_column := NULLIF(TG_ARGV[1], 'null');
          columns := NULLIF(TG_ARGV[2], 'null');
          include_columns := NULLIF(TG_ARGV[3], 'null');

          IF TG_OP = 'INSERT' THEN
            -- always exclude log_data column
            changes := to_jsonb(NEW.*) - 'log_data';

            IF columns IS NOT NULL THEN
              snapshot = logidze_snapshot(changes, ts_column, columns, include_columns);
            ELSE
              snapshot = logidze_snapshot(changes, ts_column);
            END IF;

            IF snapshot#>>'{h, -1, c}' != '{}' THEN
              NEW.log_data := snapshot;
            END IF;

          ELSIF TG_OP = 'UPDATE' THEN

            IF OLD.log_data is NULL OR OLD.log_data = '{}'::jsonb THEN
              -- always exclude log_data column
              changes := to_jsonb(NEW.*) - 'log_data';

              IF columns IS NOT NULL THEN
                snapshot = logidze_snapshot(changes, ts_column, columns, include_columns);
              ELSE
                snapshot = logidze_snapshot(changes, ts_column);
              END IF;

              IF snapshot#>>'{h, -1, c}' != '{}' THEN
                NEW.log_data := snapshot;
              END IF;
              RETURN NEW;
            END IF;

            history_limit := NULLIF(TG_ARGV[0], 'null');
            debounce_time := NULLIF(TG_ARGV[4], 'null');

            current_version := (NEW.log_data->>'v')::int;

            IF ts_column IS NULL THEN
              ts := statement_timestamp();
            ELSE
              ts := (to_jsonb(NEW.*)->>ts_column)::timestamp with time zone;
              IF ts IS NULL OR ts = (to_jsonb(OLD.*)->>ts_column)::timestamp with time zone THEN
                ts := statement_timestamp();
              END IF;
            END IF;

            IF NEW = OLD THEN
              RETURN NEW;
            END IF;

            IF current_version < (NEW.log_data#>>'{h,-1,v}')::int THEN
              iterator := 0;
              FOR item in SELECT * FROM jsonb_array_elements(NEW.log_data->'h')
              LOOP
                IF (item.value->>'v')::int > current_version THEN
                  NEW.log_data := jsonb_set(
                    NEW.log_data,
                    '{h}',
                    (NEW.log_data->'h') - iterator
                  );
                END IF;
                iterator := iterator + 1;
              END LOOP;
            END IF;

            changes := '{}';

            IF (coalesce(current_setting('logidze.full_snapshot', true), '') = 'on') THEN
              changes = hstore_to_jsonb_loose(hstore(NEW.*));
            ELSE
              changes = hstore_to_jsonb_loose(
                hstore(NEW.*) - hstore(OLD.*)
              );
            END IF;

            changes = changes - 'log_data';

            IF columns IS NOT NULL THEN
              changes = logidze_filter_keys(changes, columns, include_columns);
            END IF;

            IF changes = '{}' THEN
              RETURN NEW;
            END IF;

            new_v := (NEW.log_data#>>'{h,-1,v}')::int + 1;

            size := jsonb_array_length(NEW.log_data->'h');
            version := logidze_version(new_v, changes, ts);

            IF (
              debounce_time IS NOT NULL AND
              (version->>'ts')::bigint - (NEW.log_data#>'{h,-1,ts}')::text::bigint <= debounce_time
            ) THEN
              -- merge new version with the previous one
              new_v := (NEW.log_data#>>'{h,-1,v}')::int;
              version := logidze_version(new_v, (NEW.log_data#>'{h,-1,c}')::jsonb || changes, ts);
              -- remove the previous version from log
              NEW.log_data := jsonb_set(
                NEW.log_data,
                '{h}',
                (NEW.log_data->'h') - (size - 1)
              );
            END IF;

            NEW.log_data := jsonb_set(
              NEW.log_data,
              ARRAY['h', size::text],
              version,
              true
            );

            NEW.log_data := jsonb_set(
              NEW.log_data,
              '{v}',
              to_jsonb(new_v)
            );

            IF history_limit IS NOT NULL AND history_limit <= size THEN
              NEW.log_data := logidze_compact_history(NEW.log_data, size - history_limit + 1);
            END IF;
          END IF;

          return NEW;
        END;
      $function$
  SQL
  create_function :logidze_version, sql_definition: <<-SQL
      CREATE OR REPLACE FUNCTION public.logidze_version(v bigint, data jsonb, ts timestamp with time zone)
       RETURNS jsonb
       LANGUAGE plpgsql
      AS $function$
        DECLARE
          buf jsonb;
        BEGIN
          buf := jsonb_build_object(
                    'ts',
                    (extract(epoch from ts) * 1000)::bigint,
                    'v',
                    v,
                    'c',
                    data
                    );
          IF coalesce(current_setting('logidze.meta', true), '') <> '' THEN
            buf := jsonb_insert(buf, '{m}', current_setting('logidze.meta')::jsonb);
          END IF;
          RETURN buf;
        END;
      $function$
  SQL
  create_function :logidze_snapshot, sql_definition: <<-SQL
      CREATE OR REPLACE FUNCTION public.logidze_snapshot(item jsonb, ts_column text DEFAULT NULL::text, columns text[] DEFAULT NULL::text[], include_columns boolean DEFAULT false)
       RETURNS jsonb
       LANGUAGE plpgsql
      AS $function$
        DECLARE
          ts timestamp with time zone;
        BEGIN
          IF ts_column IS NULL THEN
            ts := statement_timestamp();
          ELSE
            ts := coalesce((item->>ts_column)::timestamp with time zone, statement_timestamp());
          END IF;

          IF columns IS NOT NULL THEN
            item := logidze_filter_keys(item, columns, include_columns);
          END IF;

          return json_build_object(
            'v', 1,
            'h', jsonb_build_array(
                    logidze_version(1, item, ts)
                  )
            );
        END;
      $function$
  SQL
  create_function :logidze_filter_keys, sql_definition: <<-SQL
      CREATE OR REPLACE FUNCTION public.logidze_filter_keys(obj jsonb, keys text[], include_columns boolean DEFAULT false)
       RETURNS jsonb
       LANGUAGE plpgsql
      AS $function$
        DECLARE
          res jsonb;
          key text;
        BEGIN
          res := '{}';

          IF include_columns THEN
            FOREACH key IN ARRAY keys
            LOOP
              IF obj ? key THEN
                res = jsonb_insert(res, ARRAY[key], obj->key);
              END IF;
            END LOOP;
          ELSE
            res = obj;
            FOREACH key IN ARRAY keys
            LOOP
              res = res - key;
            END LOOP;
          END IF;

          RETURN res;
        END;
      $function$
  SQL
  create_function :logidze_compact_history, sql_definition: <<-SQL
      CREATE OR REPLACE FUNCTION public.logidze_compact_history(log_data jsonb, cutoff integer DEFAULT 1)
       RETURNS jsonb
       LANGUAGE plpgsql
      AS $function$
        DECLARE
          merged jsonb;
        BEGIN
          LOOP
            merged := jsonb_build_object(
              'ts',
              log_data#>'{h,1,ts}',
              'v',
              log_data#>'{h,1,v}',
              'c',
              (log_data#>'{h,0,c}') || (log_data#>'{h,1,c}')
            );

            IF (log_data#>'{h,1}' ? 'm') THEN
              merged := jsonb_set(merged, ARRAY['m'], log_data#>'{h,1,m}');
            END IF;

            log_data := jsonb_set(
              log_data,
              '{h}',
              jsonb_set(
                log_data->'h',
                '{1}',
                merged
              ) - 0
            );

            cutoff := cutoff - 1;

            EXIT WHEN cutoff <= 0;
          END LOOP;

          return log_data;
        END;
      $function$
  SQL


  create_trigger :logidze_on_projects, sql_definition: <<-SQL
      CREATE TRIGGER logidze_on_projects BEFORE INSERT OR UPDATE ON public.projects FOR EACH ROW WHEN ((COALESCE(current_setting('logidze.disabled'::text, true), ''::text) <> 'on'::text)) EXECUTE FUNCTION logidze_logger('null', 'updated_at')
  SQL
  create_trigger :logidze_on_specialists, sql_definition: <<-SQL
      CREATE TRIGGER logidze_on_specialists BEFORE INSERT OR UPDATE ON public.specialists FOR EACH ROW WHEN ((COALESCE(current_setting('logidze.disabled'::text, true), ''::text) <> 'on'::text)) EXECUTE FUNCTION logidze_logger('null', 'updated_at')
  SQL
  create_trigger :logidze_on_applications, sql_definition: <<-SQL
      CREATE TRIGGER logidze_on_applications BEFORE INSERT OR UPDATE ON public.applications FOR EACH ROW WHEN ((COALESCE(current_setting('logidze.disabled'::text, true), ''::text) <> 'on'::text)) EXECUTE FUNCTION logidze_logger('null', 'updated_at')
  SQL
  create_trigger :logidze_on_users, sql_definition: <<-SQL
      CREATE TRIGGER logidze_on_users BEFORE INSERT OR UPDATE ON public.users FOR EACH ROW WHEN ((COALESCE(current_setting('logidze.disabled'::text, true), ''::text) <> 'on'::text)) EXECUTE FUNCTION logidze_logger('null', 'updated_at')
  SQL
  create_trigger :logidze_on_off_platform_projects, sql_definition: <<-SQL
      CREATE TRIGGER logidze_on_off_platform_projects BEFORE INSERT OR UPDATE ON public.off_platform_projects FOR EACH ROW WHEN ((COALESCE(current_setting('logidze.disabled'::text, true), ''::text) <> 'on'::text)) EXECUTE FUNCTION logidze_logger('null', 'updated_at')
  SQL
  create_trigger :logidze_on_tasks, sql_definition: <<-SQL
      CREATE TRIGGER logidze_on_tasks BEFORE INSERT OR UPDATE ON public.tasks FOR EACH ROW WHEN ((COALESCE(current_setting('logidze.disabled'::text, true), ''::text) <> 'on'::text)) EXECUTE FUNCTION logidze_logger('null', 'updated_at')
  SQL
  create_trigger :logidze_on_accounts, sql_definition: <<-SQL
      CREATE TRIGGER logidze_on_accounts BEFORE INSERT OR UPDATE ON public.accounts FOR EACH ROW WHEN ((COALESCE(current_setting('logidze.disabled'::text, true), ''::text) <> 'on'::text)) EXECUTE FUNCTION logidze_logger('null', 'updated_at')
  SQL
end
