SOLID violations?
 - Dependency inversion principle
    Alarm --> Sensor

    What we want instead is to write to a protocol (Ruby's alternative to interfaces)

    Alarm --> <<pop_psi_protocol>> <-- Sensor

   This would allow for `Alarm` to use any object that implements this protocol. We could easily add different kinds of sensors.

Refactor
  Here we need to extend the constructor signature to accept a single argument `sensor` which defaults to `Sensor.new`. This let's clients supply any sensor like type they want.