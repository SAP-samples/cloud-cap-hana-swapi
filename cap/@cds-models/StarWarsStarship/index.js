// This is an automatically generated file. Please do not change its contents manually!
const { createEntityProxy } = require('./../_')
// service
const StarWarsStarship = { name: 'StarWarsStarship' }
module.exports = StarWarsStarship
module.exports.StarWarsStarship = StarWarsStarship
// Starship
module.exports.Starship = createEntityProxy(['StarWarsStarship', 'Starship'], { target: { is_singular: true } })
module.exports.Starship_ = createEntityProxy(['StarWarsStarship', 'Starship'], { target: { is_singular: false }})
// Film
module.exports.Film = createEntityProxy(['StarWarsStarship', 'Film'], { target: { is_singular: true }, customProps: ["episode_id"] })
module.exports.Film_ = createEntityProxy(['StarWarsStarship', 'Film'], { target: { is_singular: false }})
// People
module.exports.People = createEntityProxy(['StarWarsStarship', 'People'], { target: { is_singular: true } })
module.exports.People_ = createEntityProxy(['StarWarsStarship', 'People'], { target: { is_singular: false }})
// Planet
module.exports.Planet = createEntityProxy(['StarWarsStarship', 'Planet'], { target: { is_singular: true } })
module.exports.Planet_ = createEntityProxy(['StarWarsStarship', 'Planet'], { target: { is_singular: false }})
// Vehicles
module.exports.Vehicle = createEntityProxy(['StarWarsStarship', 'Vehicles'], { target: { is_singular: true } })
module.exports.Vehicles = createEntityProxy(['StarWarsStarship', 'Vehicles'], { target: { is_singular: false }})
// Film2Starships
module.exports.Film2Starship = createEntityProxy(['StarWarsStarship', 'Film2Starships'], { target: { is_singular: true } })
module.exports.Film2Starships = createEntityProxy(['StarWarsStarship', 'Film2Starships'], { target: { is_singular: false }})
// Starship2Pilot
module.exports.Starship2Pilot = createEntityProxy(['StarWarsStarship', 'Starship2Pilot'], { target: { is_singular: true } })
module.exports.Starship2Pilot_ = createEntityProxy(['StarWarsStarship', 'Starship2Pilot'], { target: { is_singular: false }})
// ssModels
module.exports.ssModel = createEntityProxy(['StarWarsStarship', 'ssModels'], { target: { is_singular: true } })
module.exports.ssModels = createEntityProxy(['StarWarsStarship', 'ssModels'], { target: { is_singular: false }})
// ssClass
module.exports.ssClas = createEntityProxy(['StarWarsStarship', 'ssClass'], { target: { is_singular: true } })
module.exports.ssClass = createEntityProxy(['StarWarsStarship', 'ssClass'], { target: { is_singular: false }})
// ssManufacturer
module.exports.ssManufacturer = createEntityProxy(['StarWarsStarship', 'ssManufacturer'], { target: { is_singular: true } })
module.exports.ssManufacturer_ = createEntityProxy(['StarWarsStarship', 'ssManufacturer'], { target: { is_singular: false }})
// Film2People
module.exports.Film2People = createEntityProxy(['StarWarsStarship', 'Film2People'], { target: { is_singular: true } })
module.exports.Film2People_ = createEntityProxy(['StarWarsStarship', 'Film2People'], { target: { is_singular: false }})
// Film2Planets
module.exports.Film2Planet = createEntityProxy(['StarWarsStarship', 'Film2Planets'], { target: { is_singular: true } })
module.exports.Film2Planets = createEntityProxy(['StarWarsStarship', 'Film2Planets'], { target: { is_singular: false }})
// Film2Vehicles
module.exports.Film2Vehicle = createEntityProxy(['StarWarsStarship', 'Film2Vehicles'], { target: { is_singular: true } })
module.exports.Film2Vehicles = createEntityProxy(['StarWarsStarship', 'Film2Vehicles'], { target: { is_singular: false }})
// Film2Species
module.exports.Film2Species = createEntityProxy(['StarWarsStarship', 'Film2Species'], { target: { is_singular: true } })
module.exports.Film2Species_ = createEntityProxy(['StarWarsStarship', 'Film2Species'], { target: { is_singular: false }})
// Species2People
module.exports.Species2People = createEntityProxy(['StarWarsStarship', 'Species2People'], { target: { is_singular: true } })
module.exports.Species2People_ = createEntityProxy(['StarWarsStarship', 'Species2People'], { target: { is_singular: false }})
// Vehicle2Pilot
module.exports.Vehicle2Pilot = createEntityProxy(['StarWarsStarship', 'Vehicle2Pilot'], { target: { is_singular: true } })
module.exports.Vehicle2Pilot_ = createEntityProxy(['StarWarsStarship', 'Vehicle2Pilot'], { target: { is_singular: false }})
// Planet2People
module.exports.Planet2People = createEntityProxy(['StarWarsStarship', 'Planet2People'], { target: { is_singular: true } })
module.exports.Planet2People_ = createEntityProxy(['StarWarsStarship', 'Planet2People'], { target: { is_singular: false }})
// events
// actions
// enums
module.exports.Film.episode_id ??= { I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6, VII: 7, VIII: 8, IX: 9, X: 10, OTHER: 0 }
