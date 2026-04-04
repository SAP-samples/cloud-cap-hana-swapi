// This is an automatically generated file. Please do not change its contents manually!
const { createEntityProxy } = require('./../_')
// service
const StarWarsVehicle = { name: 'StarWarsVehicle' }
module.exports = StarWarsVehicle
module.exports.StarWarsVehicle = StarWarsVehicle
// Vehicles
module.exports.Vehicle = createEntityProxy(['StarWarsVehicle', 'Vehicles'], { target: { is_singular: true } })
module.exports.Vehicles = createEntityProxy(['StarWarsVehicle', 'Vehicles'], { target: { is_singular: false }})
// Vehicle
module.exports.Vehicle = createEntityProxy(['StarWarsVehicle', 'Vehicle'], { target: { is_singular: true } })
module.exports.Vehicle_ = createEntityProxy(['StarWarsVehicle', 'Vehicle'], { target: { is_singular: false }})
// Film
module.exports.Film = createEntityProxy(['StarWarsVehicle', 'Film'], { target: { is_singular: true }, customProps: ["episode_id"] })
module.exports.Film_ = createEntityProxy(['StarWarsVehicle', 'Film'], { target: { is_singular: false }})
// People
module.exports.People = createEntityProxy(['StarWarsVehicle', 'People'], { target: { is_singular: true } })
module.exports.People_ = createEntityProxy(['StarWarsVehicle', 'People'], { target: { is_singular: false }})
// Planet
module.exports.Planet = createEntityProxy(['StarWarsVehicle', 'Planet'], { target: { is_singular: true } })
module.exports.Planet_ = createEntityProxy(['StarWarsVehicle', 'Planet'], { target: { is_singular: false }})
// Starship
module.exports.Starship = createEntityProxy(['StarWarsVehicle', 'Starship'], { target: { is_singular: true } })
module.exports.Starship_ = createEntityProxy(['StarWarsVehicle', 'Starship'], { target: { is_singular: false }})
// Film2Vehicles
module.exports.Film2Vehicle = createEntityProxy(['StarWarsVehicle', 'Film2Vehicles'], { target: { is_singular: true } })
module.exports.Film2Vehicles = createEntityProxy(['StarWarsVehicle', 'Film2Vehicles'], { target: { is_singular: false }})
// Vehicle2Pilot
module.exports.Vehicle2Pilot = createEntityProxy(['StarWarsVehicle', 'Vehicle2Pilot'], { target: { is_singular: true } })
module.exports.Vehicle2Pilot_ = createEntityProxy(['StarWarsVehicle', 'Vehicle2Pilot'], { target: { is_singular: false }})
// vModels
module.exports.vModel = createEntityProxy(['StarWarsVehicle', 'vModels'], { target: { is_singular: true } })
module.exports.vModels = createEntityProxy(['StarWarsVehicle', 'vModels'], { target: { is_singular: false }})
// vClass
module.exports.vClas = createEntityProxy(['StarWarsVehicle', 'vClass'], { target: { is_singular: true } })
module.exports.vClass = createEntityProxy(['StarWarsVehicle', 'vClass'], { target: { is_singular: false }})
// vManufacturer
module.exports.vManufacturer = createEntityProxy(['StarWarsVehicle', 'vManufacturer'], { target: { is_singular: true } })
module.exports.vManufacturer_ = createEntityProxy(['StarWarsVehicle', 'vManufacturer'], { target: { is_singular: false }})
// Film2People
module.exports.Film2People = createEntityProxy(['StarWarsVehicle', 'Film2People'], { target: { is_singular: true } })
module.exports.Film2People_ = createEntityProxy(['StarWarsVehicle', 'Film2People'], { target: { is_singular: false }})
// Film2Planets
module.exports.Film2Planet = createEntityProxy(['StarWarsVehicle', 'Film2Planets'], { target: { is_singular: true } })
module.exports.Film2Planets = createEntityProxy(['StarWarsVehicle', 'Film2Planets'], { target: { is_singular: false }})
// Film2Starships
module.exports.Film2Starship = createEntityProxy(['StarWarsVehicle', 'Film2Starships'], { target: { is_singular: true } })
module.exports.Film2Starships = createEntityProxy(['StarWarsVehicle', 'Film2Starships'], { target: { is_singular: false }})
// Film2Species
module.exports.Film2Species = createEntityProxy(['StarWarsVehicle', 'Film2Species'], { target: { is_singular: true } })
module.exports.Film2Species_ = createEntityProxy(['StarWarsVehicle', 'Film2Species'], { target: { is_singular: false }})
// Species2People
module.exports.Species2People = createEntityProxy(['StarWarsVehicle', 'Species2People'], { target: { is_singular: true } })
module.exports.Species2People_ = createEntityProxy(['StarWarsVehicle', 'Species2People'], { target: { is_singular: false }})
// Starship2Pilot
module.exports.Starship2Pilot = createEntityProxy(['StarWarsVehicle', 'Starship2Pilot'], { target: { is_singular: true } })
module.exports.Starship2Pilot_ = createEntityProxy(['StarWarsVehicle', 'Starship2Pilot'], { target: { is_singular: false }})
// Planet2People
module.exports.Planet2People = createEntityProxy(['StarWarsVehicle', 'Planet2People'], { target: { is_singular: true } })
module.exports.Planet2People_ = createEntityProxy(['StarWarsVehicle', 'Planet2People'], { target: { is_singular: false }})
// events
// actions
// enums
module.exports.Film.episode_id ??= { I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6, VII: 7, VIII: 8, IX: 9, X: 10, OTHER: 0 }
