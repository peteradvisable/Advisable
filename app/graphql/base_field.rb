# The base field class that should be used for all grapql fields.
# This includes some additional functionality arround authorization for fields.
class BaseField < GraphQL::Schema::Field
  attr_reader :authorize_methods

  # Allows authorization to be configured inside the field block rather
  # than using a param.
  # Using this method we can provide an 'error' proc which will be called when
  # the authorization fails. This allows you to throw an error if authorization
  # fails. This proc will be passed the field value and the context.
  def authorize(*methods)
    @authorize_methods = methods
  end

  def authorized?(object, context)
    super
    return true unless authorize_methods
    policy = policy(context[:current_user], object)
    truthy = authorize_methods.filter do |auth_method|
      policy.send("#{auth_method}")
    end
    truthy.any?
  end

  def policy(user, record)
    Pundit.policy!(user, record)
  end
end