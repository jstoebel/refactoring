require 'spec_helper'
require './tire_pressure'

describe Alarm do
  it 'is off by default' do
    alarm = Alarm.new
    expect(alarm.is_alarm_on).to be_falsy
  end

  it 'turns on when pressure is above 21' do
    stub_alarm 22
    alarm = Alarm.new

    alarm.check

    expect(alarm.is_alarm_on).to be_truthy
  end

  it 'turns on when pressure is below 17' do
    stub_alarm 16
    alarm = Alarm.new
    alarm.check

    expect(alarm.is_alarm_on).to be_truthy
  end

  it 'turns off when pressure is between 17 and 21' do
    stub_alarm 20
    alarm = Alarm.new
    alarm.check

    expect(alarm.is_alarm_on).to be_falsy
  end

  it 'accepts an custom sensor like object' do
    my_sensor = double('my_sensor')
    expect(my_sensor).to receive(:pop_next_pressure_psi_value).and_return(20)
    alarm = Alarm.new my_sensor
    alarm.check
  end

  # alarm with a senor 
  def stub_alarm(val)
    sensor = double('sensor', pop_next_pressure_psi_value: val)
    allow(Sensor).to receive(:new).and_return(sensor)
  end
end
