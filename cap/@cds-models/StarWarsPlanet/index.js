// This is an automatically generated file. Please do not change its contents manually!
const { createEntityProxy } = require('./../_')
// service
const StarWarsPlanet = { name: 'StarWarsPlanet' }
module.exports = StarWarsPlanet
module.exports.StarWarsPlanet = StarWarsPlanet
// Planet
module.exports.Planet = createEntityProxy(['StarWarsPlanet', 'Planet'], { target: { is_singular: true } })
module.exports.Planet_ = createEntityProxy(['StarWarsPlanet', 'Planet'], { target: { is_singular: false }})
// People
module.exports.People = createEntityProxy(['StarWarsPlanet', 'People'], { target: { is_singular: true } })
module.exports.People_ = createEntityProxy(['StarWarsPlanet', 'People'], { target: { is_singular: false }})
// Vehicle
module.exports.Vehicle = createEntityProxy(['StarWarsPlanet', 'Vehicle'], { target: { is_singular: true } })
module.exports.Vehicle_ = createEntityProxy(['StarWarsPlanet', 'Vehicle'], { target: { is_singular: false }})
// Vehicles
module.exports.Vehicle = createEntityProxy(['StarWarsPlanet', 'Vehicles'], { target: { is_singular: true } })
module.exports.Vehicles = createEntityProxy(['StarWarsPlanet', 'Vehicles'], { target: { is_singular: false }})
// Starship
module.exports.Starship = createEntityProxy(['StarWarsPlanet', 'Starship'], { target: { is_singular: true } })
module.exports.Starship_ = createEntityProxy(['StarWarsPlanet', 'Starship'], { target: { is_singular: false }})
// Film
module.exports.Film = createEntityProxy(['StarWarsPlanet', 'Film'], { target: { is_singular: true }, customProps: ["episode_id"] })
module.exports.Film_ = createEntityProxy(['StarWarsPlanet', 'Film'], { target: { is_singular: false }})
// Film2Planets
module.exports.Film2Planet = createEntityProxy(['StarWarsPlanet', 'Film2Planets'], { target: { is_singular: true } })
module.exports.Film2Planets = createEntityProxy(['StarWarsPlanet', 'Film2Planets'], { target: { is_singular: false }})
// Planet2People
module.exports.Planet2People = createEntityProxy(['StarWarsPlanet', 'Planet2People'], { target: { is_singular: true } })
module.exports.Planet2People_ = createEntityProxy(['StarWarsPlanet', 'Planet2People'], { target: { is_singular: false }})
// climateValues
module.exports.climateValue = createEntityProxy(['StarWarsPlanet', 'climateValues'], { target: { is_singular: true } })
module.exports.climateValues = createEntityProxy(['StarWarsPlanet', 'climateValues'], { target: { is_singular: false }})
// terrainValues
module.exports.terrainValue = createEntityProxy(['StarWarsPlanet', 'terrainValues'], { target: { is_singular: true } })
module.exports.terrainValues = createEntityProxy(['StarWarsPlanet', 'terrainValues'], { target: { is_singular: false }})
// Film2People
module.exports.Film2People = createEntityProxy(['StarWarsPlanet', 'Film2People'], { target: { is_singular: true } })
module.exports.Film2People_ = createEntityProxy(['StarWarsPlanet', 'Film2People'], { target: { is_singular: false }})
// Species2People
module.exports.Species2People = createEntityProxy(['StarWarsPlanet', 'Species2People'], { target: { is_singular: true } })
module.exports.Species2People_ = createEntityProxy(['StarWarsPlanet', 'Species2People'], { target: { is_singular: false }})
// Vehicle2Pilot
module.exports.Vehicle2Pilot = createEntityProxy(['StarWarsPlanet', 'Vehicle2Pilot'], { target: { is_singular: true } })
module.exports.Vehicle2Pilot_ = createEntityProxy(['StarWarsPlanet', 'Vehicle2Pilot'], { target: { is_singular: false }})
// Starship2Pilot
module.exports.Starship2Pilot = createEntityProxy(['StarWarsPlanet', 'Starship2Pilot'], { target: { is_singular: true } })
module.exports.Starship2Pilot_ = createEntityProxy(['StarWarsPlanet', 'Starship2Pilot'], { target: { is_singular: false }})
// Film2Vehicles
module.exports.Film2Vehicle = createEntityProxy(['StarWarsPlanet', 'Film2Vehicles'], { target: { is_singular: true } })
module.exports.Film2Vehicles = createEntityProxy(['StarWarsPlanet', 'Film2Vehicles'], { target: { is_singular: false }})
// Film2Starships
module.exports.Film2Starship = createEntityProxy(['StarWarsPlanet', 'Film2Starships'], { target: { is_singular: true } })
module.exports.Film2Starships = createEntityProxy(['StarWarsPlanet', 'Film2Starships'], { target: { is_singular: false }})
// Film2Species
module.exports.Film2Species = createEntityProxy(['StarWarsPlanet', 'Film2Species'], { target: { is_singular: true } })
module.exports.Film2Species_ = createEntityProxy(['StarWarsPlanet', 'Film2Species'], { target: { is_singular: false }})
// events
// actions
// enums
module.exports.Film.episode_id ??= { I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6, VII: 7, VIII: 8, IX: 9, X: 10, OTHER: 0 }
