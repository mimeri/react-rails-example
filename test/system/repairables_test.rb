# frozen_string_literal: true

require 'application_system_test_case'

class RepairablesTest < ApplicationSystemTestCase
  setup do
    @repairable = repairables(:one)
  end

  test 'visiting the index' do
    visit repairables_url
    assert_selector 'h1', text: 'Repairables'
  end

  test 'creating a Repairable' do
    visit repairables_url
    click_on 'New Repairable'

    click_on 'Create Repairable'

    assert_text 'Repairable was successfully created'
    click_on 'Back'
  end

  test 'updating a Repairable' do
    visit repairables_url
    click_on 'Edit', match: :first

    click_on 'Update Repairable'

    assert_text 'Repairable was successfully updated'
    click_on 'Back'
  end

  test 'destroying a Repairable' do
    visit repairables_url
    page.accept_confirm do
      click_on 'Destroy', match: :first
    end

    assert_text 'Repairable was successfully destroyed'
  end
end
