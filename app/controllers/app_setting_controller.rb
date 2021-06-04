# frozen_string_literal: true

class AppSettingController < ApplicationController
  before_action :authenticate_user!, :is_admin?
  before_action :set_setting

  def edit; end

  def update
    respond_to do |format|
      binding.pry
      if @setting.update(setting_params)
        format.html { redirect_to app_setting_path(@setting), notice: 'Settings updated.' }
      else
        format.html { render :edit, notice: 'Settings not updated.  Please try again.' }
      end
    end
  end

  def show; end

  private

  def set_setting
    @setting = AppSetting.instance
  end

  def setting_params
    params.require(:app_setting).permit(:serviceProviderLockedFactor, :wearLevelFactor, :cloudLockedFactor, :screenDefectFactor, :bootupDefectFactor, :previousRepairFactor)
  end
end
