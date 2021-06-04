# frozen_string_literal: true

require 'test_helper'

class RepairablesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @repairable = repairables(:one)
  end

  test 'should get index' do
    get repairables_url
    assert_response :success
  end

  test 'should get new' do
    get new_repairable_url
    assert_response :success
  end

  test 'should create repairable' do
    assert_difference('Repairable.count') do
      post repairables_url, params: { repairable: {} }
    end

    assert_redirected_to repairable_url(Repairable.last)
  end

  test 'should show repairable' do
    get repairable_url(@repairable)
    assert_response :success
  end

  test 'should get edit' do
    get edit_repairable_url(@repairable)
    assert_response :success
  end

  test 'should update repairable' do
    patch repairable_url(@repairable), params: { repairable: {} }
    assert_redirected_to repairable_url(@repairable)
  end

  test 'should destroy repairable' do
    assert_difference('Repairable.count', -1) do
      delete repairable_url(@repairable)
    end

    assert_redirected_to repairables_url
  end
end
