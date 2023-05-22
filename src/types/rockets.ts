class InternationalHeight {
  feet = 0
  meters = 0
}

class InternationalThrust {
  kN = 0
  lbf = 0
}

class InternationalDiameter {
  meters = 0
  feet = 0
}

class InternationalMass {
  kg = 0
  lb = 0
}

class Payload extends InternationalMass {
  id = ''
  name = ''
}

export class Rocket {
  height = new InternationalHeight()
  diameter = new InternationalDiameter()
  mass = new InternationalMass()
  first_stage = {
    thrust_sea_level: new InternationalThrust(),
    thrust_vacuum: new InternationalThrust(),
    reusable: true,
    engines: 0,
    fuel_amount_tons: 0,
    burn_time_sec: 0
  }
  second_stage = {
    thrust: new InternationalThrust(),
    payloads: {
      composite_fairing: {
        height: new InternationalHeight(),
        diameter: new InternationalDiameter()
      },
      option_1: ''
    },
    reusable: false,
    engines: 1,
    fuel_amount_tons: 0,
    burn_time_sec: 0
  }
  engines = {
    isp: {
      sea_level: 0,
      vacuum: 0
    },
    thrust_sea_level: new InternationalThrust(),
    thrust_vacuum: new InternationalThrust(),
    number: 0,
    type: '',
    version: '',
    layout: '',
    engine_loss_max: 0,
    propellant_1: '',
    propellant_2: '',
    thrust_to_weight: 0
  }
  landing_legs = {
    number: 0,
    material: ''
  }
  payload_weights = new Array<Payload>()
  flickr_images = new Array<string>()
  name = ''
  type = ''
  active = true
  stages = 0
  boosters = 0
  cost_per_launch = 0
  success_rate_pct = 0
  first_flight = new Date()
  count = ''
  company = ''
  wikipedia = ''
  description = ''
  id = ''
}
