# This serialize is used to serialize Profile model
class ProfileSerializer < ActiveModel::Serializer
  attributes :id, :name, :account_id
end
